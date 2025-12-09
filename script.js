// ==========================
// DROPDOWN: VENUES -> DAYS
// ==========================
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownMenu = document.getElementById("venue-menu");
const daysMenu = document.getElementById("days-menu");

// Define days for each venue
const venueDays = {
  "amboseli": ["1 Day Amboseli", "2 Days Amboseli", "3 Days Amboseli"],
  "maasai-mara": ["1 Day Maasai Mara", "2 Days Maasai Mara", "3 Days Maasai Mara"],
  "tsavo": ["1 Day Tsavo", "2 Days Tsavo", "3 Days Tsavo"],
  "samburu": ["1 Day Samburu", "2 Days Samburu", "3 Days Samburu"],
  "diani": ["1 Day Diani", "2 Days Diani", "3 Days Diani"],
  "nairobi-np": ["1 Day Nairobi NP", "2 Days Nairobi NP", "3 Days Nairobi NP"]
};

// Toggle venue menu
dropdownBtn.addEventListener("click", e => {
  e.preventDefault();
  dropdownMenu.classList.toggle("active");
  daysMenu.classList.remove("active");
});

// Populate days dynamically
dropdownMenu.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", () => {
    const venue = li.dataset.venue;
    daysMenu.innerHTML = "";
    venueDays[venue].forEach(day => {
      const liDay = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = day;
      liDay.appendChild(btn);
      daysMenu.appendChild(liDay);
    });
    daysMenu.classList.add("active");
  });
});

// Close dropdowns if click outside
document.addEventListener("click", e => {
  if (!dropdownBtn.contains(e.target) &&
      !dropdownMenu.contains(e.target) &&
      !daysMenu.contains(e.target)) {
    dropdownMenu.classList.remove("active");
    daysMenu.classList.remove("active");
  }
});

// ==========================
// HERO SLIDESHOW
// ==========================
let slideIndex = 0;
const slides = document.querySelectorAll(".hero-slideshow .slide");
function showSlides() {
  slides.forEach((slide, i) => slide.style.opacity = 0);
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.opacity = 1;
  setTimeout(showSlides, 4000);
}
showSlides();

// ==========================
// DARK MODE TOGGLE
// ==========================
const darkModeBtn = document.getElementById("dark-mode-toggle");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ==========================
// BOOKING FORM: Show ID/Passport based on citizenship
// ==========================
const citizenship = document.getElementById("citizenship");
const idInput = document.getElementById("idNumber");
const passportInput = document.getElementById("passportNumber");

citizenship.addEventListener("change", () => {
  if (citizenship.value === "citizen") {
    idInput.style.display = "block";
    passportInput.style.display = "none";
  } else if (citizenship.value === "non-citizen") {
    idInput.style.display = "none";
    passportInput.style.display = "block";
  } else {
    idInput.style.display = "none";
    passportInput.style.display = "none";
  }
});

// ==========================
// GALLERY MODAL
// ==========================
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

// ==========================
// SET YEAR
// ==========================
document.getElementById("year").textContent = new Date().getFullYear();
