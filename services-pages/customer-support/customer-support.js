// ========================
// CUSTOMER SUPPORT MINI PAGE JS
// ========================

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect for main content
  const fadeElements = document.querySelectorAll(".fade-in-up");
  fadeElements.forEach(el => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 200);
  });

  // Update year in footer
  const yearSpan = document.getElementById("year");
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();
});

