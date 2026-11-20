// Shared header/footer + behaviours. ponytail: JS-injected chrome keeps 13 pages DRY; swap for a build step if SEO matters.
const LIVE = 'https://www.duikclubneptunus.be';
const page = location.pathname.split('/').pop() || 'index.html';
const cur = h => (h.split('#')[0] === page ? ' aria-current="page"' : '');
const a = (h, t) => `<a href="${h}"${cur(h)}>${t}</a>`;
const NAV = [
  ['Onze club', 'bestuur.html', [['Ontmoet het bestuur', 'bestuur.html'], ['Leren duiken', 'leren-duiken.html'], ['Brevetten', 'brevetten.html'], ['Uitlenen van materiaal', 'materiaal.html'], ['Lidgeld en homologatie', 'lidgeld.html'], ['Duikagenda', 'agenda.html'], ['Sfeerbeelden', 'sfeerbeelden.html']]],
  ['Duikstekken', 'duikstekken.html', [['De Nekker', 'duikstekken.html#nekker'], ['Put van Ekeren', 'duikstekken.html#ekeren'], ['Steengroeves', 'duikstekken.html#steengroeves'], ['Oosterschelde', 'duikstekken.html#oosterschelde'], ['L’Estartit', 'duikstekken.html#estartit']]],
  ['Contact', 'contact.html'],
  ['Ledenportaal', LIVE + '/ledenportaal'],
];
const li = ([t, h, s]) => `<li>${a(h, t)}${s ? `<ul class="sub">${s.map(([st, sh]) => `<li>${a(sh, st)}</li>`).join('')}</ul>` : ''}</li>`;
const ico = {
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.5-3.2h-3.2V8.7c0-.9.4-1.7 1.8-1.7h1.5V4.2S15.8 4 14.6 4C12.1 4 10.5 5.5 10.5 8.3v2.5H7.8V14h2.7v8z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
};
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Nekkerspoel-Borcht+19+2800+Mechelen';

document.getElementById('site-header').outerHTML = `
<header class="site-header" id="hdr"><div class="container nav-wrap">
  <a class="logo" href="index.html" aria-label="Neptunus WVM — home"><img src="img/logo.png" alt="Neptunus Duikclub Mechelen"></a>
  <button class="burger" aria-label="Menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  <ul class="nav" id="nav">${NAV.map(li).join('')}<li><a class="btn" href="leren-duiken.html">Gratis initiatie</a></li></ul>
</div></header>`;

document.getElementById('site-footer').outerHTML = `
<footer class="site-footer"><div class="container">
  <div class="foot-grid">
    <div><a class="logo" href="index.html"><img src="img/logo.png" alt="Neptunus Duikclub Mechelen"></a><p style="margin-top:16px">Watersport Vereniging Mechelen. Al 60 jaar een begrip, aangesloten bij Nelos en CMAS.</p>
      <div class="social"><a href="https://www.facebook.com/NEPTUNUSWVM" aria-label="Facebook">${ico.fb}</a><a href="https://www.instagram.com/neptunuswvm" aria-label="Instagram">${ico.ig}</a><a href="${MAPS}" aria-label="Google Maps">${ico.pin}</a></div></div>
    <div><h4>De club</h4><ul>${NAV[0][2].map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Snel naar</h4><ul><li><a href="inschrijven.html">Lid worden</a></li><li><a href="duikstekken.html">Duikstekken</a></li><li><a href="contact.html">Contact</a></li><li><a href="${LIVE}/ledenportaal">Ledenportaal</a></li><li><a href="${LIVE}/ledenportaal">Inloggen</a></li></ul></div>
    <div><h4>Zwembadtraining</h4><p>Zwembad Nekkerpool<br>Nekkerspoel-Borcht 19<br>2800 Mechelen</p><p>Dinsdag 20u30–22u00<br>Vrijdag 21u00–22u00</p><p><a href="tel:+32479997503">0479/99.75.03</a><br><a href="mailto:duikclubneptunus@gmail.com">duikclubneptunus@gmail.com</a></p><p>Club IBAN: BE60 9734 2110 9770</p></div>
  </div>
  <div class="copy">© <span id="yr"></span> Neptunus WVM · Prototype Variatie 5 — Dynamic &amp; Interactive</div>
</div></footer>`;
document.getElementById('yr').textContent = new Date().getFullYear();

const hdr = document.getElementById('hdr'), nav = document.getElementById('nav'), burger = hdr.querySelector('.burger');
burger.onclick = () => burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
const closeNav = () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); };
nav.addEventListener('click', e => e.target.closest('a') && closeNav());
addEventListener('keydown', e => e.key === 'Escape' && nav.classList.contains('open') && (closeNav(), burger.focus()));

const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
const lite = still || (navigator.connection && navigator.connection.saveData);
if (lite) document.querySelectorAll('video[autoplay]').forEach(v => { v.removeAttribute('autoplay'); v.pause(); v.removeAttribute('src'); v.querySelectorAll('source').forEach(x => x.remove()); });

// --- "De afdaling": page colour + text colour follow scroll depth (text colour chosen by luminance, always >= 4.5:1) ---
const STOPS = [[0, [232, 247, 254]], [.3, [143, 207, 240]], [.55, [20, 100, 170]], [.8, [17, 47, 91]], [1, [10, 28, 37]]];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const lum = ([r, g, b]) => { const f = c => (c /= 255) <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
document.body.insertAdjacentHTML('beforeend', '<div class="bubbles" aria-hidden="true"></div><div class="depth" aria-hidden="true"><div class="mk"><b>0 m</b></div></div>');
const bub = document.querySelector('.bubbles'), mk = document.querySelector('.depth .mk'), mkb = mk.querySelector('b'), root = document.documentElement.style;
if (!still) for (let i = 0; i < 22; i++) { const b = document.createElement('i'), s = 5 + Math.random() * 22; b.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;animation-duration:${10 + Math.random() * 14}s;animation-delay:${-Math.random() * 24}s;--dx:${(Math.random() - .5) * 120}px`; bub.appendChild(b); }

const para = [...document.querySelectorAll('[data-speed]')];
const imgs = [...document.querySelectorAll('.ph:not(.flat) img, .hero__media, .interlude video, .interlude .fallback')];
let ticking = false;
function frame() {
  ticking = false;
  const h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
  let k = 1; while (k < STOPS.length - 1 && p > STOPS[k][0]) k++;
  const [p0, c0] = STOPS[k - 1], [p1, c1] = STOPS[k], c = mix(c0, c1, (p - p0) / (p1 - p0)), dark = lum(c) <= .179;
  root.setProperty('--bg', `rgb(${c})`);
  root.setProperty('--fg', dark ? '#f2f8fb' : '#0a1c25');
  root.setProperty('--fg2', dark ? 'rgba(242,248,251,.78)' : 'rgba(10,28,37,.74)');
  root.setProperty('--link', dark ? '#7fdcff' : '#0058a8');
  root.setProperty('--line', dark ? 'rgba(255,255,255,.28)' : 'rgba(10,28,37,.18)');
  hdr.classList.toggle('scrolled', scrollY > 40);
  mk.style.top = p * 100 + '%'; mkb.textContent = Math.round(p * 40) + ' m';
  if (!still) {
    for (const el of imgs) { const r = el.parentElement.getBoundingClientRect(); if (r.bottom < -100 || r.top > innerHeight + 100) continue; el.style.transform = `translateY(${((r.top + r.height / 2 - innerHeight / 2) * -.06).toFixed(1)}px)`; }
    for (const el of para) { const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) continue; el.style.transform = `translateY(${((r.top + r.height / 2 - innerHeight / 2) * -(+el.dataset.speed)).toFixed(1)}px)`; }
  }
}
const tick = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick); frame();

// --- slide-in reveals (left / right / up, staggered) ---
document.querySelectorAll('.split>:first-child').forEach(e => e.classList.add('reveal', 'from-l'));
document.querySelectorAll('.split>:last-child').forEach(e => e.classList.add('reveal', 'from-r'));
document.querySelectorAll('.grid,.steps,.levels,.who-grid,.tiles,.stats,.chips').forEach(g => [...g.children].forEach((e, i) => { e.classList.add('reveal'); e.style.setProperty('--d', Math.min(i, 6) * .1 + 's'); }));
document.querySelectorAll('.sec-head,.cta,.callout,.table-wrap,.panel').forEach(e => e.classList.add('reveal'));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
const watch = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
watch(); window.watchReveal = watch;

// hero headline: words slide up
document.querySelectorAll('.hero h1').forEach(h => {
  let n = 0;
  (function walk(node) {
    [...node.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(w => {
          if (!w.trim()) { f.append(w); return; }
          const o = document.createElement('span'), i = document.createElement('span');
          o.className = 'w'; i.textContent = w; i.style.setProperty('--i', n++); o.append(i); f.append(o);
        });
        c.replaceWith(f);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
    });
  })(h);
});

// count-up numbers
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, to = +el.dataset.count, t0 = performance.now();
  (function step(t) { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - (1 - k) ** 3)); if (k < 1 && !still) requestAnimationFrame(step); else el.textContent = to; })(t0);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(e => cio.observe(e));

// tabs
document.querySelectorAll('[role=tablist]').forEach(tl => {
  const btns = [...tl.querySelectorAll('button')];
  btns.forEach(b => b.onclick = () => btns.forEach(o => { const on = o === b; o.setAttribute('aria-selected', on); document.getElementById(o.getAttribute('aria-controls')).classList.toggle('on', on); }));
});

// subtle 3D tilt on cards (mouse only)
if (!lite && matchMedia('(hover:hover)').matches) {
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card,.level,.task'); if (!c || !c.classList.contains('in')) return;
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transition = 'transform .12s'; c.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });
  document.addEventListener('pointerout', e => { const c = e.target.closest && e.target.closest('.card,.level,.task'); if (c && !c.contains(e.relatedTarget)) { c.style.transition = 'transform .5s var(--ease), opacity .9s'; c.style.transform = ''; } });
}

// pause videos that are off screen
const vio = new IntersectionObserver(es => es.forEach(e => e.target.hasAttribute('autoplay') && (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())));
document.querySelectorAll('video[autoplay]').forEach(v => vio.observe(v));

document.querySelectorAll('form[data-next],form[data-ok]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  if (f.dataset.next) location.href = f.dataset.next;
  else { f.querySelector('.ok').style.display = 'block'; f.reset(); }
}));

document.querySelectorAll('a[href^="http"]').forEach(l => { if (new URL(l.href).host !== location.host) { l.target = '_blank'; l.rel = 'noopener noreferrer'; } });
