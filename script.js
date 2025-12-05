// Hero Slideshow
const slides = document.querySelectorAll('.hero-slideshow img');
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

setInterval(nextSlide, 5000);

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Quick Estimate / Modal (example)
const estimateBtn = document.getElementById('quick-estimate');
const itineraryModal = document.getElementById('itinerary-modal');
const modalClose = document.getElementById('modal-close');

estimateBtn.addEventListener('click', () => {
  itineraryModal.style.display = 'block';
  itineraryModal.setAttribute('aria-hidden', 'false');
});

modalClose.addEventListener('click', () => {
  itineraryModal.style.display = 'none';
  itineraryModal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', (e) => {
  if(e.target === itineraryModal){
    itineraryModal.style.display = 'none';
    itineraryModal.setAttribute('aria-hidden', 'true');
  }
});

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();
