/**
 * ===================================================================
 * THEME MANAGER - Gestion des thèmes sombre/clair
 * Utilise localStorage pour la persistence entre les pages
 * ===================================================================
 */

const ThemeManager = {
    STORAGE_KEY: 'crepitas-theme',
    LIGHT_THEME: 'light',
    DARK_THEME: 'dark',
    
    /**
     * Initialise le gestionnaire de thème
     */
    init() {
        this.applyTheme(this.getSavedTheme());
        this.setupToggleButton();
    },
    
    /**
     * Récupère le thème sauvegardé depuis localStorage
     * Par défaut: thème sombre
     */
    getSavedTheme() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) return saved;
        
        // Vérifie les préférences système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? this.DARK_THEME : this.LIGHT_THEME;
    },
    
    /**
     * Applique le thème au document
     */
    applyTheme(theme) {
        const isDark = theme === this.DARK_THEME;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        
        // Met à jour l'icône du bouton toggle
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = isDark 
                ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.98 2.98l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.98-2.98l4.24-4.24"/></svg>'
                : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        }
    },
    
    /**
     * Bascule entre les thèmes
     */
    toggleTheme() {
        const current = this.getSavedTheme();
        const next = current === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
        this.applyTheme(next);
    },
    
    /**
     * Configure le bouton de basculement de thème
     */
    setupToggleButton() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// Initialise le gestionnaire de thème au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
