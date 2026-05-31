(function () {
  var root = document.getElementById('amo-deals');
  var browser = document.getElementById('amo-deals-browser');
  var gridEl = document.getElementById('amo-deals-grid');
  var sidebarEl = document.getElementById('amo-deals-sidebar');
  var titleEl = document.getElementById('amo-deals-detail-title');
  var bodyEl = document.getElementById('amo-deals-detail-body');
  var backBtn = document.getElementById('amo-deals-back-grid');
  var sourceEl = document.getElementById('amo-deals-source');

  if (!root || !browser || !gridEl || !sidebarEl || !titleEl || !bodyEl || !sourceEl) return;

  function getTopics() {
    return Array.prototype.slice.call(sourceEl.querySelectorAll('section[data-topic-id]')).map(function (section) {
      var content = section.querySelector('.amo-deals-topic');
      return {
        id: section.getAttribute('data-topic-id'),
        name: section.getAttribute('data-topic-name'),
        html: content ? content.innerHTML : ''
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

  function mountTopicContent(topic) {
    bodyEl.innerHTML = topic.html;
    watchImages(bodyEl);
    refreshParentPanels();
  }

  function getTopicById(id) {
    return getTopics().find(function (topic) {
      return topic.id === id;
    });
  }

  function setActiveMarkers(topicId) {
    sidebarEl.querySelectorAll('.amo-deals-browser__sidebar-item').forEach(function (item) {
      item.classList.toggle('help-sidebar__item--active', item.dataset.topicId === topicId);
    });
    gridEl.querySelectorAll('.amo-deals-browser__topic').forEach(function (item) {
      item.classList.toggle('help-topic__item--active', item.dataset.topicId === topicId);
    });
  }

  function openTopic(id) {
    browser.classList.add('help-browser--open');
    selectTopic(id, true);
    refreshParentPanels();
  }

  function selectTopic(id, isInitial) {
    var topic = getTopicById(id);
    if (!topic) return;

    titleEl.textContent = topic.name;

    if (isInitial) {
      mountTopicContent(topic);
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
        mountTopicContent(topic);
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
    bodyEl.classList.remove('help-detail__body--visible');
    gridEl.querySelectorAll('.help-topic__item--active').forEach(function (item) {
      item.classList.remove('help-topic__item--active');
    });
    refreshParentPanels();
  }

  function buildGrid() {
    gridEl.innerHTML = '';
    getTopics().forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-topic__item help-topic__item--clickable amo-deals-browser__topic';
      li.dataset.topicId = topic.id;
      li.innerHTML = '<span class="help-topic__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        openTopic(topic.id);
      });
      gridEl.appendChild(li);
    });
  }

  function buildSidebar() {
    sidebarEl.innerHTML = '';
    getTopics().forEach(function (topic) {
      var li = document.createElement('li');
      li.className = 'help-sidebar__item amo-deals-browser__sidebar-item';
      li.dataset.topicId = topic.id;
      li.innerHTML = '<span class="help-sidebar__name">' + topic.name + '</span>';
      li.addEventListener('click', function () {
        selectTopic(topic.id, false);
      });
      sidebarEl.appendChild(li);
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', closeDetail);
  }

  buildGrid();
  buildSidebar();
})();
