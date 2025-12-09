document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HERO SLIDESHOW
  // =========================
  const slides = document.querySelectorAll(".hero-slideshow .slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 5000); // change every 5 seconds

  // =========================
  // MOBILE NAV TOGGLE
  // =========================
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
  });

  // =========================
  // DARK MODE TOGGLE
  // =========================
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  });

  // =========================
  // DESTINATION DROPDOWN SEQUENTIAL
  // =========================
  const venueMenu = document.getElementById("venue-menu");
  const daysMenu = document.getElementById("days-menu");

  const safariDays = {
    "amboseli": ["1 Day Amboseli", "2 Days Amboseli", "3 Days Amboseli"],
    "maasai-mara": ["1 Day Mara", "2 Days Mara", "3 Days Mara"],
    "tsavo": ["1 Day Tsavo", "2 Days Tsavo", "3 Days Tsavo"],
    "samburu": ["1 Day Samburu", "2 Days Samburu", "3 Days Samburu"],
    "diani": ["1 Day Diani", "2 Days Diani", "3 Days Diani"],
    "nairobi-np": ["1 Day Nairobi NP", "2 Days Nairobi NP", "3 Days Nairobi NP"]
  };

  venueMenu.querySelectorAll("li button").forEach(btn => {
    btn.addEventListener("click", () => {
      const venue = btn.getAttribute("data-venue");
      daysMenu.innerHTML = "";
      safariDays[venue].forEach(day => {
        const li = document.createElement("li");
        const btnDay = document.createElement("button");
        btnDay.textContent = day;
        li.appendChild(btnDay);
        daysMenu.appendChild(li);
      });
      daysMenu.style.display = "flex";
    });
  });

  // =========================
  // GALLERY MODAL
  // =========================
  const galleryItems = document.querySelectorAll(".gallery-item");
  const imgModal = document.getElementById("img-modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.getElementById("modal-close");

  galleryItems.forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      imgModal.style.display = "flex";
    });
  });

  modalClose.addEventListener("click", () => {
    imgModal.style.display = "none";
  });

  imgModal.addEventListener("click", e => {
    if (e.target === imgModal) imgModal.style.display = "none";
  });

  // =========================
  // BOOKING FORM: ID / Passport toggle
  // =========================
  const citizenship = document.getElementById("citizenship");
  const idNumber = document.getElementById("idNumber");
  const passportNumber = document.getElementById("passportNumber");

  citizenship.addEventListener("change", () => {
    if (citizenship.value === "citizen") {
      idNumber.style.display = "block";
      passportNumber.style.display = "none";
      passportNumber.value = "";
    } else if (citizenship.value === "non-citizen") {
      idNumber.style.display = "none";
      passportNumber.style.display = "block";
      idNumber.value = "";
    } else {
      idNumber.style.display = "none";
      passportNumber.style.display = "none";
      idNumber.value = "";
      passportNumber.value = "";
    }
  });

  // =========================
  // SET CURRENT YEAR
  // =========================
  document.getElementById("year").textContent = new Date().getFullYear();

  // =========================
  // FADE IN ON SCROLL
  // =========================
  const faders = document.querySelectorAll(".fade-in, .fade-in-up");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.animationPlayState = "running";
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.style.animationPlayState = "paused";
    appearOnScroll.observe(fader);
  });
});
