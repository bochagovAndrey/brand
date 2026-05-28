(function () {
  var browser = document.getElementById('svu-qualifiers-browser');
  var gridEl = document.getElementById('svu-qualifiers-grid');
  var sidebarEl = document.getElementById('svu-qualifiers-sidebar');
  var titleEl = document.getElementById('svu-qualifiers-detail-title');
  var bodyEl = document.getElementById('svu-qualifiers-detail-body');
  var backBtn = document.getElementById('svu-qualifiers-back-grid');

  if (!browser || !gridEl || !sidebarEl || !titleEl || !bodyEl) return;

  var topics = [
    {
      id: 'booking',
      name: 'Как выбрать время и забронировать слот',
      shortName: 'Как выбрать время и забронировать слот',
      templateId: 'svu-qualifiers-booking'
    },
    {
      id: 'after-booking',
      name: 'Что делать после бронирования',
      shortName: 'Что делать после бронирования',
      templateId: 'svu-qualifiers-after-booking'
    },
    {
      id: 'refused',
      name: 'Если студент не согласился на срочный ВУ',
      shortName: 'Если студент не согласился на срочный ВУ',
      templateId: 'svu-qualifiers-refused'
    },
    {
      id: 'auto-assign',
      name: 'Автоназначение СВУ',
      shortName: 'Автоназначение СВУ',
      templateId: 'svu-qualifiers-auto-assign'
    },
    {
      id: 'tracking',
      name: 'Как отслеживать статус урока',
      shortName: 'Как отслеживать статус урока',
      templateId: 'svu-qualifiers-tracking'
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
      li.className = 'help-topic__item help-topic__item--clickable svu-qualifiers-browser__topic';
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
      li.className = 'help-sidebar__item svu-qualifiers-browser__sidebar-item';
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

    sidebarEl.querySelectorAll('.svu-qualifiers-browser__sidebar-item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.topicId === id);
    });

    gridEl.querySelectorAll('.svu-qualifiers-browser__topic').forEach(function (item) {
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
