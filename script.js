/* --------------------------------------------------
   DARK MODE TOGGLE
-------------------------------------------------- */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved mode
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️"; // Sun icon
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

/* --------------------------------------------------
   FADE-IN ON SCROLL
-------------------------------------------------- */
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -20px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

/* --------------------------------------------------
   HERO SLIDESHOW AUTO FIX (PREVENT HANGING)
-------------------------------------------------- */
let slideIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides.children.length;

function autoSlide() {
  slideIndex++;
  if (slideIndex > totalSlides - 1) slideIndex = 0;

  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

setInterval(autoSlide, 6000);

/* --------------------------------------------------
   LIGHTBOX FOR GALLERY IMAGES
-------------------------------------------------- */
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    const largeImg = document.createElement("img");
    largeImg.src = img.src;
    lightbox.appendChild(largeImg);

    document.body.appendChild(lightbox);

    // Close when clicked
    lightbox.addEventListener("click", () => {
      lightbox.remove();
    });
  });
});

/* --------------------------------------------------
   HEADER SHADOW ON SCROLL
-------------------------------------------------- */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("header-shadow");
  } else {
    header.classList.remove("header-shadow");
  }
});

/* --------------------------------------------------
   SMOOTH SCROLL FOR MENU LINKS
-------------------------------------------------- */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.hash !== "") {
      e.preventDefault();
      const section = document.querySelector(link.hash);
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* --------------------------------------------------
   WHATSAPP PULSE EFFECT
-------------------------------------------------- */
const whatsappButton = document.querySelector(".whatsapp-float");
setInterval(() => {
  whatsappButton.classList.toggle("pulse");
}, 1200);
