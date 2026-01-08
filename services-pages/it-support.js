// ======================== IT SUPPORT MINI PAGE JS ========================

// Dark Mode Toggle (Optional)
const darkModeBtn = document.createElement("button");
darkModeBtn.id = "dark-mode-toggle";
darkModeBtn.textContent = "🌓";
document.body.appendChild(darkModeBtn);

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Update footer year automatically
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Fade-in on scroll
const fadeInElements = document.querySelectorAll(".fade-in-up");

function handleScroll() {
  fadeInElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
