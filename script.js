/* -----------------------------------------------------------
   DARK MODE TOGGLE
----------------------------------------------------------- */
const darkToggle = document.getElementById("dark-mode-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

/* -----------------------------------------------------------
   FADE-IN ON SCROLL
----------------------------------------------------------- */
const faders = document.querySelectorAll(".fade-in, .fade-in-up");
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

/* -----------------------------------------------------------
   HERO SLIDESHOW
----------------------------------------------------------- */
let slideIndex = 0;
const slides = document.querySelectorAll(".hero-slideshow img");

function showSlides() {
  slides.forEach((slide, i) => slide.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 6000);
}
showSlides();

/* -----------------------------------------------------------
   GALLERY MODAL
----------------------------------------------------------- */
const galleryImages = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if(e.target === modal) modal.style.display = "none";
});

/* -----------------------------------------------------------
   HEADER SHADOW ON SCROLL
----------------------------------------------------------- */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if(window.scrollY > 50) header.classList.add("header-shadow");
  else header.classList.remove("header-shadow");
});

/* -----------------------------------------------------------
   SMOOTH SCROLL FOR LINKS
----------------------------------------------------------- */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    if(link.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -----------------------------------------------------------
   WHATSAPP PULSE
----------------------------------------------------------- */
const waBtn = document.querySelector(".wa-float");
setInterval(() => {
  waBtn.classList.toggle("pulse");
}, 1200);

/* -----------------------------------------------------------
   PARALLAX SCROLL EFFECT
----------------------------------------------------------- */
window.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll(".parallax");
  parallaxElements.forEach(el => {
    const speed = 0.5; // adjust parallax speed
    const offset = window.scrollY * speed;
    el.style.backgroundPositionY = `-${offset}px`;
  });
});

/* -----------------------------------------------------------
   NAV TOGGLE (MOBILE)
----------------------------------------------------------- */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* -----------------------------------------------------------
   SEQUENTIAL DROPDOWN: VENUE -> DAYS
----------------------------------------------------------- */
const venueButtons = document.querySelectorAll("#venue-menu li button");
const daysMenu = document.getElementById("days-menu");

// Define days for each venue
const venueDays = {
  "amboseli": ["1 Day", "2 Days", "3 Days"],
  "maasai-mara": ["1 Day", "2 Days", "3 Days", "4 Days"],
  "tsavo": ["1 Day", "2 Days", "3 Days", "5 Days"],
  "samburu": ["1 Day", "2 Days", "3 Days"],
  "diani": ["1 Day", "2 Days", "3 Days", "5 Days"],
  "nairobi-np": ["Half Day", "Full Day"]
};

venueButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const venue = btn.parentElement.dataset.venue;
    // Clear previous days
    daysMenu.innerHTML = "";
    venueDays[venue].forEach(day => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.textContent = day;
      li.appendChild(b);
      daysMenu.appendChild(li);
    });
    // Show sub-menu
    daysMenu.style.display = "block";
  });
});

// Hide sub-menu when clicking outside
document.addEventListener("click", (e) => {
  if(!e.target.closest(".dropdown")) {
    daysMenu.style.display = "none";
  }
});
