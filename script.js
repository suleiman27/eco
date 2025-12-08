// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
});

// Hero slideshow
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

window.addEventListener('load', () => {
  slides[currentSlide].classList.add('active');
  setInterval(showNextSlide, 5000);
});

// Citizenship toggle
const citizenship = document.getElementById('citizenship');
const idNumber = document.getElementById('idNumber');
const passportNumber = document.getElementById('passportNumber');
citizenship.addEventListener('change', () => {
  if (citizenship.value === 'citizen') {
    idNumber.style.display = 'block';
    passportNumber.style.display = 'none';
  } else if (citizenship.value === 'non-citizen') {
    passportNumber.style.display = 'block';
    idNumber.style.display = 'none';
  } else {
    idNumber.style.display = 'none';
    passportNumber.style.display = 'none';
  }
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Gallery modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = item.src;
    modalImg.alt = item.alt;
  });
});
modalClose.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => { if(e.target===modal) modal.style.display='none'; });
