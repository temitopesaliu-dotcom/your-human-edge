/**
 * Sitewide click + form tracking for GA4 (and Meta Pixel where relevant).
 * Loaded on every Next.js route (via layout.tsx) and on every static HTML page.
 * Safe to include twice - guards against double binding.
 */
(function () {
  if (window.__yheTrackBound) return;
  window.__yheTrackBound = true;

  var SEL = [
    'a',
    'button',
    '[role="button"]',
    'input[type="submit"]',
    'input[type="button"]',
    'summary',
    '[data-track]',
    '[onclick]',
    '.btn',
    '.cta',
    '.quiz-opt',
    '.tier',
    '.feature',
    '.custom'
  ].join(', ');

  function clean(v, n) {
    return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n || 100);
  }

  function label(el) {
    var t =
      el.getAttribute('data-track') ||
      el.getAttribute('aria-label') ||
      el.innerText ||
      el.value ||
      el.title ||
      el.getAttribute('alt') ||
      '';
    return clean(t, 100) || '(no text)';
  }

  function classes(el) {
    var c = el.className;
    if (c && typeof c !== 'string' && c.baseVal !== undefined) c = c.baseVal;
    return clean(c, 100) || '(none)';
  }

  function send(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, params));
    }
  }

  document.addEventListener(
    'click',
    function (e) {
      var el = e.target && e.target.closest ? e.target.closest(SEL) : null;
      if (!el) return;

      var href = el.getAttribute ? el.getAttribute('href') || '' : '';
      var abs = '';
      try {
        abs = href ? new URL(href, window.location.href).href : '';
      } catch (err) {
        abs = href;
      }

      var p = {
        link_text: label(el),
        link_url: abs || '(none)',
        element_type: (el.tagName || 'unknown').toLowerCase(),
        element_id: el.id || '(none)',
        element_class: classes(el),
        page_path: window.location.pathname,
        page_title: clean(document.title, 100)
      };

      send('click_element', p);

      if (abs.indexOf('buy.stripe.com') > -1 || abs.indexOf('checkout.stripe.com') > -1) {
        send('begin_checkout', p);
        if (window.fbq) window.fbq('track', 'InitiateCheckout');
      }

      if (abs.indexOf('calendly.com') > -1) {
        send('booking_click', p);
        if (window.fbq) window.fbq('track', 'Schedule');
      }

      if (href.indexOf('mailto:') === 0) send('contact_email', p);
      if (href.indexOf('tel:') === 0) send('contact_phone', p);

      if (
        /^https?:/i.test(abs) &&
        abs.indexOf(window.location.origin) !== 0
      ) {
        send('click', Object.assign({ outbound: true }, p));
      }
    },
    true
  );

  document.addEventListener(
    'submit',
    function (e) {
      var f = e.target;
      if (!f || f.tagName !== 'FORM') return;
      send('form_submit', {
        form_id: f.id || '(none)',
        form_name: f.getAttribute('name') || '(none)',
        form_destination: clean(f.action, 100) || '(none)',
        page_path: window.location.pathname,
        page_title: clean(document.title, 100)
      });
    },
    true
  );
})();
