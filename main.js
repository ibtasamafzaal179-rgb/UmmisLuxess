// UmmisLuxe — interactions
const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const yearEl = document.getElementById("year");
const form = document.getElementById("subscribeForm");
const emailInput = document.getElementById("emailInput");
const formNote = document.getElementById("formNote");

// Sticky header shadow on scroll
const onScroll = () => {
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const closeMenu = () => {
  navLinks.classList.remove("open");
  navToggle.classList.remove("open");
};
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", closeMenu)
);
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger items inside the same container
        setTimeout(() => entry.target.classList.add("visible"), i * 90);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Footer year
yearEl.textContent = new Date().getFullYear();

// Subscribe form (front-end only)
const validEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const showNote = (msg) => {
  formNote.textContent = msg;
  formNote.classList.add("show");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();
  if (!validEmail(value)) {
    showNote("Please enter a valid email address.");
    emailInput.focus();
    return;
  }
  showNote("Thank you — welcome to the UmmisLuxe inner circle.");
  form.reset();
  setTimeout(() => formNote.classList.remove("show"), 4000);
});

// Parallax hero background (subtle)
const heroBg = document.querySelector(".hero-bg");
if (heroBg && window.matchMedia("(min-width: 700px)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `scale(1) translateY(${y * 0.18}px)`;
      }
    },
    { passive: true }
  );
}

function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const query = document.getElementById('custQuery').value.trim();

  const phoneNumber = "2349030945289"; // Replace with your WhatsApp number

  const message = `*New Inquiry from Umm Luxe Website*%0A%0A` +
                  `*Name:* ${encodeURIComponent(name)}%0A` +
                  `*Email:* ${encodeURIComponent(email)}%0A` +
                  `*Message:* ${encodeURIComponent(query)}`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  
  window.open(whatsappURL, '_blank');
}