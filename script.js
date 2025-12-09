// =============================
// HERO SLIDESHOW
// =============================
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? 1 : 0;
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 4000); // Change slide every 4 seconds

// =============================
// FADE-IN ON SCROLL
// =============================
const faders = document.querySelectorAll('.fade-in, .fade-in-up');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// =============================
// NAV TOGGLE FOR MOBILE
// =============================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// =============================
// SEQUENTIAL DROPDOWN (PACKAGES -> VENUE -> DAYS)
// =============================
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Define venues and days
const packagesData = {
  "Amboseli": ["1 Day", "2 Days", "3 Days"],
  "Maasai Mara": ["1 Day", "2 Days", "3 Days"],
  "Tsavo East": ["1 Day", "2 Days", "3 Days"],
  "Tsavo West": ["1 Day", "2 Days", "3 Days"],
  "Lake Nakuru": ["1 Day", "2 Days", "3 Days"],
  "Samburu": ["1 Day", "2 Days", "3 Days"],
  "Diani + Safari": ["1 Day", "2 Days", "3 Days"],
  "Nairobi NP": ["1 Day", "2 Days", "3 Days"]
};

// Clear menu and populate venues
function populateVenues() {
  dropdownMenu.innerHTML = '';
  Object.keys(packagesData).forEach(venue => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = venue + ' ➤';
    btn.addEventListener('click', () => populateDays(venue));
    li.appendChild(btn);
    dropdownMenu.appendChild(li);
  });
}

// Populate days when a venue is clicked
function populateDays(venue) {
  const subMenu = document.createElement('ul');
  subMenu.classList.add('sub-menu');
  packagesData[venue].forEach(day => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = day;
    li.appendChild(btn);
    subMenu.appendChild(li);
  });
  // Remove existing sub-menu if any
  const existing = dropdownMenu.querySelector('.sub-menu');
  if (existing) existing.remove();
  dropdownMenu.appendChild(subMenu);
  subMenu.classList.add('show');
}

// Initialize dropdown on hover
dropdownBtn.addEventListener('mouseenter', populateVenues);

// =============================
// DARK MODE TOGGLE
// =============================
const langToggle = document.getElementById('lang-toggle');
langToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  langToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : 'EN';
});

// =============================
// WHATSAPP FLOATING BUTTON EFFECT
// =============================
const waFloat = document.getElementById('wa-float');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    waFloat.style.bottom = '20px';
    waFloat.style.opacity = 1;
  } else {
    waFloat.style.bottom = '-60px';
    waFloat.style.opacity = 0;
  }
});

// =============================
// GALLERY MODAL
// =============================
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

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// =============================
// CURRENT YEAR IN FOOTER
// =============================
document.getElementById('year').textContent = new Date().getFullYear();
