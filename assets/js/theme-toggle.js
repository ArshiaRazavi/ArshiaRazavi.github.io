/* Light/dark theme toggle.
 *
 * The inline script in _includes/head.html applies a saved choice before
 * first paint; without one, CSS follows prefers-color-scheme. This file wires
 * the masthead button, persists the choice and keeps aria-pressed in sync.
 * <meta name="theme-color"> is left static (the site accent) on purpose.
 */
(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage blocked: the choice still applies to this page view */
    }
  }

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') {
      return explicit;
    }
    return systemDark && systemDark.matches ? 'dark' : 'light';
  }

  function syncButton(button) {
    button.setAttribute('aria-pressed', currentTheme() === 'dark' ? 'true' : 'false');
  }

  function init() {
    var button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }

    syncButton(button);

    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      saveTheme(next);
      syncButton(button);
    });

    if (systemDark) {
      var onSystemChange = function () {
        syncButton(button);
      };
      if (systemDark.addEventListener) {
        systemDark.addEventListener('change', onSystemChange);
      } else if (systemDark.addListener) {
        systemDark.addListener(onSystemChange);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
