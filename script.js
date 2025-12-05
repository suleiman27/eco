// =======================
// Hero Slideshow
// =======================
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  setInterval(nextSlide, 4000); // change every 4 seconds
}

// =======================
// Mobile Navigation Toggle
// =======================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// =======================
// Footer Current Year
// =======================
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// =======================
// Dynamic Gallery
// =======================
const galleryGrid = document.getElementById('gallery-grid');
if (galleryGrid) {
  for (let i = 16; i <= 26; i++) {
    const img = document.createElement('img');
    img.src = `images/image${i}.jpeg`;
    img.alt = `Gallery Image ${i-15}`;
    galleryGrid.appendChild(img);
  }
}

// =======================
// Example Packages Grid
// =======================
const packagesGrid = document.getElementById('packages-grid');
if (packagesGrid) {
  const packages = [
    { title: 'Masai Mara Adventure', img: 'images/image3.jpeg', budget: 'luxury' },
    { title: 'Amboseli Safari', img: 'images/image4.jpeg', budget: 'mid' },
    { title: 'Tsavo Explorer', img: 'images/image5.jpeg', budget: 'budget' },
    { title: 'Diani Beach + Safari', img: 'images/image6.jpeg', budget: 'luxury' },
  ];

  packages.forEach(pkg => {
    const div = document.createElement('div');
    div.classList.add('package');
    div.innerHTML = `
      <img src="${pkg.img}" alt="${pkg.title}">
      <h3>${pkg.title}</h3>
      <p class="meta">${pkg.budget.charAt(0).toUpperCase() + pkg.budget.slice(1)} Package</p>
    `;
    packagesGrid.appendChild(div);
  });
}

// =======================
// Quick Estimate Modal (Example)
// =======================
const quickEstimateBtn = document.getElementById('quick-estimate');
const modal = document.getElementById('itinerary-modal');
const modalClose = document.getElementById('modal-close');

quickEstimateBtn?.addEventListener('click', () => {
  if (modal) modal.style.display = 'flex';
});

modalClose?.addEventListener('click', () => {
  if (modal) modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});
