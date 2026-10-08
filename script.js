// Menu mobile
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
}

// Apparition au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Accordéon (un seul ouvert à la fois)
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const acc = btn.closest('.acc');
    const wasOpen = acc.classList.contains('open');
    document.querySelectorAll('.acc.open').forEach(a => {
      a.classList.remove('open');
      a.querySelector('.acc-btn').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) { acc.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  });
});

// Compteurs animés
document.querySelectorAll('[data-count]').forEach(el => {
  const end = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const co = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    co.disconnect();
    const t0 = performance.now(), dur = 1200;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  co.observe(el);
});
