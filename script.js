// ==========================
// MOBILE NAV TOGGLE
// ==========================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ==========================
// DROPDOWNS (Packages & Destinations)
// ==========================
document.querySelectorAll('.dropdown').forEach(drop => {
  const btn = drop.querySelector('.dropdown-btn');
  const menu = drop.querySelector('.dropdown-menu');

  // Open/close on click
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

  // Close dropdown when cursor leaves dropdown area
  drop.addEventListener('mouseleave', () => {
    menu.classList.remove('show');
    btn.classList.remove('active');
  });
});

// ==========================
// DARK MODE TOGGLE
// ==========================
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// ==========================
// HERO SLIDESHOW
// ==========================
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlides, 4000);
showSlides();

// ==========================
// BOOKING FORM: Show ID or Passport based on Citizenship
// ==========================
const citizenship = document.getElementById('citizenship');
const idNumber = document.getElementById('idNumber');
const passportNumber = document.getElementById('passportNumber');

citizenship.addEventListener('change', () => {
  if(citizenship.value === 'citizen') {
    idNumber.style.display = 'block';
    passportNumber.style.display = 'none';
  } else if(citizenship.value === 'non-citizen') {
    idNumber.style.display = 'none';
    passportNumber.style.display = 'block';
  } else {
    idNumber.style.display = 'none';
    passportNumber.style.display = 'none';
  }
});

// ==========================
// GALLERY MODAL
// ==========================
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
  if(e.target === modal) modal.style.display = 'none';
});

// ==========================
// AUTO YEAR IN FOOTER
// ==========================
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================
// OPTIONAL: WhatsApp Floating Button
// ==========================
const waFloat = document.getElementById('wa-float');
waFloat.addEventListener('click', () => {
  // opens WhatsApp in new tab (already handled by href)
});
