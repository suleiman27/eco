// MOBILE NAV TOGGLE
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// DROPDOWNS (Packages & Destinations)
document.querySelectorAll('.dropdown').forEach(drop => {
  const btn = drop.querySelector('.dropdown-btn');
  const menu = drop.querySelector('.dropdown-menu');

  btn.addEventListener('click', e => {
    e.preventDefault();
    menu.classList.toggle('show');
    btn.classList.toggle('active');

    // Close other dropdowns
    document.querySelectorAll('.dropdown-btn').forEach(otherBtn => {
      if(otherBtn !== btn) {
        otherBtn.classList.remove('active');
        const otherMenu = otherBtn.nextElementSibling;
        if(otherMenu) otherMenu.classList.remove('show');
      }
    });
  });
});

// DARK MODE TOGGLE
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// HERO SLIDESHOW
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlides, 4000);
showSlides();
