(function () {
  'use strict';
  var caja = document.getElementById('mapaEscuela');
  if (!caja || typeof L === 'undefined') return;

  /* Coordenadas reales tomadas de OpenStreetMap (no son inventadas). */
  var VEREDA = [0.9667403, -76.2662208];    /* Vereda Puerto Rosario */
  var CABECERA = [0.9648984, -76.4078340];  /* Cabecera municipal de Puerto Guzmán */

  function montar() {
    if (caja.getAttribute('data-mapa') === 'listo') return;
    try {
      caja.setAttribute('data-mapa', 'listo');
      caja.innerHTML = '';
      var mapa = L.map(caja, {
        dragging: !L.Browser.mobile,  /* en el celular el dedo sigue moviendo la página */
        scrollWheelZoom: false,       /* la rueda del ratón no se roba la página */
        keyboard: false,
        minZoom: 9,
        maxZoom: 13
      });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Mapa: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
      }).addTo(mapa);

      function ponerMarca(punto, clase, texto, titulo) {
        return L.marker(punto, {
          icon: L.divIcon({
            className: 'marca-ier ' + clase,
            html: '<span class="marca-ier__punto"></span><span class="marca-ier__texto">' + texto + '</span>',
            iconSize: [0, 0],
            iconAnchor: [0, 0]
          }),
          title: titulo,
          alt: titulo
        }).addTo(mapa);
      }
      ponerMarca(VEREDA, 'marca-ier--oro', 'Puerto Rosario', 'Vereda Puerto Rosario');
      ponerMarca(CABECERA, 'marca-ier--azul', 'Puerto Guzmán', 'Cabecera municipal de Puerto Guzmán');

      mapa.fitBounds([VEREDA, CABECERA], { padding: [42, 42] });
      mapa.invalidateSize();
    } catch (e) {
      /* Si algo falla, se vuelve a dejar el croquis de respaldo. */
      caja.removeAttribute('data-mapa');
      caja.innerHTML = '<img src="assets/img/mapa-zona.svg" width="900" height="480" decoding="async" alt="Croquis orientativo de la vereda Puerto Rosario y del municipio de Puerto Guzmán">';
    }
  }

  function cuandoSeVea() {
    if (typeof IntersectionObserver !== 'function') { montar(); return; }
    var observador = new IntersectionObserver(function (entradas) {
      for (var i = 0; i < entradas.length; i++) {
        if (entradas[i].isIntersecting) { observador.disconnect(); montar(); return; }
      }
    }, { rootMargin: '400px 0px' });
    observador.observe(caja);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cuandoSeVea);
  } else {
    cuandoSeVea();
  }
}());
