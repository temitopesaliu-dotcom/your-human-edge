/* ==== CONFIG: edit here only ==== */
// Early-bird window repeats automatically: opens every Saturday 12:00 noon UK time
// (right after the free live class) and runs 72 hours, to Tuesday 12:00 noon UK time.
// Outside the window, full price applies until the next Saturday noon. DST-safe.
var TEST_NOW = (new URLSearchParams(location.search)).get('now'); // preview only: ?now=2026-11-14T11:59:00Z
function nowMs() { return TEST_NOW ? new Date(TEST_NOW).getTime() : Date.now(); }
function ukParts(ms) {
  var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hourCycle: 'h23', weekday: 'short',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  var o = {}; f.formatToParts(new Date(ms)).forEach(function (p) { o[p.type] = p.value; });
  return { wd: o.weekday, y: +o.year, m: +o.month, d: +o.day, h: +o.hour, mi: +o.minute, s: +o.second };
}
function ukOffset(ms) { var p = ukParts(ms); return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - Math.floor(ms / 1000) * 1000; }
function ukWallToUTC(y, m, d, h) { var g = Date.UTC(y, m - 1, d, h); var t = g - ukOffset(g); return g - ukOffset(t); }
function windowStart(now) {
  for (var i = 0; i <= 8; i++) {
    var p = ukParts(now - i * 864e5);
    if (p.wd === 'Sat') { var s = ukWallToUTC(p.y, p.m, p.d, 12); if (s <= now) return s; }
  }
  return now;
}
function windowEndMs(now) { var t = windowStart(now) + 3 * 864e5; var p = ukParts(t); return ukWallToUTC(p.y, p.m, p.d, 12); } // Tuesday 12:00 UK wall clock
function nextStartMs(now) { var t = windowStart(now) + 7 * 864e5; var p = ukParts(t); return ukWallToUTC(p.y, p.m, p.d, 12); }
var EARLY_END = new Date(windowEndMs(nowMs())).toISOString();

// Payment links. Stripe for USD and GBP. Naira: Selar for the workshop and self-paced;
// the live group (ngnTransfer: true) is paid by direct bank transfer via a WhatsApp chat.
// Early-bird and full-price links are separate.
var WHATSAPP_NUMBER = '447776646576'; // digits only with country code, e.g. 447700900123. Empty = button shows 'WhatsApp number not set yet'.
var WHATSAPP_NAME = 'Temitope';
var PRODUCTS = {
  selfpaced12: {
    name: 'The Business of Expertise, self-paced (6 months access)',
    blurb: 'The full course, recorded, with 6 months of access.',
    full:  { USD: 550,    GBP: 425,    NGN: 1006500 },
    early: { USD: 385,    GBP: 298,    NGN: 704500 },
    pay:   { USD: 'https://buy.stripe.com/aFadRafgbfjO53R7yH3oA18',  GBP: 'https://buy.stripe.com/00wbJ25FB3B67bZ1aj3oA1a',  NGN: 'https://selar.com/vb15we33t1?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/eVq00k4Bx8Vqaob5qz3oA17', GBP: 'https://buy.stripe.com/fZueVe3xt8VqbsfbOX3oA19', NGN: 'https://selar.com/b19w4vqi9t?currency=NGN' }
  },
  workshop: {
    // The recorded Expert Framework Workshop. USD/GBP are charged through
    // /api/intelligence-layer-course/create-checkout (delivery page is
    // payment-checked); NGN goes to Selar. Early = the weekly 72-hour window.
    name: 'The Expert Framework Workshop (recorded)',
    blurb: 'The recorded one-hour workshop, at your own pace.',
    full:  { USD: 129,    GBP: 99,     NGN: 236000 },
    early: { USD: 90,     GBP: 69,     NGN: 165200 },
    pay:   { USD: '/the-business-of-expertise-intensive#pricing', GBP: '/the-business-of-expertise-intensive#pricing', NGN: 'https://selar.com/99911216d1?currency=NGN' },
    payFull: { USD: '/the-business-of-expertise-intensive#pricing', GBP: '/the-business-of-expertise-intensive#pricing', NGN: 'https://selar.com/11y915e11g?currency=NGN' }
  },
  group: {
    ngnTransfer: true,
    name: 'The Business of Expertise group, 6 weeks, live',
    blurb: 'Six weeks live with Temitope: one live call a week, challenges and accountability, plus the full recorded course. Classes start 9 January 2027.',
    full:  { USD: 2000,   GBP: 1599,   NGN: 2750000 },
    early: { USD: 1400,   GBP: 1119,   NGN: 1940000 }, // 30% off
    pay:   { USD: 'https://buy.stripe.com/14A4gA8RN7RmfIvdX53oA1s',  GBP: 'https://buy.stripe.com/14A9AU4BxefKbsfg5d3oA1E',  NGN: 'https://selar.com/1v0440v7v7?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/bJeeVeec72x29k77yH3oA1r', GBP: 'https://buy.stripe.com/00w4gA3xt8Vq0NB5qz3oA1D', NGN: 'https://selar.com/231mh7r0i6?currency=NGN' }
  }
};
/* ==== end config ==== */

var SYM = { USD: '$', GBP: '£', NGN: '₦' };
var CUR_LABEL = { USD: 'US dollars', GBP: 'British pounds', NGN: 'Naira' };

function fmt(cur, n) {
  var s = Number(n) % 1 === 0 ? Number(n).toLocaleString('en-GB') : Number(n).toFixed(2);
  return SYM[cur] + s;
}
function q(name) { return new URLSearchParams(location.search).get(name); }
function isEarly() { return nowMs() < windowEndMs(nowMs()); }
function detectCur() {
  var c = q('c');
  if (SYM[c]) return c;
  try { c = localStorage.getItem('offerCur'); if (SYM[c]) return c; } catch (e) {} // the currency they picked on an earlier page
  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  if (tz === 'Africa/Lagos') return 'NGN';
  if (tz === 'Europe/London') return 'GBP';
  return 'USD';
}
function setCur(cur) {
  try { localStorage.setItem('offerCur', cur); } catch (e) {}
  var u = new URL(location.href); u.searchParams.set('c', cur); history.replaceState(null, '', u);
  renderPrices(cur);
}
function renderPrices(cur) {
  document.querySelectorAll('[data-cur-btn]').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-cur-btn') === cur);
  });
  var early = isEarly();
  document.querySelectorAll('[data-price]').forEach(function (el) {
    var p = PRODUCTS[el.getAttribute('data-price')];
    if (!p) return;
    var amt = early ? p.early[cur] : p.full[cur];
    var full = p.full[cur];
    el.innerHTML =
      '<span class="amt">' + fmt(cur, amt) + '</span>' +
      (early ? ' <s class="was">' + fmt(cur, full) + '</s> <span class="tag">early-bird</span>' : '');
  });
  document.querySelectorAll('[data-pay]').forEach(function (a) {
    var key = a.getAttribute('data-pay');
    var p = PRODUCTS[key];
    var link = early ? p.pay[cur] : p.payFull[cur];
    a.setAttribute('href', '/offers/pay.html?p=' + key + '&c=' + cur);
  });
  document.querySelectorAll('[data-early-only]').forEach(function (el) { el.hidden = !early; });
  document.querySelectorAll('[data-full-only]').forEach(function (el) { el.hidden = early; });
  var end = document.querySelector('[data-end]');
  if (end && end.parentElement) end.parentElement.hidden = !early;
  if (end) {
    var d = new Date(windowEndMs(nowMs()));
    end.textContent = d.toUTCString().replace('GMT', 'GMT') + ' (' + d.toLocaleString('en-GB', { timeZone: 'Africa/Lagos', dateStyle: 'medium', timeStyle: 'short' }) + ' Lagos, ' + d.toLocaleString('en-GB', { timeZone: 'Europe/London', timeStyle: 'short' }) + ' UK)';
  }
}
var lastEarly = null;
function tick() {
  var el = document.querySelector('[data-countdown]');
  var early = isEarly();
  if (lastEarly !== null && lastEarly !== early) renderPrices(detectCur());
  lastEarly = early;
  if (!el) return;
  if (!early) { el.hidden = true; el.style.display = "none"; return; }
  el.hidden = false; el.style.display = "";
  var now = nowMs();
  var ms = early ? windowEndMs(now) - now : nextStartMs(now) - now;
  var d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
  var t = (early ? Math.floor(ms / 36e5) + 'h ' : (d ? d + 'd ' : '') + h + 'h ') + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
  el.textContent = early ? 'Early-bird ends in ' + t : 'Next early-bird opens Saturday 12:00 UK, in ' + t;
}
document.addEventListener('DOMContentLoaded', function () {
  var cur = detectCur();
  try { localStorage.setItem('offerCur', cur); } catch (e) {}
  renderPrices(cur);
  document.querySelectorAll('[data-cur-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setCur(b.getAttribute('data-cur-btn')); });
  });
  tick(); setInterval(function () { if (!TEST_NOW) tick(); }, 1000);
  // Pay page
  var pk = q('p');
  if (document.querySelector('[data-pay-page]') && PRODUCTS[pk]) {
    var c = detectCur(), p = PRODUCTS[pk], early = isEarly();
    document.querySelector('[data-pay-name]').textContent = p.name;
    document.querySelector('[data-pay-amt]').textContent = fmt(c, early ? p.early[c] : p.full[c]);
    document.querySelector('[data-pay-cur]').textContent = CUR_LABEL[c];
    var link = early ? p.pay[c] : p.payFull[c];
    var btn = document.querySelector('[data-pay-btn]');
    var amtText = fmt(c, early ? p.early[c] : p.full[c]);
    var ngnNote = document.querySelector('[data-ngn-note]'), cardNote = document.querySelector('[data-card-note]');
    var transfer = c === 'NGN' && p.ngnTransfer;
    if (ngnNote) ngnNote.hidden = !transfer;
    if (cardNote) cardNote.hidden = transfer;
    function sync() {
      if (transfer) {
        var ready = /^\d{8,15}$/.test(WHATSAPP_NUMBER);
        var msg = 'Hello ' + WHATSAPP_NAME + ', I want to pay ' + amtText + ' by bank transfer for ' + p.name + '. Please send me the bank details.';
        var src = ''; try { src = localStorage.getItem('boeSrc') || ''; } catch (e) {}
        if (src) msg += ' (ref: ' + src + ')';
        btn.classList.toggle('disabled', !ready);
        btn.setAttribute('aria-disabled', ready ? 'false' : 'true');
        btn.textContent = ready ? 'Get bank details on WhatsApp' : 'WhatsApp number not set yet';
        btn.setAttribute('href', ready ? 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg) : '#');
        btn.setAttribute('target', '_blank'); btn.setAttribute('rel', 'noopener');
        return;
      }
      var ok = link.indexOf('PASTE_') !== 0;
      btn.classList.toggle('disabled', !ok);
      btn.setAttribute('aria-disabled', ok ? 'false' : 'true');
      btn.textContent = ok ? 'Pay ' + amtText + ' with ' + (c === 'NGN' ? 'Selar' : 'Stripe') : 'Payment link not set yet';
      btn.setAttribute('href', ok ? trackLink(link, c) : '#');
    }
    sync();
    document.querySelectorAll('[data-pay-switch]').forEach(function (a) {
      a.setAttribute('href', '/offers/pay.html?p=' + pk + '&c=' + a.getAttribute('data-pay-switch'));
    });
  }
});

// Source tracking: remember the email/campaign a visitor came from and pass it to Stripe as client_reference_id.
(function () {
  try {
    var sp = new URLSearchParams(location.search);
    var cmp = sp.get('utm_campaign'), cnt = sp.get('utm_content');
    if (cmp) localStorage.setItem('boeSrc', (cmp + '-' + (cnt || 'x')).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 190));
  } catch (e) {}
})();
function trackLink(link, cur) {
  if (cur === 'NGN') return link;
  var s = 'direct';
  try { s = localStorage.getItem('boeSrc') || 'direct'; } catch (e) {}
  return link + (link.indexOf('?') === -1 ? '?' : '&') + 'client_reference_id=' + encodeURIComponent(s);
}
