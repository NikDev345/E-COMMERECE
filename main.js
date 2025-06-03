// GSAP entrance for hero section
window.addEventListener("DOMContentLoaded", () => {
  gsap.from(".hero-title", { opacity: 0, y: 60, duration: 1, ease: "power2.out" });
  gsap.from(".hero-desc", { opacity: 0, y: 40, duration: 1, delay: 0.4, ease: "power2.out" });
  gsap.from(".hero-cta", { opacity: 0, scale: 0.7, duration: 0.7, delay: 0.8, ease: "back.out(1.7)" });
  gsap.from("header", { y: -60, opacity: 0, duration: 0.9, delay: 0.2, ease: "power2.out" });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});