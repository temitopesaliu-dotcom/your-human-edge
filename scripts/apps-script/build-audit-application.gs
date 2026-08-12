/**
 * Build Audit Application -> Google Sheet row + email notification.
 *
 * Web app behind AUDIT_APPLICATION_WEBHOOK_URL, called by
 * src/app/api/audit-application/submit/route.ts when someone completes
 * the form at /apply.
 *
 * Standalone Apps Script project; writes into the Sheet named by SHEET_ID.
 * Deploy -> New deployment -> Web app -> Execute as Me -> Access: Anyone.
 * Copy the /exec URL into AUDIT_APPLICATION_WEBHOOK_URL in Vercel.
 *
 * After ANY edit: Deploy -> Manage deployments -> edit -> New version -> Deploy.
 * Saving alone does not update the live URL.
 */

var SHEET_ID = '1RC1F_qdwXwGFUudXyGXBhK9XUcGudRy8DC4UnIrKmQU';
var SHEET_NAME = 'Build Audit Applications';
var NOTIFY_EMAIL = 'ts@temitopesaliu.com';

var COLUMNS = [
  ['submittedAt', 'Submitted (UTC)'],
  ['fullName', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone / WhatsApp'],
  ['country', 'Country'],
  ['businessName', 'Business'],
  ['website', 'Website / Social'],
  ['whatYouDo', 'What they do'],
  ['currentOffer', 'Current offer'],
  ['monthlyRevenue', 'Monthly revenue now'],
  ['revenueTarget', '12-month target'],
  ['blocker', 'What is in the way'],
  ['whatToBuild', 'What they want built'],
  ['aiExperience', 'AI experience'],
  ['budgetReady', '$1,000 readiness'],
  ['timeline', 'Timeline'],
  ['howHeard', 'How they found me'],
  ['anythingElse', 'Anything else']
];

function doPost(e) {
  var warnings = [];
  var data = {};

  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'Invalid JSON: ' + err });
  }

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
  return json_({ ok: true, service: 'build-audit-application', sheet: SHEET_NAME });
}

function appendRow_(data) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow(
    COLUMNS.map(function (c) {
      return data[c[0]] == null ? '' : String(data[c[0]]);
    })
  );
}

function sendNotification_(data) {
  var name = data.fullName || 'Someone';
  var subject = 'Build audit application - ' + name;

  var rows = COLUMNS.map(function (c) {
    var v = data[c[0]] == null ? '' : String(data[c[0]]);
    return '<tr><td style="padding:8px 14px 8px 0;vertical-align:top;color:#6a6a7a;font:500 13px/1.5 sans-serif;white-space:nowrap">' +
      escape_(c[1]) +
      '</td><td style="padding:8px 0;vertical-align:top;color:#191826;font:400 14px/1.6 sans-serif">' +
      (v ? escape_(v).replace(/\n/g, '<br>') : '<span style="color:#b4b0c0">-</span>') +
      '</td></tr>';
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

  var options = {
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: html,
    body: plain,
    name: 'Your Human Edge Applications'
  };

  if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    options.replyTo = data.email;
  }

  MailApp.sendEmail(options);
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
