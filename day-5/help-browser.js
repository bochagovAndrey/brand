(function () {
  var panel = document.getElementById('help-panel');
  var entry = document.getElementById('help-entry');
  var browser = document.getElementById('help-browser');
  var gridEl = document.getElementById('help-grid');
  var sidebarEl = document.getElementById('help-sidebar');
  var titleEl = document.getElementById('help-detail-title');
  var bodyEl = document.getElementById('help-detail-body');
  var backBtn = document.getElementById('help-back-grid');

  if (!panel || !entry || !browser || !gridEl || typeof HELP_TOPICS === 'undefined') return;

  function buildGrid() {
    HELP_TOPICS.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-topic__item help-topic__item--clickable';
      li.dataset.topicId = topic.id;
      li.innerHTML =
        '<span class="help-topic__emoji" aria-hidden="true">' + topic.emoji + '</span>' +
        '<span class="help-topic__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        openTopic(topic.id);
      });
      gridEl.appendChild(li);
    });
  }

  function buildSidebar() {
    HELP_TOPICS.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-sidebar__item';
      li.dataset.topicId = topic.id;
      li.innerHTML =
        '<span class="help-sidebar__emoji" aria-hidden="true">' + topic.emoji + '</span>' +
        '<span class="help-sidebar__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        selectTopic(topic.id, false);
      });
      sidebarEl.appendChild(li);
    });
  }

  function openTopic(id) {
    browser.classList.add('help-browser--open');
    selectTopic(id, true);
  }

  function selectTopic(id, isInitial) {
    var topic = HELP_TOPICS.find(function (t) {
      return t.id === id;
    });
    if (!topic) return;

    titleEl.textContent = topic.name;

    if (isInitial) {
      bodyEl.innerHTML = topic.html;
      bodyEl.classList.remove('help-detail__body--visible');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
        });
      });
    } else {
      bodyEl.classList.remove('help-detail__body--visible');
      setTimeout(function () {
        bodyEl.innerHTML = topic.html;
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
        });
      }, 150);
    }

    sidebarEl.querySelectorAll('.help-sidebar__item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.topicId === id);
    });

    gridEl.querySelectorAll('.help-topic__item').forEach(function (item) {
      item.classList.toggle('help-topic__item--active', item.dataset.topicId === id);
    });
  }

  function closeDetail() {
    browser.classList.remove('help-browser--open');
    bodyEl.classList.remove('help-detail__body--visible');
    gridEl.querySelectorAll('.help-topic__item--active').forEach(function (item) {
      item.classList.remove('help-topic__item--active');
    });
  }

  function expandPanel() {
    panel.classList.add('help-panel--expanded');
    entry.setAttribute('aria-expanded', 'true');
  }

  function collapsePanel() {
    panel.classList.remove('help-panel--expanded');
    entry.setAttribute('aria-expanded', 'false');
    closeDetail();
  }

  entry.addEventListener('click', function () {
    if (panel.classList.contains('help-panel--expanded')) {
      collapsePanel();
    } else {
      expandPanel();
    }
  });

  if (backBtn) {
    backBtn.addEventListener('click', closeDetail);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (browser.classList.contains('help-browser--open')) {
      closeDetail();
    } else if (panel.classList.contains('help-panel--expanded')) {
      collapsePanel();
    }
  });

  buildGrid();
  buildSidebar();
})();
