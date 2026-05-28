(function () {
  var modal = document.getElementById('image-modal');
  var modalImg = document.getElementById('image-modal-img');
  var modalCaption = document.getElementById('image-modal-caption');
  var closeBtn = document.getElementById('image-modal-close');
  var backdrop = document.getElementById('image-modal-backdrop');
  var pageRoot = document.querySelector('.content-page--guide');

  if (!modal || !modalImg || !closeBtn || !backdrop || !pageRoot) return;

  function openModal(img) {
    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt || '';
    modalCaption.textContent = img.alt || '';
    modal.classList.add('image-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('image-modal-open');
  }

  function closeModal() {
    modal.classList.remove('image-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    modalCaption.textContent = '';
    document.body.classList.remove('image-modal-open');
  }

  pageRoot.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    openModal(target);
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('image-modal--open')) {
      closeModal();
    }
  });
})();
