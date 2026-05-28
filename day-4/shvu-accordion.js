(function () {
  var panels = Array.prototype.slice.call(document.querySelectorAll('.shvu-accordion'));
  if (!panels.length) return;

  var openPanel = null;
  var busy = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function expandEl(panel) {
    return panel.querySelector('.help-panel__expand');
  }

  function triggerEl(panel) {
    return panel.querySelector('.shvu-accordion__trigger');
  }

  function setExpanded(panel, expanded) {
    panel.classList.toggle('help-panel--expanded', expanded);
    var trigger = triggerEl(panel);
    if (trigger) trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function animateHeight(el, toPx) {
    el.style.height = toPx + 'px';
    if (reducedMotion) return Promise.resolve();

    return new Promise(function (resolve) {
      var finished = false;

      function done() {
        if (finished) return;
        finished = true;
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }

      function onEnd(event) {
        if (event.target !== el || event.propertyName !== 'height') return;
        done();
      }

      el.addEventListener('transitionend', onEnd);
      window.setTimeout(done, 400);
    });
  }

  function collapse(panel) {
    var el = expandEl(panel);
    if (!panel.classList.contains('help-panel--expanded')) {
      el.style.height = '0px';
      return Promise.resolve();
    }

    var start = el.scrollHeight;
    el.style.height = start + 'px';
    el.offsetHeight;

    return animateHeight(el, 0).then(function () {
      setExpanded(panel, false);
      el.style.height = '0px';
    });
  }

  function expand(panel) {
    var el = expandEl(panel);
    setExpanded(panel, true);
    el.style.height = '0px';
    el.offsetHeight;

    var target = el.scrollHeight;
    return animateHeight(el, target).then(function () {
      el.style.height = 'auto';
    });
  }

  panels.forEach(function (panel) {
    var el = expandEl(panel);
    if (el) el.style.height = '0px';
  });

  panels.forEach(function (panel) {
    var trigger = triggerEl(panel);
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      if (busy) return;

      var isOpen = panel === openPanel;

      if (isOpen) {
        busy = true;
        collapse(panel).then(function () {
          openPanel = null;
          busy = false;
        });
        return;
      }

      busy = true;
      var previous = openPanel;
      var tasks = [];

      if (previous) tasks.push(collapse(previous));
      tasks.push(expand(panel));

      Promise.all(tasks).then(function () {
        openPanel = panel;
        busy = false;
      });
    });
  });
})();
