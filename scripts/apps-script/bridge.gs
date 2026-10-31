/**
 * The Bridge (temitopesaliu.com/bridge) -> Google Sheet + VIP buyer email.
 *
 * Web app behind GOOGLE_SHEETS_BRIDGE_WEBHOOK_URL. Called only by the site's own
 * server (src/app/api/bridge/* and the Stripe webhook), never by the browser.
 *
 * Actions (JSON string body, Content-Type text/plain):
 *   quiz       Quiz answers. One row per quiz session, filled in as they answer.
 *   webinar    Free training sign-up (name, email, WhatsApp with country code).
 *   vip_buyer  A paid $57 VIP. Stamps the VIP tab and sends the welcome email from ts@.
 *
 * SETUP
 * 1. Project Settings > Script Properties: BRIDGE_SECRET (same value as the
 *    BRIDGE_SHEET_SECRET env var on Vercel).
 * 2. Deploy > New deployment > Web app > Execute as Me > Access Anyone.
 *    Editing later: Deploy > Manage deployments > New version. Saving alone
 *    does not update the live URL.
 * 3. Run previewVipEmail() once to send yourself a sample of the VIP email.
 *
 * Columns are matched by header name, so the tabs can be re-ordered. A missing
 * column is added at the end. Never rename a header the script writes to.
 */

var SHEET_ID = '16KApw42LsHxcM-EPJGQv9AV9rvLMO3C-77mVVD-b4is';
var QUIZ = 'Quiz responses', WEB = 'Webinar registrations', VIP = 'VIP buyers';
var SENDER_NAME = 'Temitope Saliu';
var REPLY_TO = 'ts@temitopesaliu.com';
var ALERT_TO = 'temitope.saliu@gmail.com'; // Gmail inbox: mail sent to ts@ would only land in Sent
var VIP_AMOUNT_DEFAULT = 57;

var QMAP = { // answer id -> column header
  role: 'Role: Who do you help?', paid: 'Paid to teach before?', teach: 'What they teach', who: 'Who it is for + what changes',
  a1: 'NO branch 1: What is stopping you most?', a2: 'NO 2: Where do people come for help?', a3: 'NO 3: How to teach it?',
  a4: 'NO 4: On camera?', a5: 'NO 5: Hours a week', a6: 'NO 6: Shared in public so far', a7: 'NO 7: Picturing launch, what comes first?',
  b1: 'YES branch 1: How full is your week?', b2: 'YES 2: Last price rise', b3: 'YES 3: When asked price', b4: 'YES 4: Who pays most',
  b5: 'YES 5: If you stopped a month', b6: 'YES 6: How clients find you', b7: 'YES 7: What would change things most',
  gap: 'Extra $ a month wanted'
};

function doGet() { return json_({ ok: true, service: 'bridge' }); }

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad json' }); }
  var secret = PropertiesService.getScriptProperties().getProperty('BRIDGE_SECRET');
  if (!secret || d.secret !== secret) return json_({ ok: false, error: 'unauthorized' });
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    if (d.action === 'quiz') quiz_(ss, d);
    else if (d.action === 'webinar') webinar_(ss, d);
    else if (d.action === 'vip_buyer') return json_({ ok: true, emailed: vip_(ss, d) });
    else if (d.action === 'preview_emails') return json_({ ok: true, sent: previewJourneyEmails_(d.to, d.first, d.result, d.tz) });
    else return json_({ ok: false, error: 'unknown action' });
    SpreadsheetApp.flush();
    return json_({ ok: true });
  } catch (err) {
    Logger.log('bridge error: ' + err);
    return json_({ ok: false, error: String(err).slice(0, 200) });
  } finally { lock.releaseLock(); }
}

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* ---------- sheet helpers ---------- */
function headers_(sh) {
  var n = Math.max(sh.getLastColumn(), 1), h = sh.getRange(1, 1, 1, n).getValues()[0], map = {};
  for (var i = 0; i < h.length; i++) if (h[i] !== '') map[h[i]] = i + 1;
  return map;
}
function colFor_(sh, map, name) {
  if (!map[name]) { var c = Math.max(sh.getLastColumn(), 1) + 1; sh.getRange(1, c).setValue(name).setFontWeight('bold'); map[name] = c; }
  return map[name];
}
function nextRow_(sh) { // first empty row in column A (array-formula columns make getLastRow unreliable)
  var v = sh.getRange(2, 1, sh.getMaxRows() - 1, 1).getValues();
  for (var i = 0; i < v.length; i++) if (v[i][0] === '') return i + 2;
  sh.insertRowsAfter(sh.getMaxRows(), 100);
  return sh.getMaxRows() - 99;
}
function findRow_(sh, colName, value) {
  if (!value) return 0;
  var map = headers_(sh), c = map[colName]; if (!c) return 0;
  var v = sh.getRange(2, c, sh.getMaxRows() - 1, 1).getValues(), want = String(value).toLowerCase();
  for (var i = 0; i < v.length; i++) if (String(v[i][0]).toLowerCase() === want) return i + 2;
  return 0;
}
function safe_(v) { // text only; stop a typed "=..." becoming a formula
  if (typeof v !== 'string') return v;
  v = v.slice(0, 600);
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}
function put_(sh, row, fields) {
  var map = headers_(sh);
  for (var k in fields) {
    var v = fields[k];
    if (v === undefined || v === null || v === '') continue;
    sh.getRange(row, colFor_(sh, map, k)).setNumberFormat('@').setValue(safe_(v));
  }
}
function cell_(sh, row, name) { var c = headers_(sh)[name]; return c ? sh.getRange(row, c).getValue() : ''; }
function stamp_() { return Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd HH:mm:ss'); }

/* ---------- quiz ---------- */
function quiz_(ss, d) {
  var sh = ss.getSheetByName(QUIZ);
  var row = findRow_(sh, 'Session ID', d.sid);
  if (!row && d.email) row = findRow_(sh, 'Email', d.email);
  var isNew = !row;
  if (!row) row = nextRow_(sh);
  var f = {};
  if (isNew) f['Submitted (UTC)'] = stamp_();
  f['Session ID'] = d.sid;
  var prevStep = Number(cell_(sh, row, 'Step no')) || 0, step = Number(d.step_no) || 0;
  if (step >= prevStep) { f['Step no'] = step; f['Last step reached'] = d.last_step; }
  if (d.completed) f['Completed quiz? (Y/N)'] = 'Y'; else if (isNew) f['Completed quiz? (Y/N)'] = 'N';
  if (d.first_name) f['First name'] = d.first_name;
  if (d.email) f['Email'] = d.email;
  if (d.result) f['Result'] = d.result;
  if (d.tz) f['Time zone'] = d.tz;
  if (d.source) f['Source / UTM'] = d.source;
  var a = d.answers || {};
  for (var k in QMAP) if (a[k] !== undefined) f[QMAP[k]] = a[k];
  if (d.completed) { f['Under-priced answers (of 7)'] = d.under; f['Over-extended answers (of 7)'] = d.over; }
  put_(sh, row, f);
}

/* ---------- free training sign-up ---------- */
function webinar_(ss, d) {
  var sh = ss.getSheetByName(WEB);
  var row = findRow_(sh, 'Email', d.email);
  var isNew = !row;
  if (!row) row = nextRow_(sh);
  var london = d.session_utc ? Utilities.formatDate(new Date(d.session_utc), 'Europe/London', "MMMM d, yyyy '·' h:mma").replace('AM', 'am').replace('PM', 'pm') + ' London' : '';
  var f = {
    'First name': d.first_name, 'Email': d.email, 'WhatsApp (with country code)': d.whatsapp,
    'Country code': d.country_code, 'Dial code': d.dial_code,
    'Webinar session (London time)': london, 'Session UTC': d.session_utc,
    'Their time zone': d.tz, 'Their local session time': d.local_time, 'Source / UTM': d.source
  };
  if (isNew) f['Registered (UTC)'] = stamp_();
  var q = ss.getSheetByName(QUIZ), qr = findRow_(q, 'Email', d.email);
  if (qr) f['Quiz result'] = cell_(q, qr, 'Result');
  put_(sh, row, f);
}

/* ---------- VIP buyer ---------- */
function vip_(ss, d) {
  var sh = ss.getSheetByName(VIP);
  var row = findRow_(sh, 'Payment / order ID', d.order_id);
  if (!row) row = findRow_(sh, 'Email', d.email);
  var isNew = !row;
  if (!row) row = nextRow_(sh);
  var f = {
    'First name': d.first_name, 'Email': d.email, 'WhatsApp (with country code)': d.whatsapp,
    'Amount paid (USD)': d.amount || VIP_AMOUNT_DEFAULT, 'Payment processor': 'Stripe', 'Payment / order ID': d.order_id
  };
  if (isNew) f['Paid (UTC)'] = stamp_();
  var tz = '', sessionUtc = '';
  var w = ss.getSheetByName(WEB), wr = findRow_(w, 'Email', d.email);
  if (wr) {
    f['First name'] = f['First name'] || cell_(w, wr, 'First name');
    f['WhatsApp (with country code)'] = f['WhatsApp (with country code)'] || cell_(w, wr, 'WhatsApp (with country code)');
    f['Webinar session they came from'] = cell_(w, wr, 'Webinar session (London time)');
    tz = String(cell_(w, wr, 'Their time zone') || '');
    sessionUtc = String(cell_(w, wr, 'Session UTC') || '');
  }
  f['Their time zone'] = tz;
  var qa = qaDate_(sessionUtc);
  if (qa) f['VIP Q&A date (London time)'] = Utilities.formatDate(qa, 'Europe/London', "MMMM d, yyyy '·' h:mma").replace('AM', 'am').replace('PM', 'pm') + ' London';
  var q = ss.getSheetByName(QUIZ), qr = findRow_(q, 'Email', d.email);
  if (qr) f['Quiz result'] = cell_(q, qr, 'Result');
  put_(sh, row, f);

  var first = String(f['First name'] || d.name || '').trim().split(/\s+/)[0] || 'there';
  var sent = false;
  if (isNew || !cell_(sh, row, 'Welcome email sent (UTC)')) {
    sent = sendVipEmail_(d.email, first, qa, tz);
    if (sent) put_(sh, row, { 'Welcome email sent (UTC)': stamp_() });
  }
  var alert = { subject: 'New Bridge VIP: ' + first + ' (' + d.email + ')',
    text: 'Paid $' + (d.amount || VIP_AMOUNT_DEFAULT) + '. Order ' + d.order_id + '. Welcome email ' + (sent ? 'sent.' : 'NOT sent, check the VIP tab.') };
  alert.html = '<p>' + alert.text + '</p>';
  try { sendFromBusinessAddress_(ALERT_TO, alert); }
  catch (err) { try { MailApp.sendEmail({ to: ALERT_TO, subject: alert.subject, body: alert.text }); } catch (e2) { Logger.log('alert failed: ' + e2); } }
  return sent;
}

/** Thursday 5pm London, five days after the Saturday session. Falls back to the first training date. */
function qaDate_(sessionUtc) {
  var base = sessionUtc ? new Date(sessionUtc) : new Date('2026-11-07T11:00:00Z');
  if (isNaN(base.getTime())) base = new Date('2026-11-07T11:00:00Z');
  var thu = new Date(base.getTime() + 5 * 86400000);
  var day = Utilities.formatDate(thu, 'Europe/London', 'yyyy-MM-dd');
  return Utilities.parseDate(day + ' 17:00', 'Europe/London', 'yyyy-MM-dd HH:mm');
}

/* ---------- the VIP welcome email ---------- */
function lc_(s) { return s.replace('AM', 'am').replace('PM', 'pm'); }

function vipEmail_(first, qa, tz) {
  var londonLine = qa ? Utilities.formatDate(qa, 'Europe/London', "EEEE, MMMM d, yyyy '·' h:mma") : 'Thursday, November 12, 2026 · 5:00PM';
  londonLine = lc_(londonLine).replace(':00', '') + ' London GMT';
  var local = '';
  if (qa && tz) {
    try { // same shape as the page: "6:00pm Thursday 12 November, your time (Lagos, WAT)"
      var cityName = String(tz).split('/').pop().replace(/_/g, ' ');
      local = lc_(Utilities.formatDate(qa, tz, 'h:mma')) + ' ' + Utilities.formatDate(qa, tz, 'EEEE d MMMM') +
        ', your time (' + cityName + ', ' + Utilities.formatDate(qa, tz, 'z') + ')';
    } catch (err) { local = ''; }
  }
  var items = [
    'The VIP live Q&A class, a small group. I look at your offer, or what you are trying to build: your offer, your current systems, and what can change. Every question answered by me, no holdbacks.',
    'The replay of the Saturday training. It is the only replay there is.',
    'The prompt pack I use to launch my offers. It will reach you before Thursday.'
  ];
  var zoom = 'Your joining link will come to this inbox before the class.';
  var close = 'See you on Thursday. Come with all your questions.';
  var text = 'Hi ' + first + ',\n\nYour VIP spot is confirmed.\n\nWhat you get:\n\n- ' + items.join('\n- ') +
    '\n\nWhen: ' + londonLine + (local ? '\n' + local : '') + '\n\n' + zoom +
    '\n\n' + close + '\n\nYou owe it to yourself to be great,\nTemitope Saliu.';
  var li = items.map(function (t) { return '<li style="margin:0 0 6px">' + t + '</li>'; }).join('');
  var html = '<div style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#16121F;max-width:560px">' +
    '<p>Hi ' + first + ',</p><p>Your VIP spot is confirmed.</p><p>What you get:</p><ul style="padding-left:20px">' + li + '</ul>' +
    '<p><b>When:</b> ' + londonLine + (local ? '<br>' + local : '') + '</p><p>' + zoom + '</p>' +
    '<p>' + close + '</p>' +
    '<p><i>You owe it to yourself to be great,</i><br>Temitope Saliu.</p></div>';
  return { subject: "You're in the VIP Q&A, " + first, text: text, html: html };
}

function sendVipEmail_(to, first, qa, tz) {
  var c = vipEmail_(first, qa, tz);
  try { sendFromBusinessAddress_(to, c); return true; }
  catch (err) {
    Logger.log('send-as ' + REPLY_TO + ' failed, falling back to MailApp: ' + err);
    try { MailApp.sendEmail({ to: to, subject: c.subject, htmlBody: c.html, body: c.text, name: SENDER_NAME, replyTo: REPLY_TO }); return true; }
    catch (err2) { Logger.log('VIP email failed: ' + err2); return false; }
  }
}

function sendFromBusinessAddress_(to, c) {
  var b64 = function (s) { return Utilities.base64Encode(Utilities.newBlob(s).getBytes()); };
  var boundary = 'b_' + Utilities.getUuid();
  var mime = [
    'From: ' + SENDER_NAME + ' <' + REPLY_TO + '>', 'To: ' + to, 'Reply-To: ' + REPLY_TO,
    'Subject: =?UTF-8?B?' + b64(c.subject) + '?=', 'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' + boundary + '"', '',
    '--' + boundary, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', b64(c.text),
    '--' + boundary, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', b64(c.html),
    '--' + boundary + '--'
  ].join('\r\n');
  Gmail.Users.Messages.send({ raw: Utilities.base64EncodeWebSafe(Utilities.newBlob(mime).getBytes()) }, 'me');
}

/* ---------- DRAFT emails for the quiz and the free training (preview only, not sent to real visitors yet) ---------- */
var RESULT_LINE = {
  'The Quiet Expert': 'Your knowledge is real. It needs an offer people can say yes to.',
  'The Generous Expert': 'You give a lot and charge too little. The fix is your price and your structure, not more hours.',
  'The Booked-Out Expert': 'Your work is in demand. The fix is systems, so it runs without you in every step.'
};

function signOff_() { return { text: 'You owe it to yourself to be great,\nTemitope Saliu.', html: '<p><i>You owe it to yourself to be great,</i><br>Temitope Saliu.</p>' }; }
function wrap_(inner) { return '<div style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#16121F;max-width:560px">' + inner + '</div>'; }

function quizEmail_(first, result) {
  var line = RESULT_LINE[result] || '';
  var next = 'Next step: the free live training, The Business of Teaching, with AI as your execution team. Reserve your seat: https://temitopesaliu.com/thebridge-webinar#reserve';
  var sg = signOff_();
  return {
    subject: 'Your Bridge result, ' + first,
    text: 'Hi ' + first + ',\n\nYou are ' + result + '.\n\n' + line + '\n\n' + next + '\n\n' + sg.text,
    html: wrap_('<p>Hi ' + first + ',</p><p>You are <b>' + result + '</b>.</p><p>' + line + '</p><p>Next step: the free live training, <b>The Business of Teaching, with AI as your execution team</b>.</p><p><a href="https://temitopesaliu.com/thebridge-webinar#reserve" style="background:#D9480F;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">Reserve my free seat</a></p>' + sg.html)
  };
}

function webinarEmail_(first, sessionUtc, tz) {
  var base = sessionUtc ? new Date(sessionUtc) : new Date('2026-11-07T11:00:00Z');
  var london = lc_(Utilities.formatDate(base, 'Europe/London', "MMMM d, yyyy '·' h:mma")).replace(':00', '') + ' London GMT';
  var local = '';
  if (tz && tz !== 'Europe/London') {
    try { local = "That's " + lc_(Utilities.formatDate(base, tz, 'h:mma')) + ' on ' + Utilities.formatDate(base, tz, 'EEEE d MMMM') + ' (' + Utilities.formatDate(base, tz, 'zzzz') + ') where you are.'; } catch (err) { local = ''; }
  }
  var sg = signOff_();
  var live = 'It is live only. There is no replay, so be there.';
  var zoom = 'Your joining link will come to this inbox before we start.';
  var bonus = 'Bonus for live attendees: the content planning template I use for my own content.';
  return {
    subject: 'Your seat is saved, ' + first,
    text: 'Hi ' + first + ',\n\nYour seat is saved for The Business of Teaching, with AI as your execution team.\n\nWhen: ' + london + (local ? '\n' + local : '') + '\n\n' + live + '\n\n' + zoom + '\n\n' + bonus + '\n\nSee you Saturday.\n\n' + sg.text,
    html: wrap_('<p>Hi ' + first + ',</p><p>Your seat is saved for <b>The Business of Teaching, with AI as your execution team</b>.</p><p><b>When:</b> ' + london + (local ? '<br>' + local : '') + '</p><p><b>' + live + '</b></p><p>' + zoom + '</p><p>' + bonus + '</p><p>See you Saturday.</p>' + sg.html)
  };
}

/** Sends the two draft emails to one address so Temitope can see them. From ts@, marked as drafts. */
function previewJourneyEmails_(to, first, result, tz) {
  first = first || 'there'; result = result || 'The Generous Expert';
  var q = quizEmail_(first, result); q.subject = '[DRAFT] ' + q.subject;
  var w = webinarEmail_(first, '', tz); w.subject = '[DRAFT] ' + w.subject;
  var ok = 0;
  [q, w].forEach(function (c) {
    try { sendFromBusinessAddress_(to, c); ok++; }
    catch (err) { Logger.log('draft send-as failed: ' + err); try { MailApp.sendEmail({ to: to, subject: c.subject, htmlBody: c.html, body: c.text, name: SENDER_NAME, replyTo: REPLY_TO }); ok++; } catch (e2) { Logger.log(e2); } }
  });
  return ok;
}

/* ---------- run from the editor ---------- */
/** Sends a sample VIP email to your own inbox only. */
function previewVipEmail() {
  var qa = qaDate_('');
  var c = vipEmail_('Temitope', qa, 'America/Toronto');
  c.subject = '[PREVIEW] ' + c.subject;
  MailApp.sendEmail({ to: ALERT_TO, subject: c.subject, htmlBody: c.html, body: c.text, name: SENDER_NAME });
  return 'sent to ' + ALERT_TO;
}
