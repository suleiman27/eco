/* ------------------------------------
   MOBILE NAVIGATION TOGGLE
------------------------------------ */
const menuIcon = document.querySelector(".menu-icon");
const navMenu = document.querySelector("nav ul");

if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

/* ------------------------------------
   IMAGE LIGHTBOX (Gallery Popup)
------------------------------------ */
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(img => {
  img.addEventListener("click", () => openLightbox(img.src));
});

function openLightbox(src) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  lightbox.innerHTML = `
    <div class="lightbox-content">
        <img src="${src}">
    </div>
  `;

  document.body.appendChild(lightbox);

  // Close on click
  lightbox.addEventListener("click", () => lightbox.remove());
}

/* ------------------------------------
   FADE-IN SCROLL ANIMATIONS
------------------------------------ */
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

/* ------------------------------------
   SMOOTH SCROLL FOR NAV LINKS
------------------------------------ */
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ------------------------------------
   WHATSAPP BUTTON FLOAT ANIMATION
------------------------------------ */
const whatsapp = document.querySelector(".whatsapp-float");

if (whatsapp) {
  setInterval(() => {
    whatsapp.classList.toggle("pulse");
  }, 1500);
}
