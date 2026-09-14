/**
 * Blueprint Audit Application -> Google Sheet row + editor email alerts.
 *
 * Web app behind GOOGLE_SHEETS_WEBHOOK_URL, called by
 * src/app/api/the-blueprint-audit/submit/route.ts when someone completes
 * the application at /the-blueprint-audit/apply.
 *
 * SETUP
 * 1. Open this project in the Apps Script editor (the one the current
 *    GOOGLE_SHEETS_WEBHOOK_URL points at) and replace its code with this file.
 * 2. Fill in SHEET_ID (the long ID in the sheet's URL), SHEET_NAME (the tab
 *    the current script writes to) and NOTIFY_EMAILS (one entry per editor
 *    who should get an alert on every submission).
 * 3. Redeploy WITHOUT changing the URL:
 *    Deploy -> Manage deployments -> edit -> Version: New version -> Deploy.
 *    Saving alone does not update the live web app.
 *
 * SHEET NOTES
 * - On the first submission the script creates the tab and writes the header
 *   row from COLUMNS below.
 * - If the tab already exists, the script reads its existing headers and maps
 *   values by header label, appending any missing columns at the END (never
 *   in the middle — that would shift existing rows out of line with their
 *   headers). If your live tab uses different header wording than COLUMNS,
 *   either edit the labels in COLUMNS to match, or point SHEET_NAME at a
 *   fresh tab name and let this script create it cleanly.
 */

var SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
var SHEET_NAME = 'Blueprint Audit Applications';

// One email address per editor who should be alerted on every submission.
var NOTIFY_EMAILS = ['ts@temitopesaliu.com'];

// [payload key from the submit route, sheet header label]
var COLUMNS = [
  ['submittedAt', 'Submitted (UTC)'],
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['email', 'Email'],
  ['businessName', 'Business'],
  ['website', 'Website'],
  ['businessType', 'Business type'],
  ['industry', 'Industry'],
  ['teamSize', 'Team size'],
  ['businessDesc', 'What the business does'],
  ['biggestPain', 'Biggest pain point'],
  ['bottleneck', 'Where the business stops when they stop'],
  ['systematize', 'Areas to systematize'],
  ['currentTools', 'Current tools'],
  ['implementationBudget', 'Implementation budget'],
  ['timeline', 'Timeline'],
  ['howHeard', 'How they found us'],
  ['additionalContext', 'Anything else'],
  ['contactPref', 'Preferred contact']
];

function doPost(e) {
  var warnings = [];
  var data = {};

  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'Invalid JSON: ' + err });
  }

  // The route does not send a timestamp; stamp it here so every row has one.
  if (!data.submittedAt) data.submittedAt = new Date().toUTCString();

  try {
    appendRow_(data);
  } catch (err) {
    warnings.push('sheet: ' + err);
  }

  try {
    sendNotification_(data);
  } catch (err) {
    warnings.push('email: ' + err);
  }

  if (warnings.length === 2) {
    return json_({ ok: false, error: warnings.join(' | ') });
  }
  return json_({ ok: true, warnings: warnings });
}

function doGet() {
  return json_({ ok: true, service: 'blueprint-audit-application', sheet: SHEET_NAME });
}

/**
 * Appends the submission under the tab's EXISTING headers where possible.
 * Columns in COLUMNS that the tab does not have yet are appended at the end,
 * so pre-existing rows never shift out of line with their headers.
 */
function appendRow_(data) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var header;

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    header = COLUMNS.map(function (c) { return c[1]; });
    sheet.appendRow(header);
    sheet.getRange(1, 1, 1, header.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  } else {
    var lastCol = Math.max(sheet.getLastColumn(), 1);
    header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    var missing = [];
    for (var m = 0; m < COLUMNS.length; m++) {
      if (header.indexOf(COLUMNS[m][1]) === -1) missing.push(COLUMNS[m][1]);
    }
    if (missing.length) {
      sheet
        .getRange(1, lastCol + 1, 1, missing.length)
        .setValues([missing])
        .setFontWeight('bold');
      header = header.concat(missing);
    }
  }

  var row = [];
  for (var r = 0; r < header.length; r++) row.push('');

  for (var c = 0; c < COLUMNS.length; c++) {
    var idx = header.indexOf(COLUMNS[c][1]);
    if (idx === -1) continue;
    var v = data[COLUMNS[c][0]];
    row[idx] = v == null ? '' : String(v);
  }

  // Write as plain text. appendRow would let Sheets parse a value like
  // "+44 7000 000000" or "=x" as a formula and store #ERROR! instead.
  var target = sheet.getLastRow() + 1;
  var range = sheet.getRange(target, 1, 1, row.length);
  range.setNumberFormat('@');
  range.setValues([row]);
}

/** Emails every address in NOTIFY_EMAILS with the full submission. */
function sendNotification_(data) {
  var name = ((data.firstName || '') + ' ' + (data.lastName || '')).trim() || 'Someone';
  var subject = 'Blueprint audit application - ' + name;

  var rows = COLUMNS.map(function (c) {
    var v = data[c[0]] == null ? '' : String(data[c[0]]);
    return '<tr>' +
      '<td style="padding:8px 14px 8px 0;vertical-align:top;color:#6a6a7a;font:500 13px/1.5 sans-serif;white-space:nowrap">' +
        escape_(c[1]) +
      '</td>' +
      '<td style="padding:8px 0;vertical-align:top;color:#191826;font:400 14px/1.6 sans-serif">' +
        (v ? escape_(v).replace(/\n/g, '<br>') : '<span style="color:#b4b0c0">-</span>') +
      '</td>' +
    '</tr>';
  }).join('');

  var html = '<div style="max-width:640px;margin:0 auto;padding:28px 24px;font-family:sans-serif">' +
    '<p style="margin:0 0 4px;font:600 11px/1 sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#6a5acd">New application</p>' +
    '<h2 style="margin:0 0 6px;font:600 22px/1.25 Georgia,serif;color:#191826">' + escape_(name) + '</h2>' +
    '<p style="margin:0 0 22px;font:400 14px/1.5 sans-serif;color:#6a6a7a">' + escape_(data.email || '') + '</p>' +
    '<table style="width:100%;border-collapse:collapse">' + rows + '</table>' +
    '<p style="margin:26px 0 0;font:400 13px/1.6 sans-serif;color:#6a6a7a">Reply to this email to reach them directly.</p></div>';

  var plain = COLUMNS.map(function (c) {
    return c[1] + ': ' + (data[c[0]] || '-');
  }).join('\n');

  for (var i = 0; i < NOTIFY_EMAILS.length; i++) {
    var options = {
      to: NOTIFY_EMAILS[i],
      subject: subject,
      htmlBody: html,
      body: plain,
      name: 'Blueprint Audit Applications'
    };

    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      options.replyTo = data.email;
    }

    MailApp.sendEmail(options);
  }
}

function escape_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
