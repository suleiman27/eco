/* NAV TOGGLE */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle && navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* DROPDOWN: click to open, close others */
document.querySelectorAll('.dropdown-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = this.parentElement;
    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== parent) d.classList.remove('show');
    });
    parent.classList.toggle('show');
    this.setAttribute('aria-expanded', parent.classList.contains('show') ? 'true' : 'false');
  });
});

/* Close dropdowns when click outside */
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
    document.querySelectorAll('.dropdown-btn').forEach(b => b.setAttribute('aria-expanded','false'));
  }
});

/* HERO SLIDESHOW */
(function() {
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 5000);
})();

/* GALLERY MODAL */
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose && modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
});

modal && modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
  }
});

/* FOOTER YEAR */
document.getElementById('year').textContent = new Date().getFullYear();

/* BOOKING FORM handler */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! Your inquiry was sent. We will reply shortly.');
    bookingForm.reset();
  });
}

/* QUICK ESTIMATE */
const qBtn = document.getElementById('quick-estimate');
qBtn && qBtn.addEventListener('click', () => {
  alert('Quick estimate: send travel dates and number of travellers for an accurate quote.');
});

/* ESC closes modals/dropdowns */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
    if (modal) modal.classList.remove('show');
  }
});
