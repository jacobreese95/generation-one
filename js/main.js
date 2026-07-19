/* ============================================================
   Generation One 2026 — main.js
   ============================================================ */

// ── Countdown ──────────────────────────────────────────────
(function () {
  const EVENT = new Date('2026-09-17T19:00:00');
  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');

  if (!daysEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff  = Math.max(0, EVENT - Date.now());
    const days  = Math.floor(diff / 864e5);
    const hours = Math.floor((diff % 864e5) / 36e5);
    const mins  = Math.floor((diff % 36e5)  / 6e4);

    daysEl.textContent  = days;
    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(mins);
  }

  tick();
  setInterval(tick, 30000);
})();

// ── Add to Calendar ─────────────────────────────────────────
(function () {
  const btn = document.getElementById('add-to-cal');
  if (!btn) return;

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    btn.href = 'generation-one-2026.ics';
  } else {
    btn.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + '&text=Generation+One+2026'
      + '&dates=20260917T190000/20260919T210000'
      + '&details=A+free+young+adult+conference+by+Temple+Baptist+Church.'
      + '&location=Temple+Baptist+Church,+11801+E+Lincoln+St,+Wichita,+KS+67202';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  }
})();

// ── Watch video button ──────────────────────────────────────
(function () {
  const btn    = document.querySelector('a[href="#video"]');
  const frame  = document.querySelector('.video-frame');
  const iframe = frame ? frame.querySelector('iframe') : null;

  if (!btn || !frame || !iframe) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    frame.scrollIntoView({ behavior: 'smooth', block: 'center' });
    iframe.src = 'https://www.youtube.com/embed/P7Zjhh2nW6w?autoplay=1&rel=0';
  });
})();

// ── Scroll Reveal ───────────────────────────────────────────
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
