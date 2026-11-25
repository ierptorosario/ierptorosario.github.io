/* ---------------------------------------------------------------------
   Acceso al panel institucional (admin.html). Se muestra siempre: el panel
   se publica en internet y se entra con la clave del sitio (token de GitHub),
   que no está escrita en la página. El panel tiene «noindex»: no aparece en
   los buscadores.
   --------------------------------------------------------------------- */
(function () {
  var a = document.getElementById('enlaceAdmin');
  if (a) { a.style.display = 'inline'; }
}());
