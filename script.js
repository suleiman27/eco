// =============================
// HERO SLIDESHOW
// =============================
const slides = document.querySelectorAll('.hero-slideshow img');
let currentSlide = 0;

function showSlide(index){
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide(){
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 5000);

// =============================
// DARK MODE TOGGLE
// =============================
const darkBtn = document.getElementById('dark-mode-toggle');
darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// =============================
// HAMBURGER MENU
// =============================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// =============================
// GALLERY MODAL
// =============================
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// =============================
// FADE-IN ON SCROLL
// =============================
const faders = document.querySelectorAll('.fade-in, .fade-in-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => observer.observe(fader));

// =============================
// SEQUENTIAL DROPDOWN FOR PACKAGES
// =============================
const venueMenu = document.getElementById('venue-menu');
const daysMenu = document.getElementById('days-menu');

const packages = {
  "amboseli": ["1 Day Amboseli Safari", "2 Days Amboseli Safari", "3 Days Amboseli Safari"],
  "maasai-mara": ["1 Day Maasai Mara Safari", "2 Days Maasai Mara Safari", "3 Days Maasai Mara Safari"],
  "tsavo": ["1 Day Tsavo Safari", "2 Days Tsavo Safari", "3 Days Tsavo Safari"],
  "samburu": ["1 Day Samburu Safari", "2 Days Samburu Safari", "3 Days Samburu Safari"],
  "diani": ["1 Day Diani Safari", "2 Days Diani Safari", "3 Days Diani Safari"],
  "nairobi-np": ["1 Day Nairobi NP Safari", "2 Days Nairobi NP Safari", "3 Days Nairobi NP Safari"]
};

venueMenu.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const venue = item.dataset.venue;
    daysMenu.innerHTML = '';
    packages[venue].forEach(day => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = day;
      li.appendChild(btn);
      daysMenu.appendChild(li);
    });
    daysMenu.style.display = 'flex';
    daysMenu.style.flexDirection = 'column';
  });
});
