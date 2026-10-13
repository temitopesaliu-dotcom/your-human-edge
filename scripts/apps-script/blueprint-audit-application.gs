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

// Leave blank to have the script create its own sheet on first use and
// remember it (Script Properties). Paste an ID here to use an existing sheet.
var SHEET_ID = '';
var SHEET_NAME = 'Blueprint Quiz Responses';

// One email address per editor who should be alerted on every submission.
var NOTIFY_EMAILS = ['ts@temitopesaliu.com'];

// [payload key from the submit route, sheet header label]
var COLUMNS = [
  ['submittedAt', 'Submitted (UTC)'],
  ['route', 'Route'],
  ['bestFit', 'Best fit shown'],
  ['firstName', 'First name'],
  ['email', 'Email'],
  ['companyName', 'Company'],
  ['website', 'Website'],
  ['businessDesc', 'What the business does'],
  ['teamSize', 'Team size'],
  ['revenue', 'Annual revenue'],
  ['automate', 'Wants to automate'],
  ['tools', 'Running on today'],
  ['dataLives', 'Where data lives'],
  ['dataOwner', 'Who owns the data'],
  ['timeGoes', 'Where time goes'],
  ['manualHours', 'Manual hours per week'],
  ['lookingFor', 'Looking for'],
  ['investment', 'Investment answer'],
  ['techLevel', 'How technical'],
  ['security', 'Security needs'],
  ['matters', 'What matters most'],
  ['timeline', 'When to start'],
  ['decider', 'Final decision maker'],
  ['whoDoesWhat', 'Who does what today'],
  ['breaksDown', 'Where it breaks down'],
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

  // Paid strategy-session buyers (sent by the Stripe webhook on the website).
  if (data.action === 'blueprint_buyer') {
    try {
      return json_(recordBuyer_(data));
    } catch (err) {
      return json_({ ok: false, error: 'buyer: ' + err });
    }
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
  return json_({ ok: true, service: 'blueprint-quiz-responses', sheet: SHEET_NAME });
}

/** Opens the configured sheet, or creates "Blueprint Quiz Responses" once and remembers it. */
function spreadsheet_() {
  if (SHEET_ID) return SpreadsheetApp.openById(SHEET_ID);
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  var ss = SpreadsheetApp.create('Blueprint Quiz Responses');
  props.setProperty('SHEET_ID', ss.getId());
  return ss;
}

/** Run once from the editor: authorises the script and creates the sheet. Logs its URL. */
function setup() {
  var ss = spreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(SHEET_NAME);
    var header = COLUMNS.map(function (c) { return c[1]; });
    sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  MailApp.getRemainingDailyQuota();
  Logger.log(ss.getUrl());
  return ss.getUrl();
}

/**
 * Appends the submission under the tab's EXISTING headers where possible.
 * Columns in COLUMNS that the tab does not have yet are appended at the end,
 * so pre-existing rows never shift out of line with their headers.
 */
function appendRow_(data) {
  var ss = spreadsheet_();
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
  var subject = 'Blueprint quiz: ' + name + (data.companyName ? ', ' + data.companyName : '') + (data.bestFit ? ' (' + data.bestFit + ')' : '');

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
    '<p style="margin:0 0 4px;font:600 11px/1 sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#6a5acd">New Blueprint quiz response</p>' +
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
      name: 'Temitope Saliu Website'
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


/* ------------------------------------------------------------------ */
/* Buyer emails, sent from this Google account instead of MailerLite.  */
/* ------------------------------------------------------------------ */

var BUYERS_TAB = 'Buyers';
var BUYER_COLUMNS = ['Paid (UTC)', 'Name', 'Email', 'Tier', 'Stripe session', 'Confirmation sent', 'Reminder sent'];
var REMINDER_AFTER_HOURS = 48;
var SENDER_NAME = 'Temitope Saliu';
var REPLY_TO = 'ts@temitopesaliu.com';
var BOOK_URL = 'https://temitopesaliu.com/book';

function buyersSheet_() {
  var ss = spreadsheet_();
  var sh = ss.getSheetByName(BUYERS_TAB);
  if (!sh) {
    sh = ss.insertSheet(BUYERS_TAB);
    sh.getRange(1, 1, 1, BUYER_COLUMNS.length).setValues([BUYER_COLUMNS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Logs the buyer once per Stripe session and sends the confirmation email straight away. */
function recordBuyer_(data) {
  var email = String(data.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'invalid email' };
  var session = String(data.sessionId || '');

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = buyersSheet_();
    var last = sh.getLastRow();
    if (session && last > 1) {
      var sessions = sh.getRange(2, 5, last - 1, 1).getValues();
      for (var i = 0; i < sessions.length; i++) {
        if (sessions[i][0] === session) return { ok: true, duplicate: true };
      }
    }
    var now = new Date();
    var name = String(data.name || '').trim();
    var row = sh.getLastRow() + 1;
    sh.getRange(row, 1, 1, 7).setNumberFormat('@').setValues([[now.toISOString(), name, email, String(data.tier || ''), session, '', '']]);
    sendBuyerEmail_(email, name, 'confirmation');
    sh.getRange(row, 6).setValue(new Date().toISOString());
    return { ok: true, row: row };
  } finally {
    lock.releaseLock();
  }
}

/** Runs on a schedule: sends the two-day reminder to buyers who have not had it yet. */
function sendReminders() {
  var sh = buyersSheet_();
  var last = sh.getLastRow();
  if (last < 2) return;
  var rows = sh.getRange(2, 1, last - 1, 7).getValues();
  var cutoff = Date.now() - REMINDER_AFTER_HOURS * 3600 * 1000;
  for (var i = 0; i < rows.length; i++) {
    var paid = new Date(rows[i][0]).getTime();
    if (!paid || paid > cutoff || rows[i][6]) continue;
    try {
      sendBuyerEmail_(rows[i][2], rows[i][1], 'reminder');
      sh.getRange(i + 2, 7).setValue(new Date().toISOString());
    } catch (err) {
      Logger.log('reminder failed for row ' + (i + 2) + ': ' + err);
    }
  }
}

/** Run once from the editor: installs the hourly reminder check (safe to run again). */
function setupReminderTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sendReminders') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendReminders').timeBased().everyHours(1).create();
  buyersSheet_();
  return 'ok';
}

function sendBuyerEmail_(email, name, kind) {
  var first = String(name || '').trim().split(/\s+/)[0] || 'there';
  var c = kind === 'reminder' ? reminderEmail_(first) : confirmationEmail_(first);
  MailApp.sendEmail({ to: email, subject: c.subject, htmlBody: c.html, body: c.text, name: SENDER_NAME, replyTo: REPLY_TO });
}

function emailShell_(inner) {
  return '<div style="background:#f6f4fb;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;padding:36px 32px;font-family:Georgia,\'Times New Roman\',serif;color:#211c34;font-size:16px;line-height:1.65">' +
    inner +
    '<p style="margin:28px 0 0"><em>You owe it to yourself to be great,</em><br>Temitope Saliu.</p></div></div>';
}

function button_(label) {
  return '<p style="margin:26px 0"><a href="' + BOOK_URL + '" style="background:#4b3f96;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:10px;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;display:inline-block">' + label + '</a></p>';
}

function confirmationEmail_(first) {
  var n = escape_(first);
  return {
    subject: "You're in. Your AI strategy session is confirmed.",
    html: emailShell_(
      '<p style="margin:0 0 16px">Hi ' + n + ',</p>' +
      '<p style="margin:0 0 16px">Your payment is in and your AI strategy session is confirmed. Thank you.</p>' +
      "<p style=\"margin:0 0 16px\">I already have your quiz answers, so we won't spend the first hour on the basics. We start where the real problem is.</p>" +
      "<p style=\"margin:0 0 6px\"><strong>If you've already picked your time,</strong> you're done. Your calendar invite and Zoom link come from Calendly in a separate email.</p>" +
      "<p style=\"margin:0\"><strong>If you haven't booked yet,</strong> pick your two hours here:</p>" +
      button_('Book my session') +
      '<p style="margin:0 0 10px"><strong>What you get</strong></p>' +
      '<p style="margin:0 0 16px">Two focused hours with me on how AI fits your business, and a summary document of next steps afterwards. If you go ahead with the full solutions architecture within 30 days, your session fee is credited in full.</p>' +
      '<p style="margin:0">Add ts@temitopesaliu.com to your contacts so nothing from me lands in spam. Questions before the call? Just reply to this email.</p>'),
    text: 'Hi ' + first + ",\n\nYour payment is in and your AI strategy session is confirmed. Thank you.\n\nIf you haven't booked yet, pick your two hours here: " + BOOK_URL +
      "\n\nYou owe it to yourself to be great,\nTemitope Saliu."
  };
}

function reminderEmail_(first) {
  var n = escape_(first);
  return {
    subject: 'Is your strategy session in the diary?',
    html: emailShell_(
      '<p style="margin:0 0 16px">Hi ' + n + ',</p>' +
      "<p style=\"margin:0 0 16px\">Quick check. Your AI strategy session is paid for, and I want to make sure it's actually in your diary.</p>" +
      '<p style="margin:0"><strong>Not booked yet?</strong> It takes a minute:</p>' +
      button_('Pick my time') +
      "<p style=\"margin:0 0 16px\"><strong>Already booked?</strong> Then there's nothing to do. Check the Calendly invite is in your calendar, and if it isn't, reschedule from the Calendly email rather than assuming it saved.</p>" +
      "<p style=\"margin:0 0 16px\">You don't need to prepare anything. If you have something that shows how you really work (a spreadsheet, a messy inbox, a half-built tool, numbers you didn't want to type into a form), bring it. The more real it is, the further we get.</p>" +
      "<p style=\"margin:0\">Reply to this email if anything's unclear.</p>"),
    text: 'Hi ' + first + ",\n\nQuick check. Your AI strategy session is paid for. Not booked yet? Pick your time: " + BOOK_URL +
      "\n\nAlready booked? Nothing to do.\n\nYou owe it to yourself to be great,\nTemitope Saliu."
  };
}
