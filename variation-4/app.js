// Shared header/footer + behaviours. ponytail: JS-injected chrome keeps 13 pages DRY; swap for a build step if SEO matters.
const LIVE = 'https://www.duikclubneptunus.be';
const page = location.pathname.split('/').pop() || 'index.html';
const cur = h => (h.split('#')[0] === page ? ' aria-current="page"' : '');
const a = (h, t) => `<a href="${h}"${cur(h)}>${t}</a>`;
const NAV = [
  ['Onze club', 'bestuur.html', [['Ontmoet het bestuur', 'bestuur.html'], ['Leren duiken', 'leren-duiken.html'], ['Brevetten', 'brevetten.html'], ['Uitlenen van materiaal', 'materiaal.html'], ['Lidgeld en homologatie', 'lidgeld.html'], ['Agenda en activiteiten', 'agenda.html'], ['Sfeerbeelden', 'sfeerbeelden.html']]],
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
<div class="announce">Gratis initiatie in zwembad Nekkerpool, elke dinsdag en vrijdag. <a href="leren-duiken.html">Kom proberen →</a></div>
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
  <div class="copy">© <span id="yr"></span> Neptunus WVM · Prototype Variatie 4 — Community-Focused</div>
</div></footer>`;
if (page !== 'inschrijven.html' && page !== 'bedanking.html') document.body.insertAdjacentHTML('beforeend', '<a class="float-cta" href="inschrijven.html">Lid worden <span class="arrow">→</span></a>');
document.getElementById('yr').textContent = new Date().getFullYear();

const hdr = document.getElementById('hdr'), nav = document.getElementById('nav'), burger = hdr.querySelector('.burger');
burger.onclick = () => { nav.style.top = hdr.getBoundingClientRect().bottom + 'px'; burger.setAttribute('aria-expanded', nav.classList.toggle('open')); };
nav.addEventListener('click', e => e.target.closest('a') && nav.classList.remove('open'));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
const watch = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
watch(); window.watchReveal = watch;

document.querySelectorAll('form[data-next],form[data-ok]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  if (f.dataset.next) location.href = f.dataset.next;
  else { f.querySelector('.ok').style.display = 'block'; f.reset(); }
}));

document.querySelectorAll('a[href^="http"]').forEach(l => { if (new URL(l.href).host !== location.host) { l.target = '_blank'; l.rel = 'noopener noreferrer'; } });
