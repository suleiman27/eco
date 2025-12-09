// ========================
// NAV DROPDOWN FUNCTIONALITY
// ========================
document.querySelectorAll('.dropdown').forEach(drop => {
  const btn = drop.querySelector('.dropdown-btn');
  const menu = drop.querySelector('.dropdown-menu');

  // Toggle dropdown on click
  btn.addEventListener('click', e => {
    e.preventDefault();
    // Close any other open dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(m => {
      if (m !== menu) m.style.display = 'none';
    });
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown when mouse leaves the dropdown area
  drop.addEventListener('mouseleave', () => {
    menu.style.display = 'none';
  });
});

// ========================
// DARK MODE TOGGLE
// ========================
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Optional: Add dark mode styles dynamically
const style = document.createElement('style');
style.innerHTML = `
.dark-mode {
  background-color: #0b4d22 !important;
  color: #e6f5ea !important;
}
.dark-mode .site-header {
  background: #061f10 !important;
}
.dark-mode .btn-primary {
  background-color: #b5f0a0 !important;
  color: #0b4d22 !important;
}
.dark-mode .dropdown-menu {
  background-color: #1a7031 !important;
}
.dark-mode .safari-card, .dark-mode .dest-card {
  background-color: #154d29 !important;
  color: #e6f5ea !important;
}
`;
document.head.appendChild(style);

// ========================
// BOOKING FORM CITIZENSHIP TOGGLE
// ========================
const citizenship = document.getElementById('citizenship');
const idNumber = document.getElementById('idNumber');
const passportNumber = document.getElementById('passportNumber');

citizenship.addEventListener('change', () => {
  if (citizenship.value === 'citizen') {
    idNumber.style.display = 'block';
    passportNumber.style.display = 'none';
    passportNumber.value = '';
  } else if (citizenship.value === 'non-citizen') {
    idNumber.style.display = 'none';
    idNumber.value = '';
    passportNumber.style.display = 'block';
  } else {
    idNumber.style.display = 'none';
    passportNumber.style.display = 'none';
  }
});

// ========================
// HERO SLIDESHOW
// ========================
let slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

showSlide(currentSlide);

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000); // 5 seconds per slide

// ========================
// UPDATE YEAR IN FOOTER
// ========================
document.getElementById('year').textContent = new Date().getFullYear();
