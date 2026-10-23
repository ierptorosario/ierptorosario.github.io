/* =====================================================================
   CONTENIDO PUBLICADO DEL SITIO
   Institución Educativa Rural Puerto Rosario
   ---------------------------------------------------------------------
   Este archivo lo genera el PANEL INSTITUCIONAL (admin.html) cuando la
   rectoría o la administración pulsa «Descargar contenido.js».

   CÓMO USARLO
   1. Abra admin.html y entre con la clave institucional (inicial: 1234).
   2. Edite la información (identidad, noticias, proyectos, documentos...).
   3. Pulse «Descargar contenido.js».
   4. Reemplace ESTE archivo por el descargado (mismo nombre y misma
      carpeta: datos/contenido.js).
   5. Recargue index.html: el sitio mostrará el contenido publicado.

   FUENTES DEL CONTENIDO REAL DE ESTA VERSIÓN
     - Documentos oficiales en PDF (carpeta documentos/):
         pei-2025.pdf, manual-convivencia-2025.pdf, siee-2025.pdf,
         calendario-academico-2026.pdf
     - De esos documentos se tomaron, textualmente, la misión, la visión,
       el perfil del estudiante, la resolución de aprobación, el DANE, el
       NIT y los datos de contacto institucionales.
     - Página oficial de Facebook: las cinco noticias y el escudo.
     - Fotografías de la institución aportadas por rectoría.

   LO QUE SIGUE PENDIENTE (ver documentacion/CONTENIDOS_PENDIENTES.md)
     - La reseña histórica completa.
     - La filosofía institucional (el PEI no la trae como sección aparte).
     - La política de tratamiento de datos personales.
     - Los proyectos institucionales reales (los seis actuales son
       ejemplos y así están marcados).

   IMPORTANTE: no borre este archivo aunque esté vacío. Si falta, el
   navegador registrará un error al cargar el sitio.
   ===================================================================== */

window.CONTENIDO_IERP = {
  version: 2,
  actualizado: '16 de octubre de 2026',
  esDemostracion: false,

  institucion: {
    nombre: 'Institución Educativa Rural Puerto Rosario',
    lema: 'Ideal de Hombres Libres',
    ubicacion: 'Vereda Puerto Rosario, inspección de Policía El Cedro Mangalpa, municipio de Puerto Guzmán, Putumayo, Colombia',
    direccion: '',
    telefono: '320 260 8167',
    correo: 'ierptorosario@gmail.com',
    horario: '',
    redes: ['https://www.facebook.com/profile.php?id=61575609093627'],
    rector: 'Mag. Oliverio Barrera Sánchez',
    resolucion: 'Resolución No. 0844 del 25 de febrero de 2015',
    nit: '846.003.519-3',
    dane: '286001003209',
    escudo: 'assets/img/escudo.png',
    historia: '<p>Puerto Rosario se encuentra en el municipio de Puerto Guzmán, departamento del Putumayo, a 20 km de la cabecera municipal y a 3 horas de la capital. Fue fundada en <strong>1960</strong> y habitada por familias de varios departamentos como Caquetá, Huila, Nariño y Cauca. La comunidad se unió en trabajo e ideas para construir una escuela, que funcionó inicialmente en la casa de la familia Mojomboy; quienes fundaron la vereda le dieron el nombre de <strong>Rosario</strong> en honor a su madre.</p><p>Posteriormente, la Junta de Acción Comunal y la profesora Fanny Edith Recalde gestionaron ante las entidades gubernamentales la construcción de una planta física de cuatro salones; con el tiempo el río Caquetá cambió su cauce, se acercó al área escolar y derrumbó la construcción, por lo que desde entonces se trabaja en el mejoramiento del nuevo plantel. La vereda tiene una llanura de tipo amazónico en la margen derecha del río Caquetá, a unos 200 msnm, con temperatura de 28 a 32 °C. Limita al norte con el río Caquetá, al oriente con la vereda El Cedro, al occidente con San Luis y al sur con Las Perlas. Sus habitantes se dedican a la agricultura, la ganadería y la explotación de madera.</p><p>La escuela ofreció inicialmente educación básica primaria con el programa Escuela Nueva (Resolución No. 0757 del 20 de noviembre de 2001). La Secretaría de Educación Departamental aprobó el preescolar hasta el grado 5.º y, con el Decreto 0250 del 17 de febrero de 2003, reconoció oficialmente el servicio educativo y autorizó los niveles de 6.º a 8.º. En 2003 se construyeron cuatro aulas, que se fueron complementando hasta llegar a diez salones de concreto y cinco de madera, restaurante escolar y sala de sistemas. En 2004, mediante la Resolución No. 000843 del 22 de junio, se logró la aprobación hasta el grado 9.º de educación básica. En 2012, mediante la Resolución No. 625 del 21 de febrero y la Resolución No. 1477 del 7 de mayo, la Secretaría de Educación ajustó la organización de las sedes anexas. Mediante la Resolución No. 0844 del 25 de febrero de 2015 se anexaron nuevas sedes rurales. En la actualidad la institución cuenta con una sede central y diez sedes anexas, todas en funcionamiento.</p><p class="campo__ayuda">Fuente: PEI 2025, numeral 1.1 «Contextualización (reseña histórica)».</p>',
    filosofia: '<p>La institución orienta su acción educativa por los principios y valores definidos en su horizonte institucional y proyecta su gestión hacia los siguientes objetivos:</p><h4>Visión al 2030</h4><p>Para el año 2030, la Institución Educativa Puerto Rosario será reconocida como un referente regional en educación inclusiva e intercultural, que garantiza la calidad, la equidad y la pertinencia de los aprendizajes, aportando a la transformación social de la comunidad y al fortalecimiento de la identidad cultural de sus estudiantes.</p><h4>Principios institucionales</h4><ul><li>Respeto por la dignidad humana.</li><li>Inclusión y equidad en los procesos educativos.</li><li>Reconocimiento y valoración de la diversidad cultural.</li><li>Participación democrática y corresponsabilidad.</li><li>Compromiso con la innovación pedagógica y el desarrollo sostenible.</li></ul><h4>Objetivos institucionales</h4><ul><li>Garantizar una educación inclusiva, equitativa y de calidad para toda la población estudiantil.</li><li>Promover el desarrollo integral de los estudiantes en sus dimensiones académica, socioemocional y ciudadana.</li><li>Implementar estrategias pedagógicas que reconozcan y valoren la diversidad cultural y territorial.</li><li>Fomentar la participación activa de la familia y la comunidad en los procesos educativos.</li><li>Desarrollar competencias para la vida, la convivencia pacífica y el mundo laboral.</li></ul><p class="campo__ayuda">Fuente: documento «Horizonte institucional» de la institución (2025).</p>',
    mision: 'La IER Puerto Rosario garantiza el derecho a la educación desde el grado preescolar hasta el grado once (educación media) a todos los estudiantes sin ninguna discriminación, mediante la orientación, el fortalecimiento en valores, procesos sociales, culturales, científicos y tecnológicos; formándolo integralmente en beneficio personal y social.',
    vision: 'La Institución Educativa Rural Puerto Rosario pretende formar estudiantes críticos, autónomos, dinámicos y creativos dentro de los mejores ambientes pedagógicos, permitiéndole ser competente en el ámbito laboral y social.',
    principios: '<h4>Principios institucionales</h4><ul><li>Respeto por la dignidad humana.</li><li>Inclusión y equidad en los procesos educativos.</li><li>Reconocimiento y valoración de la diversidad cultural.</li><li>Participación democrática y corresponsabilidad.</li><li>Compromiso con la innovación pedagógica y el desarrollo sostenible.</li></ul><h4>Valores institucionales</h4><ul class="lista-valores--chips"><li>Respeto</li><li>Solidaridad</li><li>Inclusión</li><li>Responsabilidad</li><li>Equidad</li><li>Honestidad</li><li>Tolerancia</li><li>Sentido de pertenencia</li></ul><p class="campo__ayuda">Fuente: documento «Horizonte institucional» de la institución (2025).</p>',
    perfil: '<p>El Proyecto Educativo Institucional define el perfil que la institución busca formar: un estudiante integral, con ideales, sueños y metas; comprometido con su entorno, dinámico, creativo y capaz de transformar el medio que lo rodea frente a los desafíos de la ciencia y la tecnología. Se caracteriza por:</p><ul><li>Capaz de plantear y resolver problemas de su cotidianidad.</li><li>Sentido de pertenencia por su comunidad local y con visión de desarrollo global.</li><li>Poseer y dominar conocimientos que le permitan vincularse al mercado regional y nacional.</li><li>Hábitos de sano esparcimiento y adecuada utilización del tiempo libre.</li><li>Responsable con el cuidado y la preservación del medio ambiente.</li><li>Ciudadano respetuoso de las normas y valores que le permitan vivir en sociedad.</li><li>Competente e investigador de su entorno para proponer alternativas de solución a la problemática ambiental, cultural y social del municipio.</li></ul>'
  },

  portada: {
    titulo: 'Aprender, crear y transformar nuestro territorio',
    texto: '',
    imagen: 'assets/img/portada-2026.jpg',
    imagenes: [
      { src: 'assets/img/portada-2026.jpg', alt: 'Fotografía de la comunidad educativa de la Institución Educativa Rural Puerto Rosario reunida en la sede' },
      { src: 'assets/img/galeria/dia-del-estudiante-2026.jpg', alt: 'Celebración del Día del Estudiante 2026 en la Institución Educativa Rural Puerto Rosario' },
      { src: 'assets/img/noticias/entrega-computadores-2026.jpg', alt: 'Estudiantes de la institución con los computadores portátiles entregados por el programa Computadores para Educar' }
    ]
  },

  /* Música de fondo del sitio (borrador, no es un himno oficial). */
  musicaFondo: 'assets/audio/musica-de-fondo.mp3',

  areas: [
    { slug: 'tecnologia', nombre: 'Tecnología e Informática' },
    { slug: 'innovatec', nombre: 'Innovatec' },
    { slug: 'ciencia', nombre: 'Ciencia, Tecnología e Innovación' },
    { slug: 'medioambiente', nombre: 'Medioambiente' },
    { slug: 'lectura', nombre: 'Lectura' },
    { slug: 'comunidad', nombre: 'Comunidad' }
  ],

  galeria: [
    { titulo: 'Día del Estudiante 2026', src: 'assets/img/galeria/dia-del-estudiante-2026.jpg', alt: 'Fotografía de la comunidad educativa en la celebración del Día del Estudiante 2026', referencia: false, publicado: true },
    { titulo: 'Juegos Tradicionales', src: 'assets/img/facebook/auto-122199609044861024-foto-3.jpg', alt: 'Estudiantes con el cartel de los Sextos Juegos Tradicionales de la institución', referencia: false, publicado: true },
    { titulo: 'Festival del Viento', src: 'assets/img/facebook/auto-122203599122861024-foto-2.jpg', alt: 'Niños y niñas jugando con cometas en el Festival del Viento', referencia: false, publicado: true },
    { titulo: 'Feria de la Ciencia', src: 'assets/img/noticias/feria-ciencia-2026.jpg', alt: 'Stand de la feria institucional de ciencia, tecnología e innovación', referencia: false, publicado: true },
    { titulo: 'Izada de Bandera', src: 'assets/img/facebook/auto-122208536294861024-foto-3.jpg', alt: 'Estudiantes en formación durante la izada de bandera', referencia: false, publicado: true },
    { titulo: 'Medio ambiente y siembra', src: 'assets/img/facebook/auto-122187885302861024-foto-3.jpg', alt: 'Estudiantes sembrando y cuidando las plantas de la institución', referencia: false, publicado: true },
    { titulo: 'Periódico mural escolar', src: 'assets/img/galeria/periodico-mural.jpg', alt: 'Trabajo de los estudiantes en el periódico mural escolar', referencia: false, publicado: true },
    { titulo: 'Tecnología e informática', src: 'assets/img/noticias/entrega-computadores-2026.jpg', alt: 'Estudiantes con los computadores entregados a la institución', referencia: false, publicado: true },
    { titulo: 'Plan lector y biblioteca', src: 'assets/img/facebook/auto-122179744838861024-foto-3.jpg', alt: 'Mural del Día del Idioma elaborado por los estudiantes de la institución', referencia: false, publicado: true },
    { titulo: 'Escuela de familias', src: 'assets/img/facebook/auto-122208533696861024-foto-3.jpg', alt: 'Familias y docentes reunidos en la Tercera Escuela de Padres de la institución', referencia: false, publicado: true },
    { titulo: 'Participación estudiantil', src: 'assets/img/facebook/auto-122181923636861024-foto-1.jpg', alt: 'Encuentro de participación estudiantil y liderazgo con estudiantes y docentes', referencia: false, publicado: true }
  ],

  noticias: [
    {
      "titulo": "Feria de la Ciencia y visita de la Alcaldía de Puerto Guzmán",
      "fecha": "23 de septiembre de 2026",
      "categoria": "Ciencia y comunidad",
      "imagen": "assets/img/noticias/feria-ciencia-2026.jpg",
      "imagenes": [
        "assets/img/noticias/feria-ciencia-2026.jpg"
      ],
      "fotos": 1,
      "resumen": "Gracias a la Alcaldía de Puerto Guzmán por visitarnos y motivar la ciencia, la tecnología y la innovación en nuestros estudiantes.",
      "detalle": "<p>Gracias <strong>Alcaldía de Puerto Guzmán</strong> por visitarnos y motivar la ciencia, la tecnología y la innovación en nuestros estudiantes de la IER Puerto Rosario.</p><p>«La ciencia también se vive y se construye desde nuestras aulas»: en el marco del Día de la Familia vivimos una jornada muy especial, en la que además disfrutamos de la Feria de la Ciencia, la Tecnología y la Innovación, y nuestros estudiantes demostraron todo su talento.</p><video controls preload=\"none\" playsinline width=\"360\" height=\"640\" poster=\"assets/video/feria-ciencia-2026-portada.jpg\"><source src=\"assets/video/feria-ciencia-2026.mp4\" type=\"video/mp4\">Su navegador no puede reproducir este video; puede verlo en la publicación original de Facebook.</video><p class=\"campo__ayuda\">Video de la feria publicado por la Alcaldía de Puerto Guzmán, 23 de septiembre de 2026.</p>",
      "enlace": "https://www.facebook.com/reel/1426232862785078",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Los esperamos en nuestra IER Puerto Rosario",
      "fecha": "15 de octubre de 2026",
      "categoria": "Institucional",
      "imagen": "assets/img/facebook/invitacion-matriculas-2026-1.jpg",
      "imagenes": [
        "assets/img/facebook/invitacion-matriculas-2026-1.jpg"
      ],
      "fotos": 1,
      "resumen": "Los esperamos en nuestra Ier Puerto Rosario",
      "detalle": "<p>Los esperamos en nuestra Ier Puerto Rosario</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122211002024861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Tercera Izada de Bandera",
      "fecha": "1 de octubre de 2026",
      "categoria": "Institucional",
      "imagen": "assets/img/facebook/auto-122208536294861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122208536294861024-foto-1.jpg",
        "assets/img/facebook/auto-122208536294861024-foto-2.jpg",
        "assets/img/facebook/auto-122208536294861024-foto-3.jpg",
        "assets/img/facebook/auto-122208536294861024-foto-4.jpg",
        "assets/img/facebook/auto-122208536294861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🇨🇴🌟 Tercera Izada de Bandera – Ier Puerto Rosario  🌟🇨🇴",
      "detalle": "<p>🇨🇴🌟 Tercera Izada de Bandera – Ier Puerto Rosario  🌟🇨🇴</p><p>En nuestra Institución Educativa Rural Pto Rosario  llevamos a cabo nuestra Tercera Izada de Bandera, un espacio especial para reconocer el esfuerzo, la dedicación y el compromiso de nuestros estudiantes.🏅🏆🎖️🎯</p><p>Durante esta jornada destacamos a nuestros mejores estudiantes por su rendimiento académico y disciplina, reconociendo en ellos valores como la responsabilidad, la constancia, el respeto y el deseo de superarse cada día. 👏📚🏅🎯</p><p>También disfrutamos de una importante actividad de bilingüismo, donde nuestros estudiantes tuvieron la oportunidad de demostrar sus aprendizajes y fortalecer sus habilidades en el idioma inglés de una manera dinámica y significativa. 🇬🇧📖🎤</p><p>Estos espacios nos recuerdan que educar no es solamente alcanzar buenos resultados académicos, sino también formar estudiantes responsables, disciplinados, seguros de sí mismos y preparados para asumir nuevos retos.</p><p>Felicitamos a todos nuestros estudiantes reconocidos y agradecemos a los docentes y familias por acompañar y apoyar cada uno de sus procesos. 💙🎯</p><p>¡En la IER Puerto Rosario seguimos reconociendo el esfuerzo, fortaleciendo los aprendizajes y construyendo juntos nuevas oportunidades para nuestros estudiantes!🙏🏼❤️</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #TerceraIzadaDeBandera #ReconocimientoEstudiantil #RendimientoAcadémico #Disciplina #Bilingüismo #EducaciónConValores #ComunidadEducativa</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122208536294861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Tercera Escuela de Padres",
      "fecha": "1 de octubre de 2026",
      "categoria": "Comunidad",
      "imagen": "assets/img/facebook/auto-122208533696861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122208533696861024-foto-1.jpg",
        "assets/img/facebook/auto-122208533696861024-foto-2.jpg",
        "assets/img/facebook/auto-122208533696861024-foto-3.jpg",
        "assets/img/facebook/auto-122208533696861024-foto-4.jpg",
        "assets/img/facebook/auto-122208533696861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "👨‍👩‍👧‍👦💙 Tercera Escuela de Padres – Ier Puerto Rosario  💙👨‍👩‍👧‍👦",
      "detalle": "<p>👨‍👩‍👧‍👦💙 Tercera Escuela de Padres – Ier Puerto Rosario  💙👨‍👩‍👧‍👦</p><p>En nuestra Institución Educativa Rural Puerto Institución Educativa Rural Pto Rosario  llevamos a cabo nuestra Tercera Escuela de Padres, un espacio para encontrarnos, dialogar y reflexionar sobre el importante papel que tenemos como familias en la formación de nuestros niños, niñas y jóvenes.🙏🏼🎊🎉❤️</p><p>Durante la jornada conversamos sobre nuestros compromisos como padres y acudientes, la importancia de acompañar a nuestros hijos en cada etapa de su vida y, especialmente, sobre la necesidad de inculcar buenos valores desde el hogar, de igual forma se inició el proyecto Latidos del Corazón, por parte de la Alcaldía Puerto Guzman - Putumayo</p><p>❤️ El respeto, la responsabilidad, la honestidad, la solidaridad y el amor son semillas que se cultivan cada día y que, con el ejemplo, ayudan a nuestros hijos a crecer como mejores personas.❤️</p><p>🤝 Familia y escuela somos un equipo. Cuando caminamos juntos, acompañamos mejor a nuestros estudiantes y contribuimos a construir sus sueños y proyectos de vida.</p><p>🙏 Agradecemos a las familias por su participación y disposición para seguir aprendiendo y fortaleciendo juntos nuestra comunidad educativa y a todos nuestros compañeros docentes.</p><p>¡Educar es una tarea compartida y los valores comienzan en casa! 🌱📚</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #EscuelaDePadres #FamiliaYEscuela #EducaciónConValores #CompromisoFamiliar #ComunidadEducativa</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122208533696861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Primera Celebración del Día del Egresado",
      "fecha": "19 de septiembre de 2026",
      "categoria": "Institucional",
      "imagen": "assets/img/facebook/auto-122206283174861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122206283174861024-foto-1.jpg",
        "assets/img/facebook/auto-122206283174861024-foto-2.jpg",
        "assets/img/facebook/auto-122206283174861024-foto-3.jpg",
        "assets/img/facebook/auto-122206283174861024-foto-4.jpg",
        "assets/img/facebook/auto-122206283174861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🎓💙 Primera Celebración del Día del Egresado – Ier Puerto Rosario 💙🎓💥🎊🎉💯",
      "detalle": "<p>🎓💙 Primera Celebración del Día del Egresado – Ier Puerto Rosario 💙🎓💥🎊🎉💯</p><p>Con gran alegría y emoción, nuestra Institución Educativa Rural Pto Rosario celebró por primera vez el Día del Egresado, un encuentro especial para recordar experiencias, fortalecer lazos y reafirmar el sentido de pertenencia hacia nuestra institución.🤗🙏🏼</p><p>✨ Uno de los momentos más significativos de la jornada fue la actividad de la Cápsula del Tiempo, en la que nuestras egresadas plasmaron sus sueños, pensamientos, metas y mensajes para el futuro. Este valioso tesoro será abierto dentro de dos años, permitiéndoles reencontrarse con los anhelos y reflexiones que hoy guardan en sus corazones.💥🩵</p><p>🥂 Durante la celebración también compartimos un brindis y realizamos la entrega de certificados de reconocimiento, destacando el vínculo que nuestros egresados mantienen con la institución y los valores que continúan proyectando en sus vidas.</p><p>🤝 Este encuentro permitió fortalecer la identidad institucional, el compañerismo y el agradecimiento por las enseñanzas y experiencias vividas en la IER Puerto Rosario.</p><p>💙 Ser egresado no significa cerrar una etapa, sino llevar siempre consigo los valores, aprendizajes y recuerdos que hacen parte de nuestra historia.</p><p>👏 Gracias a todos los egresados que participaron e hicieron de esta primera celebración un momento inolvidable, gracias compañeros docentes por el apoyo brindado 🙏🏼.</p><p class=\"detalle__etiquetas\">#DíaDelEgresado #IERPuertoRosario #SentidoDePertenencia #CápsulaDelTiempo #ValoresQueTrascienden #OrgulloInstitucional #EgresadosIERPuertoRosario</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122206283174861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Segunda Semana de la Ciencia, la Tecnología y la Innovación",
      "fecha": "19 de septiembre de 2026",
      "categoria": "Ciencia",
      "imagen": "assets/img/facebook/auto-122206276388861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122206276388861024-foto-1.jpg",
        "assets/img/facebook/auto-122206276388861024-foto-2.jpg",
        "assets/img/facebook/auto-122206276388861024-foto-3.jpg",
        "assets/img/facebook/auto-122206276388861024-foto-4.jpg",
        "assets/img/facebook/auto-122206276388861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🔬🚀 Segunda Semana de la Ciencia, la Tecnología y la Innovación – Ier Puerto Rosario 🚀🔬",
      "detalle": "<p>🔬🚀 Segunda Semana de la Ciencia, la Tecnología y la Innovación – Ier Puerto Rosario 🚀🔬</p><p>En nuestra  Institución Educativa Rural Puerto Institución Educativa Rural Pto Rosario se vivió con gran entusiasmo la Segunda Semana de la Ciencia, la Tecnología y la Innovación, un espacio donde nuestros estudiantes de primaria y secundaria demostraron su creatividad, curiosidad y capacidad para aprender a través de la experimentación.💥💥🎊🎉🫯🫯🫯🎉🔥🔥</p><p>🧪 Durante la jornada se presentaron diversos experimentos y proyectos que permitieron fortalecer el pensamiento científico, la investigación, la observación y la búsqueda de soluciones a situaciones de la vida cotidiana.</p><p>🤝 Esta actividad destacó el valor del trabajo en equipo, el aprendizaje colaborativo, la innovación y el compromiso de nuestros estudiantes con la construcción de nuevos conocimientos.</p><p>👏 Agradecemos el valioso acompañamiento de los padres de familia, el compromiso de nuestros docentes y el liderazgo del Comité Innovatec, quienes hicieron posible el desarrollo exitoso de esta importante semana académica.💥🎊🎉💯</p><p>✨ En la IER Puerto Rosario seguimos promoviendo espacios que inspiran a nuestros estudiantes a investigar, crear, innovar y descubrir que el conocimiento es la herramienta más poderosa para transformar su entorno y construir un mejor futuro.</p><p>💡📚 La ciencia nos permite comprender el mundo; la tecnología y la innovación nos ayudan a transformarlo.</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #SemanaDeLaCiencia #Innovación #Tecnología #Investigación #Innovatec #AprendizajeColaborativo #EducaciónConCalidad #TrabajoEnEquipo</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122206276388861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Día de la Familia",
      "fecha": "19 de septiembre de 2026",
      "categoria": "Comunidad",
      "imagen": "assets/img/facebook/auto-122206267508861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122206267508861024-foto-1.jpg",
        "assets/img/facebook/auto-122206267508861024-foto-2.jpg",
        "assets/img/facebook/auto-122206267508861024-foto-3.jpg",
        "assets/img/facebook/auto-122206267508861024-foto-4.jpg",
        "assets/img/facebook/auto-122206267508861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "👨‍👩‍👧‍👦❤️ Día de la Familia – Ier Puerto Rosario ❤️👨‍👩‍👧‍👦",
      "detalle": "<p>👨‍👩‍👧‍👦❤️ Día de la Familia – Ier Puerto Rosario ❤️👨‍👩‍👧‍👦</p><p>En nuestra  Institución Educativa Rural Pto Rosario  celebramos con alegría el Día de la Familia, una jornada especial que reunió a padres, estudiantes, docentes y comunidad educativa en torno a los valores que fortalecen nuestros hogares y nuestra institución.🙏🏼🎊💥🎉🎊🎊</p><p>✨ Durante este encuentro disfrutamos de actos culturales, actividades deportivas y espacios de integración que permitieron fortalecer la unión familiar, el trabajo en equipo, el respeto, la solidaridad y el compañerismo.🙏🏼🎊💥</p><p>🤝 También compartimos momentos de alegría y fraternidad, reafirmando que la familia es el primer escenario donde se construyen los valores que orientan la vida de nuestros niños y jóvenes.</p><p>🎭⚽ Las presentaciones culturales y deportivas demostraron el talento, el compromiso y la participación activa de nuestra comunidad educativa, convirtiendo esta celebración en una experiencia inolvidable para todos.</p><p>💙 Agradecemos a las familias por su asistencia y entusiasmo, porque cuando escuela y familia caminan juntas, se fortalecen los procesos educativos y se construye un mejor futuro para nuestros estudiantes, agradecemos a todo el comercio de Pto Guzmán y a Pto  Rosario, a la Alcaldía Puerto Guzman - Putumayo  Diputado Nolver Figueroa Delgado que se vincularon con los detalles, gracias compañeros docentes por todo el apoyo brindado 🙏🏼🤗</p><p>¡La familia es el corazón de la educación y la base de una sociedad llena de valores y esperanza!</p><p class=\"detalle__etiquetas\">#DíaDeLaFamilia #IERPuertoRosario #UniónFamiliar #TrabajoEnEquipo #EducaciónConValores #ComunidadEducativa #FamiliaYEscuela</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122206267508861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Directorio institucional actualizado (PGIRE)",
      "fecha": "9 de septiembre de 2026",
      "categoria": "Transparencia",
      "imagen": "assets/img/facebook/directorio-pgire-1.jpg",
      "imagenes": [
        "assets/img/facebook/directorio-pgire-1.jpg"
      ],
      "fotos": 1,
      "resumen": "Compartimos directorio actualizado en el marco del plan de acción de nuestro PGIRE.",
      "detalle": "<p>Compartimos directorio actualizado en el marco del plan de acción de nuestro PGIRE.</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122204545850861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Festival del Viento 2026",
      "fecha": "4 de septiembre de 2026",
      "categoria": "Cultural",
      "imagen": "assets/img/facebook/auto-122203599122861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122203599122861024-foto-1.jpg",
        "assets/img/facebook/auto-122203599122861024-foto-2.jpg",
        "assets/img/facebook/auto-122203599122861024-foto-3.jpg",
        "assets/img/facebook/auto-122203599122861024-foto-4.jpg",
        "assets/img/facebook/auto-122203599122861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🪁🌈 Festival del Viento 2026 – Ier Puerto Rosario  🌈🪁",
      "detalle": "<p>🪁🌈 Festival del Viento 2026 – Ier Puerto Rosario  🌈🪁</p><p>Con gran entusiasmo y alegría, nuestra Institución Educativa Rural Puerto Institución Educativa Rural Pto Rosario  celebró el tradicional Festival del Viento, una jornada llena de color, integración y diversión, en la que participaron activamente estudiantes, docentes y padres de familia.💥🎊🎉💯</p><p>✨ El cielo se llenó de sueños y esperanza con el vuelo de hermosas cometas, mientras las familias compartían momentos inolvidables de unión y sana convivencia.</p><p>Durante la actividad se premiaron diferentes categorías: 🏆 La cometa más grande. 🏆 La cometa más pequeña. 🏆 La cometa que más alto voló. 🏆 La cometa que más lejos llegó.💥🎊🎉💥💥💥🎊🎊</p><p>🤝 Más que una competencia, este festival fue una oportunidad para fortalecer los lazos de amistad, el compañerismo, el trabajo en equipo y el sentido de pertenencia por nuestra institución.🙏🏼</p><p>💙 Agradecemos a toda la comunidad educativa por hacer de esta jornada un espacio de alegría, creatividad y encuentro familiar, demostrando una vez más que cuando escuela y familia trabajan juntas, construyen experiencias que dejan huella en el corazón de nuestros estudiantes.</p><p>🪁 Que nuestros sueños vuelen tan alto como las🤗🙏🏼 cometas que iluminaron el cielo de Puerto Rosario.</p><p>#FestivalDelViento #IERPuertoRosario #Cometas #IntegraciónFamiliar #TrabajoEnEquipo #ConvivenciaEscolar #EducaciónConValores #ComunidadEducativa 🪁💙🌤️</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122203599122861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Celebrando nuestra historia y nuestras tradiciones",
      "fecha": "12 de agosto de 2026",
      "categoria": "Cultural",
      "imagen": "assets/img/facebook/auto-122199609044861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122199609044861024-foto-1.jpg",
        "assets/img/facebook/auto-122199609044861024-foto-2.jpg",
        "assets/img/facebook/auto-122199609044861024-foto-3.jpg",
        "assets/img/facebook/auto-122199609044861024-foto-4.jpg",
        "assets/img/facebook/auto-122199609044861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🇨🇴🎺  Institución Educativa Rural Pto Rosario :  celebrando nuestra historia y nuestras tradiciones 🇨🇴",
      "detalle": "<p>🇨🇴🎺  Institución Educativa Rural Pto Rosario :  celebrando nuestra historia y nuestras tradiciones 🇨🇴</p><p>La Ier Puerto Rosario  participó activamente en la conmemoración de la Batalla de Boyacá, una fecha que nos invita a recordar nuestra historia y a fortalecer el amor y respeto por nuestros símbolos patrios.🇨🇴💯</p><p>🎺 Con mucho orgullo, nuestra Banda de Paz rindió homenaje a esta importante fecha y acompañó el desfile que recorrió las principales calles de Puerto Rosario, llevando música, alegría y sentido de pertenencia a nuestra comunidad.</p><p>🪀⚽ Como parte de esta celebración también disfrutamos de los VI Juegos Tradicionales Autóctonos, donde nuestros estudiantes participaron en actividades como bolas, trompos, encostalados, entre otros juegos que hacen parte de nuestras tradiciones.💥🎉🎊💯</p><p>Estos espacios permiten disfrutar de un sano esparcimiento, compartir entre compañeros y fortalecer valores como el respeto, la solidaridad, el compañerismo, la sana competencia y el trabajo en equipo.🎯</p><p>💙 En la IER Puerto Rosario seguimos promoviendo espacios donde nuestros estudiantes aprendan, disfruten, conozcan nuestra historia y mantengan vivas nuestras tradiciones.</p><p>🇨🇴 ¡Porque educar también es preservar nuestra identidad y celebrar lo que somos!</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #BatallaDeBoyacá #JuegosTradicionales #BandaDePaz #IdentidadCultural #Valores #SanoEsparcimiento #PuertoRosario</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122199609044861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Segunda Escuela de Padres y rendición de cuentas",
      "fecha": "24 de julio de 2026",
      "categoria": "Comunidad",
      "imagen": "assets/img/facebook/auto-122195855432861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122195855432861024-foto-1.jpg",
        "assets/img/facebook/auto-122195855432861024-foto-2.jpg",
        "assets/img/facebook/auto-122195855432861024-foto-3.jpg",
        "assets/img/facebook/auto-122195855432861024-foto-4.jpg",
        "assets/img/facebook/auto-122195855432861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "👨‍👩‍👧‍👦📚 Segunda Escuela de Padres – Ier Puerto Rosario  🌱",
      "detalle": "<p>👨‍👩‍👧‍👦📚 Segunda Escuela de Padres – Ier Puerto Rosario  🌱</p><p>En nuestra Institución Educativa Rural Puerto Institución Educativa Rural Pto Rosario  llevamos a cabo con gran éxito la Segunda Escuela de Padres, un espacio de encuentro, diálogo y participación que fortaleció los vínculos entre la familia y la escuela.💯🎯🎊🆗🤩</p><p>Durante la jornada contamos con la valiosa articulación de la Biblioteca Pública Municipal de Puerto Guzmán Alcaldía Puerto Guzman - Putumayo  con quienes vamos a desarrollar un excelente proyecto de huertas escolares y familiares, promoviendo la educación ambiental, la seguridad alimentaria y el trabajo en equipo como herramientas para el aprendizaje y el desarrollo de nuestras familias.</p><p>Asimismo, se realizó la Rendición de Cuentas del primer semestre de 2026, socializando a la comunidad educativa los avances, logros y acciones desarrolladas por nuestra institución, en un ejercicio de transparencia, participación y compromiso con la calidad educativa💯💥⚡.</p><p>Finalmente, se hizo la entrega de los boletines correspondientes al segundo período académico, brindando a los padres de familia la oportunidad de conocer el desempeño de sus hijos y fortalecer el acompañamiento en su proceso formativo.🎯🥉🏅🎖️🏆</p><p>🤝 Agradecemos a todos los padres de familia por su asistencia y compromiso, a la Biblioteca Pública Municipal de Puerto Guzmán por su valioso apoyo y a nuestros docentes por su dedicación en la organización de esta importante jornada.🎯</p><p>Familia y escuela, trabajando de la mano para sembrar conocimientos, valores y un mejor futuro para nuestros estudiantes. 💙🌱📚</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #EscuelaDePadres #TrabajoEnEquipo #RendiciónDeCuentas #ProyectoDeHuertas #BibliotecaPública #EducaciónConValores #ComunidadEducativa</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122195855432861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Izada de Bandera – Segundo Período Académico",
      "fecha": "24 de julio de 2026",
      "categoria": "Institucional",
      "imagen": "assets/img/facebook/auto-122195853632861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122195853632861024-foto-1.jpg",
        "assets/img/facebook/auto-122195853632861024-foto-2.jpg",
        "assets/img/facebook/auto-122195853632861024-foto-3.jpg",
        "assets/img/facebook/auto-122195853632861024-foto-4.jpg"
      ],
      "fotos": 4,
      "resumen": "🇨🇴✨ Izada de Bandera – Segundo Período Académico ✨🇨🇴🎯💯",
      "detalle": "<p>🇨🇴✨ Izada de Bandera – Segundo Período Académico ✨🇨🇴🎯💯</p><p>En nuestra Institución Educativa Rural Pto Rosario  llevamos a cabo la Izada de Bandera correspondiente al segundo período académico, un acto cívico en el que reconocimos el compromiso, la dedicación y el esfuerzo de nuestros estudiantes.</p><p>Durante esta ceremonia exaltamos a quienes, con su excelente desempeño académico, convivencia, liderazgo y práctica de valores, se hicieron merecedores de este reconocimiento. Asimismo, destacamos el valioso acompañamiento de los padres de familia, cuyo apoyo y compromiso son fundamentales para el crecimiento personal y académico de sus hijos.</p><p>👏 Felicitamos a todos los estudiantes homenajeados y a sus familias por este importante logro. Que este reconocimiento sea una motivación para continuar esforzándose, superando retos y siendo ejemplo para toda la comunidad educativa.</p><p>📚 En la Ier Puerto Rosario creemos que cada logro es el resultado del trabajo conjunto entre estudiantes, familias y docentes, unidos por un mismo propósito: formar ciudadanos íntegros, responsables y comprometidos con su futuro.</p><p>¡Sigamos construyendo juntos una educación basada en el esfuerzo, los valores y la excelencia! 💙</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #IzadaDeBandera #Reconocimiento #EducaciónConValores #ExcelenciaAcadémica  #ComunidadEducativa</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122195853632861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Entrega de computadores – Tecnologías para Aprender",
      "fecha": "16 de julio de 2026",
      "categoria": "Tecnología",
      "imagen": "assets/img/facebook/auto-122194474004861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122194474004861024-foto-1.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-2.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-3.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-4.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "💻🎓 ¡La tecnología abre puertas al conocimiento y transforma vidas! 🎓💻",
      "detalle": "<p>💻🎓 ¡La tecnología abre puertas al conocimiento y transforma vidas! 🎓💻</p><p>Nuestra  Institución Educativa Rural Puerto Rosario expresa su más sincero agradecimiento al Ministerio TIC, al programa Computadores para Educar y a la estrategia Tecnologías para Aprender, por hacer posible la entrega de computadores portátiles a nuestros estudiantes de noveno y décimo grado.</p><p>De igual manera, extendemos un especial reconocimiento a la Secretaría de Educación Departamental del Putumayo, a la Alcaldía Municipal de Puerto Guzmán, a la Coordinación de Educación Municipal, a nuestros docentes y a la Rectoría de la IER Puerto Rosario, quienes, con su compromiso, gestión y trabajo articulado, hicieron posible que nuestra institución fuera beneficiaria de esta importante convocatoria.</p><p>🤝 Este logro demuestra que cuando las instituciones trabajan unidas por un mismo propósito, se generan oportunidades que transforman la vida de nuestros niños y jóvenes.</p><p>💙 Estos equipos no solo fortalecen los procesos de enseñanza y aprendizaje, sino que también impulsan el desarrollo de competencias digitales, amplían las oportunidades educativas y contribuyen a que nuestros estudiantes construyan un proyecto de vida con mayores posibilidades de éxito.</p><p>Seguiremos trabajando con compromiso para que la educación continúe siendo el camino que transforma vidas, reduce brechas y abre las puertas a un mejor futuro para nuestra comunidad.</p><p>¡Gracias por creer en la educación rural y en el talento de nuestros estudiantes! 🌟📚</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #ComputadoresParaEducar #MinisterioTIC #TecnologíasParaAprender #EducaciónRural #TrabajoEnEquipo #ProyectoDeVida #TransformandoVidas</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122194474826861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Entrega de computadores – Tecnologías para Aprender (2.ª publicación)",
      "fecha": "16 de julio de 2026",
      "categoria": "Tecnología",
      "imagen": "assets/img/facebook/auto-122194474004861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122194474004861024-foto-1.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-2.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-3.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-4.jpg",
        "assets/img/facebook/auto-122194474004861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "💻🎓 ¡La tecnología abre puertas al conocimiento y transforma vidas! 🎓💻",
      "detalle": "<p>💻🎓 ¡La tecnología abre puertas al conocimiento y transforma vidas! 🎓💻</p><p>Nuesra Institución Educativa Rural Puerto Rosario expresa su más sincero agradecimiento al Ministerio TIC, al programa Computadores para Educar y a la estrategia Tecnologías para Aprender, por hacer posible la entrega de computadores portátiles de uso personal a nuestros estudiantes de noveno y décimo grado.</p><p>De igual manera, extendemos un especial reconocimiento a la Secretaría de Educación Departamental del Putumayo , a la Alcaldía Puerto Guzman - Putumayo, a la Coordinación de Educación Municipal, a nuestros docentes y a la Rectoría de la Ier Pto Rosario, quienes, con su compromiso, gestión y trabajo articulado, hicieron posible que nuestra institución fuera beneficiaria de esta importante convocatoria.</p><p>🤝 Este logro demuestra que cuando las instituciones trabajan unidas por un mismo propósito, se generan oportunidades que transforman la vida de nuestros niños y jóvenes.</p><p>💙 Estos equipos no solo fortalecen los procesos de enseñanza y aprendizaje, sino que también impulsan el desarrollo de competencias digitales, amplían las oportunidades educativas y contribuyen a que nuestros estudiantes construyan un proyecto de vida con mayores posibilidades de éxito.</p><p>Seguiremos trabajando con compromiso para que la educación continúe siendo el camino que transforma vidas, reduce brechas y abre las puertas a un mejor futuro para nuestra comunidad.</p><p>¡Gracias por creer en la educación rural y en el talento de nuestros estudiantes! 🌟📚</p><p class=\"detalle__etiquetas\">#ierpuertorosario #ComputadoresParaEducar #MinisterioTIC #TecnologíasParaAprender #EducaciónRural #TrabajoEnEquipo #ProyectoDeVida #TransformandoVidas</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122194474004861024/",
      "fuente": "Facebook",
      "demo": false,
      /* Es la MISMA entrega de computadores publicada dos veces en Facebook el
         16 de julio. Se deja oculta para no repetir la noticia, pero se
         conserva aquí para que el coleccionista automático no la vuelva a
         agregar. */
      "publicada": false
    },
    {
      "titulo": "Publicación institucional",
      "fecha": "20 de junio de 2026",
      "categoria": "Institucional",
      "imagen": "assets/img/facebook/sin-texto-junio-1.jpg",
      "imagenes": [
        "assets/img/facebook/sin-texto-junio-1.jpg"
      ],
      "fotos": 1,
      "resumen": "Publicación de la institución en su página oficial de Facebook.",
      "detalle": "<p>Publicación de la institución en su página oficial de Facebook.</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122190037664861024/",
      "fuente": "Facebook",
      "demo": false,
      /* Facebook creó este aviso automático al cambiar la foto de portada de la
         página: no es una publicación de la institución. Se deja oculto. */
      "publicada": false
    },
    {
      "titulo": "Celebración del Día del Estudiante – Sedes Multigrado",
      "fecha": "20 de junio de 2026",
      "categoria": "Comunidad",
      "imagen": "assets/img/facebook/auto-122190035810861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122190035810861024-foto-1.jpg",
        "assets/img/facebook/auto-122190035810861024-foto-2.jpg",
        "assets/img/facebook/auto-122190035810861024-foto-3.jpg",
        "assets/img/facebook/auto-122190035810861024-foto-4.jpg",
        "assets/img/facebook/auto-122190035810861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🎉👧🧒 Celebración del Día del Estudiante – Sección Primaria Sedes Multigrado Ier Puerto Rosario 🧒👧🎉",
      "detalle": "<p>🎉👧🧒 Celebración del Día del Estudiante – Sección Primaria Sedes Multigrado Ier Puerto Rosario 🧒👧🎉</p><p>Nuestra Institución Educativa Rural Pto Rosario  celebró con alegría el Día del Estudiante junto a los niños y niñas de las sedes multigrado de primaria, en una jornada llena de sonrisas, integración, recreación y momentos inolvidables.</p><p>✨ Esta actividad fue un reconocimiento a nuestros estudiantes, quienes con su entusiasmo, creatividad y ganas de aprender llenan de vida nuestras aulas cada día.</p><p>Durante la celebración compartimos espacios de sana convivencia, fortaleciendo valores como la amistad, el respeto, la solidaridad y el trabajo en equipo.🎊🎉🤩🥳</p><p>💙 Agradecemos a los docentes, orientadora escolar, Docente PTA, padres de familia y a todos quienes hicieron posible esta hermosa jornada, dedicada a quienes son la razón de ser de nuestra institución: nuestros estudiantes.🙏🏼🤗</p><p>🌟 ¡Feliz Día del Estudiante! Que nunca pierdan la alegría de aprender, soñar y construir un futuro lleno de oportunidades.</p><p class=\"detalle__etiquetas\">#DíaDelEstudiante #IERPuertoRosario #SedesMultigrado #EducaciónConAmor #NiñezFeliz #FormandoFuturo</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122190035810861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Conmemoración del Día Mundial del Medio Ambiente",
      "fecha": "10 de junio de 2026",
      "categoria": "Ambiental",
      "imagen": "assets/img/facebook/auto-122187885302861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122187885302861024-foto-1.jpg",
        "assets/img/facebook/auto-122187885302861024-foto-2.jpg",
        "assets/img/facebook/auto-122187885302861024-foto-3.jpg",
        "assets/img/facebook/auto-122187885302861024-foto-4.jpg",
        "assets/img/facebook/auto-122187885302861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "Conmemoración del Día Mundial del Medio Ambiente en nuestra Institución Educativa Rural Pto Rosario 🌱🌎",
      "detalle": "<p>Conmemoración del Día Mundial del Medio Ambiente en nuestra Institución Educativa Rural Pto Rosario 🌱🌎</p><p>En la Ier Puerto Rosario  nos unimos a la conmemoración del Día Mundial del Medio Ambiente, una fecha que nos invita a reflexionar sobre la importancia de cuidar, proteger y conservar los recursos naturales que nos brinda nuestro planeta.</p><p>A través de diferentes actividades, nuestros estudiantes fortalecieron su compromiso con el medio ambiente, promoviendo valores como la responsabilidad, el respeto por la naturaleza y la conciencia ecológica.🎯💯🌿🌳</p><p>🌳 Cada acción cuenta cuando se trata de proteger nuestro entorno, agradecemos al comité de medio ambiente, docentes y estudiantes de nuestra institución 💯🙏🏼</p><p>Desde la escuela seguimos formando ciudadanos comprometidos con el desarrollo sostenible y la construcción de un futuro más verde para las nuevas generaciones.🔥</p><p>💚 Cuidar el medio ambiente es una tarea de todos.</p><p>#DíaDelMedioAmbiente #IERPuertoRosario #EducaciónAmbiental #CuidemosElPlaneta #AmorPorLaNaturaleza #SembrandoFuturo :::</p><p class=\"detalle__etiquetas\">#ierptorosario</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122187885302861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Día de la Afrocolombianidad (2.ª publicación)",
      "fecha": "23 de mayo de 2026",
      "categoria": "Cultural",
      "imagen": "assets/img/facebook/auto-122184776090861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122184776090861024-foto-1.jpg"
      ],
      "fotos": 1,
      "resumen": "Día de la Afrocolombianidad en nuestra Ier Puerto Rosario",
      "detalle": "<p>Día de la Afrocolombianidad en nuestra Ier Puerto Rosario</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122184777140861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Día de la Afrocolombianidad",
      "fecha": "23 de mayo de 2026",
      "categoria": "Cultural",
      "imagen": "assets/img/facebook/auto-122184776090861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122184776090861024-foto-1.jpg",
        "assets/img/facebook/auto-122184776090861024-foto-2.jpg",
        "assets/img/facebook/auto-122184776090861024-foto-3.jpg",
        "assets/img/facebook/auto-122184776090861024-foto-4.jpg",
        "assets/img/facebook/auto-122184776090861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🖤💛❤️ Día de la Afrocolombianidad – Ier Puerto Rosario  ❤️💛🖤💯🎯",
      "detalle": "<p>🖤💛❤️ Día de la Afrocolombianidad – Ier Puerto Rosario  ❤️💛🖤💯🎯</p><p>En nuestra Institución Educativa Rural Pto Rosario  conmemoramos el Día de la Afrocolombianidad, una fecha para reconocer, valorar y exaltar la riqueza cultural, las tradiciones, la historia y el importante aporte de las comunidades afrocolombianas a nuestra sociedad.</p><p>✨ A través de esta actividad promovimos en nuestros estudiantes valores como el respeto, la igualdad, la diversidad y el reconocimiento de nuestras raíces culturales.</p><p>📚 Educar también es enseñar a valorar nuestras diferencias y construir una sociedad más incluyente, respetuosa y llena de identidad cultural.</p><p>👏 Gracias a todos los estudiantes, comité de democracia, docentes y comunidad educativa que participaron en esta significativa jornada.</p><p class=\"detalle__etiquetas\">#DíaDeLaAfrocolombianidad #IERPuertoRosario #DiversidadCultural #EducaciónConValores</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122184776090861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Participación estudiantil y liderazgo",
      "fecha": "6 de mayo de 2026",
      "categoria": "Institucional",
      "imagen": "assets/img/facebook/auto-122181923636861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122181923636861024-foto-1.jpg",
        "assets/img/facebook/auto-122181923636861024-foto-2.jpg",
        "assets/img/facebook/auto-122181923636861024-foto-3.jpg",
        "assets/img/facebook/auto-122181923636861024-foto-4.jpg",
        "assets/img/facebook/auto-122181923636861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🏫🤝 Participación estudiantil y liderazgo – Ier Puerto Rosario  🤝🏫.",
      "detalle": "<p>🏫🤝 Participación estudiantil y liderazgo – Ier Puerto Rosario  🤝🏫.</p><p>Nuestros  estudiantes representantes de la Institución Educativa Rural Pto Rosario  participaron en la importante jornada convocada por la ASEP y la Secretaría de Educación Departamental, donde se dieron cita los Personeros, Contralores y Presidentes de estudiantes de las instituciones educativas del municipio de Puerto Guzmán.</p><p>✨ Estos espacios fortalecen el liderazgo, la participación democrática y el compromiso de nuestros jóvenes con sus instituciones y comunidades educativas.</p><p>👏 Felicitamos a nuestros estudiantes por representar con responsabilidad, respeto y sentido de pertenencia a nuestra institución, demostrando que la voz de los estudiantes es fundamental para seguir construyendo una educación participativa y con valores, de igual manera agradecemos al comité de democracia y educación sexual, por su apoyo en estos espacios.</p><p class=\"detalle__etiquetas\">#IERPuertoRosario #LiderazgoEstudiantil #ParticipaciónDemocrática #PuertoGuzmán #TrabajoEnEquipo #Ierptorlsario</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122181923636861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    },
    {
      "titulo": "Día del Árbol",
      "fecha": "29 de abril de 2026",
      "categoria": "Ambiental",
      "imagen": "assets/img/facebook/auto-122180707010861024-foto-1.jpg",
      "imagenes": [
        "assets/img/facebook/auto-122180707010861024-foto-1.jpg",
        "assets/img/facebook/auto-122180707010861024-foto-2.jpg",
        "assets/img/facebook/auto-122180707010861024-foto-3.jpg",
        "assets/img/facebook/auto-122180707010861024-foto-4.jpg",
        "assets/img/facebook/auto-122180707010861024-foto-5.jpg"
      ],
      "fotos": 5,
      "resumen": "🌳💚 Día del Árbol – Ier Puerto Rosario 💚🌳",
      "detalle": "<p>🌳💚 Día del Árbol – Ier Puerto Rosario 💚🌳</p><p>Hoy conmemoramos el Día del Árbol en nuestra Institución Educativa Rural Pto Rosario, una fecha para recordar que cada árbol es vida, esperanza y futuro para nuestro planeta.🌲🏞️🎯</p><p>En todas nuestras sedes sembramos más que conocimientos: sembramos conciencia, respeto y amor por la naturaleza 🌱. Nuestros árboles nos brindan sombra, aire puro y nos enseñan el valor de cuidar lo que nos rodea.💯🎯</p><p>✨ Educar también es aprender a proteger la vida en todas sus formas, gracias al comité de medio ambiente, docentes y estudiantes por su participación activa.</p><p>🌿 Cuidar un árbol es cuidar nuestro futuro.</p><p class=\"detalle__etiquetas\">#DíaDelÁrbol #IERPuertoRosario #CuidadoDelMedioAmbiente #EducaciónAmbiental #AmorPorLaNaturaleza</p>",
      "enlace": "https://www.facebook.com/61575830740720/posts/122180707010861024/",
      "fuente": "Facebook",
      "demo": false,
      "publicada": true
    }
  ],

  proyectos: [
    { titulo: 'Semillero de indagación e investigación', area: 'ciencia', imagen: 'assets/img/proyectos/gusano-mecanico-innovatec.jpg', descripcion: 'Proyecto «El Gusano Mecánico», presentado en la 2.ª Feria de Ciencia y Tecnología INNOVATEC: los estudiantes diseñaron un mecanismo de movimiento con materiales reciclados, aplicaron principios de energía y transmisión, y registraron pruebas y resultados.', detalle: '<p>Cartel del proyecto <strong>«El Gusano Mecánico»</strong> elaborado por los estudiantes para la 2.ª Feria de Ciencia y Tecnología INNOVATEC de la institución.</p><p>El cartel documenta el problema identificado, la construcción del prototipo, el circuito eléctrico, el cálculo de la relación de transmisión, las pruebas con sus resultados, los materiales utilizados y el producto final.</p>', demo: false, publicado: true },
    { titulo: 'Innovatec: ideas que resuelven problemas del campo', area: 'innovatec', imagen: 'assets/img/proyectos/teleferico-innovatec.jpg', descripcion: 'Proyecto de teleférico artesanal con el que los estudiantes exploran cómo mover cargas y materiales en un terreno quebrado, aprovechando recursos del entorno y trabajo en equipo.', detalle: '<p>Proyecto de <strong>teleférico artesanal</strong> desarrollado por los estudiantes para pensar soluciones de transporte en el terreno quebrado de la vereda.</p>', demo: false, publicado: true },
    { titulo: 'Sala de Tecnología e Informática', area: 'tecnologia', imagen: 'assets/img/proyectos/timbre-electrico-innovatec.jpg', descripcion: 'Montaje de circuitos eléctricos básicos —como el timbre eléctrico— para comprender el funcionamiento de la energía eléctrica, el interruptor y los componentes del circuito.', detalle: '<p>Proyecto de <strong>circuito eléctrico: timbre eléctrico</strong>, con el que los estudiantes identifican los componentes de un circuito, la fuente de energía y el papel del interruptor.</p>', demo: false, publicado: true },
    { titulo: 'Vivero, huerta y manejo de residuos', area: 'medioambiente', imagen: 'assets/img/proyectos/filtro-de-agua-innovatec.jpg', descripcion: 'Proyecto de filtro de agua y manejo responsable de los recursos: los estudiantes experimentan con materiales filtrantes y reflexionan sobre el cuidado del agua y la clasificación de residuos.', detalle: '<p>Proyecto de <strong>filtro de agua</strong> y cuidado de los recursos naturales, en el que los estudiantes experimentan con materiales filtrantes y analizan la importancia del agua para la vereda.</p>', demo: false, publicado: true },
    { titulo: 'Plan lector y tradición oral', area: 'lectura', imagen: 'assets/img/facebook/auto-122179744838861024-foto-1.jpg', descripcion: 'Espacio de lectura que combina la biblioteca escolar, la lectura en voz alta, la escritura creativa y la recopilación de relatos y saberes de las familias de la vereda.', detalle: '<p>La biblioteca escolar y los proyectos de lectura acompañan la formación en comprensión, expresión oral y amor por la palabra.</p><p>En la conmemoración del Día del Idioma, los estudiantes de sexto presentaron lecturas en voz alta y exposiciones sobre sus libros favoritos.</p>', demo: false, publicado: true },
    { titulo: 'Escuela de familias y participación comunitaria', area: 'comunidad', imagen: 'assets/img/facebook/auto-122208533696861024-foto-3.jpg', descripcion: 'Estrategia de participación: encuentros con las familias, apoyo a las actividades escolares y articulación con las organizaciones de la vereda.', detalle: '<p>Los encuentros con las familias refuerzan la corresponsabilidad educativa y la articulación con la comunidad de la vereda.</p><p>En la Tercera Escuela de Padres se socializaron los avances académicos y disciplinarios y se escucharon las propuestas de las familias.</p>', demo: false, publicado: true }
  ],

  documentos: [
    { titulo: 'Proyecto Educativo Institucional (PEI)', categoria: 'Institucional: PEI, Manual, SIEE', icono: 'libro', descripcion: 'Documento marco que define la identidad, el horizonte institucional, el componente pedagógico y el componente comunitario.', archivo: 'documentos/pei-2025.pdf', anio: '2025', publicado: true },
    { titulo: 'Manual de Convivencia', categoria: 'Convivencia y participación', icono: 'personas', descripcion: 'Normas de convivencia, derechos y deberes de la comunidad educativa y rutas de atención integral.', archivo: 'documentos/manual-convivencia-2025.pdf', anio: '2025', publicado: true },
    { titulo: 'SIEE: Sistema Institucional de Evaluación de Estudiantes', categoria: 'Institucional: PEI, Manual, SIEE', icono: 'graduacion', descripcion: 'Criterios, escalas y procedimientos de evaluación y promoción definidos por la institución.', archivo: 'documentos/siee-2025.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de Mejoramiento Institucional (PMI)', categoria: 'Gestión directiva y administrativa', icono: 'actualizar', descripcion: 'Metas, acciones y responsables para el mejoramiento continuo de la institución.', archivo: '', anio: '', publicado: true },
    { titulo: 'Calendario académico', categoria: 'Gestión directiva y administrativa', icono: 'calendario', descripcion: 'Fechas del año escolar vigente: periodos, actividades institucionales y periodos de receso.', archivo: 'documentos/calendario-academico-2026.pdf', anio: '2026', publicado: true },
    { titulo: 'Proyecto transversal de Ciencia, Tecnología e Innovación (InnovaTec)', categoria: 'Proyectos transversales', icono: 'hoja', descripcion: 'Feria de la ciencia, la tecnología y la innovación: introducción, objetivos, metodología y actividades.', archivo: 'documentos/proyecto-transversal-ciencia-y-tecnologia.pdf', anio: '2025', publicado: true },
    { titulo: 'Proyecto transversal de Ética y Valores', categoria: 'Proyectos transversales', icono: 'corazon', descripcion: '«Un mundo de valores para una sociedad soñadora»: marco legal, valores, metodología y actividades.', archivo: 'documentos/proyecto-transversal-etica-y-valores.pdf', anio: '2025', publicado: true },
    { titulo: 'Informes y documentos públicos', categoria: 'Transparencia y control social', icono: 'doc', descripcion: 'Informes de gestión, actas e información de interés público que la institución decida divulgar.', archivo: '', anio: '', publicado: true },

    /* ---- Planes de estudio por área (documentos oficiales de la institución) ---- */
    { titulo: 'Plan de estudio de Preescolar (educación inicial)', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Educación inicial y preescolar: dimensiones del desarrollo, ejes de trabajo y organización curricular.', archivo: 'documentos/plan-preescolar.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Ciencias Naturales — básica primaria (1.º a 5.º)', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Ciencias naturales y educación ambiental para los grados primero a quinto.', archivo: 'documentos/plan-ciencias-naturales-primaria.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Educación Física, Recreación y Deportes — básica', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Educación física, recreación y deportes para la básica primaria y secundaria.', archivo: 'documentos/plan-educacion-fisica-basica.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de Educación Física — primaria y sedes', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Plan del área de educación física para la básica primaria y las sedes anexas.', archivo: 'documentos/plan-educacion-fisica-primaria-sedes.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Ética y Valores — básica', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Formación ética y en valores para la básica primaria y secundaria.', archivo: 'documentos/plan-etica-y-valores-basica.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Lengua Castellana (Español)', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Área de humanidades: lenguaje, lectura crítica y producción textual.', archivo: 'documentos/plan-lengua-castellana.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Inglés', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Área de idioma extranjero: inglés.', archivo: 'documentos/plan-ingles.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Matemáticas — básica secundaria', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Pensamiento numérico, variacional, geométrico y aleatorio.', archivo: 'documentos/plan-matematicas-basica-secundaria.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Educación Religiosa', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Área de educación religiosa y moral.', archivo: 'documentos/plan-religion.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Ciencias Sociales', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Historia, geografía, democracia y competencias ciudadanas.', archivo: 'documentos/plan-ciencias-sociales.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de estudio de Tecnología e Informática', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Tecnología, informática y emprendimiento.', archivo: 'documentos/plan-tecnologia-e-informatica.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Educación Artística', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Educación artística y cultural.', archivo: 'documentos/plan-artistica.pdf', anio: '2021', publicado: true },
    { titulo: 'Plan de área de Educación Artística — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Artes para el grado décimo (educación media).', archivo: 'documentos/plan-artistica-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Ciencias Naturales (Biología, Química y Física) — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Ciencias naturales integradas para el grado décimo.', archivo: 'documentos/plan-ciencias-naturales-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Educación Física — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Educación física, recreación y deportes para el grado décimo.', archivo: 'documentos/plan-educacion-fisica-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Lengua Castellana — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Lenguaje y literatura para el grado décimo.', archivo: 'documentos/plan-lengua-castellana-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Ética y Valores — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Ética y valores para el grado décimo.', archivo: 'documentos/plan-etica-y-valores-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Filosofía — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Filosofía para el grado décimo.', archivo: 'documentos/plan-filosofia-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Inglés — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Inglés (B1.2) para el grado décimo.', archivo: 'documentos/plan-ingles-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Matemáticas — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Matemáticas para el grado décimo.', archivo: 'documentos/plan-matematicas-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Educación Religiosa — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Educación religiosa para el grado décimo.', archivo: 'documentos/plan-religion-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Ciencias Sociales, Políticas y Económicas — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Ciencias sociales, políticas y económicas para el grado décimo.', archivo: 'documentos/plan-ciencias-sociales-grado-10.pdf', anio: '2025', publicado: true },
    { titulo: 'Plan de área de Tecnología e Informática — grado 10.º', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Tecnología e informática para el grado décimo.', archivo: 'documentos/plan-tecnologia-e-informatica-grado-10.pdf', anio: '2025', publicado: true },

    /* ---- Planes de estudio 2026 ---- */
    { titulo: 'Plan de área de Tecnología e Informática 2026', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Versión 2026 del plan de área de tecnología e informática, organizada por centros de interés.', archivo: 'documentos/plan-tecnologia-e-informatica-2026.pdf', anio: '2026', publicado: true },
    { titulo: 'Malla curricular de Tecnología e Informática 2026', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Malla curricular 2026 de tecnología e informática por grado y periodo.', archivo: 'documentos/malla-curricular-tecnologia-2026.pdf', anio: '2026', publicado: true },
    { titulo: 'Planeador de Tecnología e Informática 2026 (grados 1.º a 10.º)', categoria: 'Planes de estudio por área', icono: 'libro', descripcion: 'Planeador de los cuatro periodos del año 2026 para los grados 1.º a 10.º.', archivo: 'documentos/planeador-tecnologia-grados-1-10-2026.pdf', anio: '2026', publicado: true }
  ],

  /* ---- VIDEOS INSTITUCIONALES ---------------------------------------
     Cada elemento de este arreglo se publica en la sección "Multimedia".
     Si el arreglo queda vacío, la sección no se muestra (así el sitio
     nunca enseña un reproductor sin contenido). --------------------- */
  videos: [
    { id: 'ia',
      titulo: 'Día de la Inteligencia Artificial',
      fecha: '2 de octubre de 2026',
      descripcion: 'Jornada dedicada a la inteligencia artificial: talleres, demostraciones y prototipos creados por los estudiantes.',
      archivo: 'assets/video/dia-de-la-inteligencia-artificial.mp4',
      poster: 'assets/video/dia-de-la-inteligencia-artificial-portada.jpg' },
    { id: 'bienvenida',
      titulo: 'Bienvenida a los nuevos estudiantes de preescolar',
      fecha: '2026',
      descripcion: 'Recorrido por la institución para recibir a los niños y las niñas que ingresan al grado preescolar.',
      archivo: 'assets/video/bienvenida-preescolar.mp4',
      poster: 'assets/video/bienvenida-preescolar-portada.jpg' },
    { id: 'andrea',
      titulo: 'Andrea y el Cambio en Puerto Rosario',
      fecha: '2026',
      descripcion: 'Historia animada sobre Puerto Rosario, sus paisajes y su gente, para compartir en familia.',
      archivo: 'assets/video/andrea-y-el-cambio.mp4',
      poster: 'assets/video/andrea-y-el-cambio-portada.jpg' },
    { id: 'convivencia',
      titulo: 'Manual de convivencia: aprendamos a convivir',
      fecha: '2026',
      descripcion: 'Explica de forma sencilla qué es el manual de convivencia y su sentido formativo: las normas también educan en valores.',
      archivo: 'assets/video/manual-de-convivencia.mp4',
      poster: 'assets/video/manual-de-convivencia-portada.jpg' },
    { id: 'feria-ciencia-2026',
      titulo: 'Feria de la Ciencia, la Tecnología y la Innovación',
      fecha: '23 de septiembre de 2026',
      descripcion: 'Recorrido por la feria: los proyectos de los estudiantes y la visita del secretario de Planeación, David Urbano, en el marco del Día de la Familia.',
      archivo: 'assets/video/feria-ciencia-2026.mp4',
      poster: 'assets/video/feria-ciencia-2026-portada.jpg',
      facebook: 'https://www.facebook.com/reel/1426232862785078' }
  ]
};
