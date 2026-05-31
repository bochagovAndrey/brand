(function () {
  var panels = Array.prototype.slice.call(document.querySelectorAll('.lk-panel'));
  if (!panels.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function expandEl(panel) {
    return panel.querySelector('.lk-panel__expand');
  }

  function triggerEl(panel) {
    return panel.querySelector('.lk-panel__trigger');
  }

  function setExpanded(panel, expanded) {
    panel.classList.toggle('lk-panel--expanded', expanded);
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

  function refreshHeight(panel) {
    if (!panel.classList.contains('lk-panel--expanded')) return;
    var el = expandEl(panel);
    if (!el) return;
    el.style.height = 'auto';
    var target = el.scrollHeight;
    el.style.height = target + 'px';
  }

  function refreshAncestors(panel) {
    var current = panel;
    while (current) {
      refreshHeight(current);
      var parent = current.parentElement;
      current = parent ? parent.closest('.lk-panel') : null;
    }
  }

  window.refreshLkPanel = function (node) {
    if (!node || !node.closest) return;
    var panel = node.closest('.lk-panel');
    if (panel) refreshAncestors(panel);
  };

  function collapse(panel) {
    var el = expandEl(panel);
    if (!panel.classList.contains('lk-panel--expanded')) {
      el.style.height = '0px';
      return Promise.resolve();
    }

    var start = el.scrollHeight;
    el.style.height = start + 'px';
    el.offsetHeight;

    return animateHeight(el, 0).then(function () {
      setExpanded(panel, false);
      el.style.height = '0px';
      refreshAncestors(panel);
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
      refreshAncestors(panel);
    });
  }

  function toggle(panel) {
    if (panel.classList.contains('lk-panel--expanded')) {
      return collapse(panel);
    }
    return expand(panel);
  }

  panels.forEach(function (panel) {
    var el = expandEl(panel);
    if (!el) return;

    el.style.height = '0px';

    var trigger = triggerEl(panel);
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      toggle(panel);
    });

    panel.querySelectorAll('img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', function () {
        refreshHeight(panel);
      }, { once: true });
    });
  });

  function openFromHash() {
    var id = window.location.hash.replace(/^#/, '');
    if (!id) return;
    var panel = document.getElementById(id);
    if (!panel || !panel.classList.contains('lk-panel') || !expandEl(panel)) return;
    expand(panel);
  }

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
