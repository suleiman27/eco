<script>
const reveals = document.querySelectorAll(".fade-in-up");
function revealOnScroll() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 50){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
</script>
