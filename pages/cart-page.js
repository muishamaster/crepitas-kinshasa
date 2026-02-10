/**
 * cart-page.js - Gestion de la page panier
 * Affiche les articles du panier, gère les modifications et la validation
 */

const CartPageManager = (() => {
    let currentDeliveryType = 'delivery';
    let currentPaymentMethod = 'mobile-money';
    let promoDiscount = 0;
    let cartItemToRemove = null;
    let currentCustomizingIndex = null;

    // Code promo valides (stockés après vérification)
    const VALID_PROMO_CODES = {
        'WELCOME10': 0.10,
        'FRIDAY20': 0.20,
        'REGULAR5': 0.05
    };

    // Initialiser la page
    function init() {
        renderCart();
        setupEventListeners();
        updateSummary();
        
        // Initialiser le thème et l'en-tête
        if (window.ThemeManager) {
            ThemeManager.applyThemeVariables();
        }
        if (window.CommonModule && typeof window.CommonModule.updateCartBadge === 'function') {
            window.CommonModule.updateCartBadge();
        }
    }

    // Rendu du panier
    function renderCart() {
        const cart = window.CartManager ? window.CartManager.getCart() : [];
        
        if (!cart || cart.length === 0) {
            showEmptyCart();
            return;
        }

        hideEmptyCart();
        const cartList = document.getElementById('cartItemsList');
        cartList.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItem = createCartItemElement(item, index);
            cartList.appendChild(cartItem);
        });
    }

    // Créer un élément article du panier
    function createCartItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.dataset.index = index;

        const itemTotal = (item.product.price * item.quantity).toLocaleString('fr-CD');
        const price = item.product.price.toLocaleString('fr-CD');

        let optionsHtml = '';
        if (item.options && Object.keys(item.options).length > 0) {
            optionsHtml = '<div class="item-options">';
            for (const [optName, optValue] of Object.entries(item.options)) {
                optionsHtml += `<span class="option-tag">${optName}: ${optValue}</span>`;
            }
            optionsHtml += '</div>';
        }

        let orderTypeDisplay = 'Livraison';
        if (item.orderType === 'onPlace') {
            orderTypeDisplay = `Table ${item.tableNumber || '?'}`;
        } else if (item.orderType === 'takeaway') {
            orderTypeDisplay = 'À emporter';
        }

        div.innerHTML = `
            <div class="item-image">
                <img src="${item.product.image}" alt="${item.product.name}" loading="lazy">
                <span class="item-badge">${item.quantity}x</span>
            </div>
            <div class="item-details">
                <h4 class="item-name">${item.product.name}</h4>
                <div class="item-info">
                    <span class="item-price">${price} FC × ${item.quantity}</span>
                    <span class="item-type">${orderTypeDisplay}</span>
                </div>
                ${optionsHtml}
                <div class="item-actions">
                    <button class="btn btn-small btn-edit" data-index="${index}">📝 Modifier</button>
                    <button class="btn btn-small btn-remove" data-index="${index}">🗑️ Supprimer</button>
                </div>
            </div>
            <div class="item-total">
                <div class="total-value">${itemTotal} FC</div>
                <div class="quantity-controls">
                    <button class="qty-btn qty-minus" data-index="${index}">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn qty-plus" data-index="${index}">+</button>
                </div>
            </div>
        `;

        return div;
    }

    // Afficher panier vide
    function showEmptyCart() {
        document.getElementById('emptyCartState').classList.remove('hidden');
        document.getElementById('cartContent').classList.add('hidden');
    }

    // Masquer panier vide
    function hideEmptyCart() {
        document.getElementById('emptyCartState').classList.add('hidden');
        document.getElementById('cartContent').classList.remove('hidden');
    }

    // Mettre à jour le résumé
    function updateSummary() {
        const cart = window.CartManager ? window.CartManager.getCart() : [];
        
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.product.price * item.quantity;
        });

        let deliveryFee = 0;
        if (currentDeliveryType === 'delivery') {
            deliveryFee = 1000; // Frais de livraison
        }

        // Appliquer promo au sous-total
        const discountAmount = Math.floor(subtotal * promoDiscount);
        const subtotalAfterDiscount = subtotal - discountAmount;

        const total = subtotalAfterDiscount + deliveryFee;

        // Afficher les valeurs
        document.getElementById('subtotalDisplay').textContent = subtotal.toLocaleString('fr-CD') + ' FC';
        document.getElementById('deliveryFeeDisplay').textContent = deliveryFee.toLocaleString('fr-CD') + ' FC';
        document.getElementById('totalDisplay').textContent = total.toLocaleString('fr-CD') + ' FC';

        if (discountAmount > 0) {
            let discountDiv = document.getElementById('discountDisplay');
            if (!discountDiv) {
                discountDiv = document.createElement('div');
                discountDiv.id = 'discountDisplay';
                discountDiv.className = 'summary-item discount-item';
                document.querySelector('.summary-divider').parentNode.insertBefore(
                    discountDiv,
                    document.querySelector('.summary-divider')
                );
            }
            discountDiv.innerHTML = `
                <span>Réduction promo:</span>
                <strong>-${discountAmount.toLocaleString('fr-CD')} FC</strong>
            `;
        }
    }

    // Configuration des event listeners
    function setupEventListeners() {
        // Boutons de suppression
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const index = parseInt(e.target.dataset.index);
                const item = (window.CartManager ? window.CartManager.getCart() : [])[index];
                if (item) {
                    showRemoveConfirmModal(item.product.name, index);
                }
            }
        });

        // Boutons de modification
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                const index = parseInt(e.target.dataset.index);
                const item = (window.CartManager ? window.CartManager.getCart() : [])[index];
                if (item) {
                    showCustomizeModal(item, index);
                }
            }
        });

        // Contrôles de quantité
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-plus')) {
                const index = parseInt(e.target.dataset.index);
                const cart = window.CartManager ? window.CartManager.getCart() : [];
                if (cart[index]) {
                    window.CartManager.updateQuantity(index, cart[index].quantity + 1);
                    renderCart();
                    updateSummary();
                }
            } else if (e.target.classList.contains('qty-minus')) {
                const index = parseInt(e.target.dataset.index);
                const cart = window.CartManager ? window.CartManager.getCart() : [];
                if (cart[index] && cart[index].quantity > 1) {
                    window.CartManager.updateQuantity(index, cart[index].quantity - 1);
                    renderCart();
                    updateSummary();
                }
            }
        });

        // Type de livraison
        document.querySelectorAll('input[name="deliveryType"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentDeliveryType = e.target.value;
                updateTableNumberVisibility();
                updateSummary();
            });
        });

        // Boutons de mode de paiement
        document.querySelectorAll('.payment-method').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.payment-method').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentPaymentMethod = btn.dataset.method;
                displayPaymentMethod();
            });
        });

        // Code promo
        document.getElementById('applyPromo').addEventListener('click', applyPromoCode);
        document.getElementById('promoCode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyPromoCode();
        });

        // Passer la commande
        document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

        // Continuer les achats
        document.getElementById('continueShopping').addEventListener('click', () => {
            window.location.href = '../pages/menu.html';
        });

        // Modal de suppression
        document.getElementById('confirmRemove').addEventListener('click', () => {
            if (cartItemToRemove !== null) {
                window.CartManager.removeFromCart(cartItemToRemove);
                cartItemToRemove = null;
                renderCart();
                updateSummary();
                closeRemoveConfirmModal();
            }
        });

        document.getElementById('cancelRemove').addEventListener('click', closeRemoveConfirmModal);

        // Modal de personnalisation
        document.getElementById('saveCustomize').addEventListener('click', saveCustomization);
        document.getElementById('cancelCustomize').addEventListener('click', closeCustomizeModal);
    }

    // Afficher visibilité numéro de table
    function updateTableNumberVisibility() {
        const section = document.getElementById('tableNumberSection');
        const input = document.getElementById('tableNumber');
        
        if (currentDeliveryType === 'onPlace') {
            section.classList.remove('hidden');
            input.required = true;
        } else {
            section.classList.add('hidden');
            input.required = false;
            input.value = '';
        }
    }

    // Modal de confirmation de suppression
    function showRemoveConfirmModal(productName, index) {
        cartItemToRemove = index;
        document.getElementById('removeConfirmText').textContent = 
            `Êtes-vous sûr de vouloir supprimer "${productName}" du panier?`;
        document.getElementById('removeConfirmModal').classList.remove('hidden');
    }

    function closeRemoveConfirmModal() {
        document.getElementById('removeConfirmModal').classList.add('hidden');
        cartItemToRemove = null;
    }

    // Modal de personnalisation
    function showCustomizeModal(item, index) {
        currentCustomizingIndex = index;
        const content = document.getElementById('customizeContent');
        
        let html = `<div class="customize-form">
            <div class="form-group">
                <label>Produit: <strong>${item.product.name}</strong></label>
            </div>
            
            <div class="form-group">
                <label for="custQuantity">Quantité:</label>
                <div class="quantity-input-group">
                    <button class="btn btn-small" id="custQtyMinus">−</button>
                    <input type="number" id="custQuantity" value="${item.quantity}" min="1">
                    <button class="btn btn-small" id="custQtyPlus">+</button>
                </div>
            </div>
        `;

        // Ajouter les options si disponibles
        if (item.product.options && item.product.options.length > 0) {
            html += '<div class="options-section">';
            item.product.options.forEach(option => {
                html += `<div class="form-group">
                    <label for="opt_${option.name}">${option.name}:</label>
                    <select id="opt_${option.name}" class="product-option">
                        <option value="">-- Sélectionner --</option>`;
                
                option.choices.forEach(choice => {
                    const selected = item.options && item.options[option.name] === choice ? 'selected' : '';
                    html += `<option value="${choice}" ${selected}>${choice}</option>`;
                });
                
                html += `</select>
                </div>`;
            });
            html += '</div>';
        }

        // Type de livraison
        html += `<div class="form-group">
            <label>Type de livraison:</label>
            <div class="radio-group">`;
        
        const deliveryTypes = [
            { value: 'delivery', label: 'À domicile' },
            { value: 'takeaway', label: 'À emporter' },
            { value: 'onPlace', label: 'Sur place' }
        ];

        deliveryTypes.forEach(type => {
            const checked = item.orderType === type.value ? 'checked' : '';
            html += `<label class="radio-option">
                <input type="radio" name="custDeliveryType" value="${type.value}" ${checked}>
                <span>${type.label}</span>
            </label>`;
        });
        
        if (item.orderType === 'onPlace') {
            html += `<input type="number" placeholder="Numéro de table" value="${item.tableNumber || ''}" id="custTableNumber" class="table-number-input">`;
        }

        html += `</div></div></div>`;

        content.innerHTML = html;

        // Ajouter les listeners pour les boutons de quantité
        document.getElementById('custQtyPlus').addEventListener('click', () => {
            const input = document.getElementById('custQuantity');
            input.value = Math.max(1, parseInt(input.value) + 1);
        });

        document.getElementById('custQtyMinus').addEventListener('click', () => {
            const input = document.getElementById('custQuantity');
            input.value = Math.max(1, parseInt(input.value) - 1);
        });

        // Afficher le numéro de table si sur place
        document.querySelectorAll('input[name="custDeliveryType"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const tableInputDiv = document.getElementById('custTableInputDiv');
                if (radio.value === 'onPlace') {
                    if (!tableInputDiv) {
                        const div = document.createElement('div');
                        div.id = 'custTableInputDiv';
                        div.innerHTML = '<input type="number" placeholder="Numéro de table" id="custTableNumber" class="table-number-input">';
                        radio.parentNode.parentNode.appendChild(div);
                    }
                } else {
                    if (tableInputDiv) tableInputDiv.remove();
                }
            });
        });

        document.getElementById('customizeModal').classList.remove('hidden');
    }

    function closeCustomizeModal() {
        document.getElementById('customizeModal').classList.add('hidden');
        currentCustomizingIndex = null;
    }

    function saveCustomization() {
        const quantity = parseInt(document.getElementById('custQuantity').value) || 1;
        const newOrderType = document.querySelector('input[name="custDeliveryType"]:checked').value;
        const tableNumber = document.getElementById('custTableNumber')?.value || '';

        // Collecte les options sélectionnées
        const newOptions = {};
        document.querySelectorAll('.product-option').forEach(select => {
            if (select.value) {
                const optName = select.id.replace('opt_', '');
                newOptions[optName] = select.value;
            }
        });

        // Mettre à jour la quantité
        window.CartManager.updateQuantity(currentCustomizingIndex, quantity);

        // Mettre à jour les options
        if (Object.keys(newOptions).length > 0) {
            window.CartManager.updateOptions(currentCustomizingIndex, newOptions);
        }

        // Mettre à jour le type de livraison
        window.CartManager.updateOrderType(currentCustomizingIndex, newOrderType, tableNumber);

        renderCart();
        updateSummary();
        closeCustomizeModal();
    }

    // Appliquer code promo
    function applyPromoCode() {
        const codeInput = document.getElementById('promoCode');
        const code = codeInput.value.toUpperCase().trim();

        if (!code) {
            showNotification('Veuillez entrer un code promo', 'error');
            return;
        }

        if (VALID_PROMO_CODES[code]) {
            promoDiscount = VALID_PROMO_CODES[code];
            showNotification(`Code promo "${code}" appliqué! (-${Math.round(promoDiscount * 100)}%)`, 'success');
            codeInput.value = '';
            updateSummary();
        } else {
            showNotification('Code promo invalide', 'error');
            codeInput.value = '';
        }
    }

    // Afficher le mode de paiement sélectionné
    function displayPaymentMethod() {
        const methodNames = {
            'mobile-money': '📱 Mobile Money',
            'cash': '💵 Espèces',
            'card': '💳 Carte Bancaire',
            'transfer': '🏦 Virement'
        };
        
        const methodText = methodNames[currentPaymentMethod] || 'Mode non sélectionné';
        document.getElementById('selectedMethod').textContent = `Mode sélectionné: ${methodText}`;
    }

    // Valider et passer la commande
    function handleCheckout() {
        const cart = window.CartManager ? window.CartManager.getCart() : [];

        if (!cart || cart.length === 0) {
            showNotification('Votre panier est vide', 'error');
            return;
        }

        // Validation du type de livraison
        if (currentDeliveryType === 'onPlace') {
            const tableNumber = document.getElementById('tableNumber').value;
            if (!tableNumber) {
                showNotification('Veuillez spécifier un numéro de table', 'error');
                return;
            }
            
            // Mettre à jour tous les articles avec le numéro de table
            cart.forEach((item, index) => {
                if (item.orderType === 'onPlace') {
                    window.CartManager.updateOrderType(index, 'onPlace', tableNumber);
                }
            });
        }

        // Vérifier les données utilisateur
        const user = JSON.parse(localStorage.getItem('crepitas_user') || 'null');
        if (!user) {
            showNotification('Veuillez vous connecter pour passer la commande', 'info');
            setTimeout(() => {
                window.location.href = '../pages/account.html?redirect=cart';
            }, 1500);
            return;
        }

        // Créer résumé de commande
        const summary = window.CartManager.getSummary();
        const deliveryFee = currentDeliveryType === 'delivery' ? 1000 : 0;
        const totalAfterDiscount = summary.subtotal - Math.floor(summary.subtotal * promoDiscount) + deliveryFee;

        const order = {
            id: `CMD-${Date.now()}`,
            date: new Date().toLocaleString('fr-CD'),
            user: user.name,
            phone: user.phone,
            items: summary.items,
            subtotal: summary.subtotal,
            discount: Math.floor(summary.subtotal * promoDiscount),
            promoCode: document.getElementById('promoCode').value || 'N/A',
            deliveryFee: deliveryFee,
            total: totalAfterDiscount,
            deliveryType: currentDeliveryType,
            tableNumber: document.getElementById('tableNumber').value || null,
            paymentMethod: currentPaymentMethod,
            status: 'En attente de paiement'
        };

        // Sauvegarder la commande
        let orders = JSON.parse(localStorage.getItem('crepitas_orders') || '[]');
        orders.push(order);
        localStorage.setItem('crepitas_orders', JSON.stringify(orders));

        // Afficher confirmation
        showOrderConfirmation(order);

        // Vider le panier
        window.CartManager.clearCart();
        
        // Mettre à jour l'affichage
        renderCart();
        updateSummary();
    }

    // Afficher confirmation de commande
    function showOrderConfirmation(order) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content success-modal">
                <div class="success-icon">✓</div>
                <h3>Commande confirmée!</h3>
                <p>ID: ${order.id}</p>
                <div class="order-details">
                    <p><strong>Total:</strong> ${order.total.toLocaleString('fr-CD')} FC</p>
                    <p><strong>Mode de paiement:</strong> ${order.paymentMethod}</p>
                    <p><strong>Livraison:</strong> ${order.deliveryType === 'delivery' ? 'À domicile' : order.deliveryType === 'takeaway' ? 'À emporter' : 'Sur place'}</p>
                </div>
                <p class="small-text">Nous vous contacterons bientôt pour confirmer votre commande</p>
                <button class="btn btn-primary" onclick="window.location.href='../index.html'">Retour à l'accueil</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Notification simple
    function showNotification(message, type) {
        const notif = document.createElement('div');
        notif.className = `notification notification-${type}`;
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 4px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    return {
        init: init,
        renderCart: renderCart,
        updateSummary: updateSummary
    };
})();

// Initialiser au chargement du DOM
document.addEventListener('DOMContentLoaded', CartPageManager.init);
