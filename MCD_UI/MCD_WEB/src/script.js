// Init AOS animations
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }
  // Navbar scroll effect
  const nav = document.querySelector('.site-navbar');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
  // Animated counters
  const counters = document.querySelectorAll('.stat-value');
  const animateCount = (el) => {
    const target = +el.dataset.count;
    const duration = 1800;
    const start = performance.now();
    const formatter = new Intl.NumberFormat('en-US');
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatter.format(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatter.format(target);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => io.observe(c));
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        ev.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});