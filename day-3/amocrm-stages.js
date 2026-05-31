(function () {
  var root = document.getElementById('amo-stages');
  var browser = document.getElementById('amo-stages-browser');
  var gridEl = document.getElementById('amo-stages-grid');
  var sidebarEl = document.getElementById('amo-stages-sidebar');
  var titleEl = document.getElementById('amo-stages-detail-title');
  var bodyEl = document.getElementById('amo-stages-detail-body');
  var backBtn = document.getElementById('amo-stages-back-grid');
  var sourceEl = document.getElementById('amo-stages-source');
  var roleButtons = root ? Array.prototype.slice.call(root.querySelectorAll('.amo-stages__role')) : [];

  if (!root || !browser || !gridEl || !sidebarEl || !titleEl || !bodyEl || !sourceEl) return;

  var activeRole = 'qualifier';
  var activeStageId = null;

  function getStagesForRole(role) {
    return Array.prototype.slice.call(sourceEl.querySelectorAll('section[data-role="' + role + '"]')).map(function (section) {
      return {
        id: section.getAttribute('data-stage-id'),
        name: section.getAttribute('data-stage-name'),
        html: section.querySelector('.amo-stage-fields').outerHTML
      };
    });
  }

  function refreshParentPanels() {
    if (typeof window.refreshLkPanel === 'function') {
      window.refreshLkPanel(root);
    }
  }

  function watchImages(container) {
    container.querySelectorAll('img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', refreshParentPanels, { once: true });
    });
  }

  function mountStageContent(stage) {
    bodyEl.innerHTML = stage.html;
    watchImages(bodyEl);
    refreshParentPanels();
  }

  function clearList(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function buildGrid() {
    clearList(gridEl);
    getStagesForRole(activeRole).forEach(function (stage) {
      var li = document.createElement('li');
      li.className = 'help-topic__item help-topic__item--clickable amo-stages-browser__topic';
      li.dataset.stageId = stage.id;
      li.innerHTML = '<span class="help-topic__name">' + stage.name + '</span>';
      li.addEventListener('click', function () {
        openStage(stage.id);
      });
      gridEl.appendChild(li);
    });
  }

  function buildSidebar() {
    clearList(sidebarEl);
    getStagesForRole(activeRole).forEach(function (stage) {
      var li = document.createElement('li');
      li.className = 'help-sidebar__item amo-stages-browser__sidebar-item';
      li.dataset.stageId = stage.id;
      li.innerHTML = '<span class="help-sidebar__name">' + stage.name + '</span>';
      li.addEventListener('click', function () {
        selectStage(stage.id, false);
      });
      sidebarEl.appendChild(li);
    });
  }

  function getStageById(id) {
    return getStagesForRole(activeRole).find(function (stage) {
      return stage.id === id;
    });
  }

  function setActiveMarkers(stageId) {
    sidebarEl.querySelectorAll('.amo-stages-browser__sidebar-item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.stageId === stageId);
    });
    gridEl.querySelectorAll('.amo-stages-browser__topic').forEach(function (item) {
      item.classList.toggle('help-topic__item--active', item.dataset.stageId === stageId);
    });
  }

  function openStage(id) {
    browser.classList.add('help-browser--open');
    selectStage(id, true);
    refreshParentPanels();
  }

  function selectStage(id, isInitial) {
    var stage = getStageById(id);
    if (!stage) return;

    activeStageId = id;
    titleEl.textContent = stage.name;

    if (isInitial) {
      mountStageContent(stage);
      bodyEl.classList.remove('help-detail__body--visible');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
          refreshParentPanels();
        });
      });
    } else {
      bodyEl.classList.remove('help-detail__body--visible');
      setTimeout(function () {
        mountStageContent(stage);
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
          refreshParentPanels();
        });
      }, 120);
    }

    setActiveMarkers(id);
  }

  function closeDetail() {
    browser.classList.remove('help-browser--open');
    activeStageId = null;
    bodyEl.classList.remove('help-detail__body--visible');
    gridEl.querySelectorAll('.help-topic__item--active').forEach(function (item) {
      item.classList.remove('help-topic__item--active');
    });
    refreshParentPanels();
  }

  function setActiveRole(role) {
    activeRole = role;
    roleButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-role') === role;
      button.classList.toggle('amo-stages__role--active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    closeDetail();
    buildGrid();
    buildSidebar();
    refreshParentPanels();
  }

  roleButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var role = button.getAttribute('data-role');
      if (role === activeRole) return;
      setActiveRole(role);
    });
  });

  if (backBtn) {
    backBtn.addEventListener('click', closeDetail);
  }

  buildGrid();
  buildSidebar();
})();
