/* =====================================================================
   HORARIOS DE CLASE — dibuja las tablas con los datos de datos/horarios.js
   Estructura de la jornada: 3 bloques, DESCANSO, 2 bloques, ALMUERZO
   y 2 bloques finales (7 horas de clase, de 8:00 a. m. a 3:00 p. m.).
   ===================================================================== */
(function () {
  var H = window.HORARIOS_IERP;
  var cajaGrupos = document.getElementById('horariosGrupos');
  if (!H || !cajaGrupos) { return; }

  var DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Cuadro de la semana completa (5 columnas), para quien quiera ver todo. */
  function tabla(filas, pie) {
    var html = '<table class="horario">' +
      (pie ? '<caption>' + esc(pie) + '</caption>' : '') +
      '<thead><tr><th scope="col">Hora</th>';
    var d, f;
    for (d = 0; d < DIAS.length; d++) { html += '<th scope="col">' + DIAS[d] + '</th>'; }
    html += '</tr></thead><tbody>';

    for (f = 0; f < filas.length; f++) {
      var fila = filas[f];
      var hora = esc(fila.inicio) + ' – ' + esc(fila.fin);
      if (fila.tipo === 'pausa') {
        html += '<tr class="es-pausa"><th scope="row">' + hora + '</th>' +
          '<td colspan="' + DIAS.length + '">' + esc(fila.etiqueta || 'Pausa') + '</td></tr>';
        continue;
      }
      html += '<tr><th scope="row"><b>' + esc(fila.item) + '</b>' +
        '<span class="horarios__hora">' + hora + '</span></th>';
      for (d = 0; d < DIAS.length; d++) {
        var valor = (fila.dias && fila.dias[d]) ? fila.dias[d] : '';
        html += '<td>' + (valor ? esc(valor) : '<span class="vacio">—</span>') + '</td>';
      }
      html += '</tr>';
    }
    return html + '</tbody></table>';
  }

  /* Cuadro de UN día (dos columnas): así en el celular no hay que desplazar
     la tabla hacia los lados para leer la clase de hoy. */
  function tablaDia(filas, idx, pie) {
    var html = '<table class="horario horario--dia">' +
      (pie ? '<caption>' + esc(pie) + '</caption>' : '') +
      '<thead><tr><th scope="col">Hora</th><th scope="col">' + DIAS[idx] + '</th></tr></thead><tbody>';
    for (var f = 0; f < filas.length; f++) {
      var fila = filas[f];
      var hora = esc(fila.inicio) + ' – ' + esc(fila.fin);
      if (fila.tipo === 'pausa') {
        html += '<tr class="es-pausa"><th scope="row">' + hora + '</th>' +
          '<td>' + esc(fila.etiqueta || 'Pausa') + '</td></tr>';
        continue;
      }
      var valor = (fila.dias && fila.dias[idx]) ? fila.dias[idx] : '';
      html += '<tr><th scope="row"><b>' + esc(fila.item) + '</b>' +
        '<span class="horarios__hora">' + hora + '</span></th>' +
        '<td>' + (valor ? esc(valor) : '<span class="vacio">—</span>') + '</td></tr>';
    }
    return html + '</tbody></table>';
  }

  /* ¿Qué día se muestra al abrir? El de hoy; si es fin de semana, el lunes. */
  var HOY = new Date().getDay();                       // 0 = domingo
  var ES_ENTRE_SEMANA = (HOY >= 1 && HOY <= 5);
  var DIA_INICIAL = ES_ENTRE_SEMANA ? HOY - 1 : 0;

  function botonesDia(id) {
    return '<div class="horarios__dias" role="tablist" aria-label="Cambiar el día del horario">' +
      DIAS.map(function (nombre, i) {
        var activo = (i === DIA_INICIAL);
        return '<button class="dia-chip' + (activo ? ' is-activo' : '') + '" type="button" role="tab"' +
          ' data-grupo="' + id + '" data-dia="' + i + '" aria-selected="' + (activo ? 'true' : 'false') + '">' +
          nombre + '</button>';
      }).join('') +
      '<button class="dia-chip dia-chip--semana" type="button" role="tab" data-grupo="' + id +
        '" data-dia="semana" aria-selected="false">Semana completa</button>' +
    '</div>';
  }

  function bloque(id, titulo, sub, filas, abierto, pie) {
    var panel = 'panel-' + id;
    return '<div class="acordeon__item">' +
      '<button class="acordeon__boton" type="button" aria-expanded="' + (abierto ? 'true' : 'false') +
        '" aria-controls="' + panel + '">' +
        '<svg class="icon" aria-hidden="true"><use href="#ico-reloj"></use></svg>' +
        '<span class="horarios__titulo"><b>' + esc(titulo) + '</b>' +
        (sub ? '<span class="horarios__areas">' + esc(sub) + '</span>' : '') + '</span>' +
        '<svg class="icon" aria-hidden="true"><use href="#ico-abajo"></use></svg>' +
      '</button>' +
      '<div class="acordeon__panel" id="' + panel + '"' + (abierto ? '' : ' hidden') + '>' +
        botonesDia(id) +
        '<div class="horarios__tabla-scroll horarios__dia" id="dia-' + id + '">' +
          tablaDia(filas, DIA_INICIAL, pie) +
        '</div>' +
        '<div class="horarios__tabla-scroll horarios__semana" id="semana-' + id + '" hidden>' +
          tabla(filas, pie) +
        '</div>' +
      '</div>' +
    '</div>';
  }

  var htmlGrupos = '';
  (H.grupos || []).forEach(function (g, i) {
    htmlGrupos += bloque(g.id, g.titulo, '', g.filas || [], i === 0, '');
  });
  cajaGrupos.innerHTML = htmlGrupos;

  /* Cambiar de día (o ver la semana completa) sin recargar la página. */
  cajaGrupos.addEventListener('click', function (e) {
    var chip = e.target.closest ? e.target.closest('.dia-chip') : null;
    if (!chip || !cajaGrupos.contains(chip)) { return; }
    var id = chip.getAttribute('data-grupo');
    var dia = chip.getAttribute('data-dia');
    var cajaDia = document.getElementById('dia-' + id);
    var cajaSemana = document.getElementById('semana-' + id);

    var botones = cajaGrupos.querySelectorAll('.dia-chip[data-grupo="' + id + '"]');
    for (var i = 0; i < botones.length; i++) {
      var esEste = (botones[i] === chip);
      botones[i].classList.toggle('is-activo', esEste);
      botones[i].setAttribute('aria-selected', esEste ? 'true' : 'false');
    }

    if (dia === 'semana') {
      if (cajaSemana) { cajaSemana.hidden = false; }
      if (cajaDia) { cajaDia.hidden = true; }
      return;
    }
    var grupo = (H.grupos || []).filter(function (g) { return g.id === id; })[0];
    if (cajaDia && grupo) {
      cajaDia.innerHTML = tablaDia(grupo.filas || [], parseInt(dia, 10), '');
      cajaDia.hidden = false;
    }
    if (cajaSemana) { cajaSemana.hidden = true; }
  });

  var lead = document.getElementById('horariosLead');
  if (lead) {
    lead.textContent = (H.titulo ? H.titulo + '. ' : '') + (H.sede || '') + ' ' + (H.vigencia || '') +
      (ES_ENTRE_SEMANA
        ? ' Abajo se muestra el horario del día de hoy (' + DIAS[DIA_INICIAL].toLowerCase() +
          '); con los botones puede ver otro día o la semana completa.'
        : ' Hoy es fin de semana: abajo se muestra el horario del lunes; con los botones' +
          ' puede ver otro día o la semana completa.');
  }

  function conectar(caja) {
    caja.addEventListener('click', function (e) {
      var boton = e.target.closest ? e.target.closest('.acordeon__boton') : null;
      if (!boton || !caja.contains(boton)) { return; }
      var panel = document.getElementById(boton.getAttribute('aria-controls'));
      var abierto = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', abierto ? 'false' : 'true');
      if (panel) {
        if (abierto) { panel.setAttribute('hidden', ''); }
        else { panel.removeAttribute('hidden'); }
      }
    });
  }
  conectar(cajaGrupos);

  /* Descargas: un PDF y una imagen por cada horario (se muestran solo si
     los archivos ya se generaron; hasta entonces el bloque queda oculto). */
  var lista = document.getElementById('horariosLista');
  var cajaDesc = document.getElementById('horariosDescargas');
  if (lista && cajaDesc && H.descargas === true) {
    var filas = [];
    (H.grupos || []).forEach(function (g) { filas.push(['Grados ' + g.titulo, g.id]); });
    var html = '';
    filas.forEach(function (f) {
      html += '<li>' +
        '<span class="horarios__nombre">' + esc(f[0]) + '</span>' +
        '<a href="documentos/horarios/' + f[1] + '.pdf" target="_blank" rel="noopener">' +
          '<svg class="icon" aria-hidden="true"><use href="#ico-doc"></use></svg>PDF para imprimir</a>' +
        '<a href="assets/img/horarios/' + f[1] + '.png" target="_blank" rel="noopener">' +
          '<svg class="icon" aria-hidden="true"><use href="#ico-imagen"></use></svg>Imagen</a>' +
      '</li>';
    });
    html += '<li><span class="horarios__nombre">Todos los horarios en un solo archivo</span>' +
      '<a href="documentos/horarios/todos-los-horarios.pdf" target="_blank" rel="noopener">' +
      '<svg class="icon" aria-hidden="true"><use href="#ico-doc"></use></svg>PDF para imprimir</a></li>';
    lista.innerHTML = html;
    cajaDesc.hidden = false;
  }
}());

/* =====================================================================
   BUSCADOR DEL SITIO — una lupa en la barra superior
   ===================================================================== */
(function () {
  var form = document.getElementById('buscarForm');
  var boton = document.getElementById('buscarAbrir');
  var campo = document.getElementById('buscarCampo');
  var caja = document.getElementById('buscarResultados');
  var limpiar = document.getElementById('buscarLimpiar');
  if (!form || !campo || !caja) { return; }

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function norm(t) {
    var s = String(t == null ? '' : t).toLowerCase();
    if (s.normalize) { s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
    return s.replace(/[^a-z0-9\s.\-]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  var indice = [];
  function agregar(titulo, detalle, url, categoria, palabras) {
    if (!titulo) { return; }
    indice.push({
      t: titulo,
      d: detalle || '',
      u: url || '#inicio',
      c: categoria || '',
      b: norm(titulo + ' ' + (detalle || '') + ' ' + (categoria || '') + ' ' + (palabras || ''))
    });
  }

  /* 1. Secciones del sitio */
  [
    ['Inicio', 'Portada y presentación de la institución', '#inicio', 'Sección', 'portada principal'],
    ['Accesos rápidos', 'Qué información necesita hoy', '#rapidos', 'Sección', 'accesos rapidos'],
    ['Información oficial en cifras', 'Estudiantes, sedes, docentes y jornada', '#datos', 'Sección', 'cifras datos institucion'],
    ['Institución', 'Reseña histórica, misión, visión, principios, símbolos y sedes', '#institucion', 'Sección', 'historia mision vision principios simbolos escudo bandera sedes perfil'],
    ['Docentes 2026', 'Listado de docentes con la sede donde prestan su servicio', '#docentes', 'Sección', 'docentes profesores maestros planta docente listado equipo 2026 sedes rector orientadora'],
    ['Oferta educativa', 'Niveles, grados, sedes y modalidades', '#oferta', 'Sección', 'preescolar primaria secundaria media grados matricula jornada sedes'],
    ['Nuestros espacios', 'Aula de sistemas, zona deportiva, huerta, pasillos y plaza cubierta', '#espacios', 'Sección', 'espacios instalaciones huerta cancha aulas recorrido'],
    ['Horarios de clase', 'Horario por grados: sexto y séptimo, octavo y noveno, décimo y once', '#horarios', 'Sección', 'horario clases grados jornada descanso almuerzo'],
    ['Proyectos', 'InnovaTec, ferias de ciencia, medio ambiente y tecnología', '#proyectos', 'Sección', 'proyectos innovatec semillero investigacion ciencia tecnologia'],
    ['Noticias', 'Noticias, eventos y avisos de la institución', '#noticias', 'Sección', 'noticias eventos avisos'],
    ['Videos institucionales', 'Videos del Día de la IA, convivencia y más', '#multimedia', 'Sección', 'videos multimedia'],
    ['Documentos', 'PEI, SIEE, manual de convivencia, calendario y guías', '#documentos', 'Sección', 'documentos pei siee manual convivencia calendario guias pdf'],
    ['Comunidad y escuela de familias', 'Escuela de padres, plan lector y gobierno escolar', '#comunidad', 'Sección', 'comunidad familias escuela padres plan lector gobierno escolar'],
    ['Transparencia', 'Información pública y canales de atención', '#transparencia', 'Sección', 'transparencia informacion publica rendicion de cuentas'],
    ['Contacto', 'Teléfonos, correos, ubicación y formulario de mensajes', '#contacto', 'Sección', 'contacto telefono correo ubicacion mensaje formulario']
  ].forEach(function (s) { agregar(s[0], s[1], s[2], s[3], s[4]); });

  /* 2. Contenido administrable (datos/contenido.js) */
  var C = window.CONTENIDO_IERP || {};
  (C.documentos || []).forEach(function (d) {
    if (!d || d.publicado === false) { return; }
    agregar(d.titulo, (d.categoria ? d.categoria + '. ' : '') + (d.descripcion || ''),
      d.archivo || '#documentos', 'Documento', String(d.anio || '') + ' pdf');
  });
  (C.noticias || []).forEach(function (n) {
    if (!n || n.publicado === false) { return; }
    agregar(n.titulo, (n.fecha ? n.fecha + '. ' : '') + (n.resumen || ''), '#noticias', 'Noticia', '');
  });
  (C.proyectos || []).forEach(function (p) {
    if (!p || p.publicado === false) { return; }
    agregar(p.titulo, (p.area ? p.area + '. ' : '') + (p.descripcion || ''), '#proyectos', 'Proyecto', '');
  });
  (C.videos || []).forEach(function (v) {
    if (!v || !v.titulo) { return; }
    agregar(v.titulo, (v.fecha ? v.fecha + '. ' : '') + (v.descripcion || ''),
      '#multimedia', 'Video', '');
  });
  var inst = C.institucion || {};
  (inst.sedes || []).forEach(function (s) {
    if (!s || typeof s !== 'object') { return; }
    agregar(s.nombre || s.titulo, s.descripcion || s.detalle || 'Sede de la institución',
      '#institucion', 'Sede', (s.municipio || '') + ' ' + (s.vereda || ''));
  });

  /* 3. Horarios (datos/horarios.js) */
  var H = window.HORARIOS_IERP;
  if (H) {
    (H.grupos || []).forEach(function (g) {
      agregar('Horario de ' + g.titulo,
        'Horario de clases por grados. Jornada de 8:00 a. m. a 2:50 p. m.',
        '#horarios', 'Horario', 'horario clases grados ' + (H.vigencia || ''));
    });
  }

  /* Abre el acordeón al que apunta un enlace (misión, visión, horario…) */
  function abrirDestino(hash) {
    var id = String(hash || '').replace('#', '');
    if (!id) { return; }
    var panel = document.getElementById(id);
    if (!panel || !panel.classList || !panel.classList.contains('acordeon__panel')) { return; }
    if (panel.hasAttribute('hidden')) {
      var b = document.querySelector('.acordeon__boton[aria-controls="' + id + '"]');
      if (b && b.getAttribute('aria-expanded') !== 'true') { b.click(); }
    }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) { return; }
    window.setTimeout(function () { abrirDestino(a.getAttribute('href')); }, 80);
  });
  window.addEventListener('hashchange', function () { abrirDestino(location.hash); });
  abrirDestino(location.hash);

  /* Interfaz del buscador */
  var activo = -1;

  function ocultar() {
    caja.hidden = true;
    activo = -1;
  }

  function recoger() {
    ocultar();
    campo.value = '';
    if (limpiar) { limpiar.hidden = true; }
    form.classList.remove('is-abierto');
    if (boton) { boton.setAttribute('aria-expanded', 'false'); }
  }

  function pintar(lista, consulta) {
    if (!consulta) { ocultar(); return; }
    if (!lista.length) {
      caja.innerHTML = '<li class="buscar__vacio">No se encontró «' + esc(consulta) +
        '». Pruebe con otra palabra: horario, PEI, matrícula, contacto…</li>';
    } else {
      var html = '';
      lista.forEach(function (r, i) {
        var extra = r.d ? String(r.d).replace(/\s+/g, ' ').slice(0, 120) : '';
        html += '<li role="option" id="buscar-op-' + i + '">' +
          '<a href="' + esc(r.u) + '" data-i="' + i + '"><b>' + esc(r.t) + '</b>' +
          '<span>' + esc(r.c) + (extra ? ' · ' + esc(extra) : '') + '</span></a></li>';
      });
      html += '<li class="buscar__pie" role="presentation">' + lista.length +
        ' resultado' + (lista.length === 1 ? '' : 's') + ' · use las flechas y Enter</li>';
      caja.innerHTML = html;
    }
    caja.hidden = false;
    activo = -1;
  }

  function buscar(consulta) {
    var q = norm(consulta);
    if (q.length < 2) { ocultar(); return; }
    var terminos = q.split(' ');
    var res = [];
    for (var i = 0; i < indice.length; i++) {
      var e = indice[i], puntos = 0, ok = true;
      for (var t = 0; t < terminos.length; t++) {
        var pos = e.b.indexOf(terminos[t]);
        if (pos < 0) { ok = false; break; }
        puntos += pos < 24 ? 3 : 1;
      }
      if (!ok) { continue; }
      var nt = norm(e.t);
      if (nt.indexOf(q) === 0) { puntos += 15; }
      else if (nt.indexOf(q) > -1) { puntos += 7; }
      res.push({ t: e.t, d: e.d, u: e.u, c: e.c, p: puntos, o: i });
    }
    res.sort(function (a, b) { return b.p - a.p || a.o - b.o; });
    pintar(res.slice(0, 10), consulta);
  }

  function abrir() {
    form.classList.add('is-abierto');
    if (boton) { boton.setAttribute('aria-expanded', 'true'); }
    campo.focus();
    campo.select();
  }

  function ir(enlace) {
    if (!enlace) { return; }
    var destino = enlace.getAttribute('href') || '';
    recoger();
    if (destino.charAt(0) === '#') {
      var seccion = document.getElementById(destino.slice(1));
      if (seccion) {
        abrirDestino(destino);
        seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.replaceState) { history.replaceState(null, '', destino); }
      }
    } else if (destino) {
      window.open(destino, '_blank', 'noopener');
    }
  }

  if (boton) {
    boton.addEventListener('click', function () {
      if (form.classList.contains('is-abierto') && campo.value) { campo.focus(); return; }
      if (form.classList.contains('is-abierto')) { recoger(); return; }
      abrir();
    });
  }

  form.addEventListener('mousedown', function (e) {
    if (e.target === campo || caja.contains(e.target) || (boton && boton.contains(e.target))) { return; }
    e.preventDefault();
    abrir();
  });

  campo.addEventListener('input', function () {
    if (limpiar) { limpiar.hidden = !campo.value; }
    form.classList.add('is-abierto');
    buscar(campo.value);
  });

  campo.addEventListener('focus', function () {
    form.classList.add('is-abierto');
    if (campo.value.length >= 2) { buscar(campo.value); }
  });

  campo.addEventListener('keydown', function (e) {
    var enlaces = caja.querySelectorAll('a');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!enlaces.length) { return; }
      e.preventDefault();
      activo = e.key === 'ArrowDown'
        ? (activo + 1) % enlaces.length
        : (activo <= 0 ? enlaces.length - 1 : activo - 1);
      for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].classList.toggle('is-activo', i === activo);
      }
      if (enlaces[activo].scrollIntoView) { enlaces[activo].scrollIntoView({ block: 'nearest' }); }
      return;
    }
    if (e.key === 'Escape') { recoger(); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (enlaces.length) { ir((activo >= 0 && enlaces[activo]) ? enlaces[activo] : enlaces[0]); }
      else { buscar(campo.value); }
    }
  });

  caja.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (a) { e.preventDefault(); ir(a); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var enlaces = caja.querySelectorAll('a');
    if (enlaces.length) { ir((activo >= 0 && enlaces[activo]) ? enlaces[activo] : enlaces[0]); }
    else { buscar(campo.value); }
  });

  if (limpiar) {
    limpiar.addEventListener('click', function () { campo.value = ''; limpiar.hidden = true; ocultar(); campo.focus(); });
  }

  document.addEventListener('click', function (e) {
    if (!form.contains(e.target)) { recoger(); }
  });

  document.addEventListener('keydown', function (e) {
    var t = e.target || {};
    if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) { return; }
    if (e.key === '/' || ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K'))) {
      e.preventDefault();
      abrir();
    }
  });
}());
