/**
 * ===================================================================
 * Logique Menu - Filtrage avancé, recherche, tri et gestion panier
 * ===================================================================
 */

let allProducts = [];
let filteredProducts = [];

const menuState = {
  searchTerm: '',
  selectedCategory: 'all',
  selectedOrderType: 'both',
  sortBy: 'name',
  showVegetarian: false,
  showAllergies: false
};

/**
 * Initialisation
 */
document.addEventListener('DOMContentLoaded', async () => {
  await loadMenuData();
  setupEventListeners();
  applyFilters();
});

/**
 * Charger les données du menu
 */
async function loadMenuData() {
  const menuData = await loadJsonData('../src/data/menu.json');
  if (menuData) {
    allProducts = menuData.products;
    filteredProducts = [...allProducts];
    renderProducts();
  }
}

/**
 * Setup des event listeners
 */
function setupEventListeners() {
  // Filtres par catégorie
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      menuState.selectedCategory = e.target.dataset.category;
      applyFilters();
    });
  });

  // Filtres par type de commande
  document.querySelectorAll('input[name="orderType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      menuState.selectedOrderType = e.target.value;
      applyFilters();
    });
  });

  // Recherche
  document.getElementById('searchInput').addEventListener('input', (e) => {
    menuState.searchTerm = e.target.value.toLowerCase();
    applyFilters();
  });

  // Filtres avancés
  document.getElementById('vegetarianFilter').addEventListener('change', (e) => {
    menuState.showVegetarian = e.target.checked;
    applyFilters();
  });

  document.getElementById('allergyFilter').addEventListener('change', (e) => {
    menuState.showAllergies = e.target.checked;
  });

  // Tri
  document.getElementById('sortBy').addEventListener('change', (e) => {
    menuState.sortBy = e.target.value;
    applyFilters();
  });

  // Réinitialiser les filtres
  document.querySelector('.btn-reset-filters').addEventListener('click', resetFilters);
}

/**
 * Appliquer les filtres
 */
function applyFilters() {
  filteredProducts = allProducts.filter(product => {
    // Filtre catégorie
    if (menuState.selectedCategory !== 'all' && product.categoryId !== menuState.selectedCategory) {
      return false;
    }

    // Filtre recherche
    if (menuState.searchTerm && !product.name.toLowerCase().includes(menuState.searchTerm)) {
      return false;
    }

    // Filtre végétarien
    if (menuState.showVegetarian && product.allergenes?.includes('viande')) {
      return false;
    }

    return true;
  });

  // Appliquer le tri
  sortProducts();

  // Affichage
  updateActiveFilters();
  renderProducts();
}

/**
 * Trier les produits
 */
function sortProducts() {
  switch (menuState.sortBy) {
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'popular':
      filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      break;
  }
}

/**
 * Afficher les filtres actifs
 */
function updateActiveFilters() {
  const container = document.getElementById('activeFilters');
  const filters = [];

  if (menuState.selectedCategory !== 'all') {
    const cat = allProducts.find(p => p.categoryId === menuState.selectedCategory)?.categoryId;
    filters.push(menuState.selectedCategory);
  }
  if (menuState.searchTerm) {
    filters.push(`"${menuState.searchTerm}"`);
  }
  if (menuState.sortBy !== 'name') {
    filters.push(`Tri: ${document.querySelector(`#sortBy option[value="${menuState.sortBy}"]`).textContent}`);
  }

  if (filters.length > 0) {
    container.innerHTML = `
      <p>Filtres appliqués: ${filters.join(' • ')} 
        <button onclick="resetFilters()" class="link-reset">Réinitialiser</button>
      </p>
    `;
  } else {
    container.innerHTML = '';
  }
}

/**
 * Afficher les produits
 */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');

  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  grid.innerHTML = filteredProducts.map((product, idx) => createProductCard(product, idx)).join('');

  // Setup click handlers
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        showProductDetails(card.dataset.productId);
      }
    });
  });

  // Setup add to cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(btn.dataset.productId);
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        cartManager.addToCart(product);
      }
    });
  });
}

/**
 * Créer une carte produit
 */
function createProductCard(product, index) {
  const avgRating = ratingManager.getAverageRating(product.id);
  const ratingCount = ratingManager.getRatingCount(product.id);

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
        ${product.rating > 4.7 ? '<div class="badge-top">⭐ TOP</div>' : ''}
      </div>
      <div class="product-info">
        <h3>${escapeHtml(product.name)}</h3>
        <p class="product-description">${escapeHtml(product.description)}</p>

        <!-- Évaluations -->
        <div class="product-rating">
          <span class="rating-stars">${'★'.repeat(Math.floor(avgRating))}${'☆'.repeat(5 - Math.floor(avgRating))}</span>
          <span class="rating-text">${avgRating}/5</span>
          <span class="rating-count">(${ratingCount})</span>
        </div>

        <!-- Allergènes -->
        ${product.allergenes && product.allergenes.length > 0 ? `
          <div class="allergenes">
            <small>⚠️ ${product.allergenes.join(', ')}</small>
          </div>
        ` : ''}

        <!-- Prix et bouton -->
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn-add-cart" data-product-id="${product.id}">Ajouter</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Afficher les détails du produit
 */
function showProductDetails(productId) {
  const product = allProducts.find(p => p.id === parseInt(productId));
  if (!product) return;

  const modal = document.getElementById('productModal');
  const detailsContainer = document.getElementById('productDetails');

  const avgRating = ratingManager.getAverageRating(product.id);
  const ratingCount = ratingManager.getRatingCount(product.id);
  const ratings = ratingManager.getProductRatings(product.id);

  detailsContainer.innerHTML = `
    <div class="product-details">
      <h2>${escapeHtml(product.name)}</h2>

      <div class="details-grid">
        <div class="details-left">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
        </div>

        <div class="details-right">
          <p class="description">${escapeHtml(product.description)}</p>

          <!-- Évaluations -->
          <div class="rating-section">
            <h4>Évaluations (${ratingCount})</h4>
            <div class="rating-display">
              <span class="big-rating">${avgRating}/5</span>
              <span class="stars">${'★'.repeat(Math.floor(avgRating))}${'☆'.repeat(5 - Math.floor(avgRating))}</span>
            </div>

            <!-- Distribution des notes -->
            <div class="rating-distribution">
              ${[5, 4, 3, 2, 1].map(star => {
                const distribution = ratingManager.getRatingDistribution(product.id);
                const count = distribution[star];
                const percentage = ratingCount > 0 ? (count / ratingCount * 100) : 0;
                return `
                  <div class="distribution-row">
                    <span>${star}★</span>
                    <div class="bar" style="width: ${percentage}%"></div>
                    <span>${count}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Allergènes -->
          ${product.allergenes && product.allergenes.length > 0 ? `
            <div class="allergenes-section">
              <h4>Allergènes</h4>
              <p>⚠️ ${product.allergenes.join(', ')}</p>
            </div>
          ` : ''}

          <!-- Options de personnalisation -->
          ${product.options && product.options.length > 0 ? `
            <div class="customization-section">
              <h4>Options de personnalisation</h4>
              ${product.options.map((option, idx) => `
                <div class="option-group">
                  <label>${option.name}</label>
                  <select id="option-${idx}">
                    ${option.choices.map(choice => `<option>${choice}</option>`).join('')}
                  </select>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Type de commande -->
          <div class="order-type-section">
            <h4>Type de commande</h4>
            <label class="radio-label">
              <input type="radio" name="orderType" value="delivery" checked>
              À Emporter
            </label>
            <label class="radio-label">
              <input type="radio" name="orderType" value="onPlace">
              Sur Place
              <input type="number" id="tableNumber" placeholder="N° de table" min="1" max="99" style="display: none; width: 80px; margin-left: 10px;">
            </label>
          </div>

          <!-- Quantité -->
          <div class="quantity-section">
            <label>Quantité</label>
            <div class="quantity-control">
              <button class="qty-btn" id="qtyMinus">−</button>
              <input type="number" id="qtyInput" value="1" min="1" max="99">
              <button class="qty-btn" id="qtyPlus">+</button>
            </div>
          </div>

          <!-- Prix total -->
          <div class="price-section">
            <span class="label">Prix total</span>
            <span class="price" id="totalPrice">${formatPrice(product.price)}</span>
          </div>

          <!-- Bouton action -->
          <button class="btn-primary" id="btnAddToCart" style="width: 100%; margin-top: 1rem;">
            🛒 Ajouter au panier
          </button>

          <!-- Section Avis -->
          <div class="reviews-section">
            <h4>Avis des clients</h4>
            ${ratings.length > 0 ? `
              <div class="reviews-list">
                ${ratings.slice(0, 3).map(review => `
                  <div class="review">
                    <div class="review-header">
                      <strong>${escapeHtml(review.userName)}</strong>
                      <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <p>${escapeHtml(review.review)}</p>
                  </div>
                `).join('')}
              </div>
            ` : '<p style="color: var(--text-secondary);">Aucun avis pour le moment.</p>'}
          </div>
        </div>
      </div>

      <!-- Formulaire d'évaluation -->
      <div class="rating-form-section">
        <h4>Évaluer ce produit</h4>
        <div id="ratingForm"></div>
      </div>
    </div>
  `;

  // Setup event listeners
  setupProductDetailsListeners(product);

  // Créer le formulaire d'évaluation
  const ratingFormContainer = document.getElementById('ratingForm');
  ratingFormContainer.appendChild(ratingManager.createRatingForm(product.id, product.name));

  // Afficher la modale
  modal.classList.add('show');
}

/**
 * Setup des listeners du modal produit
 */
function setupProductDetailsListeners(product) {
  const modal = document.getElementById('productModal');

  // Bouton fermer
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Radio buttons ordre type
  const orderTypeRadios = modal.querySelectorAll('input[name="orderType"]');
  const tableNumberInput = modal.querySelector('#tableNumber');

  orderTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (tableNumberInput) {
        tableNumberInput.style.display = e.target.value === 'onPlace' ? 'block' : 'none';
      }
    });
  });

  // Gestion quantité
  const qtyInput = modal.querySelector('#qtyInput');
  const qtyMinus = modal.querySelector('#qtyMinus');
  const qtyPlus = modal.querySelector('#qtyPlus');
  const totalPrice = modal.querySelector('#totalPrice');

  const updateTotalPrice = () => {
    const qty = parseInt(qtyInput.value);
    totalPrice.textContent = formatPrice(product.price * qty);
  };

  qtyMinus.addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
      updateTotalPrice();
    }
  });

  qtyPlus.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
    updateTotalPrice();
  });

  qtyInput.addEventListener('change', updateTotalPrice);

  // Ajouter au panier
  modal.querySelector('#btnAddToCart').addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value);
    const orderType = modal.querySelector('input[name="orderType"]:checked').value;
    const tableNumber = orderType === 'onPlace' ? modal.querySelector('#tableNumber').value : null;

    // Récupérer les options
    const options = {};
    modal.querySelectorAll('[id^="option-"]').forEach(select => {
      const optionName = select.previousElementSibling.textContent;
      options[optionName] = select.value;
    });

    // Ajouter au panier
    cartManager.addToCart(product, quantity, options, orderType);

    // Fermer la modale
    modal.classList.remove('show');
  });

  // Fermer la modale au clic extérieur
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

/**
 * Réinitialiser les filtres
 */
function resetFilters() {
  menuState.searchTerm = '';
  menuState.selectedCategory = 'all';
  menuState.selectedOrderType = 'both';
  menuState.sortBy = 'name';
  menuState.showVegetarian = false;
  menuState.showAllergies = false;

  document.getElementById('searchInput').value = '';
  document.querySelector('input[value="both"]').checked = true;
  document.getElementById('vegetarianFilter').checked = false;
  document.getElementById('allergyFilter').checked = false;
  document.getElementById('sortBy').value = 'name';

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-category="all"]').classList.add('active');

  applyFilters();
}
