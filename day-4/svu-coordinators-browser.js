(function () {
  var browser = document.getElementById('svu-coordinators-browser');
  var gridEl = document.getElementById('svu-coordinators-grid');
  var sidebarEl = document.getElementById('svu-coordinators-sidebar');
  var titleEl = document.getElementById('svu-coordinators-detail-title');
  var bodyEl = document.getElementById('svu-coordinators-detail-body');
  var backBtn = document.getElementById('svu-coordinators-back-grid');

  if (!browser || !gridEl || !sidebarEl || !titleEl || !bodyEl) return;

  var topics = [
    {
      id: 'processing',
      name: 'Как обрабатывать заявки на срочный ВУ',
      shortName: 'Как обрабатывать заявки на срочный ВУ',
      templateId: 'svu-coordinators-processing'
    },
    {
      id: 'no-show',
      name: 'Если срочный ВУ не состоялся',
      shortName: 'Если срочный ВУ не состоялся',
      templateId: 'svu-coordinators-no-show'
    },
    {
      id: 'cancel',
      name: 'Если студент отменил бронь',
      shortName: 'Если студент отменил бронь',
      templateId: 'svu-coordinators-cancel'
    },
    {
      id: 'calendar',
      name: 'Как работать с календарём срочных ВУ',
      shortName: 'Как работать с календарём срочных ВУ',
      templateId: 'svu-coordinators-calendar'
    }
  ];

  function getTopicById(id) {
    return topics.find(function (topic) {
      return topic.id === id;
    });
  }

  function getTopicHtml(topic) {
    var template = document.getElementById(topic.templateId);
    return template ? template.innerHTML : '';
  }

  function refreshAccordionHeight() {
    var panel = browser.closest('.svu-accordion');
    if (!panel || !panel.classList.contains('help-panel--expanded')) return;

    var expandEl = panel.querySelector('.help-panel__expand');
    if (!expandEl) return;

    expandEl.style.height = 'auto';
  }

  function watchImages(root) {
    root.querySelectorAll('img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', refreshAccordionHeight, { once: true });
    });
  }

  function mountTopicContent(topic) {
    bodyEl.innerHTML = getTopicHtml(topic);
    watchImages(bodyEl);
    refreshAccordionHeight();
  }

  function buildGrid() {
    topics.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-topic__item help-topic__item--clickable svu-coordinators-browser__topic';
      li.dataset.topicId = topic.id;
      li.innerHTML = '<span class="help-topic__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        openTopic(topic.id);
      });
      gridEl.appendChild(li);
    });
  }

  function buildSidebar() {
    topics.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-sidebar__item svu-coordinators-browser__sidebar-item';
      li.dataset.topicId = topic.id;
      li.innerHTML = '<span class="help-sidebar__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        selectTopic(topic.id, false);
      });
      sidebarEl.appendChild(li);
    });
  }

  function openTopic(id) {
    browser.classList.add('help-browser--open');
    selectTopic(id, true);
    refreshAccordionHeight();
  }

  function selectTopic(id, isInitial) {
    var topic = getTopicById(id);
    if (!topic) return;

    titleEl.textContent = topic.shortName;

    if (isInitial) {
      mountTopicContent(topic);
      bodyEl.classList.remove('help-detail__body--visible');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
          refreshAccordionHeight();
        });
      });
    } else {
      bodyEl.classList.remove('help-detail__body--visible');
      setTimeout(function () {
        mountTopicContent(topic);
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
          refreshAccordionHeight();
        });
      }, 120);
    }

    sidebarEl.querySelectorAll('.svu-coordinators-browser__sidebar-item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.topicId === id);
    });

    gridEl.querySelectorAll('.svu-coordinators-browser__topic').forEach(function (item) {
      item.classList.toggle('help-topic__item--active', item.dataset.topicId === id);
    });
  }

  function closeDetail() {
    browser.classList.remove('help-browser--open');
    bodyEl.classList.remove('help-detail__body--visible');
    gridEl.querySelectorAll('.help-topic__item--active').forEach(function (item) {
      item.classList.remove('help-topic__item--active');
    });
    refreshAccordionHeight();
  }

  if (backBtn) {
    backBtn.addEventListener('click', closeDetail);
  }

  buildGrid();
  buildSidebar();
})();
