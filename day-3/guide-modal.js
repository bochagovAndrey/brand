(function () {
  var modals = Array.prototype.slice.call(document.querySelectorAll('.guide-modal'));
  if (!modals.length) return;

  function getModal(id) {
    return document.getElementById(id);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('guide-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('guide-modal-open');
    var closeBtn = modal.querySelector('.guide-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('guide-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.guide-modal.guide-modal--open')) {
      document.body.classList.remove('guide-modal-open');
    }
  }

  document.addEventListener('click', function (event) {
    var openTrigger = event.target.closest('[data-open-guide-modal]');
    if (openTrigger) {
      event.preventDefault();
      openModal(getModal(openTrigger.getAttribute('data-open-guide-modal')));
      return;
    }

    if (event.target.closest('[data-close-guide-modal]')) {
      var modal = event.target.closest('.guide-modal');
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    modals.forEach(function (modal) {
      if (modal.classList.contains('guide-modal--open')) closeModal(modal);
    });
  });
})();
