/* =====================================================================
   JAVASCRIPT DEL SITIO
   Organizado por bloques independientes. Si un bloque no encuentra sus
   elementos, simplemente no hace nada (no genera errores en consola).
   ===================================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------------------
     0. Utilidades
     ------------------------------------------------------------------- */
  var qs  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var qsa = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  // Quita tildes y mayúsculas para que el buscador sea tolerante
  var normalizar = function (txt) {
    return (txt || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  var prefiereMenosMovimiento =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Apertura y cierre de capas con transición (visor y modal)
  var temporizadores = new WeakMap();
  var secuencia = new WeakMap(); // evita que una apertura pendiente reabra algo ya cerrado
  function abrirCapa(el, alTerminar) {
    if (!el) return;
    var s = (secuencia.get(el) || 0) + 1;
    secuencia.set(el, s);
    var t = temporizadores.get(el);
    if (t) { clearTimeout(t); temporizadores.delete(el); }
    el.hidden = false;
    var mostrar = function () {
      if (secuencia.get(el) !== s) return; // se cerró antes de pintar
      el.classList.add('is-open');
      if (alTerminar) alTerminar(); // el enfoque se hace cuando ya es visible
    };
    if (prefiereMenosMovimiento) { mostrar(); return; }
    requestAnimationFrame(mostrar);
  }
  function cerrarCapa(el) {
    if (!el) return;
    secuencia.set(el, (secuencia.get(el) || 0) + 1);
    el.classList.remove('is-open');
    temporizadores.set(el, window.setTimeout(function () { el.hidden = true; }, prefiereMenosMovimiento ? 0 : 280));
  }
  function trampaFoco(contenedor, evento) {
    if (evento.key !== 'Tab') return;
    var focos = qsa('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', contenedor)
      .filter(function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0; });
    if (!focos.length) return;
    var primero = focos[0];
    var ultimo = focos[focos.length - 1];
    if (evento.shiftKey && document.activeElement === primero) { evento.preventDefault(); ultimo.focus(); }
    else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primero.focus(); }
  }

  /* Capa activa (visor o modal). El teclado se escucha en el documento para
     que funcione aunque el foco siga en la tarjeta que abrió la capa. */
  var capaActiva = null;
  document.addEventListener('keydown', function (e) {
    if (!capaActiva) return;
    if (e.key === 'Escape') { e.preventDefault(); capaActiva.cerrar(); return; }
    if (e.key === 'ArrowLeft' && capaActiva.mover) { e.preventDefault(); capaActiva.mover(-1); return; }
    if (e.key === 'ArrowRight' && capaActiva.mover) { e.preventDefault(); capaActiva.mover(1); return; }
    trampaFoco(capaActiva.elemento, e);
  });

  /* -------------------------------------------------------------------
     1. Menú móvil accesible
     ------------------------------------------------------------------- */
  var navToggle = qs('#navToggle');
  var menuPrincipal = qs('#menu-principal');

  function cerrarMenu() {
    document.body.classList.remove('nav-abierto');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && menuPrincipal) {
    navToggle.addEventListener('click', function () {
      var abierto = document.body.classList.toggle('nav-abierto');
      navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    // Al elegir una opción, el menú se cierra solo
    qsa('a', menuPrincipal).forEach(function (enlace) {
      enlace.addEventListener('click', cerrarMenu);
    });
    // Escape cierra el menú
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarMenu();
    });
    // Clic fuera del encabezado cierra el menú
    document.addEventListener('click', function (e) {
      if (!document.body.classList.contains('nav-abierto')) return;
      if (!e.target.closest('.site-header')) cerrarMenu();
    });
    // Al pasar a escritorio se restablece el estado
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1023) cerrarMenu();
    });
  }

  /* -------------------------------------------------------------------
     2. Submenús del menú principal: se despliegan al pasar el mouse y
        también al hacer clic; la opción bajo el cursor se ilumina.
     ------------------------------------------------------------------- */
  (function submenusPrincipales() {
    var items = qsa('#menu-principal .menu__item');
    if (!items.length) return;

    function cerrarTodos(excepto) {
      items.forEach(function (it) { if (it !== excepto) it.classList.remove('is-abierto'); });
    }

    items.forEach(function (it) {
      var enlace = null, submenu = null;
      Array.prototype.forEach.call(it.children, function (hijo) {
        if (!enlace && hijo.tagName === 'A') enlace = hijo;
        if (!submenu && hijo.classList && hijo.classList.contains('submenu')) submenu = hijo;
      });
      if (!enlace || !submenu) return;

      /* Clic: despliega el submenú (en pantallas grandes). Un segundo clic ya
         deja seguir el enlace de la opción principal. */
      enlace.addEventListener('click', function (e) {
        if (window.innerWidth <= 1279) return;          // menú vertical: ya se ve
        if (it.classList.contains('is-abierto')) { it.classList.remove('is-abierto'); return; }
        e.preventDefault();
        cerrarTodos(it);
        it.classList.add('is-abierto');
      });

      /* Al elegir una opción del submenú se cierra y se resalta el destino. */
      submenu.addEventListener('click', function (e) {
        var destino = e.target.closest ? e.target.closest('a') : null;
        it.classList.remove('is-abierto');
        if (destino) {
          destino.classList.add('is-elegido');
          setTimeout(function () { destino.classList.remove('is-elegido'); }, 1400);
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('#menu-principal .menu__item')) cerrarTodos(null);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarTodos(null);
    });
  }());

  /* -------------------------------------------------------------------
     3. Sombra del encabezado al desplazarse / botón "volver arriba"
     ------------------------------------------------------------------- */
  var encabezado = qs('.site-header');
  var volverArriba = qs('#volverArriba');

  function alDesplazar() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (encabezado) encabezado.classList.toggle('is-scrolled', y > 8);
    if (volverArriba) volverArriba.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', alDesplazar, { passive: true });
  alDesplazar();

  if (volverArriba) {
    volverArriba.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento ? 'auto' : 'smooth' });
      var marca = qs('.marca');
      if (marca) marca.focus();
    });
  }

  /* -------------------------------------------------------------------
     4. Animación de aparición al hacer scroll
     ------------------------------------------------------------------- */
  var elementosRevelar = qsa('.js-revelar');
  if ('IntersectionObserver' in window && !prefiereMenosMovimiento) {
    var observadorRevelar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observadorRevelar.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    elementosRevelar.forEach(function (el) { observadorRevelar.observe(el); });
  } else {
    elementosRevelar.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------------------------------------------------------
     5. Menú: marcar la sección visible
     ------------------------------------------------------------------- */
  var enlacesMenu = qsa('.main-nav a[href^="#"]');
  var secciones = enlacesMenu
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && secciones.length) {
    var observadorSeccion = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        enlacesMenu.forEach(function (a) {
          var activo = a.getAttribute('href') === '#' + entrada.target.id;
          if (activo) { a.setAttribute('aria-current', 'true'); }
          else { a.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    secciones.forEach(function (s) { observadorSeccion.observe(s); });
  }

  /* -------------------------------------------------------------------
     6. Acordeón de "Quiénes somos"
     ------------------------------------------------------------------- */
  qsa('.acordeon__boton').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var panel = document.getElementById(boton.getAttribute('aria-controls'));
      var abierto = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', abierto ? 'false' : 'true');
      if (panel) panel.hidden = abierto;
    });
  });

  /* -------------------------------------------------------------------
     7. Filtro de proyectos por área
     ------------------------------------------------------------------- */
  var chips = qsa('.chip[data-filtro]');
  var contadorProyectos = qs('#contadorProyectos');
  var sinProyectos = qs('#sinProyectos');

  function aplicarFiltroProyectos(filtro) {
    // La lista se consulta en cada filtrado para admitir contenido publicado
    var proyectos = qsa('#listaProyectos .proyecto');
    var visibles = 0;
    proyectos.forEach(function (p) {
      var coincide = filtro === 'todos' || p.getAttribute('data-cat') === filtro;
      p.hidden = !coincide;
      if (coincide) visibles++;
    });
    qsa('.chip[data-filtro]').forEach(function (c) {
      c.setAttribute('aria-pressed', c.getAttribute('data-filtro') === filtro ? 'true' : 'false');
    });
    if (contadorProyectos) {
      contadorProyectos.textContent = visibles === 1
        ? 'Mostrando 1 proyecto.'
        : 'Mostrando ' + visibles + ' proyectos.';
    }
    if (sinProyectos) sinProyectos.hidden = visibles !== 0;
  }

  // Delegación: admite filtros añadidos al cargar contenido publicado
  document.addEventListener('click', function (e) {
    var chip = e.target.closest ? e.target.closest('.chip[data-filtro]') : null;
    if (!chip) return;
    aplicarFiltroProyectos(chip.getAttribute('data-filtro') || 'todos');
  });
  document.addEventListener('contenido-actualizado', function () { aplicarFiltroProyectos('todos'); });

  /* -------------------------------------------------------------------
     8. Buscador de noticias
     ------------------------------------------------------------------- */
  (function buscadorNoticias() {
    var campo = qs('#buscarNoticias');
    var limpiar = qs('#limpiarNoticias');
    var limpiar2 = qs('#limpiarNoticias2');
    var contador = qs('#contadorNoticias');
    var sinResultados = qs('#sinNoticias');
    if (!campo) return;

    var habiaBusqueda = false;
    function filtrar() {
      var q = normalizar(campo.value);
      /* Con una búsqueda activa se muestran todas las publicaciones, para que
         ninguna quede fuera por estar detrás del botón «Ver más». Al borrar
         la búsqueda, la lista vuelve a las 10 iniciales. */
      if (q && typeof window.IERP_MOSTRAR_TODAS_NOTICIAS === 'function') {
        window.IERP_MOSTRAR_TODAS_NOTICIAS();
      } else if (!q && habiaBusqueda && typeof window.IERP_PLEGAR_NOTICIAS === 'function') {
        window.IERP_PLEGAR_NOTICIAS();
      }
      habiaBusqueda = !!q;
      var tarjetas = qsa('#listaNoticias .noticia'); // se consulta cada vez
      var antiguas = qsa('#listaNoticiasAnteriores li');
      var visibles = 0;
      tarjetas.forEach(function (t) {
        var coincide = !q || normalizar(t.textContent).indexOf(q) !== -1;
        t.hidden = !coincide;
        if (coincide) visibles++;
      });
      /* Las publicaciones anteriores también entran en la búsqueda. */
      var antiguasVisibles = 0;
      antiguas.forEach(function (li) {
        var coincide = !q || normalizar(li.textContent).indexOf(q) !== -1;
        li.hidden = !coincide;
        if (coincide) antiguasVisibles++;
      });
      var cajaAnt = qs('#noticiasAnteriores');
      if (cajaAnt) cajaAnt.hidden = antiguas.length === 0 || (!!q && antiguasVisibles === 0);
      if (contador) {
        var halladas = visibles + antiguasVisibles;
        if (q) {
          contador.textContent = halladas === 1 ? '1 noticia encontrada' : halladas + ' noticias encontradas';
        } else if (typeof window.IERP_CUENTA_NOTICIAS === 'function') {
          /* Sin búsqueda, la cuenta la lleva el listado por partes. */
          window.IERP_CUENTA_NOTICIAS();
        }
      }
      if (sinResultados) sinResultados.hidden = visibles !== 0;
      if (limpiar) limpiar.hidden = !q;
    }

    function restablecer() {
      campo.value = '';
      filtrar();
      campo.focus();
    }

    campo.addEventListener('input', filtrar);
    if (limpiar) limpiar.addEventListener('click', restablecer);
    if (limpiar2) limpiar2.addEventListener('click', restablecer);
    document.addEventListener('contenido-actualizado', filtrar);
    filtrar();
  }());

  /* -------------------------------------------------------------------
     9. Buscador de documentos
     ------------------------------------------------------------------- */
  (function buscadorDocumentos() {
    var campo = qs('#buscarDocumentos');
    var limpiar = qs('#limpiarDocumentos');
    var limpiar2 = qs('#limpiarDocumentos2');
    var contador = qs('#contadorDocumentos');
    var sinResultados = qs('#sinDocumentos');
    var selAnio = qs('#filtroAnioDocumentos');
    if (!campo) return;

    function aniosDisponibles() {
      var C = window.CONTENIDO_IERP || {};
      var set = [];
      (C.documentos || []).forEach(function (d) {
        var a = d && d.anio ? String(d.anio).trim() : '';
        if (a && set.indexOf(a) === -1) set.push(a);
      });
      set.sort(function (a, b) { return String(b).localeCompare(String(a)); });
      return set;
    }

    function pintarAnios() {
      if (!selAnio) return;
      var actual = selAnio.value;
      var anios = aniosDisponibles();
      selAnio.innerHTML = '<option value="">Todos los años</option>' +
        anios.map(function (a) { return '<option value="' + a + '">' + a + '</option>'; }).join('');
      if (anios.indexOf(actual) !== -1) selAnio.value = actual;
    }

    function filtrar() {
      var tarjetas = qsa('#listaDocumentos .doc, #listaPlanes .doc'); // se consulta cada vez
      var q = normalizar(campo.value);
      var anio = selAnio ? selAnio.value : '';
      var visibles = 0;
      tarjetas.forEach(function (t) {
        var coincideTexto = !q || normalizar(t.textContent).indexOf(q) !== -1;
        var coincideAnio = !anio || String(t.getAttribute('data-anio') || '') === anio;
        var coincide = coincideTexto && coincideAnio;
        t.hidden = !coincide;
        if (coincide) visibles++;
      });
      var filtrando = !!q || !!anio;
      if (contador) {
        contador.textContent = filtrando
          ? (visibles === 1 ? '1 documento encontrado' : visibles + ' documentos encontrados')
          : (tarjetas.length === 1 ? '1 documento publicado' : tarjetas.length + ' documentos publicados');
      }
      if (sinResultados) sinResultados.hidden = visibles !== 0;
      if (limpiar) limpiar.hidden = !filtrando;
    }

    function restablecer() {
      campo.value = '';
      if (selAnio) selAnio.value = '';
      filtrar();
      campo.focus();
    }

    campo.addEventListener('input', filtrar);
    if (selAnio) selAnio.addEventListener('change', filtrar);
    if (limpiar) limpiar.addEventListener('click', restablecer);
    if (limpiar2) limpiar2.addEventListener('click', restablecer);
    document.addEventListener('contenido-actualizado', function () { pintarAnios(); filtrar(); });
    pintarAnios();
    filtrar();
  }());

  /* -------------------------------------------------------------------
     10. Visor de imágenes (galería) con navegación por teclado
     ------------------------------------------------------------------- */
  (function visorGaleria() {
    var visor = qs('#visor');
    if (!visor) return;

    var imgVisor = qs('#visorImagen');
    var textoVisor = qs('#visorTexto');
    var btnCerrar = qs('#visorCerrar');
    var btnPrev = qs('#visorAnterior');
    var btnNext = qs('#visorSiguiente');
    var indice = 0;
    var disparador = null;
    var imagenes = [];

    var enlaceGrande = qs('#visorAbrir');
    /* Todo lo que se puede ampliar con un toque: las fotos de la galería (si
       la hay) y las fotografías de las noticias y los proyectos. Se recorren
       en orden de aparición para que la numeración coincida siempre. */
    var SEL_AMPLIABLE = '.galeria__boton, .card__media img';

    /* Marca cada foto como «se puede ampliar», también para quien navega con
       el teclado. Se repite al abrir el visor porque las noticias se dibujan
       después de que la página termina de cargar. */
    function marcarAmpliables() {
      qsa(SEL_AMPLIABLE).forEach(function (el) {
        if (el.tagName !== 'IMG') return;
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
        if (!el.hasAttribute('title')) el.setAttribute('title', 'Ver la foto en grande');
      });
    }

    // Las imágenes se recogen en cada apertura: así el visor funciona también
    // con la galería que se reemplaza al cargar el contenido publicado.
    function recoger() {
      marcarAmpliables();
      imagenes = qsa(SEL_AMPLIABLE).map(function (el) {
        var esImg = el.tagName === 'IMG';
        var img = esImg ? el : qs('img', el);
        var pie = esImg ? null : qs('figcaption', el);
        var tarjeta = el.closest ? el.closest('.card') : null;
        var titulo = tarjeta ? qs('h3', tarjeta) : null;
        var texto = pie ? pie.textContent.replace(/\s+/g, ' ').trim()
          : (titulo ? titulo.textContent.replace(/\s+/g, ' ').trim() : '');
        return {
          src: img ? (img.getAttribute('src') || '') : '',
          alt: img ? (img.getAttribute('alt') || '') : '',
          texto: texto || 'Imagen de la galería'
        };
      });
      return imagenes;
    }

    function pintar() {
      var actual = imagenes[indice];
      if (!actual) return;
      imgVisor.setAttribute('src', actual.src);
      imgVisor.setAttribute('alt', actual.alt);
      textoVisor.textContent = actual.texto + '  \u00B7  Imagen ' + (indice + 1) + ' de ' + imagenes.length;
      /* El enlace abre el archivo original en otra pestaña: ahí sí se puede
         acercar con los dedos y leer los textos pequeños de los afiches. */
      if (enlaceGrande) {
        if (actual.src) { enlaceGrande.setAttribute('href', actual.src); enlaceGrande.hidden = false; }
        else { enlaceGrande.hidden = true; }
      }
    }

    function abrir(i, boton) {
      disparador = boton || null;
      if (!recoger().length) return;
      indice = (i >= 0 && i < imagenes.length) ? i : 0;
      pintar();
      abrirCapa(visor, function () { if (btnCerrar) btnCerrar.focus(); });
      capaActiva = { elemento: visor, cerrar: cerrar, mover: mover };
    }

    function mover(paso) {
      if (!imagenes.length) return;
      indice = (indice + paso + imagenes.length) % imagenes.length;
      pintar();
    }

    function cerrar() {
      capaActiva = null;
      cerrarCapa(visor);
      if (disparador) disparador.focus();
    }

    // Delegación de eventos: funciona con la galería estática, la publicada y
    // las fotografías de las noticias (se amplían con un toque o con Enter).
    function elementoAmpliable(e) {
      return e.target && e.target.closest ? e.target.closest(SEL_AMPLIABLE) : null;
    }

    document.addEventListener('click', function (e) {
      var el = elementoAmpliable(e);
      if (!el) return;
      abrir(qsa(SEL_AMPLIABLE).indexOf(el), el);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      var el = elementoAmpliable(e);
      if (!el) return;
      e.preventDefault();
      abrir(qsa(SEL_AMPLIABLE).indexOf(el), el);
    });

    // Las fotos que ya vienen en el HTML quedan listas desde el comienzo.
    marcarAmpliables();
    // Y las que dibujan otros bloques, cuando la página termina de cargar.
    window.addEventListener('load', marcarAmpliables);

    if (btnCerrar) btnCerrar.addEventListener('click', cerrar);
    if (btnPrev) btnPrev.addEventListener('click', function () { mover(-1); });
    if (btnNext) btnNext.addEventListener('click', function () { mover(1); });

    visor.addEventListener('click', function (e) {
      if (e.target === visor || e.target.classList.contains('overlay__caja')) cerrar();
    });
  }());

  /* -------------------------------------------------------------------
     11. Ventana modal para proyectos y noticias
     ------------------------------------------------------------------- */
  (function ventanaModal() {
    var modal = qs('#modal');
    var titulo = qs('#modalTitulo');
    var cuerpo = qs('#modalCuerpo');
    var btnCerrar = qs('#modalCerrar');
    if (!modal) return;

    var disparador = null;

    function abrir(datos) {
      titulo.textContent = datos.titulo;
      cuerpo.innerHTML = datos.html;
      /* Si el detalle trae el carrusel con todas las fotos, se pone a girar. */
      if (typeof window.IERP_INICIAR_CARRUSELES === 'function') window.IERP_INICIAR_CARRUSELES(cuerpo);
      abrirCapa(modal, function () { if (btnCerrar) btnCerrar.focus(); });
      capaActiva = { elemento: modal, cerrar: cerrar };
    }

    function cerrar() {
      capaActiva = null;
      cerrarCapa(modal);
      if (disparador) disparador.focus();
    }

    // Delegación de eventos: admite tarjetas creadas dinámicamente
    document.addEventListener('click', function (e) {
      var boton = e.target.closest ? e.target.closest('[data-modal]') : null;
      if (!boton) return;
      disparador = boton;
      var plantilla = document.getElementById(boton.getAttribute('data-modal'));
      if (!plantilla) return;

      // El título se toma del encabezado de la tarjeta donde está el botón
      var tarjeta = boton.closest('.card') || boton.closest('article');
      var h3 = tarjeta ? qs('h3', tarjeta) : null;
      var fecha = tarjeta ? qs('.noticia__fecha', tarjeta) : null;
      var etiqueta = tarjeta ? qs('.noticia__etiqueta', tarjeta) : null;

      var tituloTexto = h3 ? h3.textContent.trim() : 'Información';
      if (fecha) tituloTexto = fecha.textContent.replace(/\s+/g, ' ').trim() + ' \u2014 ' + tituloTexto;
      else if (etiqueta) tituloTexto = etiqueta.textContent.trim() + ' \u2014 ' + tituloTexto;

      abrir({ titulo: tituloTexto, html: plantilla.innerHTML });
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrar);
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('overlay__caja')) cerrar();
    });
  }());

  /* -------------------------------------------------------------------
     11.2 Listado de docentes (datos/docentes.js)
     ------------------------------------------------------------------- */
  (function listadoDocentes() {
    var caja = qs('#docentesLista');
    var D = window.DOCENTES_IERP;
    if (!caja || !D || !D.docentes || !D.docentes.length) return;

    function limpia(t) {
      return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    var grupos = {};
    D.docentes.forEach(function (d) {
      if (!d || !d.nombre) return;
      var sede = d.sede || 'Sede central';
      if (!grupos[sede]) grupos[sede] = [];
      grupos[sede].push(d);
    });

    function prioridad(nombre) {
      return nombre === 'Rectoría' ? 0 : (nombre === 'Sede central' ? 1 : 2);
    }
    var sedes = Object.keys(grupos).sort(function (a, b) {
      return prioridad(a) !== prioridad(b) ? prioridad(a) - prioridad(b) : a.localeCompare(b, 'es');
    });

    caja.innerHTML = sedes.map(function (sede) {
      var lista = grupos[sede].slice().sort(function (a, b) {
        return String(a.nombre).localeCompare(String(b.nombre), 'es');
      });
      var items = lista.map(function (d) {
        return '<li class="docente"><b>' + limpia(d.nombre) + '</b>' +
          (d.cargo ? '<span class="docente__cargo">' + limpia(d.cargo) + '</span>' : '') +
          (d.area ? '<span class="docente__area">Área: ' + limpia(d.area) + '</span>' : '') +
          '</li>';
      }).join('');
      return '<h3 class="docentes__titulo">' + limpia(sede) +
        '<span class="docentes__n">' + lista.length + '</span></h3>' +
        '<ul class="docentes__grid">' + items + '</ul>';
    }).join('');

    var nota = qs('#docentesNota');
    if (nota && D.nota) nota.textContent = D.nota;
  }());

  /* -------------------------------------------------------------------
     12. Formulario de contacto (envía a los correos institucionales)
     ------------------------------------------------------------------- */
  (function formularioContacto() {
    var form = qs('#formContacto');
    var estado = qs('#estadoForm');
    if (!form || !estado) return;

    var DESTINOS = 'ierpuertorosario@gmail.com';
    var boton = form.querySelector('button[type="submit"]');
    var textoBoton = boton ? boton.innerHTML : '';
    var valor = function (sel) { var c = qs(sel, form); return c ? c.value : ''; };

    function nota(clase, icono, html) {
      estado.innerHTML = '<div class="nota nota--' + clase + '" role="note">' +
        '<svg class="icon" aria-hidden="true"><use href="#' + icono + '"></use></svg>' +
        '<div>' + html + '</div></div>';
    }

    function correoAlterno() {
      var cuerpo = 'Nombre: ' + valor('#nombre') + '\n' +
                   'Correo: ' + valor('#correo') + '\n' +
                   'Asunto: ' + valor('#asunto') + '\n\n' + valor('#mensaje');
      return 'mailto:' + DESTINOS +
        '?subject=' + encodeURIComponent('Mensaje desde el sitio web del IER Puerto Rosario') +
        '&body=' + encodeURIComponent(cuerpo);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        nota('alerta', 'ico-alerta',
          '<p><strong>Revise los campos obligatorios.</strong> Complete nombre, correo, asunto y mensaje para continuar.</p>');
        return;
      }

      var datos = {
        _subject: 'Nuevo mensaje desde el sitio web del IER Puerto Rosario',
        _cc: 'ierpuertorosario1@gmail.com',
        _template: 'table',
        Nombre: valor('#nombre'),
        Correo: valor('#correo'),
        Asunto: valor('#asunto'),
        Mensaje: valor('#mensaje')
      };

      if (boton) { boton.disabled = true; boton.innerHTML = 'Enviando…'; }
      nota('info', 'ico-reloj', '<p>Enviando su mensaje…</p>');

      fetch('https://formsubmit.co/ajax/ierpuertorosario@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(datos)
      }).then(function (r) {
        if (!r.ok) throw new Error('respuesta ' + r.status);
        return r.json();
      }).then(function () {
        nota('info', 'ico-ver',
          '<p><strong>Mensaje enviado.</strong> Gracias por escribirnos: su mensaje llegó al correo institucional y le responderemos lo antes posible.</p>');
        form.reset();
      }).catch(function () {
        nota('alerta', 'ico-alerta',
          '<p><strong>No se pudo enviar automáticamente.</strong> Escríbanos a ' +
          '<a href="mailto:ierpuertorosario@gmail.com">ierpuertorosario@gmail.com</a>, ' +
          'o <a href="' + correoAlterno() + '">abra su correo con el mensaje ya escrito</a>.</p>');
      }).finally(function () {
        if (boton) { boton.disabled = false; boton.innerHTML = textoBoton; }
      });
    });
  }());

  /* -------------------------------------------------------------------
     13. Año actual en el pie de página
     ------------------------------------------------------------------- */
  var anio = qs('#anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------------
     14. Contador de visitas del sitio (el conteo inicia en 401)
     ------------------------------------------------------------------- */
  (function contadorVisitas() {
    var caja = qs('#contadorVisitas');
    var num = qs('#contadorNumero');
    if (!caja || !num) return;
    var BASE = 400;

    /* Si el servicio de conteo no responde, se muestra una raya (—) en vez
       de un número equivocado. */
    fetch('https://abacus.jasoncameron.dev/hit/ier-puerto-rosario-sitio/visitas')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var total = BASE + (d && typeof d.value === 'number' ? d.value : 0);
        num.textContent = total.toLocaleString('es-CO');
        caja.hidden = false;
      })
      .catch(function () {
        num.textContent = '—';
        caja.hidden = false;
      });
  }());

  /* -------------------------------------------------------------------
     15. Audio de fondo: suena muy bajo desde que se abre la página y se
         puede detener en cualquier momento con el botón discreto.
     ------------------------------------------------------------------- */
  (function audioDeFondo() {
    var btn = qs('#btnAudioFondo');
    var audio = qs('#audioFondo');
    var barra = qs('#audioVolumen');
    if (!btn || !audio) return;

    var VOLUMEN_BAJO = 0.05; // al abrir la página SIEMPRE entra con el volumen mínimo
    var intervenido = false;

    function pintarBarra(n) {
      if (!barra) return;
      barra.style.setProperty('--nivel', n + '%');
      barra.setAttribute('aria-valuetext', n + ' por ciento');
    }

    /* Al entrar a la página el volumen arranca en el mínimo. Cada persona lo
       sube si quiere: así nadie recibe la música fuerte al abrir. */
    audio.volume = VOLUMEN_BAJO;
    if (barra) { barra.value = Math.round(VOLUMEN_BAJO * 100); pintarBarra(barra.value); }

    function pintar(activo) {
      btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
      btn.setAttribute('aria-label', activo ? 'Detener la música de fondo' : 'Activar la música de fondo');
      btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#' +
        (activo ? 'ico-sonido' : 'ico-silencio') + '"></use></svg>';
      btn.classList.toggle('is-sonando', activo);
      if (activo) btn.classList.remove('is-sugerido');
    }

    function arrancar() {
      var p = audio.play();
      if (p && p.then) {
        p.then(function () { pintar(true); })['catch'](function () {
          pintar(false);
          btn.classList.add('is-sugerido'); // el navegador la bloqueó: se ofrece el botón
        });
      } else {
        pintar(true);
      }
    }

    btn.addEventListener('click', function () {
      intervenido = true;
      btn.classList.remove('is-sugerido');
      if (audio.paused) { arrancar(); } else { audio.pause(); pintar(false); }
    });

    /* La barra de volumen: quien la mueve quiere oír la música. */
    if (barra) {
      barra.addEventListener('input', function () {
        var v = Math.max(0, Math.min(1, parseFloat(barra.value) / 100));
        audio.volume = v;
        pintarBarra(barra.value);
      });
      barra.addEventListener('change', function () {
        intervenido = true;
        btn.classList.remove('is-sugerido');
        if (audio.paused && parseFloat(barra.value) > 0) arrancar();
      });
    }

    pintar(false);
    /* La música ya no se descarga al abrir la página: así quien no la oye no
       gasta datos. Se carga y suena en el primer toque, clic o tecla. */

    // Los navegadores suelen pedir un primer gesto de la persona:
    // al primer toque, tecla o desplazamiento, la música arranca.
    var despertar = function () {
      if (!intervenido && audio.paused) arrancar();
      window.removeEventListener('pointerdown', despertar);
      window.removeEventListener('keydown', despertar);
      window.removeEventListener('scroll', despertar);
    };
    window.addEventListener('pointerdown', despertar);
    window.addEventListener('keydown', despertar);
    window.addEventListener('scroll', despertar);
  }());

  /* -------------------------------------------------------------------
     16. Multimedia: publica los videos cargados en datos/contenido.js
     ------------------------------------------------------------------- */
  (function multimedia() {
    var seccion = qs('#multimedia');
    var caja = qs('#multimediaGrid');
    if (!seccion || !caja) return;

    var todos = (window.CONTENIDO_IERP && window.CONTENIDO_IERP.videos) || [];
    var videos = todos.filter(function (v) { return v && v.archivo; });
    if (!videos.length) return;

    seccion.hidden = false;
    caja.innerHTML = videos.map(function (v) {
      var poster = v.poster ? ' poster="' + v.poster + '"' : '';
      var fecha = v.fecha
        ? '<span class="video-card__fecha"><svg class="icon" aria-hidden="true"><use href="#ico-calendario"></use></svg>' + v.fecha + '</span>'
        : '';
      var pie = v.descripcion ? '<p>' + v.descripcion + '</p>' : '';
      var enlace = v.facebook
        ? '<p style="margin:.8rem 0 0"><a class="btn btn--claro btn--sm" href="' + v.facebook +
          '" target="_blank" rel="noopener noreferrer">Ver en Facebook ' +
          '<svg class="icon" aria-hidden="true"><use href="#ico-externo"></use></svg></a></p>'
        : '';
      return '<article class="video-card">' +
        '<video controls preload="none" playsinline' + poster + ' src="' + v.archivo + '"></video>' +
        '<div class="video-card__cuerpo">' + fecha +
        '<h3>' + (v.titulo || 'Video institucional') + '</h3>' + pie + enlace +
        '</div></article>';
    }).join('');

    // El video del Día de la IA se muestra, además, en el bloque destacado
    var ia = videos.filter(function (v) { return v.id === 'ia'; })[0];
    var media = qs('.destacado__media');
    if (ia && media) {
      media.innerHTML = '<video controls preload="none" playsinline' +
        (ia.poster ? ' poster="' + ia.poster + '"' : '') +
        ' src="' + ia.archivo + '"></video>';
      media.classList.add('destacado__media--video');
    }
  }());

}());
