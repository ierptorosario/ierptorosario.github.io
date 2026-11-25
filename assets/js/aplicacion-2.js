/* =====================================================================
   CARGADOR DEL CONTENIDO PUBLICADO  (datos/contenido.js)
   ---------------------------------------------------------------------
   El panel institucional (admin.html) genera el archivo datos/contenido.js
   con la variable global CONTENIDO_IERP. Si la página no lo carga o el
   archivo falta, este bloque no hace nada y el sitio conserva el contenido
   que ya viene escrito en la página.
   ===================================================================== */
(function () {
  'use strict';

  var C = window.CONTENIDO_IERP;
  if (!C || typeof C !== 'object') return;

  var qs  = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (t) {
    return (t == null ? '' : String(t)).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };
  var hay = function (v) { return v !== undefined && v !== null && String(v).trim() !== ''; };
  var limpiarTitulo = function (t) {
    return String(t || '')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}\u{2B00}-\u{2BFF}]/gu, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/^[\s\-–—·,]+|[\s\-–—·,]+$/g, '')
      .trim();
  };
  var ico = function (n, clase) { return '<svg class="' + (clase || 'icon') + '" aria-hidden="true"><use href="#ico-' + n + '"></use></svg>'; };
  var img = function (ruta, respaldo) { return esc(hay(ruta) ? ruta : respaldo); };
  /* Imágenes en WebP cuando existen; si no, el navegador usa el JPG de respaldo. */
  var webpFuentes = function (ruta, respaldo) {
    var principal = img(ruta, respaldo);
    var webp = principal.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    var pequena = principal.replace(/\.(jpg|jpeg|png)$/i, '-720.webp');
    return '<source type="image/webp" media="(max-width:700px)" srcset="' + esc(pequena) + '">' +
      '<source type="image/webp" srcset="' + esc(webp) + '">';
  };
  /* Si una foto nueva todavía no tiene WebP (las traiga el actualizador
     mañana), se quitan las fuentes WebP y se usa directamente el JPG. */
  document.addEventListener('error', function (e) {
    var im = e.target;
    if (!im || im.tagName !== 'IMG') return;
    var pic = im.parentElement;
    if (!pic || pic.tagName !== 'PICTURE') return;
    var jpg = im.getAttribute('src');
    if (!jpg) return;
    var fuentes = qsa('source', pic);
    fuentes.forEach(function (s) { s.remove(); });
    im.removeAttribute('src');
    im.src = jpg;
  }, true);
  /* Cambiar una foto dentro de un <picture> exige cambiar también sus
     fuentes WebP; si no, el navegador seguiría mostrando la foto anterior. */
  var ponerFoto = function (im, ruta) {
    if (!im || !hay(ruta)) return;
    var pic = im.parentElement;
    if (pic && pic.tagName === 'PICTURE') {
      var fuentes = qsa('source', pic);
      if (fuentes.length) {
        var base = ruta.replace(/\.(jpg|jpeg|png)$/i, '');
        fuentes[0].setAttribute('srcset', base + '-720.webp');
        if (fuentes[1]) fuentes[1].setAttribute('srcset', base + '.webp');
      }
    }
    im.src = ruta;
  };
  var sinTildes = function (t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  /* Textos largos dentro de una tarjeta: se muestran en cuatro líneas y
     aparece el botón «Ver más». Si el texto cabe completo, no se pone botón.
     Sin JavaScript el texto se ve completo (nada se pierde). */
  function plegarCajas(raiz) {
    qsa('.texto-plegable', raiz || document).forEach(function (caja) {
      if (caja.getAttribute('data-plegado') === 'listo') return;
      var cuerpo = qs('.texto-plegable__cuerpo', caja);
      var boton = qs('.texto-plegable__boton', caja);
      if (!cuerpo || !boton) return;
      caja.setAttribute('data-plegado', 'listo');
      caja.classList.add('texto-plegable--cortado');
      if (cuerpo.scrollHeight <= cuerpo.clientHeight + 4) {   // cabe completo
        caja.classList.remove('texto-plegable--cortado');
        boton.hidden = true;
        return;
      }
      boton.hidden = false;
      boton.addEventListener('click', function () {
        var cortado = caja.classList.toggle('texto-plegable--cortado');
        boton.setAttribute('aria-expanded', cortado ? 'false' : 'true');
        var txt = qs('.texto-plegable__txt', boton);
        if (txt) txt.textContent = cortado ? 'Ver más' : 'Ver menos';
      });
    });
  }

  var prefiereMenosMovimiento =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Carrusel automático de fotografías (tarjetas de noticias).
     Rota cada 2 segundos, se pausa al pasar el mouse o al enfocar y
     respeta la preferencia de movimiento reducido. */
  function iniciarCarruseles(raiz) {
    qsa('.noticia__carrusel', raiz || document).forEach(function (c) {
      if (c.getAttribute('data-carrusel-listo') === '1') return;
      c.setAttribute('data-carrusel-listo', '1');
      var imgs = qsa('.carrusel__img', c);
      if (imgs.length < 2 || prefiereMenosMovimiento) return;
      var puntos = qsa('.carrusel__puntos i', c);
      var intervalo = parseInt(c.getAttribute('data-intervalo') || '2000', 10);
      if (isNaN(intervalo) || intervalo < 1000) intervalo = 2000;
      var i = 0, pausado = false;
      var pausar = function () { pausado = true; };
      var seguir = function () { pausado = false; };
      c.addEventListener('mouseenter', pausar);
      c.addEventListener('mouseleave', seguir);
      c.addEventListener('focusin', pausar);
      c.addEventListener('focusout', seguir);
      var precargar = function (im) {
        if (!im || !im.getAttribute('src')) return;
        var p = new Image();
        p.src = im.getAttribute('src');
      };
      precargar(imgs[1]); /* adelanta la siguiente foto para que no parpadee */
      var temporizador = window.setInterval(function () {
        /* Si la ventana se cerró o la tarjeta se volvió a dibujar, se detiene
           el temporizador para no acumular trabajo ni memoria. */
        if (!c.isConnected) { window.clearInterval(temporizador); return; }
        if (pausado || document.hidden) return;
        imgs[i].classList.remove('is-activa');
        if (puntos[i]) puntos[i].classList.remove('is-activo');
        i = (i + 1) % imgs.length;
        imgs[i].classList.add('is-activa');
        if (puntos[i]) puntos[i].classList.add('is-activo');
        precargar(imgs[(i + 1) % imgs.length]);
      }, intervalo);
    });
  }
  /* La ventana «Leer más» está en otro bloque de la página: se comparte la
     función para que también haga girar el carrusel con todas las fotos. */
  window.IERP_INICIAR_CARRUSELES = iniciarCarruseles;

  /* --------- Contenido automático (lo genera el actualizador) ---------
     window.CONTENIDO_AUTO trae lo que el actualizador agregó por sí solo:
     los documentos que la institución dejó en la carpeta «entrada» y las
     publicaciones de la página de Facebook. Se combina con el contenido
     publicado y NUNCA borra lo que ya existía. */
  var AUTO = window.CONTENIDO_AUTO;
  if (AUTO && typeof AUTO === 'object') {
    var claveTexto = function (t) { return sinTildes(t).replace(/[^a-z0-9]+/g, ' ').trim(); };

    /* Id de un permalink de Facebook (para detectar repetidos aunque el
       enlace tenga distinta variación textual del título). */
    var idDeEnlace = function (u) {
      var m = /\/posts\/(\d+)/.exec(String(u || ''));
      return m ? m[1] : '';
    };

    /* Noticias automáticas de Facebook (coleccionadas por el actualizador
       a partir del permalink de cada publicación): se agregan SIN repetir
       el enlace y SIN borrar lo que ya existía. */
    var NAUTO = window.CONTENIDO_NOTICIAS_AUTO;
    if (NAUTO && typeof NAUTO === 'object' && Array.isArray(NAUTO.noticias) && NAUTO.noticias.length) {
      if (!Array.isArray(C.noticias)) C.noticias = [];
      var conocidosNa = {};
      C.noticias.forEach(function (n) {
        if (!n) return;
        if (hay(n.enlace)) conocidosNa[String(n.enlace).trim()] = true;
        var idN = idDeEnlace(n.enlace);
        if (idN) conocidosNa['id:' + idN] = true;
      });
      var nuevosNn = {};
      var nuevasNa = NAUTO.noticias.filter(function (n) {
        if (!n || !hay(n.titulo)) return false;
        var e = String(n.enlace || '').trim();
        var idN = idDeEnlace(e);
        if (e && conocidosNa[e]) return false;
        if (idN && conocidosNa['id:' + idN]) return false;
        if (e) { conocidosNa[e] = true; nuevosNn[e] = true; }
        if (idN) conocidosNa['id:' + idN] = true;
        return true;
      });
      if (nuevasNa.length) C.noticias = nuevasNa.concat(C.noticias);
    }

    /* Documentos: si ya existe uno con el mismo título se le actualiza el
       archivo y el año; si es nuevo, se agrega al final de la lista. */
    if (Array.isArray(AUTO.documentos) && AUTO.documentos.length) {
      if (!Array.isArray(C.documentos)) C.documentos = [];
      AUTO.documentos.forEach(function (d) {
        if (!d || !hay(d.titulo)) return;
        var clave = claveTexto(d.titulo);
        var ya = C.documentos.filter(function (x) { return x && claveTexto(x.titulo) === clave; })[0];
        if (ya) {
          if (hay(d.archivo)) ya.archivo = d.archivo;
          if (hay(d.anio)) ya.anio = d.anio;
          if (hay(d.descripcion) && !hay(ya.descripcion)) ya.descripcion = d.descripcion;
          ya.publicado = true;
          ya.automatico = true;
        } else {
          d.publicado = d.publicado !== false;
          d.automatico = true;
          C.documentos.push(d);
        }
      });
    }

    /* Documentos que rectoría sube desde la página «Subir documentos»
       (datos/documentos-automaticos.js). Se integran solos al sitio y
       quedan en la sección de Documentos, por año y según su tipo. */
    var SUBIDOS = window.DOCUMENTOS_AUTO;
    if (Array.isArray(SUBIDOS) && SUBIDOS.length) {
      if (!Array.isArray(C.documentos)) C.documentos = [];
      SUBIDOS.forEach(function (d) {
        if (!d || !hay(d.titulo)) return;
        var claveS = claveTexto(d.titulo);
        var yaS = C.documentos.filter(function (x) { return x && claveTexto(x.titulo) === claveS; })[0];
        if (yaS) {
          if (hay(d.archivo)) yaS.archivo = d.archivo;
          if (hay(d.anio)) yaS.anio = d.anio;
          if (hay(d.categoria)) yaS.categoria = d.categoria;
          if (hay(d.descripcion) && !hay(yaS.descripcion)) yaS.descripcion = d.descripcion;
          yaS.publicado = true;
          yaS.subido = true;
        } else {
          d.publicado = d.publicado !== false;
          d.subido = true;
          C.documentos.push(d);
        }
      });
    }

    /* Documentos que rectoría quitó desde «Subir documentos» (subir.html):
       dejan de mostrarse en el sitio, pero el PDF sigue guardado y se puede
       restaurar desde esa misma página. */
    var OCULTOS = window.DOCUMENTOS_OCULTOS;
    if (Array.isArray(OCULTOS) && OCULTOS.length && Array.isArray(C.documentos)) {
      var rutasOcultas = {};
      var titulosOcultos = {};
      var hayOcultos = false;
      OCULTOS.forEach(function (o) {
        if (!o) return;
        var ruta = String(o.archivo || o.ruta || '').trim();
        var tit = claveTexto(o.titulo);
        if (ruta) { rutasOcultas[ruta] = true; hayOcultos = true; }
        if (tit) { titulosOcultos[tit] = true; hayOcultos = true; }
      });
      if (hayOcultos) {
        C.documentos = C.documentos.filter(function (d) {
          var ruta = String((d && d.archivo) || '').trim();
          if (ruta && rutasOcultas[ruta]) return false;
          var tit = claveTexto(d && d.titulo);
          return !(tit && titulosOcultos[tit]);
        });
      }
    }

    /* Noticias de Facebook: se agregan al principio y sin repetir el enlace. */
    if (Array.isArray(AUTO.noticias) && AUTO.noticias.length) {
      if (!Array.isArray(C.noticias)) C.noticias = [];
      var enlacesYa = {};
      C.noticias.forEach(function (n) { if (n && hay(n.enlace)) enlacesYa[String(n.enlace).trim()] = true; });
      var nuevasN = AUTO.noticias.filter(function (n) {
        return n && hay(n.titulo) && !(hay(n.enlace) && enlacesYa[String(n.enlace).trim()]);
      });
      C.noticias = nuevasN.concat(C.noticias);
    }

    /* Galería: se agregan las fotografías nuevas sin repetir la ruta. */
    if (Array.isArray(AUTO.galeria) && AUTO.galeria.length) {
      if (!Array.isArray(C.galeria)) C.galeria = [];
      var rutasYa = {};
      C.galeria.forEach(function (g) { if (g && hay(g.src)) rutasYa[String(g.src)] = true; });
      AUTO.galeria.forEach(function (g) {
        if (g && hay(g.src) && !rutasYa[String(g.src)]) { C.galeria.push(g); rutasYa[String(g.src)] = true; }
      });
    }

    /* Fecha del sello: se muestra la más reciente entre las dos. */
    if (hay(AUTO.actualizado)) {
      var fA = new Date(AUTO.actualizado);
      var fC = hay(C.actualizado) ? new Date(C.actualizado) : null;
      if (!isNaN(fA.getTime()) && (!fC || isNaN(fC.getTime()) || fA.getTime() > fC.getTime())) {
        C.actualizado = AUTO.actualizado;
      }
    }
  }

  /* --------- Redes sociales: se convierten en enlaces reales ---------
     Solo se aceptan direcciones http(s). Nunca se enlaza un perfil no
     verificado: si la dirección no es válida, simplemente se omite. */
  function redSegura(u) {
    var s = String(u || '').trim();
    if (!s) return '';
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s.replace(/^\/+/, '');
    return /^https?:\/\/[^\s<>"']+$/i.test(s) ? s : '';
  }

  function nombreRed(u) {
    var host = String(u || '').replace(/^https?:\/\//i, '').split(/[/?#]/)[0].toLowerCase().replace(/^www\./, '');
    if (/facebook\./.test(host)) return 'Facebook';
    if (/instagram\./.test(host)) return 'Instagram';
    if (/youtube\.|youtu\.be/.test(host)) return 'YouTube';
    if (/tiktok\./.test(host)) return 'TikTok';
    if (/twitter\.|(^|\.)x\.com$/.test(host)) return 'X (Twitter)';
    if (/whatsapp\.|wa\.me/.test(host)) return 'WhatsApp';
    if (/linkedin\./.test(host)) return 'LinkedIn';
    return host;
  }

  function iconoRed(nombre) {
    if (nombre === 'Facebook') return 'facebook';
    if (nombre === 'YouTube') return 'camara';
    if (nombre === 'WhatsApp') return 'telefono';
    return 'globe';
  }

  /* Devuelve los enlaces listos para insertar. Si el array está vacío o
     ninguna dirección es válida, devuelve '' y no se cambia nada. */
  function enlacesRedes(redes, etiquetaLarga) {
    if (!Array.isArray(redes)) return '';
    return redes.map(function (u) {
      var s = redSegura(u);
      if (!s) return '';
      var n = nombreRed(s);
      return '<a class="red-enlace" href="' + esc(s) + '" target="_blank" rel="noopener noreferrer">' +
        ico(iconoRed(n)) + ' ' + esc(etiquetaLarga && n === 'Facebook' ? 'Facebook oficial' : n) +
        ' ' + ico('externo', 'icon icon--mini') + '</a>';
    }).filter(Boolean).join('');
  }

  /* Enlace a la publicación original (por ejemplo, la nota en Facebook) */
  function enlaceFuente(enlace, fuente) {
    var s = redSegura(enlace);
    if (!s) return '';
    var n = hay(fuente) ? String(fuente) : nombreRed(s);
    return '<p class="detalle__fuente">' + '<a class="red-enlace" href="' + esc(s) +
      '" target="_blank" rel="noopener noreferrer">' + ico(iconoRed(n)) +
      ' Ver la publicación original en ' + esc(n) + ' ' + ico('externo', 'icon icon--mini') + '</a></p>';
  }

  /* Crea una plantilla de detalle para la ventana modal */
  var contadorTpl = 0;
  function crearPlantilla(html) {
    contadorTpl++;
    var id = 'det-pub-' + contadorTpl;
    var tpl = document.createElement('template');
    tpl.id = id;
    tpl.innerHTML = html;
    document.body.appendChild(tpl);
    return id;
  }

  /* ---------------- 1. Identidad institucional ---------------- */
  var inst = C.institucion || {};
  if (hay(inst.nombre)) {
    /* La marca del encabezado va en dos líneas: «Institución Educativa Rural»
       y, muy cerca, «Puerto Rosario». El nombre completo viene del contenido. */
    var nombreInst = String(inst.nombre).trim();
    var linea1 = nombreInst;
    var linea2 = '';
    var mSede = /^(.*?)\s+(Puerto Rosario)\s*$/i.exec(nombreInst);
    if (mSede) { linea1 = mSede[1].trim(); linea2 = mSede[2]; }
    var marcaLineas = qsa('.marca__texto strong');
    if (marcaLineas.length >= 2) {
      marcaLineas[0].textContent = linea1;
      marcaLineas[1].textContent = linea2 || linea1;
      marcaLineas[0].setAttribute('title', nombreInst);
    } else {
      marcaLineas.forEach(function (el) { el.textContent = nombreInst; });
    }
    qsa('.footer-marca strong').forEach(function (el) { el.textContent = nombreInst; });
    document.title = nombreInst + ' | Puerto Guzmán, Putumayo';
  }
  if (hay(inst.escudo)) {
    qsa('.marca__escudo img, .footer-marca img').forEach(function (el) {
      el.src = inst.escudo;
      el.alt = 'Escudo de ' + (inst.nombre || 'la institución');
    });
    var fav = qs('link[rel="icon"]');
    if (fav) fav.href = inst.escudo;
  }

  /* ---------------- 2. Portada y carrusel de fotografías ---------------- */
  var portada = C.portada || {};

  /* Carrusel de portada: 2 o 3 fotografías, accesible y con pausa.
     Sin JavaScript solo se ve la primera fotografía (la que trae el HTML). */
  function montarCarrusel(lista) {
    var caja = qs('#heroCarrusel');
    if (!caja) return;
    var fotos = lista.filter(function (f) { return f && hay(f.src); });
    if (!fotos.length) return;

    caja.innerHTML = fotos.map(function (f, i) {
      return '<picture>' + webpFuentes(f.src, 'assets/img/hero-paisaje.svg') +
        '<img class="hero__fondo' + (i === 0 ? ' is-activa' : '') + '" src="' +
        img(f.src, 'assets/img/hero-paisaje.svg') + '" width="960" height="540" alt="' +
        esc(hay(f.alt) ? f.alt : 'Fotografía de la institución') + '"' +
        (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></picture>';
    }).join('');

    var controles = qs('#heroControles');
    var puntos = qs('#heroPuntos');
    if (fotos.length < 2 || !controles || !puntos) return;

    puntos.innerHTML = fotos.map(function (f, i) {
      return '<button class="hero__punto" type="button" role="tab" aria-selected="' + (i === 0) +
        '" aria-label="Ver la fotografía ' + (i + 1) + ' de ' + fotos.length + '"></button>';
    }).join('');
    controles.hidden = false;

    var imgs = qsa('.hero__fondo', caja);
    var dots = qsa('.hero__punto', puntos);
    var credito = qs('#heroCredito');
    var botonPausa = qs('#heroPausa');
    var pausado = false;
    var reducir = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var zona = caja.parentNode || caja;
    var INTERVALO = 2000; // las fotografías de la portada cambian cada 2 segundos

    /* La portada muestra únicamente las tres fotografías de la comunidad
       educativa (docentes y estudiantes). El video del recorrido por los
       espacios quedó en la sección "Nuestros espacios". */
    var guion = fotos.map(function (f, i) { return i; });

    var actual = 0; // posición dentro del guion
    var temporizador = null;

    function pintar(n) {
      actual = (n + guion.length) % guion.length;
      var foto = guion[actual];
      imgs.forEach(function (im, i) { im.classList.toggle('is-activa', foto !== null && i === foto); });
      dots.forEach(function (d, i) { d.setAttribute('aria-selected', String(foto !== null && i === foto)); });
      if (credito) {
        credito.textContent = foto === null
          ? 'Video de la institución.'
          : (hay(fotos[foto].alt) ? fotos[foto].alt : 'Fotografía de la institución.');
      }
    }
    function avanzar(paso) { pintar(actual + paso); }
    function arrancar() {
      if (reducir || pausado || temporizador) return;
      temporizador = window.setInterval(function () { avanzar(1); }, INTERVALO);
    }
    function detener() { if (temporizador) { window.clearInterval(temporizador); temporizador = null; } }

    var bAnt = qs('#heroAnterior'), bSig = qs('#heroSiguiente');
    if (bAnt) bAnt.addEventListener('click', function () { avanzar(-1); });
    if (bSig) bSig.addEventListener('click', function () { avanzar(1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { pintar(guion.indexOf(i)); }); });

    if (botonPausa) {
      botonPausa.addEventListener('click', function () {
        pausado = !pausado;
        botonPausa.setAttribute('aria-pressed', String(pausado));
        botonPausa.setAttribute('aria-label', pausado
          ? 'Reanudar el cambio automático de fotografías'
          : 'Pausar el cambio automático de fotografías');
        botonPausa.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#ico-' +
          (pausado ? 'reproducir' : 'pausa') + '"></use></svg>';
        if (pausado) { detener(); } else { arrancar(); }
      });
    }

    zona.addEventListener('mouseenter', detener);
    zona.addEventListener('mouseleave', arrancar);
    zona.addEventListener('focusin', detener);
    zona.addEventListener('focusout', arrancar);
    zona.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { avanzar(-1); }
      else if (e.key === 'ArrowRight') { avanzar(1); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { detener(); } else { arrancar(); }
    });

    arrancar();
  }

  if (Array.isArray(portada.imagenes) && portada.imagenes.length) {
    montarCarrusel(portada.imagenes);
  } else if (hay(portada.imagen)) {
    var heroImg = qs('.hero__fondo');
    if (heroImg) ponerFoto(heroImg, portada.imagen);
  }
  if (hay(portada.titulo)) { var h1 = qs('#hero-titulo'); if (h1) h1.textContent = portada.titulo; }
  if (hay(portada.texto)) { var hTxt = qs('.hero__texto'); if (hTxt) hTxt.textContent = portada.texto; }

  /* ---------------- 3. Textos institucionales ---------------- */
  if (hay(inst.historia)) {
    var th = qs('#textoHistoria');
    if (th) { th.innerHTML = inst.historia; th.classList.remove('pendiente'); }
  }
  if (hay(inst.filosofia)) {
    var tf = qs('#textoFilosofia');
    if (tf) { tf.innerHTML = inst.filosofia; tf.classList.remove('pendiente'); }
  }
  /* El contenido puede ser texto simple o varios párrafos con listas.
     Si ya trae etiquetas de bloque se respeta; si no, se envuelve en un párrafo. */
  function pintarPanel(idPanel, html) {
    var panel = qs(idPanel);
    if (!panel) return;
    var t = String(html);
    panel.innerHTML = /<(p|ul|ol|h[1-6]|div|blockquote)\b/i.test(t) ? t : '<p>' + t + '</p>';
  }
  if (hay(inst.mision)) pintarPanel('#panel-mision', inst.mision);
  if (hay(inst.vision)) pintarPanel('#panel-vision', inst.vision);
  if (hay(inst.principios)) pintarPanel('#panel-principios', inst.principios);
  if (hay(inst.perfil)) pintarPanel('#panel-perfil', inst.perfil);

  /* ---------------- 3.2 Textos largos: 4 líneas y «Ver más» ----------------
     La reseña histórica y la filosofía son textos extensos: en el sitio se
     muestran en cuatro líneas y quien quiera sigue leyendo. Si el texto es
     corto, no aparece el botón. Sin JavaScript se ve completo (nada se pierde). */
  function plegarTexto(idCaja) {
    var caja = qs('#' + idCaja);
    if (!caja) return;
    var cuerpo = qs('.texto-plegable__cuerpo', caja);
    var boton = qs('.texto-plegable__boton', caja);
    if (!cuerpo || !boton) return;

    caja.classList.add('texto-plegable--cortado');
    if (cuerpo.scrollHeight <= cuerpo.clientHeight + 4) {   // cabe completo
      caja.classList.remove('texto-plegable--cortado');
      boton.hidden = true;
      return;
    }
    boton.hidden = false;
    boton.addEventListener('click', function () {
      var cortado = caja.classList.toggle('texto-plegable--cortado');
      boton.setAttribute('aria-expanded', cortado ? 'false' : 'true');
      var txt = qs('.texto-plegable__txt', boton);
      if (txt) txt.textContent = cortado ? 'Ver más' : 'Ver menos';
    });
  }
  plegarTexto('cajaHistoria');
  plegarTexto('cajaFilosofia');

  /* Datos institucionales verificados en la lista «Identidad y contexto» */
  function pintarDato(id, valor) {
    var el = qs('#' + id);
    if (el && hay(valor)) { el.textContent = valor; el.classList.remove('pendiente'); }
  }
  pintarDato('datoResolucion', inst.resolucion);
  pintarDato('datoDane', inst.dane);
  pintarDato('datoNit', inst.nit);
  pintarDato('datoRector', inst.rector);

  /* ---------------- 4. Datos de contacto ---------------- */
  var filas = [];
  if (hay(inst.ubicacion)) filas.push(['pin', 'Ubicación general', inst.ubicacion, false]);
  if (hay(inst.direccion)) filas.push(['mapa', 'Dirección precisa', inst.direccion, false]);
  if (hay(inst.telefono)) filas.push(['telefono', 'Teléfono', inst.telefono, false]);
  if (hay(inst.correo)) filas.push(['mail', 'Correo electrónico', inst.correo, false]);
  if (hay(inst.horario)) filas.push(['reloj', 'Horario de atención', inst.horario, false]);
  if (hay(inst.redes) && inst.redes.length) filas.push(['globe', 'Redes sociales oficiales', enlacesRedes(inst.redes, true), false, true]);

  if (filas.length) {
    var ficha = qs('#contacto .ficha');
    if (ficha) {
      ficha.innerHTML = filas.map(function (f) {
        return '<li>' + ico(f[0]) + '<div><b>' + esc(f[1]) + '</b><span' +
          (f[3] ? ' class="pendiente"' : '') + '>' + (f[4] ? f[2] : esc(f[2])) + '</span></div></li>';
      }).join('');
    }
    // Pie de página
    var ulAtencion = qsa('.site-footer ul');
    var ultima = ulAtencion[ulAtencion.length - 1];
    if (ultima) {
      var lineas = [];
      if (hay(inst.ubicacion)) lineas.push(ico('pin') + ' ' + esc(inst.ubicacion));
      if (hay(inst.telefono)) lineas.push(ico('telefono') + ' Teléfono: ' + esc(inst.telefono));
      if (hay(inst.correo)) lineas.push(ico('mail') + ' Correo: ' + esc(inst.correo));
      if (hay(inst.horario)) lineas.push(ico('reloj') + ' Horario: ' + esc(inst.horario));
      if (hay(inst.redes) && inst.redes.length) lineas.push(ico('globe') + ' ' + enlacesRedes(inst.redes, true));
      if (lineas.length) ultima.innerHTML = lineas.map(function (l) { return '<li>' + l + '</li>'; }).join('');
    }
    // Barra superior: teléfono y correo como enlaces reales (tel: y mailto:)
    var pTelefono = qs('#topTelefono');
    if (pTelefono && hay(inst.telefono)) {
      var soloDigitos = String(inst.telefono).replace(/[^0-9+]/g, '');
      pTelefono.innerHTML = ico('telefono') +
        ' <a href="tel:' + esc(soloDigitos) + '">' + esc(inst.telefono) + '</a>';
      pTelefono.classList.remove('topbar__item--pendiente');
    }
    var pCorreo = qs('#topCorreo');
    if (pCorreo && hay(inst.correo)) {
      pCorreo.innerHTML = ico('mail') +
        ' <a href="mailto:' + esc(inst.correo) + '">' + esc(inst.correo) + '</a>';
      pCorreo.classList.remove('topbar__item--pendiente');
    }
    var cajaRedes = qs('#topRedes');
    if (cajaRedes && hay(inst.redes) && inst.redes.length) {
      var eTop = enlacesRedes(inst.redes, true);
      if (eTop) {
        cajaRedes.innerHTML = eTop;
        cajaRedes.classList.remove('topbar__item--pendiente');
      }
    }
  }

  /* ---------------- 5. Galería ---------------- */
  if (Array.isArray(C.galeria) && C.galeria.length) {
    var grid = qs('#galeriaGrid');
    if (grid) {
      grid.innerHTML = C.galeria.filter(function (g) { return g && g.publicado !== false; }).map(function (g) {
        var titulo = hay(g.titulo) ? g.titulo : 'Imagen institucional';
        return '<figure class="galeria__item" role="group">' +
          '<button type="button" class="galeria__boton" aria-label="Ampliar imagen: ' + esc(titulo) + '">' +
            '<picture>' + webpFuentes(g.src, 'assets/img/hero-paisaje.svg') + '<img src="' + img(g.src, 'assets/img/hero-paisaje.svg') + '" width="800" height="500" loading="lazy" decoding="async" alt="' + esc(hay(g.alt) ? g.alt : titulo) + '"></picture>' +
            '<figcaption>' + esc(titulo) + '</figcaption>' +
            '<span class="galeria__zoom" aria-hidden="true">' + ico('zoom') + '</span>' +
          '</button></figure>';
      }).join('');
    }
  }

  /* ---------------- 6. Noticias ---------------- */
  if (Array.isArray(C.noticias) && C.noticias.length) {
    var listaN = qs('#listaNoticias');
    if (listaN) {
      var MESES_ES = { enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5, julio: 6, agosto: 7, septiembre: 8, setiembre: 8, octubre: 9, noviembre: 10, diciembre: 11 };
      var fechaNoticia = function (f) {
        var m = /(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i.exec(String(f || ''));
        if (!m) return 0;
        var mes = MESES_ES[m[2].toLowerCase()];
        return (mes === undefined) ? 0 : new Date(parseInt(m[3], 10), mes, parseInt(m[1], 10)).getTime();
      };
      var visiblesN = C.noticias.filter(function (n) { return n && n.publicada !== false; })
        .slice()
        .sort(function (a, b) { return fechaNoticia(b.fecha) - fechaNoticia(a.fecha); });
      /* TODAS las publicaciones del último año (365 días) se muestran como
         tarjetas completas, sin omitir ninguna —incluidas las que la página
         compartió—. La página crece hacia abajo y cada persona decide hasta
         dónde baja. Solo lo anterior a ese año queda como título con enlace. */
      var UN_ANIO = 365 * 24 * 60 * 60 * 1000;
      var hoyN = new Date().getTime();
      var esDelUltimoAnio = function (n) {
        var t = fechaNoticia(n.fecha);
        /* Si la fecha no se puede leer, no se esconde nada: se muestra igual. */
        return !t || (hoyN - t) <= UN_ANIO;
      };
      var destacadasN = visiblesN.filter(esDelUltimoAnio);
      var anterioresN = visiblesN.filter(function (n) { return !esDelUltimoAnio(n); });
      var PASO_TARJETAS = 10;      // las que sumaría el botón «Ver más»
      var PRIMERAS_TARJETAS = 10;  // las que se muestran al abrir la página
      /* Se abre con las 10 más recientes para no cargar todo de golpe
         (menos memoria y más rápido en celulares). Las demás aparecen con
         el botón «Ver más», sin perder ninguna publicación. */
      var mostradasN = Math.min(PRIMERAS_TARJETAS, destacadasN.length);

      function tarjetaNoticia(n) {
        var galeriaN = (Array.isArray(n.imagenes) ? n.imagenes.filter(function (s) { return hay(s); }) : []);
        if (galeriaN.length < 2 && hay(n.imagen)) galeriaN = [n.imagen];
        /* La tarjeta rota como máximo 3 fotos (las primeras); en «Leer más»
           se ven TODAS las de la publicación. Así la portada no muestra
           cualquier foto del álbum y se ahorra memoria. */
        var MAX_ROTACION = 3;
        var rotacionN = galeriaN.slice(0, MAX_ROTACION);
        /* Publicación con video: no se incrusta (el sitio debe funcionar sin
           internet), pero se avisa y se enlaza para verlo completo. */
        var esVideo = n.video === true;
        var urlVideo = esc(redSegura(n.enlace) || '');
        var avisoVideo = esVideo && urlVideo
          ? '<p class="detalle__video">' + ico('video') + ' Esta publicación es un <strong>video</strong>. ' +
            '<a class="btn btn--sm" href="' + urlVideo + '" target="_blank" rel="noopener noreferrer">Ver el video ' +
            ico('externo', 'icon icon--mini') + '</a></p>'
          : '';
        /* Atributos para que cada foto se pueda ampliar con un toque o con
           el teclado (Enter), sin depender del ratón. */
        var atrAmpliar = ' tabindex="0" role="button" title="Ver la foto en grande"';
        var tplId = crearPlantilla(
          '<span class="badge badge--ok">' + ico('ver') + ' Publicado</span>' +
          avisoVideo +
          (hay(n.detalle) ? n.detalle : '<p>' + esc(n.resumen || '') + '</p>') +
          (hay(n.fotos) ? '<p class="detalle__fotos">' + ico('camara') + ' Esta publicación tiene ' + esc(n.fotos) + ' ' + (Number(n.fotos) === 1 ? 'fotografía' : 'fotografías') + ' en la página oficial de Facebook.' + (Number(n.fotos_descargadas) > 0 && Number(n.fotos_descargadas) < Number(n.fotos) ? ' Aquí se muestran ' + esc(n.fotos_descargadas) + '; para verlas todas, abra la publicación en Facebook.' : '') + '</p>' : '') +
          (galeriaN.length > 1 ? '<div class="detalle__carrusel noticia__carrusel" data-intervalo="2500" role="group" aria-roledescription="carrusel" aria-label="Todas las fotografías de esta publicación">' +
            galeriaN.map(function (src, k) {
              return '<picture>' + webpFuentes(src, 'assets/img/hero-paisaje.svg') + '<img class="carrusel__img' + (k === 0 ? ' is-activa' : '') + '" src="' + img(src, 'assets/img/hero-paisaje.svg') + '" width="800" height="600" loading="lazy" decoding="async" alt="' + esc(limpiarTitulo(n.titulo) || 'Noticia institucional') + ' (foto ' + (k + 1) + ' de ' + galeriaN.length + ')' + '"></picture>';
            }).join('') +
            '<span class="carrusel__puntos" aria-hidden="true">' + galeriaN.map(function (_, k) { return '<i' + (k === 0 ? ' class="is-activo"' : '') + '></i>'; }).join('') + '</span>' +
          '</div>' : '') +
          enlaceFuente(n.enlace, n.fuente)
        );
        var marcaN = (hay(n.fotos) ? '<span class="card__fotos">' + ico('camara') + ' ' + esc(n.fotos) + '</span>' : '') +
          (esVideo ? '<span class="card__video">' + ico('video') + ' Video</span>' : '');
        var mediaN;
        if (rotacionN.length > 1) {
          mediaN = '<div class="card__media noticia__carrusel" data-intervalo="2000">' + marcaN +
            rotacionN.map(function (src, k) {
              return '<picture>' + webpFuentes(src, 'assets/img/hero-paisaje.svg') + '<img class="carrusel__img' + (k === 0 ? ' is-activa' : '') + '" src="' + img(src, 'assets/img/hero-paisaje.svg') + '" width="800" height="500"' + atrAmpliar + (k === 0 ? '' : ' loading="lazy"') + ' decoding="async" alt="' + esc(limpiarTitulo(n.titulo) || 'Noticia institucional') + ' (foto ' + (k + 1) + ' de ' + rotacionN.length + ')' + '"></picture>';
            }).join('') +
            '<span class="carrusel__puntos" aria-hidden="true">' + rotacionN.map(function (_, k) { return '<i' + (k === 0 ? ' class="is-activo"' : '') + '></i>'; }).join('') + '</span>' +
          '</div>';
        } else {
          mediaN = '<div class="card__media">' + marcaN +
            '<picture>' + webpFuentes(rotacionN[0] || n.imagen, 'assets/img/hero-paisaje.svg') + '<img src="' + img(rotacionN[0] || n.imagen, 'assets/img/hero-paisaje.svg') + '" width="800" height="500"' + atrAmpliar + ' loading="lazy" decoding="async" alt="' + esc(limpiarTitulo(n.titulo) || 'Noticia institucional') + '"></picture>' +
          '</div>';
        }
        return '<article class="card noticia" data-cat="' + esc(n.categoria || '') + '">' +
          mediaN +
          '<div class="card__body">' +
            '<p class="noticia__fecha">' + ico('calendario') + ' ' + esc(n.fecha || '') +
              (hay(n.categoria) ? ' &middot; ' + esc(n.categoria) : '') + '</p>' +
            '<h3>' + esc(limpiarTitulo(n.titulo)) + '</h3>' +
            '<p>' + esc(n.resumen || '') + '</p>' +
            '<div class="card__pie">' +
              (hay(n.fotos) ? '<span class="noticia__fotos">' + ico('camara') + ' ' + esc(n.fotos) + ' ' + (Number(n.fotos) === 1 ? 'fotografía' : 'fotografías') + '</span>' : '') +
              '<button class="btn btn--ghost btn--sm" type="button" data-modal="' + tplId + '">Leer más ' + ico('flecha') + '</button>' +
            '</div>' +
          '</div></article>';
      }

      /* La cuenta de noticias la comparte el buscador de noticias. */
      window.IERP_CUENTA_NOTICIAS = function () {
        var cont = qs('#contadorNoticias');
        if (!cont) return;
        var total = visiblesN.length;
        cont.textContent = mostradasN >= total
          ? (total === 1 ? '1 noticia publicada' : total + ' noticias publicadas')
          : 'Mostrando ' + mostradasN + ' de ' + total + ' noticias';
      };

      function pintarNoticias() {
        listaN.innerHTML = destacadasN.slice(0, mostradasN).map(tarjetaNoticia).join('');
        iniciarCarruseles(listaN);
        /* Todas las fotos de las noticias se pueden ampliar con un toque o
           con el teclado (Enter), sin depender del ratón. */
        Array.prototype.forEach.call(listaN.querySelectorAll('.card__media img'), function (im) {
          if (!im.hasAttribute('tabindex')) im.setAttribute('tabindex', '0');
          if (!im.hasAttribute('role')) im.setAttribute('role', 'button');
          if (!im.hasAttribute('title')) im.setAttribute('title', 'Ver la foto en grande');
        });
        var cajaVerMas = qs('#noticiasVerMasCaja');
        var btnVerMas = qs('#noticiasVerMas');
        if (cajaVerMas && btnVerMas) {
          var quedan = destacadasN.length - mostradasN;
          cajaVerMas.hidden = quedan <= 0;
          if (quedan > 0) btnVerMas.innerHTML = 'Ver más noticias (' + quedan + ') ' + ico('abajo');
        }
        window.IERP_CUENTA_NOTICIAS();
      }

      pintarNoticias();

      (function botonVerMasNoticias() {
        var btnVerMas = qs('#noticiasVerMas');
        if (!btnVerMas) return;
        btnVerMas.addEventListener('click', function () {
          mostradasN = Math.min(destacadasN.length, mostradasN + PASO_TARJETAS);
          pintarNoticias();
          /* Si hay una búsqueda escrita, se vuelve a aplicar sobre las nuevas. */
          var campoN = qs('#buscarNoticias');
          if (campoN && campoN.value.trim() !== '') campoN.dispatchEvent(new Event('input'));
        });
      }());

      /* El buscador revisa TODAS las publicaciones: si se escribe una palabra,
         se muestran todas las tarjetas para que ninguna quede fuera; al borrar
         la búsqueda se vuelve a las 10 iniciales. */
      window.IERP_MOSTRAR_TODAS_NOTICIAS = function () {
        if (mostradasN < destacadasN.length) {
          mostradasN = destacadasN.length;
          pintarNoticias();
        }
      };
      window.IERP_PLEGAR_NOTICIAS = function () {
        var inicial = Math.min(PRIMERAS_TARJETAS, destacadasN.length);
        if (mostradasN !== inicial) {
          mostradasN = inicial;
          pintarNoticias();
        }
      };

      /* Publicaciones anteriores: solo título + enlace a Facebook. */
      var cajaAnt = qs('#noticiasAnteriores');
      var listaAnt = qs('#listaNoticiasAnteriores');
      if (cajaAnt && listaAnt) {
        if (anterioresN.length) {
          listaAnt.innerHTML = anterioresN.map(function (n) {
            var u = String(n.enlace || '').trim();
            var seguro = /^https?:\/\/[^\s<>"']+$/i.test(u) ? u : '';
            var titulo = esc(limpiarTitulo(n.titulo) || 'Publicación institucional');
            var fecha = hay(n.fecha) ? '<span class="anteriores__fecha">' + esc(n.fecha) + '</span>' : '';
            if (seguro) {
              return '<li><a href="' + esc(seguro) + '" target="_blank" rel="noopener">' +
                '<span class="anteriores__titulo">' + titulo + '</span>' +
                '<span class="anteriores__ver">Leer en Facebook ' + ico('externo') + '</span>' +
                '</a>' + fecha + '</li>';
            }
            return '<li><span class="anteriores__titulo">' + titulo + '</span>' + fecha + '</li>';
          }).join('');
          cajaAnt.hidden = false;
        } else {
          listaAnt.innerHTML = '';
          cajaAnt.hidden = true;
        }
      }
    }
  }

  /* ---------------- 7. Proyectos ---------------- */
  if (Array.isArray(C.proyectos) && C.proyectos.length) {
    var listaP = qs('#listaProyectos');
    var areas = Array.isArray(C.areas) ? C.areas : [];
    var nombreArea = function (slug) {
      var a = areas.filter(function (x) { return x.slug === slug; })[0];
      return a ? a.nombre : slug;
    };
    var visiblesP = C.proyectos.filter(function (p) { return p && p.publicado !== false; });

    if (listaP) {
      listaP.innerHTML = visiblesP.map(function (p) {
        var tplId = crearPlantilla(
          '<span class="badge badge--ok">' + ico('ver') + ' Proyecto institucional</span>' +
          (hay(p.detalle) ? p.detalle : '<p>' + esc(p.descripcion || '') + '</p>')
        );
        return '<article class="card proyecto" data-cat="' + esc(p.area || '') + '">' +
          '<div class="card__media">' +
            '<picture>' + webpFuentes(p.imagen, 'assets/img/innovacion.svg') + '<img src="' + img(p.imagen, 'assets/img/innovacion.svg') + '" width="800" height="500" loading="lazy" decoding="async" alt="' + esc(p.titulo || 'Proyecto institucional') + '"></picture>' +
          '</div>' +
          '<div class="card__body">' +
            '<p class="noticia__etiqueta">' + esc(nombreArea(p.area)) + '</p>' +
            '<h3>' + esc(p.titulo || '') + '</h3>' +
            '<div class="texto-plegable"><div class="texto-plegable__cuerpo">' +
              '<p>' + esc(p.descripcion || '') + '</p>' +
            '</div>' +
            '<button class="texto-plegable__boton" type="button" aria-expanded="false" hidden>' +
              '<span class="texto-plegable__txt">Ver más</span>' + ico('abajo') +
            '</button></div>' +
            '<div class="card__pie">' +
              '<button class="btn btn--ghost btn--sm" type="button" data-modal="' + tplId + '">Ver información ' + ico('info') + '</button>' +
            '</div>' +
          '</div></article>';
      }).join('');
      /* Los textos largos de cada tarjeta se ven en cuatro líneas, con el
         botón «Ver más» para leerlos completos. */
      plegarCajas(listaP);
    }

    var filtros = qs('#filtrosProyectos');
    if (filtros && areas.length) {
      var usadas = areas.filter(function (a) {
        return visiblesP.some(function (p) { return p.area === a.slug; });
      });
      filtros.innerHTML =
        '<button class="chip" type="button" data-filtro="todos" aria-pressed="true">Todos <span class="chip__n">' + visiblesP.length + '</span></button>' +
        usadas.map(function (a) {
          return '<button class="chip" type="button" data-filtro="' + esc(a.slug) + '" aria-pressed="false">' + esc(a.nombre) + '</button>';
        }).join('');
    }
  }

  /* ---------------- 8. Documentos (organizados por año) ---------------- */
  if (Array.isArray(C.documentos) && C.documentos.length) {
    var contAnio = qs('#documentosPorAnio');

    function tarjetaDoc(d) {
      var conArchivo = hay(d.archivo);
      var esWord = /\.docx?$/i.test(String(d.archivo || ''));
      var etiqueta = esWord ? 'Descargar documento Word' : 'Descargar / consultar PDF';
      var accion = conArchivo
        ? '<a class="btn btn--primary btn--sm" href="' + esc(d.archivo) + '" download>' + ico('descarga') + ' ' + etiqueta + '</a>' +
          '<span class="badge badge--ok">' + ico('ver') + ' Publicado' + (hay(d.anio) ? ' ' + esc(d.anio) : '') + '</span>'
        : '<span class="btn btn--sm is-disabled" aria-disabled="true">' + ico('descarga') + ' Documento no disponible</span>' +
          '<span class="badge badge--pendiente">' + ico('reloj') + ' Pendiente de publicación</span>';
      return '<article class="doc" data-anio="' + esc(d.anio || '') + '" data-tipo="' +
        (/Planes de estudio por área/i.test(String(d.categoria || '')) ? 'plan' : 'institucional') +
        '" data-formato="' + (esWord ? 'word' : 'pdf') + '">' +
        '<span class="doc__icono" aria-hidden="true">' + ico(d.icono || 'doc') + '</span>' +
        '<div class="doc__cuerpo">' +
          '<h3>' + esc(d.titulo || '') + '</h3>' +
          '<p>' + esc(d.descripcion || '') + '</p>' +
          '<div class="doc__acciones">' + accion + '</div>' +
        '</div></article>';
    }

    if (contAnio) {
      var visiblesD = C.documentos.filter(function (d) { return d && d.publicado !== false; });
      var esPlan = function (d) { return String(d.categoria || '') === 'Planes de estudio por área'; };
      var anioDe = function (d) { return hay(d.anio) ? String(d.anio).trim() : 'Sin año'; };

      var anios = [];
      visiblesD.forEach(function (d) {
        var a = anioDe(d);
        if (anios.indexOf(a) === -1) anios.push(a);
      });
      anios.sort(function (a, b) {
        if (a === 'Sin año') return 1;
        if (b === 'Sin año') return -1;
        return String(b).localeCompare(String(a));
      });

      contAnio.innerHTML = anios.map(function (a) {
        var delAnio = visiblesD.filter(function (d) { return anioDe(d) === a; });
        var principales = delAnio.filter(function (d) { return !esPlan(d); });
        var planes = delAnio.filter(esPlan);
        var n = delAnio.length;
        var cuerpo = '';
        if (principales.length) {
          cuerpo += '<h4 class="anio__sub">Documentos institucionales</h4>' +
            '<div class="grid grid--2">' + principales.map(tarjetaDoc).join('') + '</div>';
        }
        if (planes.length) {
          cuerpo += '<h4 class="anio__sub">Planes de estudio por área</h4>' +
            '<div class="grid grid--2">' + planes.map(tarjetaDoc).join('') + '</div>';
        }
        return '<details class="anio">' +
          '<summary class="anio__cabecera">' +
            '<span class="anio__num">' + esc(a) + '</span>' +
            '<span class="anio__meta">' + n + (n === 1 ? ' documento' : ' documentos') + '</span>' +
            ico('abajo', 'icon anio__flecha') +
          '</summary>' +
          '<div class="anio__cuerpo">' + cuerpo + '</div>' +
        '</details>';
      }).join('');
      /* Filtros por tipo y formato, calculados de los datos publicados */
      var conteosD = {
        todos: visiblesD.length,
        institucional: visiblesD.filter(function (d) { return !esPlan(d); }).length,
        plan: visiblesD.filter(esPlan).length,
        word: visiblesD.filter(function (d) { return /\.docx?$/i.test(String(d.archivo || '')); }).length,
        pdf: visiblesD.filter(function (d) { return !/\.docx?$/i.test(String(d.archivo || '')); }).length
      };
      var opcionesD = [
        ['todos', 'Todos'], ['institucional', 'Institucionales'],
        ['plan', 'Planes de área'], ['word', 'Word'], ['pdf', 'PDF']
      ];
      var barra = document.createElement('div');
      barra.className = 'doc-filtros';
      barra.setAttribute('role', 'group');
      barra.setAttribute('aria-label', 'Filtrar documentos por tipo');
      barra.innerHTML = opcionesD.map(function (op, i) {
        return '<button type="button" class="doc-filtro' + (i === 0 ? ' is-activo' : '') +
          '" data-filtro="' + op[0] + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
          op[1] + ' <span>' + conteosD[op[0]] + '</span></button>';
      }).join('');
      var resumenD = document.createElement('p');
      resumenD.className = 'doc-resumen';
      resumenD.textContent = conteosD.todos + ' documentos publicados: ' +
        conteosD.institucional + ' institucionales, ' + conteosD.plan + ' planes de área, ' +
        conteosD.word + ' en Word y ' + conteosD.pdf + ' en PDF.';
      contAnio.parentNode.insertBefore(resumenD, contAnio);
      contAnio.parentNode.insertBefore(barra, contAnio);

      barra.addEventListener('click', function (ev) {
        var boton = ev.target.closest ? ev.target.closest('[data-filtro]') : null;
        if (!boton || !barra.contains(boton)) return;
        var filtro = boton.getAttribute('data-filtro');
        var atributo = (filtro === 'word' || filtro === 'pdf') ? 'data-formato' : 'data-tipo';
        barra.querySelectorAll('.doc-filtro').forEach(function (b) {
          var activo = b === boton;
          b.classList.toggle('is-activo', activo);
          b.setAttribute('aria-pressed', activo ? 'true' : 'false');
        });
        contAnio.querySelectorAll('.doc').forEach(function (tarjeta) {
          var ok = filtro === 'todos' || tarjeta.getAttribute(atributo) === filtro;
          tarjeta.style.display = ok ? '' : 'none';
        });
        contAnio.querySelectorAll('.anio').forEach(function (det) {
          var todas = det.querySelectorAll('.doc');
          var visibles = 0;
          todas.forEach(function (t) { if (t.style.display !== 'none') visibles++; });
          det.style.display = visibles ? '' : 'none';
          var meta = det.querySelector('.anio__meta');
          if (meta) meta.textContent = visibles + (visibles === 1 ? ' documento' : ' documentos');
        });
      });
    }
  }

  /* ---------------- 9. Sello de actualización (fecha Y hora reales) ----------------
     Se muestra el momento más reciente entre:
       · la fecha y hora en que se publicó ESTA página (avanza cada vez que
         subimos un cambio al sitio, a mano o con el publicador);
       · la marca que escribe el actualizador cuando trae contenido nuevo
         (la corrida de las 6 de la mañana).
     Así la fecha solo avanza cuando el sitio cambió de verdad. */
  var sello = qs('#selloActualizacion');
  if (sello) {
    var MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var fechasReales = [];
    /* Los sellos vienen en hora UTC y sin zona horaria («2026-10-19 18:56:15»
       y «10/19/2026 18:56:15»). Si se leen tal cual, el sello muestra 5 horas
       de más, porque Colombia es UTC-5. Por eso se marcan como UTC. */
    var aFecha = function (v) {
      if (v instanceof Date) return v;
      var texto = String(v || '').trim();
      if (!texto) return null;
      if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(texto)) return new Date(texto);   // ya trae zona
      var iso = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):?(\d{2})?/.exec(texto);
      if (iso) { return new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3], +iso[4], +iso[5], +(iso[6] || 0))); }
      var us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})/.exec(texto);
      if (us) { return new Date(Date.UTC(+us[3], +us[1] - 1, +us[2], +us[4], +us[5], +us[6])); }
      return new Date(texto);   // otros textos («19 de octubre de 2026»)
    };
    var sumarFecha = function (v) {
      var d = aFecha(v);
      if (d && !isNaN(d.getTime()) && d.getFullYear() > 2000) fechasReales.push(d.getTime());
    };
    sumarFecha(document.lastModified);
    if (window.CONTENIDO_AUTO) {
      sumarFecha(CONTENIDO_AUTO.generado); sumarFecha(CONTENIDO_AUTO.actualizado);
    }
    if (window.CONTENIDO_NOTICIAS_AUTO) {
      sumarFecha(CONTENIDO_NOTICIAS_AUTO.generado); sumarFecha(CONTENIDO_NOTICIAS_AUTO.actualizado);
    }
    if (fechasReales.length) {
      /* Se muestra en la hora de Colombia (UTC-5), igual para todo el mundo:
         así el sello no cambia según el reloj del visitante. */
      var dAct = new Date(Math.max.apply(null, fechasReales) - 5 * 60 * 60 * 1000);
      var hora = dAct.getUTCHours(), min = dAct.getUTCMinutes();
      sello.textContent = 'Sitio actualizado el ' + dAct.getUTCDate() + ' de ' +
        MESES_LARGOS[dAct.getUTCMonth()] + ' de ' + dAct.getUTCFullYear() + ', ' +
        (hora % 12 || 12) + ':' + (min < 10 ? '0' + min : min) +
        (hora < 12 ? ' a. m.' : ' p. m.');
    } else if (hay(C.actualizado)) {
      sello.textContent = 'Contenido actualizado: ' + C.actualizado + '.';
    }
  }

  /* ---------------- 10. Avisar a los buscadores ---------------- */
  document.dispatchEvent(new Event('contenido-actualizado'));
}());
