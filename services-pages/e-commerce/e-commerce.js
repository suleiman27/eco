// ========================
// E-COMMERCE MINI PAGE JS
// ========================

// Auto year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Smooth reveal on load
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Subtle image parallax on mouse move
const img = document.querySelector(".service-image img");

if (img) {
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 60;
    const y = (window.innerHeight / 2 - e.clientY) / 60;
    img.style.transform = `scale(1.03) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
}
