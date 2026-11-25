(function(){
  var controles = [document.querySelector('.audio-panel'), document.querySelector('#volverArriba')];
  var temporizador;
  function revisar(){
    if ((window.scrollY || 0) > 260) {
      controles.forEach(function(e){ if (e) e.classList.add('control-oculto'); });
    }
    clearTimeout(temporizador);
    temporizador = setTimeout(function(){
      controles.forEach(function(e){ if (e) e.classList.remove('control-oculto'); });
    }, 1200);
  }
  window.addEventListener('scroll', revisar, {passive:true});
})();
