/* =========================
   MOBILE NAV TOGGLE
========================= */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
  });
}

/* =========================
   DROPDOWNS (PC + MOBILE SAFE)
========================= */
document.querySelectorAll(".dropdown").forEach(dropdown => {
  const dropdownBtn = dropdown.querySelector(".dropdown-btn");

  if (!dropdownBtn) return;

  dropdownBtn.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      // Close other dropdowns
      document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== dropdown) d.classList.remove("open");
      });

      dropdown.classList.toggle("open");
    }
  });

  // Submenus (mobile)
  dropdown.querySelectorAll(".submenu-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        btn.parentElement.classList.toggle("open");
      }
    });
  });
});

/* Close dropdowns when clicking outside (mobile) */
document.addEventListener("click", e => {
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }
});

/* =========================
   DARK MODE TOGGLE
========================= */
const darkModeBtn = document.getElementById("dark-mode-toggle");

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.textContent =
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

/* =========================
   HERO SLIDESHOW
========================= */
const slides = document.querySelectorAll(".hero-slideshow .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
  });
}

if (slides.length) {
  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

/* =========================
   SCROLL REVEAL
========================= */
const reveals = document.querySelectorAll(".fade-in-up");

function revealOnScroll() {
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   STATS COUNTER
========================= */
document.querySelectorAll(".counter").forEach(counter => {
  const target = +counter.dataset.target;
  let current = 0;

  const updateCounter = () => {
    const increment = target / 200;
    current += increment;
    if (current < target) {
      counter.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
});

/* =========================
   TESTIMONIALS
========================= */
const testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) =>
    t.classList.toggle("active", i === index)
  );
}

if (testimonials.length) {
  showTestimonial(testimonialIndex);
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }, 5000);
}

/* =========================
   FOOTER YEAR
========================= */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* =========================
   GALLERY LIGHTBOX
========================= */
const galleryImages = document.querySelectorAll(".gallery-item");

if (galleryImages.length) {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  Object.assign(lightbox.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    visibility: "hidden",
    transition: "0.3s",
    zIndex: "10000"
  });

  const img = document.createElement("img");
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  img.style.borderRadius = "10px";
  lightbox.appendChild(img);

  galleryImages.forEach(image => {
    image.addEventListener("click", () => {
      img.src = image.src;
      lightbox.style.opacity = "1";
      lightbox.style.visibility = "visible";
    });
  });

  lightbox.addEventListener("click", e => {
    if (e.target !== img) {
      lightbox.style.opacity = "0";
      setTimeout(() => {
        lightbox.style.visibility = "hidden";
      }, 300);
    }
  });
}
