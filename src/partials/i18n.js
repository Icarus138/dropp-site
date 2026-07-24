/* ============ I18N — runtime de page ============ */
/* Chaînes dynamiques de CETTE locale uniquement (inlinées au build),
   formatage des nombres via Intl, pluriels via Intl.PluralRules. */
window.I18N = (function(){
  var L = {{builtin.i18nJson}};
  var pr; try { pr = new Intl.PluralRules(L.lang); } catch(e){ pr = null; }
  var nfCache = {};
  function num(v, min, max){
    var k = min + '-' + max;
    if (!(k in nfCache)) {
      try { nfCache[k] = new Intl.NumberFormat(L.num, { minimumFractionDigits: min, maximumFractionDigits: max }); }
      catch(e){ nfCache[k] = null; }
    }
    return nfCache[k] ? nfCache[k].format(v) : String(Math.round(v * 100) / 100);
  }
  function t(key, params){
    var v = L.s[key];
    if (v === undefined) return key;
    if (typeof v === 'object') {
      var n = params && typeof params.n === 'number' ? params.n : 0;
      var form = pr ? pr.select(n) : (n === 1 ? 'one' : 'other');
      v = v[form] !== undefined ? v[form] : v.other;
    }
    return String(v).replace(/\{(\w+)\}/g, function(m, p){
      return params && params[p] !== undefined ? String(params[p]) : m;
    });
  }
  return { lang: L.lang, t: t, num: num };
})();

/* ============ Sélecteur de langue ============ */
(function(){
  var d = document.getElementById('lsw');

  /* Choix manuel : mémorisé localement, prioritaire sur la langue du
     navigateur aux prochaines visites ; les paramètres (UTM…) et
     l'ancre suivent vers la page cible. */
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[data-lang]') : null;
    if (!a) return;
    try { localStorage.setItem('{{builtin.storageKey}}', a.getAttribute('data-lang')); } catch(err){}
    if (location.search || location.hash) {
      e.preventDefault();
      location.href = a.getAttribute('href') + location.search + location.hash;
    }
  });

  if (!d) return;
  document.addEventListener('click', function(e){
    if (d.open && !d.contains(e.target)) d.open = false;
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && d.open) {
      d.open = false;
      var s = d.querySelector('summary'); if (s) s.focus();
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && d.open && d.contains(document.activeElement)) {
      var links = Array.prototype.slice.call(d.querySelectorAll('.lsw-pop a'));
      if (!links.length) return;
      e.preventDefault();
      var i = links.indexOf(document.activeElement);
      var next = e.key === 'ArrowDown' ? Math.min(i + 1, links.length - 1) : Math.max(i - 1, 0);
      if (i === -1) next = e.key === 'ArrowDown' ? 0 : links.length - 1;
      links[next].focus();
    }
  });
  d.addEventListener('toggle', function(){
    if (d.open) { var f = d.querySelector('.lsw-pop a[aria-current="true"]') || d.querySelector('.lsw-pop a'); if (f) f.focus(); }
  });
})();
