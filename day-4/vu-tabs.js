(function () {
  function initTabGroup(root) {
    if (!root) return;

    var group = root.getAttribute('data-tab-group');
    var panelAttr = root.getAttribute('data-panel-attr') || 'data-tab-panel';
    var buttons = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels;

    if (group) {
      panels = Array.prototype.slice.call(
        document.querySelectorAll('[data-tab-group="' + group + '"][' + panelAttr + ']')
      );
    } else {
      var scope = root.closest('[data-tab-scope]') || root.parentElement;
      panels = Array.prototype.slice.call(scope.querySelectorAll('[' + panelAttr + ']'));
    }

    function refreshExpandedPanels(scope) {
      if (!window.refreshLkPanel || !scope) return;
      scope.querySelectorAll('.lk-panel--expanded').forEach(function (panel) {
        window.refreshLkPanel(panel);
      });
    }

    function activate(id) {
      buttons.forEach(function (btn) {
        var isActive = btn.getAttribute('data-section') === id;
        btn.classList.toggle('amo-stages__role--active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var isActive = panel.getAttribute(panelAttr) === id;
        panel.hidden = !isActive;
        if (isActive) refreshExpandedPanels(panel);
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activate(btn.getAttribute('data-section'));
        var scope = root.closest('[data-tab-scope]') || root.parentElement;
        refreshExpandedPanels(scope);
      });
    });
  }

  initTabGroup(document.getElementById('vu-tabs'));
  initTabGroup(document.getElementById('psp-tabs'));
  initTabGroup(document.getElementById('after-save-tabs'));

  document.querySelectorAll('.lk-panel details').forEach(function (el) {
    el.addEventListener('toggle', function () {
      if (window.refreshLkPanel) window.refreshLkPanel(el);
    });
  });
})();
