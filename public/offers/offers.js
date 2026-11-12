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

// Payment links. Stripe for USD and GBP, Selar for NGN.
// Early-bird and full-price links are separate.
var PRODUCTS = {
  easy: {
    name: 'Easy Content Development',
    blurb: 'Taking your content development with ease, using AI at every step.',
    full:  { USD: 99,     GBP: 77,     NGN: 181000 },
    early: { USD: 69.30,  GBP: 54,     NGN: 126700 },
    pay:   { USD: 'https://buy.stripe.com/8x26oI1plefK0NB6uD3oA0R',  GBP: 'https://buy.stripe.com/fZueVe6JFdbGdAn1aj3oA0T',  NGN: 'https://selar.com/1674914p66?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/9B628s3xt9Zubsf9GP3oA0S', GBP: 'https://buy.stripe.com/9B6aEY3xt9ZueEr7yH3oA0U', NGN: 'https://selar.com/2731826137?currency=NGN' }
  },
  selfpaced12: {
    name: 'The Business of Expertise, self-paced (6 months access)',
    blurb: 'The full course, recorded, with 6 months of access.',
    full:  { USD: 550,    GBP: 425,    NGN: 1006500 },
    early: { USD: 385,    GBP: 298,    NGN: 704500 },
    pay:   { USD: 'https://buy.stripe.com/aFadRafgbfjO53R7yH3oA18',  GBP: 'https://buy.stripe.com/00wbJ25FB3B67bZ1aj3oA1a',  NGN: 'https://selar.com/vb15we33t1?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/eVq00k4Bx8Vqaob5qz3oA17', GBP: 'https://buy.stripe.com/fZueVe3xt8VqbsfbOX3oA19', NGN: 'https://selar.com/b19w4vqi9t?currency=NGN' }
  },
  group: {
    name: 'The Business of Expertise group, 6 weeks, live',
    blurb: 'Six weeks live with Temitope: one live call a week, challenges and accountability, plus the full recorded course. Classes start 5 December 2026.',
    full:  { USD: 1999,   GBP: 1545,   NGN: 3658000 },
    early: { USD: 1399,   GBP: 1081,   NGN: 2560000 },
    pay:   { USD: 'https://buy.stripe.com/bJeeVefgb9Zu7bZdX53oA14',  GBP: 'https://buy.stripe.com/aFa6oIgkf5Je9k7g5d3oA16',  NGN: 'https://selar.com/1v0440v7v7?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/3cI3cw7NJ7RmeErcT13oA13', GBP: 'https://buy.stripe.com/fZu4gAfgb0oU1RF1aj3oA15', NGN: 'https://selar.com/231mh7r0i6?currency=NGN' }
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
  var now = nowMs();
  var ms = early ? windowEndMs(now) - now : nextStartMs(now) - now;
  var d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
  var t = (early ? Math.floor(ms / 36e5) + 'h ' : (d ? d + 'd ' : '') + h + 'h ') + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
  el.textContent = early ? 'Early-bird ends in ' + t : 'Next early-bird opens Saturday 12:00 UK, in ' + t;
}
document.addEventListener('DOMContentLoaded', function () {
  var cur = detectCur();
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
    var provider = c === 'NGN' ? 'Selar' : 'Stripe';
    function sync() {
      var ready = link.indexOf('PASTE_') !== 0;
      btn.classList.toggle('disabled', !ready);
      btn.setAttribute('aria-disabled', ready ? 'false' : 'true');
      btn.textContent = link.indexOf('PASTE_') === 0 ? 'Payment link not set yet' : 'Pay ' + fmt(c, early ? p.early[c] : p.full[c]) + ' with ' + provider;
      btn.setAttribute('href', ready ? link : '#');
    }
    sync();
    document.querySelectorAll('[data-pay-switch]').forEach(function (a) {
      a.setAttribute('href', '/offers/pay.html?p=' + pk + '&c=' + a.getAttribute('data-pay-switch'));
    });
  }
});
