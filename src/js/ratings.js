/**
 * ===================================================================
 * Module Évaluations - Système de notation (1-5 étoiles)
 * ===================================================================
 */

const ratingManager = (() => {
  let allRatings = [];

  /**
   * Initialisation
   */
  const init = () => {
    loadRatings();
  };

  /**
   * Charger les évaluations
   */
  const loadRatings = () => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.localStorage.ratings);
      allRatings = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Erreur chargement évaluations:', e);
      allRatings = [];
    }
  };

  /**
   * Sauvegarder les évaluations
   */
  const saveRatings = () => {
    try {
      localStorage.setItem(APP_CONFIG.localStorage.ratings, JSON.stringify(allRatings));
    } catch (e) {
      console.error('Erreur sauvegarde évaluations:', e);
    }
  };

  /**
   * Ajouter une évaluation
   */
  const addRating = (productId, rating, review = '', userName = 'Anonyme') => {
    const errors = [];

    if (!productId) errors.push('Produit invalide');
    if (rating < 1 || rating > 5) errors.push('Note doit être entre 1 et 5');
    if (review.length > 500) errors.push('Commentaire trop long (max 500 caractères)');

    if (errors.length > 0) {
      showNotification(errors.join('\n'), 'error');
      return false;
    }

    // Vérifier si l'utilisateur a déjà noté ce produit
    const existingRating = allRatings.find(
      r => r.productId === productId && r.userName === userName
    );

    if (existingRating) {
      // Remplacer la note existante
      existingRating.rating = rating;
      existingRating.review = review;
      existingRating.updatedAt = new Date().toISOString();
    } else {
      // Ajouter une nouvelle note
      allRatings.push({
        id: 'rating_' + Date.now(),
        productId,
        rating,
        review,
        userName,
        createdAt: new Date().toISOString(),
        helpful: 0
      });
    }

    saveRatings();
    showNotification('Merci pour votre évaluation!', 'success');
    return true;
  };

  /**
   * Obtenir les évaluations d'un produit
   */
  const getProductRatings = (productId) => {
    return allRatings.filter(r => r.productId === productId);
  };

  /**
   * Calculer la moyenne des notes
   */
  const getAverageRating = (productId) => {
    const ratings = getProductRatings(productId);
    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  /**
   * Obtenir le nombre d'évaluations
   */
  const getRatingCount = (productId) => {
    return getProductRatings(productId).length;
  };

  /**
   * Obtenir la distribution des notes
   */
  const getRatingDistribution = (productId) => {
    const ratings = getProductRatings(productId);
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    ratings.forEach(r => {
      distribution[r.rating]++;
    });

    return distribution;
  };

  /**
   * Marquer une évaluation comme utile
   */
  const markAsHelpful = (ratingId) => {
    const rating = allRatings.find(r => r.id === ratingId);
    if (rating) {
      rating.helpful = (rating.helpful || 0) + 1;
      saveRatings();
      return true;
    }
    return false;
  };

  /**
   * Créer un élément HTML pour afficher les étoiles
   */
  const renderStars = (rating, interactive = false, productId = null, onRate = null) => {
    const container = document.createElement('div');
    container.className = 'rating-stars';

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.textContent = '★';
      star.style.color = i <= rating ? '#ffc107' : '#ddd';
      star.style.cursor = interactive ? 'pointer' : 'default';

      if (interactive) {
        star.addEventListener('hover', () => {
          // Afficher les étoiles jusqu'à celle survolée
        });
        star.addEventListener('click', () => {
          if (onRate) onRate(i);
        });
      }

      container.appendChild(star);
    }

    return container;
  };

  /**
   * Créer un formulaire d'évaluation
   */
  const createRatingForm = (productId, productName) => {
    const form = document.createElement('div');
    form.className = 'rating-form';
    form.innerHTML = `
      <h4>Évaluer "${productName}"</h4>
      
      <div class="form-group">
        <label>Votre note (1-5 étoiles)</label>
        <div class="rating-input" id="rating-input">
          ${[1, 2, 3, 4, 5].map(i => `
            <input type="radio" name="rating" value="${i}" id="star-${i}">
            <label for="star-${i}" class="star-label">★</label>
          `).join('')}
        </div>
      </div>

      <div class="form-group">
        <label for="review">Votre commentaire</label>
        <textarea 
          id="review" 
          placeholder="Partagez votre expérience..." 
          maxlength="500"
          rows="4"
        ></textarea>
        <small id="char-count">0/500</small>
      </div>

      <div class="form-group">
        <label for="user-name">Votre nom (optionnel)</label>
        <input 
          type="text" 
          id="user-name" 
          placeholder="Votre prénom"
          maxlength="50"
        >
      </div>

      <button class="btn-submit-rating">Soumettre l'évaluation</button>
    `;

    // Setup textarea char counter
    const textarea = form.querySelector('#review');
    const charCount = form.querySelector('#char-count');
    
    if (textarea && charCount) {
      textarea.addEventListener('input', () => {
        charCount.textContent = `${textarea.value.length}/500`;
      });
    }

    // Setup submit button
    const submitBtn = form.querySelector('.btn-submit-rating');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const rating = form.querySelector('input[name="rating"]:checked');
        const review = form.querySelector('#review').value;
        const userName = form.querySelector('#user-name').value || 'Anonyme';

        if (!rating) {
          showNotification('Veuillez sélectionner une note', 'error');
          return;
        }

        addRating(productId, parseInt(rating.value), review, userName);
      });
    }

    return form;
  };

  return {
    init,
    addRating,
    getProductRatings,
    getAverageRating,
    getRatingCount,
    getRatingDistribution,
    markAsHelpful,
    renderStars,
    createRatingForm
  };
})();

// Auto-initialiser
document.addEventListener('DOMContentLoaded', () => {
  ratingManager.init();
});
