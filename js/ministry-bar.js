(function () {
  if (document.querySelector('.ministry-bar')) return;
  var style = document.createElement('style');
  style.textContent = '.ministry-bar{display:flex;justify-content:center;align-items:center;gap:2.5rem;flex-wrap:wrap;background:#7a8fac;padding:2rem 1rem 2.4rem}.ministry-bar a{display:flex;flex-direction:column;align-items:center;gap:.75rem;color:#fff;text-decoration:none;font-weight:700;font-size:1.05rem;letter-spacing:.04em;text-transform:uppercase}.ministry-bar img{width:220px!important;height:220px!important;max-width:none!important;object-fit:contain;background:transparent;filter:brightness(0) invert(1)}';
  document.head.appendChild(style);
  var bar = document.createElement('nav');
  bar.className = 'ministry-bar';
  bar.setAttribute('aria-label', 'Church ministries');
  bar.innerHTML =
    '<a href="https://htmlpreview.github.io/?https://github.com/jacobreese95/TBC-Website/blob/main/index.html"><img src="https://raw.githubusercontent.com/jacobreese95/TBC-Website/main/tbc-logo.png" alt="Temple Baptist Church"><span>Church</span></a>' +
    '<a href="index.html"><img src="img/generation_one_logo_modified.png" alt="Generation One"><span>Generation One</span></a>' +
    '<a href="https://htmlpreview.github.io/?https://github.com/jacobreese95/TBC-Academy/blob/main/index.html"><img src="https://raw.githubusercontent.com/jacobreese95/TBC-Website/main/TBA.png" alt="Temple Baptist Academy"><span>Academy</span></a>';
  document.body.appendChild(bar);
})();
