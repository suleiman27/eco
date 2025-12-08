/* ---------------- MOBILE NAV ---------------- */
document.getElementById("nav-toggle").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("open");
});

/* ---------------- DROPDOWN (CLICK TO OPEN) ---------------- */
document.querySelectorAll(".dropdown-btn").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const dropdown = button.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== dropdown) d.classList.remove("show");
    });

    dropdown.classList.toggle("show");
  });
});

/* Close dropdown when clicking outside */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
  }
});

/* ---------------- HERO SLIDESHOW ---------------- */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

setInterval(showSlides, 5000);

/* ---------------- FOOTER YEAR ---------------- */
document.getElementById("year").textContent = new Date().getFullYear();
