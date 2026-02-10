/**
 * ===================================================================
 * Module Thème - Dark/Light mode persistant
 * ===================================================================
 */

const themeManager = (() => {
  let currentTheme = 'light';

  /**
   * Initialisation
   */
  const init = () => {
    loadTheme();
    applyTheme(currentTheme);
    setupThemeToggle();
  };

  /**
   * Charger le thème sauvegardé
   */
  const loadTheme = () => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.localStorage.theme);
      if (saved) {
        currentTheme = saved;
      } else {
        // Détecter les préférences système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
      }
    } catch (e) {
      console.error('Erreur chargement thème:', e);
      currentTheme = 'light';
    }
  };

  /**
   * Sauvegarder le thème
   */
  const saveTheme = () => {
    try {
      localStorage.setItem(APP_CONFIG.localStorage.theme, currentTheme);
    } catch (e) {
      console.error('Erreur sauvegarde thème:', e);
    }
  };

  /**
   * Appliquer le thème
   */
  const applyTheme = (theme) => {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
    
    // Mettre à jour l'icône du bouton
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      const icon = themeBtn.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }

    saveTheme();
  };

  /**
   * Basculer le thème
   */
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    showNotification(`Thème ${newTheme} activé`, 'info');
  };

  /**
   * Obtenir le thème actuel
   */
  const getCurrentTheme = () => currentTheme;

  /**
   * Setup du bouton de basculement
   */
  const setupThemeToggle = () => {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  };

  // Variables de couleurs par thème
  const themes = {
    light: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f5f5f5',
      '--text-primary': '#333333',
      '--text-secondary': '#666666',
      '--border-color': '#e0e0e0',
      '--gold': '#C68E17',
      '--gold-light': '#D4A43A'
    },
    dark: {
      '--bg-primary': '#1a1a1a',
      '--bg-secondary': '#0f0f0f',
      '--text-primary': '#e8e8e8',
      '--text-secondary': '#a0a0a0',
      '--border-color': 'rgba(198, 142, 23, 0.2)',
      '--gold': '#C68E17',
      '--gold-light': '#D4A43A'
    }
  };

  /**
   * Appliquer les variables CSS
   */
  const applyThemeVariables = () => {
    const root = document.documentElement;
    const vars = themes[currentTheme];
    
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  };

  return {
    init,
    toggleTheme,
    applyTheme,
    getCurrentTheme,
    themes
  };
})();

// Auto-initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
  themeManager.init();
  themeManager.applyThemeVariables();
});
