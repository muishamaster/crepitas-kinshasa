/**
 * ===================================================================
 * CREPITAS KINSHASA v3.0.0 - Module Commun (Routing & Composants)
 * Architecture: Modulaire, multi-pages, composants réutilisables
 * ===================================================================
 */

// ======================== CONFIGURATION GLOBALE ========================
const APP_CONFIG = {
  version: '3.0.0',
  appName: 'Crepitas Kinshasa',
  baseUrl: window.location.origin,
  apiBaseUrl: './src/data/',
  localStorage: {
    user: 'crepitas_user',
    cart: 'crepitas_cart',
    theme: 'crepitas_theme',
    ratings: 'crepitas_ratings',
    preferences: 'crepitas_preferences'
  },
  pages: [
    { name: 'Accueil', path: 'index.html', icon: '🏠' },
    { name: 'Menu', path: 'pages/menu.html', icon: '📋' },
    { name: 'Panier', path: 'pages/cart.html', icon: '🛒' },
    { name: 'FAQ', path: 'pages/faq.html', icon: '❓' },
    { name: 'Contact', path: 'pages/contact.html', icon: '📞' }
  ]
};

// ======================== GESTION DU ROUTAGE ========================

/**
 * Obtenir la page courante
 */
function getCurrentPage() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'index.html';
}

/**
 * Naviguer vers une page
 */
function navigateTo(pagePath) {
  window.location.href = `${APP_CONFIG.baseUrl}/${pagePath}`;
}

/**
 * Obtenir le parent d'une page
 */
function getPageParent() {
  const current = getCurrentPage();
  return current.includes('pages/') ? '../' : './';
}

// ======================== COMPOSANT HEADER ========================

/**
 * Générer le header commun
 */
function renderHeader() {
  const pageParent = getPageParent();
  const currentPage = getCurrentPage();
  
  const header = document.createElement('header');
  header.className = 'app-header';
  header.innerHTML = `
    <nav class="navbar-container">
      <div class="navbar-brand">
        <a href="${pageParent}index.html" class="logo-link">
          <h1>🥞 ${APP_CONFIG.appName}</h1>
          <p>L'Art de la Crêpe</p>
        </a>
      </div>
      
      <ul class="navbar-menu">
        ${APP_CONFIG.pages.map(page => `
          <li>
            <a href="${pageParent}${page.path}" 
               class="nav-link ${currentPage === page.path.split('/').pop() ? 'active' : ''}"
               title="${page.name}">
              <span class="nav-icon">${page.icon}</span>
              <span class="nav-text">${page.name}</span>
            </a>
          </li>
        `).join('')}
      </ul>

      <div class="navbar-actions">
        <button id="themeToggle" class="theme-btn" title="Changer de thème">
          <span class="theme-icon">🌙</span>
        </button>
        <a href="${pageParent}pages/account.html" class="user-icon" title="Mon compte">
          <span id="userAvatar">👤</span>
        </a>
        <a href="${pageParent}pages/cart.html" class="cart-link">
          <span class="cart-icon">🛒</span>
          <span class="cart-badge" id="cartBadge">0</span>
        </a>
      </div>
    </nav>
  `;
  
  return header;
}

// ======================== COMPOSANT FOOTER ========================

/**
 * Générer le footer commun
 */
function renderFooter() {
  const pageParent = getPageParent();
  
  const footer = document.createElement('footer');
  footer.className = 'app-footer';
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-section footer-brand">
        <h3>${APP_CONFIG.appName}</h3>
        <p>L'art de la crêpe artisanale premium à Kinshasa</p>
        <p class="footer-contact">📱 +243 977 970 594 (WhatsApp)</p>
      </div>

      <div class="footer-section footer-links">
        <h4>Navigation</h4>
        <ul>
          ${APP_CONFIG.pages.map(page => `
            <li><a href="${pageParent}${page.path}">${page.name}</a></li>
          `).join('')}
        </ul>
      </div>

      <div class="footer-section footer-info">
        <h4>Informations</h4>
        <ul>
          <li><a href="${pageParent}pages/faq.html">FAQ</a></li>
          <li><a href="${pageParent}pages/contact.html">Contact</a></li>
          <li><a href="#privacy">Politique de confidentialité</a></li>
          <li><a href="#terms">Conditions d'utilisation</a></li>
        </ul>
      </div>

      <div class="footer-section footer-qr">
        <p>Scannez pour accéder au menu digital</p>
        <div id="footerQrCode"></div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024-2026 ${APP_CONFIG.appName}. Tous droits réservés.</p>
      <p>Version ${APP_CONFIG.version} | Kinshasa, RDC</p>
    </div>
  `;
  
  return footer;
}

// ======================== INSERTION COMPOSANTS ========================

/**
 * Initialiser les composants globaux
 */
function initializeGlobalComponents() {
  // Insérer le header
  const headerContainer = document.getElementById('app-header');
  if (headerContainer) {
    headerContainer.appendChild(renderHeader());
  } else {
    document.body.insertBefore(renderHeader(), document.body.firstChild);
  }

  // Insérer le footer
  const footerContainer = document.getElementById('app-footer');
  if (footerContainer) {
    footerContainer.appendChild(renderFooter());
  } else {
    document.body.appendChild(renderFooter());
  }

  // Initialiser les event listeners
  initializeGlobalListeners();
  
  // Mettre à jour le badge du panier
  updateCartBadge();
  
  // Générer le QR code du footer
  generateFooterQRCode();
}

/**
 * Event listeners globaux
 */
function initializeGlobalListeners() {
  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      themeManager.toggleTheme();
    });
  }
}

// ======================== GESTION DU BADGE PANIER ========================

/**
 * Mettre à jour le badge du panier
 */
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const cartItems = cartManager.getCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

// ======================== QR CODE FOOTER ========================

/**
 * Générer QR code du footer
 */
function generateFooterQRCode() {
  const container = document.querySelector('#footerQrCode');
  if (!container || typeof QRCode === 'undefined') return;

  container.innerHTML = '';
  new QRCode(container, {
    text: 'https://crepitas-kinshasa.onrender.com/',
    width: 120,
    height: 120,
    colorDark: '#C68E17',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

// ======================== UTILITAIRES ========================

/**
 * Échapper les caractères HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Formater le prix
 */
function formatPrice(price) {
  return price.toLocaleString('fr-FR') + ' FC';
}

/**
 * Créer une notification
 */
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#25d366' : type === 'error' ? '#ff4444' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Charger les données JSON
 */
async function loadJsonData(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erreur chargement données:', error);
    showNotification('Erreur lors du chargement des données', 'error');
    return null;
  }
}

/**
 * Initialiser au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeGlobalComponents();
});
