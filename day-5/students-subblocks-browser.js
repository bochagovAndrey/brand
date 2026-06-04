(function () {
  var browser = document.getElementById('students-browser');
  var gridEl = document.getElementById('students-grid');
  var sidebarEl = document.getElementById('students-sidebar');
  var titleEl = document.getElementById('students-detail-title');
  var bodyEl = document.getElementById('students-detail-body');
  var backBtn = document.getElementById('students-back-grid');

  if (!browser || !gridEl || !sidebarEl || !titleEl || !bodyEl) return;

  var topics = [
    { id: 'tariff', name: '1. Проверяем и сообщаем тариф студента', templateId: 'students-topic-tariff' },
    { id: 'no-level', name: '2. НЕ сообщаем уровень совсем нового студента преподавателю', templateId: 'students-topic-no-level' },
    { id: 'qualifiers-comment', name: '3. Копируем комментарий от Квалификаторов', templateId: 'students-topic-qualifiers-comment' },
    { id: 'vu-passed', name: '4. Сообщаем преподавателю, если студент новый, но уже проходил ВУ', templateId: 'students-topic-vu-passed' },
    { id: 'remind-student', name: '5. Напоминаем о себе студенту', templateId: 'students-topic-remind-student' },
    { id: 'amo-notes', name: '6. Обновляем примечания и задачи в АМО на актуальные', templateId: 'students-topic-amo-notes' },
    { id: 'check-own', name: '7. Проверяем все свои заявки', templateId: 'students-topic-check-own' },
    { id: 'archive-right', name: '8. Убираем в архив правильно', templateId: 'students-topic-archive-right' }
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

  function buildGrid() {
    topics.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-topic__item help-topic__item--clickable app-subblocks-browser__topic';
      li.dataset.topicId = topic.id;
      li.innerHTML =
        '<span class="app-subblocks-browser__topic-num" aria-hidden="true"></span>' +
        '<span class="help-topic__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        openTopic(topic.id);
      });
      gridEl.appendChild(li);
    });
  }

  function buildSidebar() {
    topics.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-sidebar__item app-subblocks-browser__sidebar-item';
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
  }

  function selectTopic(id, isInitial) {
    var topic = getTopicById(id);
    if (!topic) return;

    titleEl.textContent = topic.name;

    if (isInitial) {
      bodyEl.innerHTML = getTopicHtml(topic);
      bodyEl.classList.remove('help-detail__body--visible');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
        });
      });
    } else {
      bodyEl.classList.remove('help-detail__body--visible');
      setTimeout(function () {
        bodyEl.innerHTML = getTopicHtml(topic);
        requestAnimationFrame(function () {
          bodyEl.classList.add('help-detail__body--visible');
        });
      }, 120);
    }

    sidebarEl.querySelectorAll('.app-subblocks-browser__sidebar-item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.topicId === id);
    });

    gridEl.querySelectorAll('.app-subblocks-browser__topic').forEach(function (item) {
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

  if (backBtn) {
    backBtn.addEventListener('click', closeDetail);
  }

  buildGrid();
  buildSidebar();
})();
