// NAV TOGGLE
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle && navToggle.addEventListener('click', ()=>{
  navLinks.classList.toggle('open');
});

// DROPDOWN CLICK
document.querySelectorAll('.dropdown-btn').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const parent = btn.parentElement;
    document.querySelectorAll('.dropdown').forEach(d=>{
      if(d!==parent) d.classList.remove('show');
    });
    parent.classList.toggle('show');
  });
});

// CLOSE DROPDOWN CLICK OUTSIDE
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.dropdown')){
    document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('show'));
  }
});

// HERO SLIDESHOW
(function(){
  const slides = document.querySelectorAll('.hero-slideshow img');
  let i = 0;
  setInterval(()=>{
    slides[i].classList.remove('active');
    i = (i+1) % slides.length;
    slides[i].classList.add('active');
  },5000);
})();

// FOOTER YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// BOOKING FORM
const bookingForm = document.getElementById('booking-form');
bookingForm && bookingForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  alert('Thank you! Your inquiry has been sent.');
  bookingForm.reset();
});
