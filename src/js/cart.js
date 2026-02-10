/**
 * ===================================================================
 * Module Panier - Gestion localStorage + Options de personnalisation
 * ===================================================================
 */

const cartManager = (() => {
  // État privé
  let cart = [];
  
  /**
   * Initialisation
   */
  const init = () => {
    loadCart();
    updateUI();
  };

  /**
   * Charger le panier depuis localStorage
   */
  const loadCart = () => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.localStorage.cart);
      cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Erreur chargement panier:', e);
      cart = [];
    }
  };

  /**
   * Sauvegarder le panier
   */
  const saveCart = () => {
    try {
      localStorage.setItem(APP_CONFIG.localStorage.cart, JSON.stringify(cart));
      updateUI();
      updateCartBadge();
    } catch (e) {
      console.error('Erreur sauvegarde panier:', e);
    }
  };

  /**
   * Ajouter au panier
   */
  const addToCart = (product, quantity = 1, options = {}, orderType = 'delivery') => {
    if (!product || !product.id) {
      showNotification('Produit invalide', 'error');
      return false;
    }

    // Chercher si le produit existe déjà avec les mêmes options
    const existingItem = cart.find(item => 
      item.id === product.id && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        options,
        orderType, // 'delivery' ou 'takeaway'
        tableNumber: null, // Pour les commandes sur place
        frequency: 1 // Pour les commandes récurrentes
      });
    }

    saveCart();
    showNotification(`${product.name} ajouté au panier!`, 'success');
    return true;
  };

  /**
   * Retirer du panier
   */
  const removeFromCart = (cartItemIndex) => {
    if (cartItemIndex >= 0 && cartItemIndex < cart.length) {
      const item = cart[cartItemIndex];
      cart.splice(cartItemIndex, 1);
      saveCart();
      showNotification(`${item.name} supprimé du panier`, 'info');
      return true;
    }
    return false;
  };

  /**
   * Mettre à jour la quantité
   */
  const updateQuantity = (cartItemIndex, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(cartItemIndex);
    }

    if (cartItemIndex >= 0 && cartItemIndex < cart.length) {
      cart[cartItemIndex].quantity = newQuantity;
      saveCart();
      return true;
    }
    return false;
  };

  /**
   * Mettre à jour les options d'un article
   */
  const updateOptions = (cartItemIndex, newOptions) => {
    if (cartItemIndex >= 0 && cartItemIndex < cart.length) {
      cart[cartItemIndex].options = newOptions;
      saveCart();
      return true;
    }
    return false;
  };

  /**
   * Mettre à jour le type de commande
   */
  const updateOrderType = (cartItemIndex, orderType, tableNumber = null) => {
    if (cartItemIndex >= 0 && cartItemIndex < cart.length) {
      cart[cartItemIndex].orderType = orderType;
      cart[cartItemIndex].tableNumber = tableNumber;
      saveCart();
      return true;
    }
    return false;
  };

  /**
   * Vider le panier
   */
  const clearCart = () => {
    if (cart.length === 0) {
      showNotification('Le panier est déjà vide', 'warning');
      return false;
    }

    if (confirm('Êtes-vous sûr de vouloir vider le panier?')) {
      cart = [];
      saveCart();
      showNotification('Panier vidé', 'info');
      return true;
    }
    return false;
  };

  /**
   * Obtenir le panier
   */
  const getCart = () => [...cart];

  /**
   * Calculer le sous-total
   */
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  /**
   * Calculer le total avec frais
   */
  const calculateTotal = (deliveryFee = 1000) => {
    const subtotal = calculateSubtotal();
    const hasDeliveryItems = cart.some(item => item.orderType === 'delivery');
    const fee = hasDeliveryItems ? deliveryFee : 0;
    return subtotal + fee;
  };

  /**
   * Valider le panier pour le paiement
   */
  const validateForCheckout = () => {
    const errors = [];

    if (cart.length === 0) {
      errors.push('Votre panier est vide');
    }

    // Vérifier que les items "sur place" ont un numéro de table
    const onPlaceItems = cart.filter(item => item.orderType === 'onPlace');
    onPlaceItems.forEach((item, idx) => {
      if (!item.tableNumber) {
        errors.push(`Le produit "${item.name}" nécessite un numéro de table`);
      }
    });

    if (errors.length > 0) {
      showNotification(errors.join('\n'), 'error');
      return false;
    }

    return true;
  };

  /**
   * Obtenir le résumé du panier
   */
  const getSummary = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 1000;
    const total = calculateTotal(deliveryFee);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: cart.length,
      itemCount,
      subtotal,
      deliveryFee,
      total,
      currency: 'FC'
    };
  };

  /**
   * Mettre à jour l'interface
   */
  const updateUI = () => {
    // À implémenter pour chaque page
  };

  return {
    init,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateOptions,
    updateOrderType,
    clearCart,
    getCart,
    calculateSubtotal,
    calculateTotal,
    validateForCheckout,
    getSummary
  };
})();
