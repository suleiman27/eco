// ========================
// HERO SLIDESHOW
// ========================
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

// Start slideshow
showSlide(currentSlide);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// ========================
// NAVIGATION TOGGLE (MOBILE)
// ========================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('active');
});

// ========================
// DROPDOWN MENUS
// ========================
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector('.dropdown-btn');
  const menu = dropdown.querySelector('.dropdown-menu');

  dropdown.addEventListener('mouseenter', () => {
    menu.style.display = 'block';
  });

  dropdown.addEventListener('mouseleave', () => {
    menu.style.display = 'none';
  });
});

// ========================
// DARK MODE TOGGLE
// ========================
const darkModeBtn = document.getElementById('dark-mode-toggle');

darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    darkModeBtn.textContent = '☀️';
  } else {
    darkModeBtn.textContent = '🌙';
  }
});

// Dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.innerHTML = `
  .dark-mode {
    background-color: #1e2b20;
    color: #e0f0d9;
  }
  .dark-mode .site-header {
    background-color: #13301f;
  }
  .dark-mode .btn-primary {
    background-color: #4d9c2e;
    color: #fff;
  }
  .dark-mode .btn-outline {
    border-color: #fff;
    color: #fff;
  }
  .dark-mode .safari-card, 
  .dark-mode .choose-card, 
  .dark-mode .booking-form, 
  .dark-mode blockquote {
    background-color: #25412b;
    color: #e0f0d9;
  }
`;
document.head.appendChild(darkModeStyles);

// ========================
// BOOKING FORM CITIZENSHIP TOGGLE
// ========================
const citizenship = document.getElementById('citizenship');
const idInput = document.getElementById('idNumber');
const passportInput = document.getElementById('passportNumber');

citizenship.addEventListener('change', () => {
  const value = citizenship.value;
  if (value === 'citizen') {
    idInput.style.display = 'block';
    passportInput.style.display = 'none';
  } else if (value === 'non-citizen') {
    idInput.style.display = 'none';
    passportInput.style.display = 'block';
  } else {
    idInput.style.display = 'none';
    passportInput.style.display = 'none';
  }
});

// ========================
// FOOTER YEAR
// ========================
document.getElementById('year').textContent = new Date().getFullYear();

// ========================
// GALLERY LIGHTBOX
// ========================
const galleryImages = document.querySelectorAll('.gallery-item');

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

lightbox.style.cssText = `
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.9);
  display:flex;
  justify-content:center;
  align-items:center;
  opacity:0;
  visibility:hidden;
  transition: opacity 0.3s ease;
  z-index:1000;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.maxWidth = '90%';
lightboxImg.style.maxHeight = '90%';
lightbox.appendChild(lightboxImg);

galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    lightboxImg.src = image.src;
    lightbox.style.visibility = 'visible';
    lightbox.style.opacity = '1';
  });
});

lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.visibility = 'hidden';
    }, 300);
  }
});
