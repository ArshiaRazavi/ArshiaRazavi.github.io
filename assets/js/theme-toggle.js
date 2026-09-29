/* Light/dark theme toggle.
 *
 * The inline script in _includes/head.html applies a saved choice before
 * first paint; without one, CSS follows prefers-color-scheme. This file wires
 * the masthead button, persists the choice and keeps aria-pressed and
 * <meta name="theme-color"> in sync.
 */
(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readSavedTheme() {
    try {
      var theme = localStorage.getItem(STORAGE_KEY);
      return theme === 'dark' || theme === 'light' ? theme : null;
    } catch (e) {
      return null;
    }
  }

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

  function syncThemeColorMeta() {
    var background = getComputedStyle(root).getPropertyValue('--color-bg').trim();
    if (!background) {
      return;
    }
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      metas[i].setAttribute('content', background);
    }
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
    if (readSavedTheme()) {
      syncThemeColorMeta();
    }

    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      saveTheme(next);
      syncButton(button);
      syncThemeColorMeta();
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
