
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top  = ry - 18 + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .skill-tag, .stat-card, .cert-card, .skill-group, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    ring.style.transform   = 'scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = '';
    ring.style.transform   = '';
  });
});

// --- Nav scroll ---
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// --- Typing effect ---
const roles = ['Data Analyst', 'AI Engineer', 'Prompt Engineer', 'Cloud Practitioner', 'Software Engineer'];
let ri = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed-role');

function typeEffect() {
  const current = roles[ri];
  if (!deleting) {
    typed.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typed.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 100);
}

typeEffect();

// --- Scroll reveal ---
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => io.observe(el));