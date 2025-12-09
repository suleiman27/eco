/* =================================================
   Modern site JS for EcoQuest
   - Nav mobile toggle
   - Dropdown mobile open/close
   - Submenu mobile open
   - Dark mode toggle (saves to localStorage)
   - Gallery lightbox
   - Fade-in scroll animations
   - Smooth-scroll nav links
   - WhatsApp pulse
   ================================================= */

/* --------- DOM Helpers ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* --------- NAV / MOBILE TOGGLING ---------- */
const navToggleIcon = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggleIcon && navLinks) {
  navToggleIcon.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggleIcon.classList.toggle("active");
  });
}

/* Dropdown mobile behavior: allow clicking to open dropdown and submenus */
function setupMobileDropdowns() {
  // Toggle root dropdown (Packages)
  document.querySelectorAll(".dropdown").forEach(drop => {
    const btn = drop.querySelector(".dropdown-btn") || drop.querySelector("a");
    btn && btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        drop.classList.toggle("open");
        // when opening, ensure nav is visible
        navLinks.classList.add("open");
      }
    });
  });

  // Toggle each submenu (destination -> days)
  document.querySelectorAll(".submenu").forEach(s => {
    const a = s.querySelector("a");
    a && a.addEventListener("click", (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        s.classList.toggle("open");
      }
    });
  });
}
setupMobileDropdowns();
window.addEventListener("resize", () => {
  // clean mobile classes when resizing to desktop
  if (window.innerWidth > 980) {
    document.querySelectorAll(".dropdown, .submenu").forEach(el => el.classList.remove("open"));
    navLinks.classList.remove("open");
  }
});

/* --------- DARK MODE TOGGLE ---------- */
const themeToggleBtn = document.getElementById("theme-toggle");
const rootBody = document.body;
const THEME_KEY = "ecoquest_theme_pref"; // localStorage key

function applyTheme(theme) {
  if (theme === "dark") {
    rootBody.setAttribute("data-theme", "dark");
    // update icon (optional)
    themeToggleBtn.innerHTML = '<span class="icon-sun">☀️</span>';
  } else {
    rootBody.removeAttribute("data-theme");
    themeToggleBtn.innerHTML = '<span class="icon-moon">🌙</span>';
  }
}

/* read saved pref or system pref */
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
    return;
  }
  // if no saved, follow user OS preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}
initTheme();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch(e){ /* ignore */ }
    // little bounce
    themeToggleBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration:280 });
  });
}

/* --------- SMOOTH SCROLL FOR NAV LINKS ---------- */
$$("nav a[href^='#']").forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // close mobile nav
        if (navLinks.classList.contains("open")) navLinks.classList.remove("open");
      }
    }
  });
});

/* --------- GALLERY LIGHTBOX ---------- */
$$(".gallery-item, .gallery img").forEach(img => {
  img.addEventListener("click", (e) => {
    const src = img.getAttribute("src") || img.src;
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `<img src="${src}" alt="">`;
    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => lightbox.remove());
    // ESC to close
    const onKey = (k) => { if (k.key === "Escape") { lightbox.remove(); window.removeEventListener("keydown", onKey); } };
    window.addEventListener("keydown", onKey);
  });
});

/* --------- FADE-IN ON SCROLL (IntersectionObserver) ---------- */
const faders = $$(".fade-in");
if ('IntersectionObserver' in window && faders.length) {
  const appearOptions = { threshold: 0.25, rootMargin: "0px 0px -60px 0px" };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("appear");
        obs.unobserve(en.target);
      }
    });
  }, appearOptions);
  faders.forEach(f => observer.observe(f));
} else {
  // fallback: reveal all
  faders.forEach(f => f.classList.add("appear"));
}

/* --------- WHATSAPP FLOAT PULSE ---------- */
const wa = document.querySelector(".wa-float, .whatsapp-float, #wa-float");
if (wa) {
  setInterval(() => wa.classList.toggle("pulse"), 1500);
}

/* --------- Minor polish: on load, animate hero CTA ---------- */
window.addEventListener("load", () => {
  const heroCard = document.querySelector(".hero-text");
  if (heroCard) {
    heroCard.animate([{ opacity:0, transform:"translateY(8px)" }, { opacity:1, transform:"translateY(0)" }], { duration: 420, easing: "cubic-bezier(.2,.9,.2,1)"});
  }
});

/* --------- Optional: simple auto-slide for .slides on desktop only ---------- */
(function desktopSlideAuto(){
  const slidesWrap = document.querySelector(".slides");
  if (!slidesWrap) return;
  if (window.innerWidth <= 980) return; // disable for small screens
  let idx = 0;
  const total = slidesWrap.children.length;
  setInterval(() => {
    idx = (idx + 1) % total;
    slidesWrap.style.transform = `translateX(-${idx * 100}%)`;
    slidesWrap.style.transition = "transform 700ms cubic-bezier(.2,.9,.2,1)";
  }, 4200);
})();
