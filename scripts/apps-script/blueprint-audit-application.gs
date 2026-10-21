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

  // Business Architect Programme buyers (sent by the Stripe webhook on the website).
  if (data.action === 'bap_buyer') {
    try {
      return json_(recordBapBuyer_(data));
    } catch (err) {
      return json_({ ok: false, error: 'bap buyer: ' + err });
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
  var subject = 'Blueprint audit: ' + name + (data.companyName ? ', ' + data.companyName : '') + (data.bestFit ? ' (' + data.bestFit + ')' : '');

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
    '<p style="margin:0 0 4px;font:600 11px/1 sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#6a5acd">New Blueprint audit response</p>' +
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
  try {
    sendFromBusinessAddress_(email, c);
  } catch (err) {
    // Fallback so a buyer is never left without an email: plain Gmail sender.
    Logger.log('send-as ' + REPLY_TO + ' failed, falling back to MailApp: ' + err);
    MailApp.sendEmail({ to: email, subject: c.subject, htmlBody: c.html, body: c.text, name: SENDER_NAME, replyTo: REPLY_TO });
  }
}

/**
 * Sends through the Gmail API so the From address is ts@temitopesaliu.com,
 * the "Send mail as" alias already verified in this Gmail account.
 * Needs the Gmail advanced service and only the gmail.send scope.
 */
function sendFromBusinessAddress_(to, c) {
  var b64 = function (s) { return Utilities.base64Encode(Utilities.newBlob(s).getBytes()); };
  var boundary = 'b_' + Utilities.getUuid();
  var mime = [
    'From: ' + SENDER_NAME + ' <' + REPLY_TO + '>',
    'To: ' + to,
    'Reply-To: ' + REPLY_TO,
    'Subject: =?UTF-8?B?' + b64(c.subject) + '?=',
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' + boundary + '"',
    '',
    '--' + boundary,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(c.text),
    '--' + boundary,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(c.html),
    '--' + boundary + '--'
  ].join('\r\n');
  Gmail.Users.Messages.send({ raw: Utilities.base64EncodeWebSafe(Utilities.newBlob(mime).getBytes()) }, 'me');
}

function emailShell_(inner) {
  return '<div style="background:#f6f4fb;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;padding:36px 32px;font-family:Georgia,\'Times New Roman\',serif;color:#211c34;font-size:16px;line-height:1.65">' +
    inner +
    '<p style="margin:28px 0 0"><em>You owe it to yourself to be great,</em><br>Temitope Saliu.</p></div></div>';
}

function button_(label) {
  return '<p style="margin:26px 0"><a href="' + BOOK_URL + '" style="background:#4b3f96;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:10px;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;display:inline-block">' + label + '</a></p>';
}

// What buyers are asked to bring to the session (used in both emails).
var RESOURCES = [
  'A company overview or profile',
  'Where you want the business to be in the next five years',
  'Your process flows: how work moves from first enquiry to delivery',
  'Your current objectives or targets',
  'SOPs, playbooks or training documents',
  'Recent reports or presentations about the business'
];

function resourcesHtml_(intro) {
  return '<p style="margin:0 0 10px"><strong>Bring what you have</strong></p>' +
    '<p style="margin:0 0 8px">' + intro + '</p>' +
    '<ul style="margin:0 0 12px;padding-left:20px">' +
    RESOURCES.map(function (r) { return '<li style="margin:0 0 4px">' + r + '</li>'; }).join('') +
    '</ul>' +
    '<p style="margin:0 0 16px">Anything else that explains how your business really runs is welcome. Nothing needs to be polished. Bring it to the call, or send it ahead to ts@temitopesaliu.com so I can read it before we speak.</p>';
}

function resourcesText_(intro) {
  return intro + '\n' + RESOURCES.map(function (r) { return '- ' + r; }).join('\n') +
    '\nAnything else that explains how your business really runs is welcome. Nothing needs to be polished. Bring it to the call, or send it ahead to ts@temitopesaliu.com.';
}

function confirmationEmail_(first) {
  var n = escape_(first);
  return {
    subject: "You're in. Your AI strategy session is confirmed.",
    html: emailShell_(
      '<p style="margin:0 0 16px">Hi ' + n + ',</p>' +
      '<p style="margin:0 0 16px">Your payment is in and your AI strategy session is confirmed. Thank you.</p>' +
      "<p style=\"margin:0 0 16px\">I already have your audit answers, so we won't spend the first hour on the basics. We start where the real problem is.</p>" +
      "<p style=\"margin:0 0 6px\"><strong>If you've already picked your time,</strong> you're done. Your calendar invite and Zoom link come from Calendly in a separate email.</p>" +
      "<p style=\"margin:0\"><strong>If you haven't booked yet,</strong> pick your two hours here:</p>" +
      button_('Book my session') +
      '<p style="margin:0 0 10px"><strong>What you get</strong></p>' +
      '<p style="margin:0 0 16px">Two focused hours with me on how AI fits your business, and a summary document of next steps afterwards. If you go ahead with the full solutions architecture within 30 days, your session fee is credited in full.</p>' +
      resourcesHtml_('The more I can see of your business, the more we get done in two hours. If you have any of these, bring them along:') +
      '<p style="margin:0">Add ts@temitopesaliu.com to your contacts so nothing from me lands in spam. Questions before the call? Just reply to this email.</p>'),
    text: 'Hi ' + first + ",\n\nYour payment is in and your AI strategy session is confirmed. Thank you.\n\nIf you haven't booked yet, pick your two hours here: " + BOOK_URL +
      "\n\n" + resourcesText_('The more I can see of your business, the more we get done in two hours. If you have any of these, bring them along:') +
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
      resourcesHtml_("If you haven't gathered them yet, now is a good time. Any of these will make the session sharper:") +
      "<p style=\"margin:0\">Reply to this email if anything's unclear.</p>"),
    text: 'Hi ' + first + ",\n\nQuick check. Your AI strategy session is paid for. Not booked yet? Pick your time: " + BOOK_URL +
      "\n\nAlready booked? Nothing to do.\n\n" + resourcesText_("If you haven't gathered them yet, any of these will make the session sharper:") +
      "\n\nYou owe it to yourself to be great,\nTemitope Saliu."
  };
}


/* ------------------------------------------------------------------ */
/* Business Architect Programme buyers: log + welcome email from ts@.  */
/* ------------------------------------------------------------------ */

var BAP_TAB = 'Business Architect Buyers';
var BAP_COLUMNS = ['Paid (UTC)', 'Name', 'Email', 'Amount', 'Stripe session', 'Welcome sent'];

function bapSheet_() {
  var ss = spreadsheet_();
  var sh = ss.getSheetByName(BAP_TAB);
  if (!sh) {
    sh = ss.insertSheet(BAP_TAB);
    sh.getRange(1, 1, 1, BAP_COLUMNS.length).setValues([BAP_COLUMNS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Logs the buyer once per Stripe session and sends the welcome email straight away. */
function recordBapBuyer_(data) {
  var email = String(data.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'invalid email' };
  var session = String(data.sessionId || '');

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = bapSheet_();
    var last = sh.getLastRow();
    if (session && last > 1) {
      var sessions = sh.getRange(2, 5, last - 1, 1).getValues();
      for (var i = 0; i < sessions.length; i++) {
        if (sessions[i][0] === session) return { ok: true, duplicate: true };
      }
    }
    var name = String(data.name || '').trim();
    var amount = data.amount ? String(data.amount) + (data.currency ? ' ' + data.currency : '') : '';
    var row = sh.getLastRow() + 1;
    sh.getRange(row, 1, 1, 6).setNumberFormat('@').setValues([[new Date().toISOString(), name, email, amount, session, '']]);
    var first = name.split(/\s+/)[0] || 'there';
    var c = bapWelcomeEmail_(first);
    try {
      sendFromBusinessAddress_(email, c);
    } catch (err) {
      // Fallback so a buyer is never left without an email: plain Gmail sender.
      Logger.log('send-as ' + REPLY_TO + ' failed, falling back to MailApp: ' + err);
      MailApp.sendEmail({ to: email, subject: c.subject, htmlBody: c.html, body: c.text, name: SENDER_NAME, replyTo: REPLY_TO });
    }
    sh.getRange(row, 6).setValue(new Date().toISOString());
    // Payment alert to Temitope's real inbox. Mail sent to ts@ from this
    // account only shows in Sent, so the alert goes to the Gmail inbox.
    try {
      sendFromBusinessAddress_(PAYMENT_ALERT_TO, bapPaymentAlert_(name, email, amount, session, row));
    } catch (err) {
      Logger.log('payment alert failed: ' + err);
    }
    return { ok: true, row: row };
  } finally {
    lock.releaseLock();
  }
}

var PAYMENT_ALERT_TO = 'temitope.saliu@gmail.com';

function bapPaymentAlert_(name, email, amount, session, row) {
  var who = name || email;
  var paid = amount || '$0 (100% discount code)';
  var lines = [
    ['Name', name || '-'],
    ['Email', email],
    ['Amount', paid],
    ['Stripe session', session || '-'],
    ['Sheet row', String(row) + ' (Business Architect Buyers tab)'],
    ['Welcome email', 'Sent from ' + REPLY_TO]
  ];
  return {
    subject: 'New payment: ' + who + ' joined The Business Architect Programme',
    html: emailShell_(
      '<p style="margin:0 0 16px"><strong>New Business Architect Programme payment.</strong></p>' +
      lines.map(function (l) { return '<p style="margin:0 0 6px"><strong>' + escape_(l[0]) + ':</strong> ' + escape_(l[1]) + '</p>'; }).join('')),
    text: 'New Business Architect Programme payment.\n\n' +
      lines.map(function (l) { return l[0] + ': ' + l[1]; }).join('\n')
  };
}

/** Run from the editor to check the payment alert: sends one copy to the Gmail inbox. */
function testBapPaymentAlert() {
  sendFromBusinessAddress_(PAYMENT_ALERT_TO, bapPaymentAlert_('Test Buyer', 'test@example.com', '1599 USD', 'cs_test_alert_check', 0));
}

function bapWelcomeEmail_(first) {
  var n = escape_(first);
  return {
    subject: "You're in: The Business Architect Programme",
    html: emailShell_(
      '<p style="margin:0 0 16px">Hi ' + n + ',</p>' +
      '<p style="margin:0 0 16px">Your seat in The Business Architect Programme is confirmed. Welcome.</p>' +
      "<p style=\"margin:0 0 16px\">Over six weeks, you'll turn what you already know into a consulting practice you can price, sell and deliver.</p>" +
      '<p style="margin:0 0 4px"><strong>When:</strong> Saturdays, 2pm London time, starting Saturday, November 14, 2026.</p>' +
      '<p style="margin:0 0 16px"><strong>Where:</strong> Zoom.</p>' +
      "<p style=\"margin:0 0 16px\">You'll be learning in a closed group of experts from across the world, all building their practices alongside you.</p>" +
      "<p style=\"margin:0 0 16px\">Every session is recorded, and you'll get the resources, prompts and walkthroughs between sessions. Bring your expertise to class.</p>" +
      '<p style="margin:0">See you on the 14th. More details will be sent to you closer to the class.</p>'),
    text: 'Hi ' + first + ',\n\nYour seat in The Business Architect Programme is confirmed. Welcome.\n\n' +
      "Over six weeks, you'll turn what you already know into a consulting practice you can price, sell and deliver.\n\n" +
      'When: Saturdays, 2pm London time, starting Saturday, November 14, 2026.\nWhere: Zoom.\n\n' +
      "You'll be learning in a closed group of experts from across the world, all building their practices alongside you.\n\n" +
      "Every session is recorded, and you'll get the resources, prompts and walkthroughs between sessions. Bring your expertise to class.\n\n" +
      'See you on the 14th. More details will be sent to you closer to the class.\n\nYou owe it to yourself to be great,\nTemitope Saliu.'
  };
}

/** Run from the editor to check the welcome email: sends one copy to ts@ only. */
function testBapWelcome() {
  sendFromBusinessAddress_(REPLY_TO, bapWelcomeEmail_('Temitope'));
  return 'sent to ' + REPLY_TO;
}

