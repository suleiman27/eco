// -------------------- HERO SLIDESHOW --------------------
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
    slide.style.zIndex = i === index ? '1' : '0';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 5000);

// -------------------- NAV TOGGLE --------------------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// -------------------- PACKAGES DROPDOWN --------------------
const venueMenu = document.getElementById('venue-menu');
const daysMenu = document.getElementById('days-menu');

venueMenu.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const venue = btn.parentElement.getAttribute('data-venue') || btn.getAttribute('data-venue');
    const packages = {
      'amboseli': ['1 Day Amboseli', '2 Days Amboseli', '3 Days Amboseli'],
      'maasai-mara': ['1 Day Mara', '2 Days Mara', '3 Days Mara'],
      'tsavo': ['1 Day Tsavo', '2 Days Tsavo', '3 Days Tsavo'],
      'samburu': ['1 Day Samburu', '2 Days Samburu', '3 Days Samburu'],
      'diani': ['1 Day Diani', '2 Days Diani', '3 Days Diani'],
      'nairobi-np': ['1 Day Nairobi NP', '2 Days Nairobi NP', '3 Days Nairobi NP']
    };
    daysMenu.innerHTML = '';
    packages[venue].forEach(day => {
      const li = document.createElement('li');
      li.innerHTML = `<button>${day}</button>`;
      daysMenu.appendChild(li);
    });
    daysMenu.style.display = 'block';
  });
});

// -------------------- DESTINATIONS DROPDOWN --------------------
const destinationsBtn = document.querySelector('a[href="#destinations"]');
let destinationsOpen = false;
const destinationsList = ['Masai Mara','Amboseli','Tsavo','Samburu','Diani','Nairobi NP'];

const destinationsMenu = document.createElement('ul');
destinationsMenu.className = 'dropdown-menu';
destinationsMenu.style.display = 'none';
destinationsList.forEach(dest => {
  const li = document.createElement('li');
  li.innerHTML = `<button>${dest}</button>`;
  destinationsMenu.appendChild(li);
});
destinationsBtn.parentElement.appendChild(destinationsMenu);

destinationsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  destinationsMenu.style.display = destinationsMenu.style.display === 'block' ? 'none' : 'block';
});

// -------------------- CLICK OUTSIDE TO CLOSE --------------------
document.addEventListener('click', (e) => {
  if (!venueMenu.parentElement.contains(e.target)) {
    daysMenu.style.display = 'none';
  }
  if (!destinationsBtn.parentElement.contains(e.target)) {
    destinationsMenu.style.display = 'none';
  }
});

// -------------------- DARK MODE --------------------
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// -------------------- GALLERY MODAL --------------------
const galleryItems = document.querySelectorAll('.gallery-item');
const imgModal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    imgModal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => {
  imgModal.style.display = 'none';
});

imgModal.addEventListener('click', (e) => {
  if(e.target === imgModal) imgModal.style.display = 'none';
});

// -------------------- SCROLL ANIMATIONS --------------------
const faders = document.querySelectorAll('.fade-in, .fade-in-up');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// -------------------- DYNAMIC YEAR --------------------
document.getElementById('year').textContent = new Date().getFullYear();
