/**
 * Web app that receives the consulting-profile-form submission from
 * src/app/api/consulting-profile-form/submit/route.ts. On each submission it:
 *   1. Appends a row to this spreadsheet (photo as an =IMAGE() formula,
 *      since a cell can't hold image bytes or a multi-MB base64 string).
 *   2. Copies a Google Doc template, fills in that person's answers +
 *      their photo, and shares it link-viewable.
 *   3. Upserts them into MailerLite with a doc_link custom field and adds
 *      them to a group, so a MailerLite automation can email them the link.
 *
 * Full setup instructions are in scripts/apps-script/README.md in the repo.
 * Required Script Properties (Project Settings > Script Properties):
 *   DOC_TEMPLATE_ID      - Doc ID of the profile template (required for step 2)
 *   DOCS_FOLDER_NAME      - optional, defaults to "Expert Profile Docs"
 *   MAILERLITE_API_KEY    - MailerLite API token (required for step 3)
 *   MAILERLITE_GROUP_ID   - MailerLite group ID the automation triggers on
 */

var SHEET_NAME = 'Consulting Profile Form';
var PHOTOS_FOLDER_NAME = 'Expert Profile Photos';
var DEFAULT_DOCS_FOLDER_NAME = 'Expert Profile Docs';

// Must match the keys buildSheetsPayload() sends in route.ts, plus the two
// fields this script computes itself (photo, docLink).
var COLUMNS = [
  'submittedAt', 'fullName', 'preferredName', 'email', 'country', 'timezone', 'photo', 'docLink',
  'linkedin', 'currentRole', 'yearsExperience', 'industry', 'adviceAreas', 'greatestStrength',
  'coreProblem', 'proudestWork', 'orgTypes', 'whyJoined', 'bestWorkshop', 'keyQuestion',
  'aiConfidence', 'aiTools', 'aiTransformative', 'businessName', 'businessIndustry', 'businessSize',
  'businessChallenge', 'businessFriction', 'businessWhy', 'sixMonthsVision', 'anythingElse',
  'marketingConsent',
];

// Data keys that get substituted for {{key}} placeholders in the doc template.
var DOC_PLACEHOLDER_KEYS = [
  'submittedAt', 'fullName', 'preferredName', 'email', 'country', 'timezone',
  'linkedin', 'currentRole', 'yearsExperience', 'industry', 'adviceAreas', 'greatestStrength',
  'coreProblem', 'proudestWork', 'orgTypes', 'whyJoined', 'bestWorkshop', 'keyQuestion',
  'aiConfidence', 'aiTools', 'aiTransformative', 'businessName', 'businessIndustry', 'businessSize',
  'businessChallenge', 'businessFriction', 'businessWhy', 'sixMonthsVision', 'anythingElse',
  'marketingConsent',
];

function doPost(e) {
  var warnings = [];
  try {
    var data = JSON.parse(e.postData.contents);
    var config = getConfig_();

    var photo = data.photoBase64 ? decodePhoto_(data.photoBase64) : null;

    var photoUrl = '';
    if (photo) {
      try {
        photoUrl = uploadPhotoToDrive_(photo, data);
      } catch (err) {
        warnings.push('Photo upload failed: ' + err);
      }
    }

    var docUrl = '';
    if (config.docTemplateId) {
      try {
        docUrl = generateProfileDoc_(data, photo, config);
      } catch (err) {
        warnings.push('Doc generation failed: ' + err);
      }
    } else {
      warnings.push('DOC_TEMPLATE_ID script property not set - skipped doc generation.');
    }

    var sheet = getSheet_();
    ensureHeaderRow_(sheet);
    var row = COLUMNS.map(function (key) {
      if (key === 'photo') return photoUrl ? '=IMAGE("' + photoUrl + '")' : '';
      if (key === 'docLink') return docUrl || '';
      return data[key] || '';
    });
    sheet.appendRow(row);

    if (data.email && docUrl) {
      if (config.mailerliteApiKey && config.mailerliteGroupId) {
        try {
          upsertMailerliteSubscriber_(data, docUrl, config);
        } catch (err) {
          warnings.push('MailerLite sync failed: ' + err);
        }
      } else {
        warnings.push('MAILERLITE_API_KEY / MAILERLITE_GROUP_ID not set - skipped MailerLite sync.');
      }
    }

    return jsonResponse_({ ok: true, docUrl: docUrl, warnings: warnings });
  } catch (err) {
    return jsonResponse_({ error: String(err) });
  }
}

function getConfig_() {
  var props = PropertiesService.getScriptProperties();
  return {
    docTemplateId: props.getProperty('DOC_TEMPLATE_ID'),
    docsFolderName: props.getProperty('DOCS_FOLDER_NAME') || DEFAULT_DOCS_FOLDER_NAME,
    mailerliteApiKey: props.getProperty('MAILERLITE_API_KEY'),
    mailerliteGroupId: props.getProperty('MAILERLITE_GROUP_ID'),
  };
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  }
}

function decodePhoto_(photoBase64) {
  var match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.*)$/.exec(photoBase64);
  if (!match) return null;

  var mimeType = match[1];
  var extension = mimeType.split('/')[1].replace('jpeg', 'jpg');
  var bytes = Utilities.base64Decode(match[2]);
  return {
    blob: Utilities.newBlob(bytes, mimeType, 'photo.' + extension),
    mimeType: mimeType,
    extension: extension,
  };
}

function uploadPhotoToDrive_(photo, data) {
  var safeName = String(data.fullName || 'applicant').replace(/[^a-zA-Z0-9]+/g, '_');
  var fileName = safeName + '_' + new Date().getTime() + '.' + photo.extension;

  var folder = getOrCreateFolder_(PHOTOS_FOLDER_NAME);
  var file = folder.createFile(photo.blob.copyBlob().setName(fileName));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return 'https://drive.google.com/uc?id=' + file.getId();
}

// Docs embeds via appendInlineImage only accept these - notably not WEBP.
var DOC_EMBEDDABLE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
var DOC_IMAGE_MAX_WIDTH_PT = 200;

/**
 * Copies the DOC_TEMPLATE_ID template, replaces {{field}} placeholders with
 * this submission's answers, drops the photo in wherever {{photo}} sits in
 * the template, and returns the shareable URL of the new doc.
 */
function generateProfileDoc_(data, photo, config) {
  var templateFile = DriveApp.getFileById(config.docTemplateId);
  var folder = getOrCreateFolder_(config.docsFolderName);
  var name = (data.fullName || 'Applicant') + ' - Expert Profile - ' + new Date().toISOString().slice(0, 10);
  var copy = templateFile.makeCopy(name, folder);

  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();

  DOC_PLACEHOLDER_KEYS.forEach(function (key) {
    body.replaceText(placeholderPattern_(key), escapeReplacement_(data[key] || ''));
  });

  insertPhotoPlaceholder_(body, photo);

  doc.saveAndClose();

  var docFile = DriveApp.getFileById(copy.getId());
  docFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return docFile.getUrl();
}

// {{photo}} must sit alone on its own line/paragraph in the template - the
// paragraph gets cleared and the image inserted in its place, so any other
// text sharing that paragraph would be wiped out too.
function insertPhotoPlaceholder_(body, photo) {
  var photoMarker = body.findText(placeholderPattern_('photo'));
  if (!photoMarker) return;

  var embeddable = photo && DOC_EMBEDDABLE_MIME_TYPES.indexOf(photo.mimeType) !== -1;
  if (embeddable) {
    try {
      var paragraph = photoMarker.getElement().getParent().asParagraph();
      paragraph.clear();
      var image = paragraph.appendInlineImage(photo.blob.copyBlob());
      var width = image.getWidth();
      if (width > DOC_IMAGE_MAX_WIDTH_PT) {
        var scale = DOC_IMAGE_MAX_WIDTH_PT / width;
        image.setHeight(Math.round(image.getHeight() * scale));
        image.setWidth(DOC_IMAGE_MAX_WIDTH_PT);
      }
      return;
    } catch (err) {
      // Fall through and just clear the placeholder text below - a bad or
      // unembeddable image should never take down the rest of the doc.
    }
  }
  body.replaceText(placeholderPattern_('photo'), '');
}

// Curly braces are regex metacharacters to replaceText/findText - escape
// them so "{{key}}" is matched literally instead of as a (malformed)
// repetition quantifier.
function placeholderPattern_(key) {
  return '\\{\\{' + key + '\\}\\}';
}

// Doc.Body#replaceText treats the replacement string as a regex replacement,
// where a bare "$" starts a group reference - escape it so literal answers
// containing "$" (e.g. pricing) don't get mangled or throw.
function escapeReplacement_(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
}

function getOrCreateFolder_(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function upsertMailerliteSubscriber_(data, docUrl, config) {
  var payload = {
    email: data.email,
    fields: {
      name: data.fullName || '',
      doc_link: docUrl,
    },
    groups: [config.mailerliteGroupId],
  };

  var response = UrlFetchApp.fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + config.mailerliteApiKey,
      Accept: 'application/json',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var code = response.getResponseCode();
  var body = response.getContentText();
  Logger.log('MailerLite response %s: %s', code, body);

  if (code >= 300) {
    throw new Error('MailerLite API returned ' + code + ': ' + body);
  }

  // MailerLite returns 200/201 even when it silently drops a field it
  // doesn't recognize by key, so a status-code check alone can't catch a
  // mismatched custom field key - confirm doc_link actually made it back.
  var parsed = JSON.parse(body);
  var savedDocLink = parsed && parsed.data && parsed.data.fields && parsed.data.fields.doc_link;
  if (savedDocLink !== docUrl) {
    throw new Error(
      'MailerLite accepted the subscriber but did not save doc_link (got "' + savedDocLink +
      '") - check Subscribers > Fields in MailerLite: the field\'s key must be exactly ' +
      '"doc_link", not just its display name. Response: ' + body
    );
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
