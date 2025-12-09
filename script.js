// -------------------- HERO SLIDESHOW --------------------
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

showSlide(currentSlide);
setInterval(nextSlide, 5000); // 5s per slide

// -------------------- NAV TOGGLE --------------------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('open');
});

// -------------------- DROPDOWNS --------------------
const packageDropdown = document.querySelector('#venue-menu');
const daysMenu = document.querySelector('#days-menu');
const venueButtons = packageDropdown.querySelectorAll('button');

venueButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const venue = btn.getAttribute('data-venue');
    populateDaysMenu(venue);
    daysMenu.style.display = 'block';
  });
});

function populateDaysMenu(venue) {
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
    const btn = document.createElement('button');
    btn.textContent = day;
    li.appendChild(btn);
    daysMenu.appendChild(li);
  });
}

// Hide sub-menus when clicking outside
document.addEventListener('click', (e) => {
  if (!packageDropdown.parentElement.contains(e.target)) {
    daysMenu.style.display = 'none';
  }
});

// -------------------- DESTINATIONS DROPDOWN --------------------
const destinationsMenu = document.createElement('ul');
destinationsMenu.classList.add('dropdown-menu');
destinationsMenu.style.display = 'none';

const destinationsBtn = document.querySelector('a[href="#destinations"]');
const destinationsList = ['Masai Mara','Amboseli','Tsavo','Samburu','Diani','Nairobi NP'];
destinationsList.forEach(dest => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = dest;
  li.appendChild(btn);
  destinationsMenu.appendChild(li);
});
destinationsBtn.parentElement.appendChild(destinationsMenu);

destinationsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  destinationsMenu.style.display = destinationsMenu.style.display === 'block' ? 'none' : 'block';
});

// -------------------- DARK MODE --------------------
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// -------------------- ABOUT US & SCROLL ANIMATION --------------------
const faders = document.querySelectorAll('.fade-in, .fade-in-up');
const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
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

// -------------------- DYNAMIC YEAR --------------------
document.getElementById('year').textContent = new Date().getFullYear();
