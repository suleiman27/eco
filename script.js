// =========================
// HERO SLIDESHOW
// =========================
const slides = document.querySelectorAll(".hero-slideshow .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// =========================
// NAV TOGGLE FOR MOBILE
// =========================
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
  navToggle.setAttribute("aria-expanded", !expanded);
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// =========================
// DARK MODE TOGGLE
// =========================
const darkToggle = document.getElementById("dark-mode-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// =========================
// GALLERY MODAL
// =========================
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = item.src;
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// =========================
// FADE-IN ON SCROLL
// =========================
const faders = document.querySelectorAll(".fade-in, .fade-in-up");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.animation = "fadeInUp 1s forwards";
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// =========================
// DROPDOWN PACKAGES & DAYS
// =========================
const venueMenu = document.getElementById("venue-menu");
const daysMenu = document.getElementById("days-menu");

// Example mapping of venue to days/packages
const venueDays = {
  "amboseli": ["1 Day Amboseli Safari", "2 Days Amboseli & Tsavo", "3 Days Amboseli Adventure"],
  "maasai-mara": ["1 Day Mara Safari", "2 Days Mara Adventure", "3 Days Mara & Nakuru"],
  "tsavo": ["1 Day Tsavo East", "2 Days Tsavo East & West", "3 Days Tsavo Expedition"],
  "samburu": ["1 Day Samburu Safari", "2 Days Samburu & Shaba", "3 Days Northern Safari"],
  "diani": ["1 Day Diani Beach", "2 Days Diani + Safari", "3 Days Diani & Tsavo"],
  "nairobi-np": ["1 Day Nairobi NP", "2 Days Nairobi & Safari", "3 Days Nairobi & Maasai Mara"]
};

// Populate days dynamically on venue click
venueMenu.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", () => {
    const venue = li.dataset.venue;
    const days = venueDays[venue];
    daysMenu.innerHTML = ""; // Clear previous
    days.forEach(day => {
      const liDay = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = day;
      liDay.appendChild(btn);
      daysMenu.appendChild(liDay);
    });
  });
});

// =========================
// UPDATE YEAR IN FOOTER
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================
// SHOW ID OR PASSPORT FIELD BASED ON CITIZENSHIP
// =========================
const citizenship = document.getElementById("citizenship");
const idField = document.getElementById("idNumber");
const passportField = document.getElementById("passportNumber");

citizenship.addEventListener("change", () => {
  if(citizenship.value === "citizen") {
    idField.style.display = "block";
    passportField.style.display = "none";
  } else if(citizenship.value === "non-citizen") {
    idField.style.display = "none";
    passportField.style.display = "block";
  } else {
    idField.style.display = "none";
    passportField.style.display = "none";
  }
});
