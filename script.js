// ===== HERO SLIDESHOW =====
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

setInterval(nextSlide, 5000);
showSlide(currentSlide);

// ===== DROPDOWN =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector('.dropdown-btn');
  const menu = dropdown.querySelector('.dropdown-menu');

  btn.addEventListener('click', e => {
    e.preventDefault();
    menu.classList.toggle('show');
  });

  // Close when mouse leaves (desktop)
  dropdown.addEventListener('mouseleave', () => {
    menu.classList.remove('show');
  });
});

// Close dropdown if clicked outside
document.addEventListener('click', e => {
  dropdowns.forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    const btn = dropdown.querySelector('.dropdown-btn');
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// ===== DARK MODE =====
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// ===== CITIZENSHIP FORM TOGGLE =====
const citizenship = document.getElementById('citizenship');
const idNumber = document.getElementById('idNumber');
const passportNumber = document.getElementById('passportNumber');

citizenship.addEventListener('change', () => {
  if(citizenship.value === 'citizen') {
    idNumber.style.display = 'block';
    passportNumber.style.display = 'none';
    passportNumber.value = '';
  } else if(citizenship.value === 'non-citizen') {
    passportNumber.style.display = 'block';
    idNumber.style.display = 'none';
    idNumber.value = '';
  } else {
    idNumber.style.display = 'none';
    passportNumber.style.display = 'none';
  }
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();
