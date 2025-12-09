// ================= NAV TOGGLE =================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// ================= HERO SLIDESHOW =================
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 5000);

// ================= DROPDOWN SEQUENTIAL =================
const venueMenuItems = document.querySelectorAll('#venue-menu li button');
const daysMenu = document.getElementById('days-menu');

// Define days for each venue
const venueDays = {
  'amboseli': ['1 Day Safari', '2 Days Safari', '3 Days Safari'],
  'maasai-mara': ['1 Day Safari', '2 Days Safari', '3 Days Safari'],
  'tsavo': ['1 Day Safari', '2 Days Safari', '3 Days Safari'],
  'samburu': ['1 Day Safari', '2 Days Safari', '3 Days Safari'],
  'diani': ['1 Day Beach + Safari', '2 Days Beach + Safari', '3 Days Beach + Safari'],
  'nairobi-np': ['1 Day Safari', '2 Days Safari']
};

venueMenuItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const venue = btn.parentElement.getAttribute('data-venue');
    daysMenu.innerHTML = '';
    venueDays[venue].forEach(day => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = day;
      li.appendChild(button);
      daysMenu.appendChild(li);
    });
    daysMenu.style.display = 'flex';
  });
});

// Close days menu if clicked outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    daysMenu.style.display = 'none';
  }
});

// ================= GALLERY MODAL =================
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = item.src;
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// ================= DARK MODE =================
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ================= DYNAMIC BOOKING FORM =================
const citizenship = document.getElementById('citizenship');
const idNumber = document.getElementById('idNumber');
const passportNumber = document.getElementById('passportNumber');

citizenship.addEventListener('change', () => {
  if (citizenship.value === 'citizen') {
    idNumber.style.display = 'block';
    passportNumber.style.display = 'none';
  } else if (citizenship.value === 'non-citizen') {
    passportNumber.style.display = 'block';
    idNumber.style.display = 'none';
  } else {
    idNumber.style.display = 'none';
    passportNumber.style.display = 'none';
  }
});

// ================= CURRENT YEAR =================
document.getElementById('year').textContent = new Date().getFullYear();
