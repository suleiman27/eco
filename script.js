/* script.js
   Full interaction & UX for EcoQuest Safari site
   - Mobile nav
   - Hero slideshow
   - Language toggle
   - Modal for itinerary/quotes
   - Booking form handling
   - Quick estimate calculator
   - Footer year + lazy images
*/

/* ---------------------------
   Helpers
--------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------------------------
   Mobile Navigation Toggle
--------------------------- */
(function navToggle() {
  const toggle = $('#nav-toggle');
  const navLinks = $('#nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const expanded = navLinks.classList.contains('show');
    toggle.setAttribute('aria-expanded', expanded);
  });

  // Close nav when clicking a link (mobile)
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ---------------------------
   Hero Slideshow
   - cycles slides with .slide class
   - uses .active class to show slide
--------------------------- */
(function heroSlideshow() {
  const slides = $$('.slide');
  if (!slides.length) return;

  let current = 0;
  const intervalMs = 5000;
  let timer = null;

  const show = (idx) => {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
      s.style.opacity = i === idx ? 1 : 0;
      s.style.transition = 'opacity 600ms ease';
    });
    current = idx;
  };

  const next = () => show((current + 1) % slides.length);

  // start autoplay
  timer = setInterval(next, intervalMs);

  // pause on hover
  slides.forEach((slide) => {
    slide.addEventListener('mouseenter', () => clearInterval(timer));
    slide.addEventListener('mouseleave', () => {
      timer = setInterval(next, intervalMs);
    });
  });

  // make sure first slide visible immediately
  show(0);
})();

/* ---------------------------
   Language Toggle
   - simple demonstration toggling text on page
   - expand this to load translations if you have them
--------------------------- */
(function languageToggle() {
  const btn = $('#lang-toggle');
  if (!btn) return;

  let lang = 'EN';
  btn.addEventListener('click', () => {
    lang = lang === 'EN' ? 'SW' : 'EN'; // toggle between English and Swahili (example)
    btn.textContent = lang;

    // Minimal example: toggle hero headings text if found
    const heroH1 = document.querySelector('.hero-content h1');
    if (heroH1) {
      if (lang === 'SW') {
        heroH1.textContent = 'Usafiri wa Safari Usiosahaulika Nchini Kenya — Unaopangwa na Wataalamu wa Ndani';
      } else {
        heroH1.textContent = 'Unforgettable Safaris in Kenya — Tailored by Local Experts';
      }
    }
  });
})();

/* ---------------------------
   Modal (Itinerary / Quote)
--------------------------- */
(function modalController() {
  const modal = $('#itinerary-modal');
  const modalClose = $('#modal-close');
  const itineraryBody = $('#itinerary-body');
  const quoteBtn = $('#quote-btn');

  if (!modal || !modalClose || !itineraryBody) return;

  function openModal(contentHtml = '') {
    itineraryBody.innerHTML = contentHtml || `
      <h3>Request a tailored itinerary</h3>
      <p>Provide basic details in the booking form and we'll send a custom itinerary and quote to your email.</p>
      <ul>
        <li>Sample: 3 Days Maasai Mara — Net $1,350 / person</li>
        <li>Sample: 5 Days Samburu, Ol Pejeta & Meru — Net $2,335 / person</li>
      </ul>
      <p style="font-size:.95rem;color:#444">You can also submit a full inquiry using the <strong>Book Your Safari</strong> form.</p>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  quoteBtn && quoteBtn.addEventListener('click', () => openModal());

  modalClose.addEventListener('click', closeModal);

  // Close on click outside modal-content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* ---------------------------
   Booking Form Handling
   - Prevents default
   - Basic validation (HTML already does a lot)
   - Mock "send" and success message
--------------------------- */
(function bookingForm() {
  const form = $('#booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // simple visual feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Collect form data
    const data = new FormData(form);
    const payload = {};
    data.forEach((v, k) => (payload[k] = v));

    // Mock send - replace with your API endpoint
    try {
      // Simulate network latency
      await new Promise((res) => setTimeout(res, 900));

      // For production: replace this block with fetch('/api/inquiry', { method: 'POST', body: JSON.stringify(payload) ... })
      console.log('Booking inquiry payload (mock):', payload);

      // show success message (temporary)
      const successHtml = `
        <h3>Inquiry Submitted</h3>
        <p>Thanks ${payload.name || ''}! We'll email you at <strong>${payload.email || ''}</strong> with a tailored itinerary and next steps.</p>
        <p>If you provided a phone number we'll also WhatsApp you at <strong>${payload.phone || 'N/A'}</strong>.</p>
      `;
      // reuse itinerary modal to show success
      const modalBody = $('#itinerary-body');
      const modal = $('#itinerary-modal');
      modalBody && (modalBody.innerHTML = successHtml);
      modal && modal.classList.add('open');
      modal && modal.setAttribute('aria-hidden', 'false');

      // Reset form (optional)
      form.reset();
    } catch (err) {
      alert('Sorry — there was an error sending your inquiry. Please try again later.');
      console.error(err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
})();

/* ---------------------------
   Quick Estimate Calculator
   - Uses a small price map (net prices per person for common packages)
   - If a destination isn't found we give a friendly default
--------------------------- */
(function quickEstimate() {
  const estimateBtn = $('#quick-estimate');
  const bookingForm = $('#booking-form');
  if (!estimateBtn || !bookingForm) return;

  // Base rates by destination (net per person approximations)
  // These values are representative — adjust to your real rates
  const baseNetByDestination = {
    'Masai Mara': 1350,
    'Amboseli': 1310,
    'Tsavo East': 1250,
    'Tsavo West': 1282,
    'Lake Nakuru': 1250,
    'Samburu': 1305,
    'Nairobi National Park': 950,
    'Taita Hills': 1270,
    'Ngutuni': 1194,
    'Diani + Safari': 1800,
    'Ol Pejeta': 1400,
    'Meru': 1500
  };

  estimateBtn.addEventListener('click', () => {
    // Pull travellers and destination from form fields
    const travellers = Number(bookingForm.querySelector('input[name="travellers"]')?.value) || 1;
    const dest = bookingForm.querySelector('select[name="destination"]')?.value || '';

    // Find base price
    const base = baseNetByDestination[dest] || null;

    // Build message
    let message = '';
    if (base) {
      const total = (base * travellers);
      const selling = Math.round(total * 1.15); // example markup for selling price (15%)
      message = `
        Quick estimate for <strong>${dest}</strong><br>
        Travellers: <strong>${travellers}</strong><br>
        Net (per person): <strong>$${base.toLocaleString()}</strong><br>
        <hr style="margin:8px 0">
        <strong>Estimated Total (net): $${total.toLocaleString()}</strong><br>
        Estimated Selling Price (approx): <strong>$${selling.toLocaleString()}</strong>
      `;
    } else {
      message = `
        We couldn't find a direct base price for <strong>${dest || 'that destination'}</strong> in our quick estimates.
        Please submit the booking form or click <em>Get a Free Quote</em> for a tailored price.
      `;
    }

    // Show estimate in modal
    const modalBody = $('#itinerary-body');
    const modal = $('#itinerary-modal');
    if (modalBody && modal) {
      modalBody.innerHTML = `<h3>Quick Estimate</h3><div style="font-size:0.98rem;color:#222">${message}</div>`;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      alert('Estimate:\n' + message.replace(/<[^>]+>/g, '').replace(/\s{2,}/g, ' '));
    }
  });
})();

/* ---------------------------
   Footer Year & Lazy Images
--------------------------- */
(function finalTouches() {
  // Year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Lazy load images (add loading attr if missing)
  $$('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  // Optional: smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ---------------------------
   Accessibility / Small UX polish
--------------------------- */
// Close mobile nav when resizing to desktop
(function responsiveCleanup() {
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const navLinks = $('#nav-links');
    if (!navLinks) return;
    if (window.innerWidth > 900 && lastWidth <= 900) {
      // ensure mobile menu closed when resizing up
      navLinks.classList.remove('show');
      $('#nav-toggle')?.setAttribute('aria-expanded', 'false');
    }
    lastWidth = window.innerWidth;
  });
})();
