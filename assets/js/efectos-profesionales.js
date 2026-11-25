/* =====================================================================
   EFECTOS PROFESIONALES UNIFICADOS — I.E.R. Puerto Rosario (27/11/2026)
   Onda al hacer clic, aviso de carga y entrada escalonada de tarjetas.
   No modifica el contenido ni el funcionamiento del sitio.
   ===================================================================== */
(function () {
  'use strict';

  var SELECTOR = '.btn,.boton,.rapido,.chip,.doc-filtro,.acordeon__boton,' +
    '.texto-plegable__boton,.nav-toggle,.hero__ctrl,.visor__nav,.cerrar,' +
    '.buscar__abrir,.buscar__limpiar,.volver-arriba,.btn-audio,' +
    '.adm-nav button,.icono-btn,button';
  var TARJETAS = '.card,.noticia,.rapido,.doc__item,.galeria__item,.nivel';
  var sinMovimiento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Onda circular al hacer clic -------------------------- */
  document.addEventListener('click', function (e) {
    if (sinMovimiento) return;
    var b = e.target && e.target.closest ? e.target.closest(SELECTOR) : null;
    if (!b || b.disabled || b.getAttribute('aria-disabled') === 'true') return;
    var r = b.getBoundingClientRect();
    var onda = document.createElement('span');
    onda.className = 'fx-onda';
    onda.style.left = ((e.clientX || r.left + r.width / 2) - r.left) + 'px';
    onda.style.top = ((e.clientY || r.top + r.height / 2) - r.top) + 'px';
    b.appendChild(onda);
    window.setTimeout(function () { if (onda.parentNode) onda.remove(); }, 600);
  }, true);

  /* ---------- Aviso de carga al enviar formularios ------------------ */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    var b = f.querySelector('button[type="submit"],input[type="submit"],.btn,.boton');
    if (!b) return;
    b.classList.add('fx-cargando');
    if (!b.querySelector('.fx-estado')) {
      var s = document.createElement('span');
      s.className = 'fx-estado';
      s.textContent = 'Procesando…';
      b.appendChild(s);
    }
    window.setTimeout(function () {
      b.classList.remove('fx-cargando');
      var s = b.querySelector('.fx-estado');
      if (s && s.parentNode) s.remove();
    }, 2500);
  }, true);

  /* ---------- Entrada escalonada de tarjetas al bajar la página ---- */
  var observador = null;
  if (!sinMovimiento && 'IntersectionObserver' in window) {
    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        var elemento = en.target;
        var pos = Number(elemento.getAttribute('data-fx-indice') || 0);
        elemento.style.transitionDelay = ((pos % 6) * 0.05) + 's';
        elemento.classList.add('fx-visto');
        observador.unobserve(elemento);
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
  }

  var indice = 0;
  function marcar(root) {
    if (!root || !root.querySelectorAll) return;
    var encontrados = root.querySelectorAll(TARJETAS);
    if (root.matches && root.matches(TARJETAS)) {
      encontrados = [root].concat(Array.prototype.slice.call(encontrados));
    }
    encontrados.forEach(function (el) {
      if (el.classList.contains('fx-revelar') || el.classList.contains('fx-visto')) return;
      el.classList.add('fx-revelar');
      el.setAttribute('data-fx-indice', indice++);
      if (observador) observador.observe(el);
      else el.classList.add('fx-visto');
    });
  }

  function iniciar() { marcar(document.body); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  /* Las noticias se dibujan después con JavaScript: se vigilan las
     tarjetas nuevas para que también entren escalonadamente. */
  if (window.MutationObserver) {
    var vigia = new MutationObserver(function (cambios) {
      cambios.forEach(function (c) {
        (c.addedNodes || []).forEach(function (n) {
          if (n.nodeType === 1) marcar(n);
        });
      });
    });
    vigia.observe(document.body, { childList: true, subtree: true });
  }
}());
