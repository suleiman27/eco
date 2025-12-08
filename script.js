/* =======================
   HERO SLIDESHOW
======================= */
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

/* =======================
   NAV DROPDOWN
======================= */
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

dropdownBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const dropdown = btn.parentElement;
    dropdown.classList.toggle('active');
  });
});

/* =======================
   MOBILE NAV TOGGLE
======================= */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

/* =======================
   CITIZENSHIP SELECT
======================= */
const citizenship = document.getElementById('citizenship');
const idInput = document.getElementById('idNumber');
const passportInput = document.getElementById('passportNumber');

citizenship.addEventListener('change', () => {
  if(citizenship.value === 'citizen'){
    idInput.style.display = 'block';
    passportInput.style.display = 'none';
    idInput.required = true;
    passportInput.required = false;
  } else if(citizenship.value === 'non-citizen'){
    idInput.style.display = 'none';
    passportInput.style.display = 'block';
    idInput.required = false;
    passportInput.required = true;
  } else {
    idInput.style.display = 'none';
    passportInput.style.display = 'none';
    idInput.required = false;
    passportInput.required = false;
  }
});

/* =======================
   QUICK ESTIMATE BUTTON
======================= */
const quickBtn = document.getElementById('quick-estimate');
quickBtn.addEventListener('click', () => {
  alert("Quick estimate feature coming soon!");
});

/* =======================
   GALLERY MODAL
======================= */
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modalImg.src = item.src;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', e => {
  if(e.target === modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

/* =======================
   CURRENT YEAR FOOTER
======================= */
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();
