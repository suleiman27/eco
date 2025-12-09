// ================= HERO SLIDESHOW =================
let slides = document.querySelectorAll(".hero-slideshow img");
let currentSlide = 0;
function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
showSlide(currentSlide);
setInterval(nextSlide, 5000);

// ================= NAV TOGGLE =================
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", navLinks.classList.contains("active"));
});

// ================= DROPDOWN SEQUENTIAL =================
const venueMenu = document.getElementById("venue-menu");
const daysMenu = document.getElementById("days-menu");

const packagesData = {
  "amboseli": ["1 Day Amboseli Safari","2 Days Amboseli & Tsavo","3 Days Amboseli & Maasai Mara"],
  "maasai-mara": ["1 Day Mara Safari","2 Days Mara & Lake Naivasha","3 Days Mara Big Five"],
  "tsavo": ["1 Day Tsavo East","2 Days Tsavo East & West","3 Days Tsavo West Safari"],
  "samburu": ["1 Day Samburu Safari","2 Days Samburu & Buffalo Springs","3 Days Samburu Safari"],
  "diani": ["1 Day Diani Beach","2 Days Diani & Safari","3 Days Beach & Safari"],
  "nairobi-np": ["1 Day Nairobi NP","2 Days Nairobi & Safari","3 Days Nairobi + Tsavo"]
};

venueMenu.querySelectorAll("li button").forEach(btn => {
  btn.addEventListener("click", () => {
    const venue = btn.dataset.venue;
    daysMenu.innerHTML = "";
    packagesData[venue].forEach(dayPackage => {
      const li = document.createElement("li");
      const btnDay = document.createElement("button");
      btnDay.textContent = dayPackage;
      li.appendChild(btnDay);
      daysMenu.appendChild(li);
    });
    daysMenu.style.display = "flex";
  });
});

// ================= DARK MODE TOGGLE =================
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// ================= GALLERY MODAL =================
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = item.src;
    modalImg.alt = item.alt;
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if(e.target === modal) modal.style.display = "none";
});

// ================= BOOKING FORM ID/PASSPORT TOGGLE =================
const citizenship = document.getElementById("citizenship");
const idField = document.getElementById("idNumber");
const passportField = document.getElementById("passportNumber");

citizenship.addEventListener("change", () => {
  if(citizenship.value === "citizen") {
    idField.style.display = "block";
    passportField.style.display = "none";
    passportField.value = "";
  } else if(citizenship.value === "non-citizen") {
    idField.style.display = "none";
    passportField.style.display = "block";
    idField.value = "";
  } else {
    idField.style.display = "none";
    passportField.style.display = "none";
    idField.value = "";
    passportField.value = "";
  }
});

// ================= SCROLL FADE-IN =================
const faders = document.querySelectorAll(".fade-in, .fade-in-up");
const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ================= FOOTER YEAR =================
document.getElementById("year").textContent = new Date().getFullYear();
