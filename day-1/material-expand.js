(function () {
  var expands = document.querySelectorAll('.material-expand');
  if (!expands.length) return;

  function setOpen(expand, isOpen) {
    expand.classList.toggle('material-expand--open', isOpen);
    var btn = expand.querySelector('.material-expand__toggle');
    if (btn) {
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      btn.textContent = isOpen ? 'Скрыть' : 'Посмотреть';
    }
  }

  expands.forEach(function (expand) {
    var btn = expand.querySelector('.material-expand__toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      setOpen(expand, !expand.classList.contains('material-expand--open'));
    });
  });

  function openFromHash() {
    if (window.location.hash !== '#abbreviations') return;
    var expand = document.getElementById('abbreviations');
    if (expand) setOpen(expand, true);
  }

  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
