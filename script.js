// ========================
// HERO SLIDESHOW
// ========================
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

showSlide(currentSlide);
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 4000);

// ========================
// NAV TOGGLE (MOBILE)
// ========================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
});

// ========================
// SUBMENU TOGGLE
// ========================
const submenuBtns = document.querySelectorAll('.submenu-btn');
submenuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const submenu = btn.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  });
});

// ========================
// DARK MODE TOGGLE
// ========================
const darkModeBtn = document.getElementById('dark-mode-toggle');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
});

// ========================
// FOOTER YEAR
// ========================
document.getElementById('year').textContent = new Date().getFullYear();
