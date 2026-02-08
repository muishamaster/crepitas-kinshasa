/**
 * ===================================================================
 * CREPITAS KINSHASA - Crêperie Premium Management System
 * Architecture: Module Pattern avec ES6+
 * Versions: 2.0.0 (Rebranding)
 * ===================================================================
 */

// ======================== CONFIGURATION ========================
const CONFIG = {
    DELIVERY_FEE: 1000, // FC
    SITE_URL: window.location.href.split('?')[0],
    WHATSAPP_NUMBER: '243977970594', // Format international sans +
    PAYMENT_PROVIDERS: {
        mpesa: {
            name: 'M-Pesa',
            code: '*256#',
            deepLink: (amount) => `tel:*256*1*1*${amount}#`
        },
        airtel: {
            name: 'Airtel Money',
            code: '*144#',
            deepLink: (amount) => `tel:*144*1*1*${amount}#`
        },
        orange: {
            name: 'Orange Money',
            code: '*150#',
            deepLink: (amount) => `tel:*150*1*1*${amount}#`
        }
    },
    PRODUCTS: {
        'crepes-sucrees': [
            {
                id: 1,
                name: 'La Classique Sucre',
                desc: 'Simplement saupoudrée de sucre de canne et un trait de citron.',
                price: 5000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            },
            {
                id: 2,
                name: 'Beurre Sucre & Citron',
                desc: 'L\'alliance parfaite du beurre demi-sel et du citron vert.',
                price: 6000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1577540643203-07e73e45b6a7?w=300&h=250&fit=crop'
            },
            {
                id: 3,
                name: 'Nutella Lovers',
                desc: 'Généreuse couche de Nutella fondant.',
                price: 10000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=250&fit=crop'
            },
            {
                id: 4,
                name: 'Nutella Banane',
                desc: 'Nutella et rondelles de bananes fraîches.',
                price: 12000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=300&h=250&fit=crop'
            },
            {
                id: 5,
                name: 'Caramel Beurre Salé',
                desc: 'Notre caramel maison à la fleur de sel.',
                price: 12000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=300&h=250&fit=crop'
            },
            {
                id: 6,
                name: 'La Spéculoos',
                desc: 'Pâte de Spéculoos croquante et brisures de biscuits.',
                price: 13000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1599599810694-b3fa981175d7?w=300&h=250&fit=crop'
            },
            {
                id: 7,
                name: 'Miel & Amandes',
                desc: 'Miel pur d\'acacia et amandes effilées grillées.',
                price: 11000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1558636508-e0db3814a69e?w=300&h=250&fit=crop'
            },
            {
                id: 8,
                name: 'Choco Coco',
                desc: 'Chocolat noir fondu et noix de coco râpée.',
                price: 12000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            },
            {
                id: 9,
                name: 'Pomme Cannelle',
                desc: 'Pommes caramélisées au four et une touche de cannelle.',
                price: 14000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1568050109203-d6b2b1e00c36?w=300&h=250&fit=crop'
            },
            {
                id: 10,
                name: 'La Tout-Fruit',
                desc: 'Coulis de fruits rouges et morceaux de fraises fraîches.',
                price: 15000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1553530666-ba953a5c547f?w=300&h=250&fit=crop'
            },
            {
                id: 11,
                name: 'L\'Antillaise Flambée',
                desc: 'Banane, sucre roux et flambée au Rhum devant vous.',
                price: 18000,
                category: 'crepes-sucrees',
                img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=250&fit=crop'
            }
        ],
        'galettes-salees': [
            {
                id: 12,
                name: 'La Complète',
                desc: 'Jambon, œuf miroir et emmental râpé.',
                price: 15000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=250&fit=crop'
            },
            {
                id: 13,
                name: 'La Fromagère',
                desc: 'Mélange de 3 fromages (Emmental, Chèvre, Mozzarella).',
                price: 18000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1568050109203-d6b2b1e00c36?w=300&h=250&fit=crop'
            },
            {
                id: 14,
                name: 'Poulet Crème',
                desc: 'Émincé de poulet, crème fraîche et champignons.',
                price: 19000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=250&fit=crop'
            },
            {
                id: 15,
                name: 'La Bolognaise',
                desc: 'Viande hachée pur bœuf, sauce tomate maison et origan.',
                price: 18000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=300&h=250&fit=crop'
            },
            {
                id: 16,
                name: 'La Popeye',
                desc: 'Épinards à la crème, œuf et parmesan.',
                price: 17000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=250&fit=crop'
            },
            {
                id: 17,
                name: 'Thon Mayo',
                desc: 'Miettes de thon, mayonnaise maison, maïs et olives.',
                price: 16000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1614707267537-b85faf00021f?w=300&h=250&fit=crop'
            },
            {
                id: 18,
                name: 'Chèvre Miel',
                desc: 'Fromage de chèvre chaud, miel, noix et salade.',
                price: 19000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1605350562467-06f2fe6fbf45?w=300&h=250&fit=crop'
            },
            {
                id: 19,
                name: 'La Végétarienne',
                desc: 'Tomates, poivrons grillés, oignons et champignons.',
                price: 16000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=250&fit=crop'
            },
            {
                id: 20,
                name: 'La Savoyarde',
                desc: 'Pommes de terre, lardons fumés, oignons et reblochon.',
                price: 22000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1589974175275-79d6a0a7ee6b?w=300&h=250&fit=crop'
            },
            {
                id: 21,
                name: 'L\'Indienne',
                desc: 'Poulet mariné au curry, crème coco et ananas rôti.',
                price: 20000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=250&fit=crop'
            },
            {
                id: 22,
                name: 'La Norvégienne',
                desc: 'Saumon fumé, crème ciboulette et zeste de citron.',
                price: 24000,
                category: 'galettes-salees',
                img: 'https://images.unsplash.com/photo-1615788213519-d2199a3e6eab?w=300&h=250&fit=crop'
            }
        ],
        'signatures': [
            {
                id: 23,
                name: 'La Poulet Mayo Royale',
                desc: 'La légende de Kinshasa revisitée en crêpe : poulet grillé, mayo secrète, oignons croquants.',
                price: 22000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=250&fit=crop'
            },
            {
                id: 24,
                name: 'Le Trésor de la Gombe',
                desc: 'Viande hachée épicée, dés de bananes plantains frites (makemba) et sauce piri-piri douce.',
                price: 25000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=300&h=250&fit=crop'
            },
            {
                id: 25,
                name: 'La Ntaba Fumée',
                desc: 'Fines tranches de chèvre fumé, oignons confits et tomates fraîches.',
                price: 26000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=250&fit=crop'
            },
            {
                id: 26,
                name: 'La Thomson',
                desc: 'Poisson frais grillé émietté, chikwangue rôtie en dés et sauce verte.',
                price: 24000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1614707267537-b85faf00021f?w=300&h=250&fit=crop'
            },
            {
                id: 27,
                name: 'Burger Crêpe',
                desc: 'Pliée comme un burger : Steak haché, cheddar, salade, tomate, sauce burger.',
                price: 23000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1568050109203-d6b2b1e00c36?w=300&h=250&fit=crop'
            },
            {
                id: 28,
                name: 'La Mikate Gold',
                desc: 'Crêpe épaisse servie avec des mini-beignets, chocolat et cacahuètes.',
                price: 20000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            },
            {
                id: 29,
                name: 'Mangue Passion VIP',
                desc: 'Mangue fraîche de saison, coulis de fruit de la passion et boule de glace vanille.',
                price: 22000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1553530666-ba953a5c547f?w=300&h=250&fit=crop'
            },
            {
                id: 30,
                name: 'L\'Équateur',
                desc: 'Avocat frais, crevettes roses, sauce cocktail et pamplemousse.',
                price: 21000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=250&fit=crop'
            },
            {
                id: 31,
                name: 'La Malewa Chic',
                desc: 'Haricots rouges cuisinés (Madesu), riz parfumé et sauce tomate épicée.',
                price: 18000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=300&h=250&fit=crop'
            },
            {
                id: 32,
                name: 'Crepitas Breakfast',
                desc: 'Bacon, saucisses, œuf brouillé et sirop d\'érable sur crêpe épaisse.',
                price: 25000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&h=250&fit=crop'
            },
            {
                id: 33,
                name: 'La Rumba',
                desc: 'La plus garnie : Poulet, Viande hachée, Fromage, Champignons et sauce algérienne.',
                price: 28000,
                category: 'signatures',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            }
        ],
        boissons: [
            {
                id: 34,
                name: 'Milkshake Vanille Bourbon',
                desc: 'Crémeux et gourmand à la vanille de Madagascar.',
                price: 10000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            },
            {
                id: 35,
                name: 'Milkshake Tout Choco',
                desc: 'Double dose de chocolat pour les accros.',
                price: 10000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            },
            {
                id: 36,
                name: 'Milkshake Fraise Tagada',
                desc: 'Fraise fraîche et douceur des Tagada.',
                price: 11000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1553530666-ba953a5c547f?w=300&h=250&fit=crop'
            },
            {
                id: 37,
                name: 'Milkshake Oreo Supreme',
                desc: 'Crème de fromage et biscuits Oreo concassés.',
                price: 12000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1605350562467-06f2fe6fbf45?w=300&h=250&fit=crop'
            },
            {
                id: 38,
                name: 'Milkshake Kinder Bueno',
                desc: 'Chocolat blanc et noisettes comme l\'original.',
                price: 13000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=250&fit=crop'
            },
            {
                id: 39,
                name: 'Jus de Bissap Maison',
                desc: 'Frais et tonique, préparé chaque jour.',
                price: 5000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1553530666-ba953a5c547f?w=300&h=250&fit=crop'
            },
            {
                id: 40,
                name: 'Jus de Gingembre (Tangawisi)',
                desc: 'Puissant et naturel, énergisant.',
                price: 5000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1590890391511-23f1c064f09f?w=300&h=250&fit=crop'
            },
            {
                id: 41,
                name: 'Jus de Maracuja (Passion)',
                desc: 'Exotique et acidulé à la perfection.',
                price: 6000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1600271886742-f049cd1f04b5?w=300&h=250&fit=crop'
            },
            {
                id: 42,
                name: 'Café Espresso Kin',
                desc: 'Riche et intense, tiré avec passion.',
                price: 4000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=300&h=250&fit=crop'
            },
            {
                id: 43,
                name: 'Thé Citronnelle & Miel',
                desc: 'Apaisant et réconfortant avec miel naturel.',
                price: 5000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1597318972326-4cc50267cba1?w=300&h=250&fit=crop'
            },
            {
                id: 44,
                name: 'Soda (Coca, Fanta, Sprite)',
                desc: 'Classiques et incontournables, bien fraîches.',
                price: 3000,
                category: 'boissons',
                img: 'https://images.unsplash.com/photo-1550788691-eb646b3c7be5?w=300&h=250&fit=crop'
            }
        ]
    }
};

// ======================== CART MANAGER ========================
/**
 * Gestionnaire complet du panier avec validation, calculs précis et persistance
 */
const cartManager = (() => {
    // État privé
    let cart = [];
    const storageKey = 'beniCookieCart';
    
    // Initialisation depuis localStorage
    const init = () => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                cart = JSON.parse(saved);
            } catch (e) {
                console.error('Erreur de récupération du panier:', e);
                cart = [];
            }
        }
        updateUI();
    };

    // Vérifier si un article existe déjà
    const findItem = (id) => cart.find(item => item.id === id);

    /**
     * Ajouter un article au panier (gère les quantités)
     * @param {number} productId - ID du produit
     * @param {string} name - Nom du produit
     * @param {number} price - Prix unitaire
     * @param {number} quantity - Quantité (défaut 1)
     */
    const addToCart = (productId, name, price, quantity = 1) => {
        if (!productId || !name || price <= 0) {
            showNotification('Erreur: Données du produit invalides', 'error');
            return;
        }

        const existingItem = findItem(productId);
        
        if (existingItem) {
            // Incrémenter la quantité
            existingItem.quantity += quantity;
            showNotification(`${name} - Quantité mise à jour (+${quantity})`, 'info');
        } else {
            // Ajouter nouveau produit
            cart.push({
                id: productId,
                name,
                price: parseFloat(price), // Assurer la précision décimale
                quantity
            });
            showNotification(`${name} ajouté au panier!`, 'success');
        }
        
        saveCart();
        updateUI();
    };

    /**
     * Mettre à jour la quantité d'un article
     */
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = findItem(productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            saveCart();
            updateUI();
        }
    };

    /**
     * Retirer un article du panier
     */
    const removeFromCart = (productId) => {
        const item = findItem(productId);
        if (item) {
            cart = cart.filter(i => i.id !== productId);
            showNotification(`${item.name} supprimé du panier`, 'info');
            saveCart();
            updateUI();
        }
    };

    /**
     * Vider complètement le panier
     */
    const clearCart = () => {
        if (cart.length === 0) {
            showNotification('Le panier est déjà vide', 'warning');
            return;
        }

        if (confirm('Êtes-vous sûr de vouloir vider le panier?')) {
            cart = [];
            saveCart();
            updateUI();
            showNotification('Panier vidé', 'info');
        }
    };

    /**
     * Calculer le sous-total avec précision décimale
     */
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => {
            const itemTotal = parseFloat((item.price * item.quantity).toFixed(2));
            return parseFloat((total + itemTotal).toFixed(2));
        }, 0);
    };

    /**
     * Calculer le total avec frais de livraison
     */
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return parseFloat((subtotal + CONFIG.DELIVERY_FEE).toFixed(2));
    };

    /**
     * Obtenir le panier courant
     */
    const getCart = () => [...cart];

    /**
     * Valider le panier avant paiement
     */
    const validateCart = () => {
        if (cart.length === 0) {
            showNotification('❌ Votre panier est vide!', 'error');
            return false;
        }
        return true;
    };

    /**
     * Sauvegarder le panier dans localStorage
     */
    const saveCart = () => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(cart));
        } catch (e) {
            console.error('Erreur de sauvegarde du panier:', e);
        }
    };

    /**
     * Mettre à jour l'interface utilisateur
     */
    const updateUI = () => {
        updateCartDisplay();
        updateCartCount();
        updateCartSummary();
        updatePaymentButton();
    };

    /**
     * Afficher les articles du panier
     */
    const updateCartDisplay = () => {
        const cartContainer = document.getElementById('cart-items');
        
        if (!cartContainer) return;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">
                    <strong>${escapeHtml(item.name)}</strong>
                    <div class="cart-item-details">
                        ${item.price.toLocaleString('fr-FR')} FC × ${item.quantity}
                    </div>
                </div>
                <span class="cart-item-price">${(item.price * item.quantity).toLocaleString('fr-FR')} FC</span>
                <div class="cart-item-qty-controls">
                    <button class="btn-qty" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span style="width: 20px; text-align: center;">${item.quantity}</span>
                    <button class="btn-qty" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="btn-remove" onclick="cartManager.removeFromCart(${item.id})" title="Supprimer">🗑️</button>
            </div>
        `).join('');
    };

    /**
     * Mettre à jour le badge du nombre d'articles
     */
    const updateCartCount = () => {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    };

    /**
     * Mettre à jour le résumé du panier (totaux)
     */
    const updateCartSummary = () => {
        const subtotal = calculateSubtotal();
        const total = calculateTotal();

        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total-price');
        const paymentAmountEl = document.getElementById('paymentAmount');

        if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('fr-FR') + ' FC';
        if (totalEl) totalEl.textContent = total.toLocaleString('fr-FR') + ' FC';
        if (paymentAmountEl) paymentAmountEl.textContent = total.toLocaleString('fr-FR') + ' FC';
    };

    /**
     * Activer/désactiver le bouton de paiement
     */
    const updatePaymentButton = () => {
        const payBtn = document.getElementById('paymentBtn');
        if (payBtn) {
            payBtn.disabled = cart.length === 0;
        }
    };

    /**
     * Modal de paiement Mobile Money
     */
    const openPaymentModal = () => {
        if (!validateCart()) return;
        
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.classList.add('show');
        }
    };

    const closePaymentModal = () => {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.classList.remove('show');
        }
    };

    /**
     * Traiter le paiement Mobile Money
     */
    const processPayment = (provider) => {
        if (!validateCart()) return;

        const providerConfig = CONFIG.PAYMENT_PROVIDERS[provider];
        if (!providerConfig) {
            showNotification('Fournisseur de paiement invalide', 'error');
            return;
        }

        const total = calculateTotal();

        // Validation sécurisée
        if (total <= 0) {
            showNotification('Montant invalide', 'error');
            return;
        }

        // Simuler validation sécurisée
        console.log(`🔐 Validation sécurisée: Paiement de ${total} FC via ${providerConfig.name}`);

        // Deep link vers l'application de paiement
        const deepLink = providerConfig.deepLink(total);
        
        try {
            // Tentative de redirection vers l'app de paiement
            closePaymentModal();
            showNotification(`Redirection vers ${providerConfig.name}...`, 'info');
            
            // Simuler la redirection (dans une vraie app, utiliser window.location.href)
            setTimeout(() => {
                console.log(`Redirection vers: ${deepLink}`);
                // window.location.href = deepLink; // Décommenter en production
                
                // Pour la démo, afficher un message de confirmation
                showNotification(`✅ Paiement de ${total.toLocaleString('fr-FR')} FC initié avec ${providerConfig.name}`, 'success');
                clearCart();
            }, 500);
        } catch (error) {
            console.error('Erreur lors du traitement du paiement:', error);
            showNotification('Erreur lors du paiement. Veuillez réessayer.', 'error');
        }
    };

    /**
     * Envoyer le panier via WhatsApp
     */
    const sendToWhatsApp = () => {
        if (!validateCart()) return;

        const subtotal = calculateSubtotal();
        const total = calculateTotal();
        
        let message = '🍽️ *Nouvelle Commande BENI BK*\n\n';
        message += '📋 *Détail de la commande:*\n';
        message += '━━━━━━━━━━━━━━━━━━━━━\n';

        cart.forEach((item, index) => {
            const itemTotal = (item.price * item.quantity);
            message += `${index + 1}. ${item.name}\n`;
            message += `   ${item.quantity} × ${item.price.toLocaleString('fr-FR')} FC = ${itemTotal.toLocaleString('fr-FR')} FC\n`;
        });

        message += '━━━━━━━━━━━━━━━━━━━━━\n';
        message += `📦 *Sous-total:* ${subtotal.toLocaleString('fr-FR')} FC\n`;
        message += `🚚 *Frais livraison:* ${CONFIG.DELIVERY_FEE.toLocaleString('fr-FR')} FC\n`;
        message += `💰 *Total:* ${total.toLocaleString('fr-FR')} FC\n\n`;
        message += '✅ Je souhaite passer cette commande par Mobile Money (M-Pesa/Airtel/Orange)';

        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        showNotification('Redirection vers WhatsApp...', 'info');
    };

    // Retourner l'API publique
    return {
        init,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCart,
        calculateSubtotal,
        calculateTotal,
        validateCart,
        updateUI,
        openPaymentModal,
        closePaymentModal,
        processPayment,
        sendToWhatsApp
    };
})();

// ======================== QR CODE MANAGER ========================
/**
 * Gestion du QR Code pour le menu
 */
const qrCodeManager = (() => {
    let qrCode = null;

    const generate = () => {
        const container = document.getElementById('qrCodeContainer');
        if (!container) return;

        // Nettoyer les anciens QR codes
        container.innerHTML = '';

        try {
            // Générer le QR code avec la bibliothèque qrcode.js
            qrCode = new QRCode(container, {
                text: CONFIG.SITE_URL,
                width: 200,
                height: 200,
                colorDark: '#d4af37',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });

            console.log('✓ QR Code généré avec succès');
        } catch (error) {
            console.error('Erreur génération QR Code:', error);
            container.innerHTML = '<p>Impossible de générer le QR Code</p>';
        }
    };

    return { generate };
})();

// ======================== PRODUCT MANAGER ========================
/**
 * Gestion de l'affichage des produits
 */
const productManager = (() => {
    /**
     * Charger et afficher les produits
     */
    const loadProducts = (category = 'crepes-sucrees') => {
        const container = document.getElementById('productList');
        if (!container) return;

        const products = CONFIG.PRODUCTS[category] || [];

        if (products.length === 0) {
            container.innerHTML = '<p>Aucun produit dans cette catégorie.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.img}" alt="${escapeHtml(product.name)}" onerror="this.src='https://via.placeholder.com/300x250?text=Image+non+disponible'">
                <div class="product-info">
                    <h3>${escapeHtml(product.name)}</h3>
                    <p>${escapeHtml(product.desc)}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="price">${product.price.toLocaleString('fr-FR')} FC</div>
                        <button class="btn-add" onclick="cartManager.addToCart(${product.id}, '${escapeHtml(product.name)}', ${product.price})">
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    return { loadProducts };
})();

// ======================== UTILITAIRES ========================

/**
 * Échapper les caractères HTML pour éviter les injections XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Afficher les notifications
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Créer une notification visuelle simple
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : type === 'error' ? '#ff4444' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Bascule l'affichage du QR Code
 */
function toggleQRCode() {
    const container = document.getElementById('qrCodeContainer');
    if (container) {
        container.classList.toggle('hidden');
        if (!container.classList.contains('hidden') && !container.firstChild) {
            qrCodeManager.generate();
        }
    }
}

// ======================== GESTION DES MODALES ========================

/**
 * Fermer les modales au clic extérieur
 */
document.addEventListener('click', (event) => {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;

    if (event.target === modal) {
        cartManager.closePaymentModal();
    }
});

/**
 * Fermer les modales avec Échap
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('paymentModal');
        if (modal && modal.classList.contains('show')) {
            cartManager.closePaymentModal();
        }
    }
});

// ======================== NAVIGATION ========================

/**
 * Gestion des clics sur les boutons CTA
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le panier
    cartManager.init();

    // Charger les produits par défaut (rebranding: Crêpes Sucrées)
    productManager.loadProducts('crepes-sucrees');

    // Boutons CTA
    document.querySelectorAll('.btn-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target === 'menu.html') {
                window.location.href = target;
            } else {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Boutons de catégories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = btn.dataset.category;
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Si c'est un lien vers une autre page, laisser le navigateur faire son travail
            if (!btn.href.includes('#')) {
                return; // Laisser le href agir normalement
            }
            
            e.preventDefault();
            productManager.loadProducts(category);
        });
    });

    // Bouton clear cart
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => cartManager.clearCart());
    }

    // WhatsApp Float Button
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            cartManager.sendToWhatsApp();
        });
    }

    console.log('✓ Application CREPITAS KINSHASA initialisée avec succès');
});