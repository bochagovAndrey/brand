(function () {
  var browser = document.getElementById('shvu-algorithm-browser');
  var gridEl = document.getElementById('shvu-algorithm-grid');
  var sidebarEl = document.getElementById('shvu-algorithm-sidebar');
  var titleEl = document.getElementById('shvu-algorithm-detail-title');
  var bodyEl = document.getElementById('shvu-algorithm-detail-body');
  var backBtn = document.getElementById('shvu-algorithm-back-grid');

  if (!browser || !gridEl || !sidebarEl || !titleEl || !bodyEl) return;

  var topics = [
    {
      id: 'step-1',
      name: '1. Ставим статус «потенциальный»',
      shortName: 'Ставим статус «потенциальный»',
      templateId: 'shvu-algorithm-step-1',
      dotClass: 'shvu-algorithm-browser__dot--purple'
    },
    {
      id: 'step-2',
      name: '2. Создаём новую заявку',
      shortName: 'Создаём новую заявку',
      templateId: 'shvu-algorithm-step-2'
    },
    {
      id: 'step-3',
      name: '3. Подбираем слоты и предлагаем студента',
      shortName: 'Подбираем слоты и предлагаем студента',
      templateId: 'shvu-algorithm-step-3'
    },
    {
      id: 'step-4',
      name: '4. Не раскрываем, что это шпион',
      shortName: 'Не раскрываем, что это шпион',
      templateId: 'shvu-algorithm-step-4'
    },
    {
      id: 'step-5',
      name: '5. Назначаем ВУ и пишем методисту',
      shortName: 'Назначаем ВУ и пишем методисту',
      templateId: 'shvu-algorithm-step-5'
    },
    {
      id: 'step-6',
      name: '6. После ВУ — отчёт и напоминание',
      shortName: 'После ВУ — отчёт и напоминание',
      templateId: 'shvu-algorithm-step-6'
    },
    {
      id: 'step-7',
      name: '7. Статус всегда «потенциальный»',
      shortName: 'Статус всегда «потенциальный»',
      templateId: 'shvu-algorithm-step-7',
      dotClass: 'shvu-algorithm-browser__dot--red'
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
    var panel = browser.closest('.shvu-accordion');
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

  function bindReveal(reveal) {
    var trigger = reveal.querySelector('.shvu-reveal__trigger');
    var expand = reveal.querySelector('.shvu-reveal__expand');
    if (!trigger || !expand || reveal.dataset.bound) return;

    reveal.dataset.bound = '1';
    expand.style.height = '0px';

    trigger.addEventListener('click', function () {
      var willOpen = !reveal.classList.contains('shvu-reveal--open');

      if (willOpen) {
        reveal.classList.add('shvu-reveal--open');
        trigger.setAttribute('aria-expanded', 'true');
        expand.style.height = '0px';
        expand.offsetHeight;
        expand.style.height = expand.scrollHeight + 'px';
        expand.addEventListener('transitionend', function onOpenEnd(event) {
          if (event.target !== expand || event.propertyName !== 'height') return;
          expand.removeEventListener('transitionend', onOpenEnd);
          expand.style.height = 'auto';
          refreshAccordionHeight();
        });
        return;
      }

      expand.style.height = expand.scrollHeight + 'px';
      expand.offsetHeight;
      reveal.classList.remove('shvu-reveal--open');
      trigger.setAttribute('aria-expanded', 'false');
      expand.style.height = '0px';
      expand.addEventListener('transitionend', function onCloseEnd(event) {
        if (event.target !== expand || event.propertyName !== 'height') return;
        expand.removeEventListener('transitionend', onCloseEnd);
        refreshAccordionHeight();
      });
    });
  }

  function initReveals(root) {
    root.querySelectorAll('.shvu-reveal').forEach(bindReveal);
  }

  function mountTopicContent(topic) {
    bodyEl.innerHTML = getTopicHtml(topic);
    initReveals(bodyEl);
    watchImages(bodyEl);
    refreshAccordionHeight();
  }

  function buildGrid() {
    topics.forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-topic__item help-topic__item--clickable shvu-algorithm-browser__topic';
      li.dataset.topicId = topic.id;
      li.innerHTML =
        '<span class="shvu-algorithm-browser__dot' + (topic.dotClass ? ' ' + topic.dotClass : '') + '" aria-hidden="true"></span>' +
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
      li.className = 'help-sidebar__item shvu-algorithm-browser__sidebar-item';
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

    sidebarEl.querySelectorAll('.shvu-algorithm-browser__sidebar-item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.topicId === id);
    });

    gridEl.querySelectorAll('.shvu-algorithm-browser__topic').forEach(function (item) {
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
