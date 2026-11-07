/* ==== CONFIG: edit here only ==== */
// Fixed end time of the early-bird window (GMT). Set this once, on launch day, as start + 72 hours.
// It never resets for later visitors.
var EARLY_END = '2026-11-10T12:00:00Z';

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
    name: 'Self-paced course, 12 months',
    blurb: 'The full AI execution course, recorded, with 12 months of access.',
    full:  { USD: 500,    GBP: 386,    NGN: 915000 },
    early: { USD: 350,    GBP: 270,    NGN: 640500 },
    pay:   { USD: 'https://buy.stripe.com/5kQ14o1plgnS8g3dX53oA0V',  GBP: 'https://buy.stripe.com/9B628sd838Vq8g3cT13oA0X',  NGN: 'https://selar.com/vb15we33t1?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/bJeaEY9VR7RmfIv8CL3oA0W', GBP: 'https://buy.stripe.com/00w6oI6JF6Ni7bZ2en3oA0Y', NGN: 'https://selar.com/b19w4vqi9t?currency=NGN' }
  },
  group: {
    name: 'The Business of Teaching (group, 6 weeks, live)',
    blurb: 'Six weeks live with Temitope: one live call a week, challenges and accountability, plus the full recorded course.',
    full:  { USD: 1000,   GBP: 773,    NGN: 1831000 },
    early: { USD: 700,    GBP: 541,    NGN: 1281700 },
    pay:   { USD: 'https://buy.stripe.com/cNi28s3xt1sY9k75qz3oA0Z',  GBP: 'https://buy.stripe.com/5kQ4gA9VR8Vq8g3bOX3oA11',  NGN: 'https://selar.com/1v0440v7v7?currency=NGN' },
    payFull: { USD: 'https://buy.stripe.com/3cIdRa4BxefK67V2en3oA10', GBP: 'https://buy.stripe.com/28E28s5FB1sYcwj4mv3oA12', NGN: 'https://selar.com/231mh7r0i6?currency=NGN' }
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
function isEarly() { return Date.now() < new Date(EARLY_END).getTime(); }
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
  if (end) {
    var d = new Date(EARLY_END);
    end.textContent = d.toUTCString().replace('GMT', 'GMT') + ' (' + d.toLocaleString('en-GB', { timeZone: 'Africa/Lagos', dateStyle: 'medium', timeStyle: 'short' }) + ' Lagos, ' + d.toLocaleString('en-GB', { timeZone: 'Europe/London', timeStyle: 'short' }) + ' UK)';
  }
}
function tick() {
  var el = document.querySelector('[data-countdown]');
  if (!el) return;
  var ms = new Date(EARLY_END).getTime() - Date.now();
  if (ms <= 0) { el.textContent = 'Early-bird has ended.'; renderPrices(detectCur()); return; }
  var h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
  el.textContent = 'Early-bird ends in ' + h + 'h ' + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
}
document.addEventListener('DOMContentLoaded', function () {
  var cur = detectCur();
  renderPrices(cur);
  document.querySelectorAll('[data-cur-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setCur(b.getAttribute('data-cur-btn')); });
  });
  tick(); setInterval(tick, 1000);
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
