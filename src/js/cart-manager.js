/*
  cart-manager.js
  Centralise le state du panier, le type de commande (Sur Place / À Emporter),
  synchronise le badge et gère le module d'évaluation après commande.
  S'appuie sur le `cartManager` déjà présent dans `script.js`.
*/
(function () {
    const CART_KEY = 'beniCookieCart';
    const ORDER_KEY = 'crepitasOrderData';

    function loadOrder() {
        try {
            const raw = localStorage.getItem(ORDER_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }

    function saveOrder(data) {
        try { localStorage.setItem(ORDER_KEY, JSON.stringify(data || {})); } catch (e) { console.error(e); }
    }

    function readCart() {
        try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) { return []; }
    }

    function updateCartBadge() {
        const cartCount = document.getElementById('cartCount');
        if (!cartCount) return;
        const cart = readCart();
        const total = cart.reduce((s,i) => s + (i.quantity||0), 0);
        cartCount.textContent = total;
        cartCount.style.display = total > 0 ? 'flex' : 'none';
    }

    function injectOrderTypeSelector() {
        const container = document.getElementById('orderTypeContainer') || document.querySelector('.cart-summary');
        if (!container) return;
        if (document.getElementById('orderTypeContainer')) return; // already in panier.html

        const wrapper = document.createElement('div');
        wrapper.id = 'orderTypeContainer';
        wrapper.className = 'order-type-section';
        wrapper.innerHTML = ``;

        // Insert before summary if exists
        const summary = document.getElementById('cartSummary');
        if (summary && summary.parentNode) summary.parentNode.insertBefore(wrapper, summary);
        else container.appendChild(wrapper);

        // Restore selection
        const data = loadOrder();
        const selected = data.type || 'sur_place';
        const input = wrapper.querySelector(`input[value="${selected}"]`);
        if (input) input.checked = true;

        wrapper.querySelectorAll('input[name="orderType"]').forEach(r => {
            r.addEventListener('change', () => {
                const od = loadOrder();
                od.type = r.value;
                saveOrder(od);
            });
        });
    }

    // Wrap some cartManager methods to attach order metadata
    function wrapCartManager() {
        if (!window.cartManager) return;

        // Wrap openPaymentModal to snapshot order data
        const origOpen = cartManager.openPaymentModal.bind(cartManager);
        cartManager.openPaymentModal = function () {
            // save snapshot of cart and type
            try {
                const od = loadOrder();
                od.items = cartManager.getCart();
                od.type = od.type || (document.querySelector('input[name="orderType"]:checked')?.value || 'sur_place');
                od.pendingPayment = true;
                od.createdAt = Date.now();
                saveOrder(od);
            } catch (e) { console.error(e); }
            origOpen();
        };

        // Wrap clearCart to detect successful order completion
        const origClear = cartManager.clearCart.bind(cartManager);
        cartManager.clearCart = function () {
            // call original (which may clear cart)
            origClear();

            // After clearing, if we had a pending payment, show rating
            const od = loadOrder();
            if (od && od.pendingPayment) {
                od.pendingPayment = false;
                od.completedAt = Date.now();
                saveOrder(od);
                // slight delay to let UI update
                setTimeout(() => showRatingModal(), 250);
            }
        };
    }

    function showRatingModal() {
        // Prevent duplicates
        if (document.getElementById('ratingModal')) return;

        const modal = document.createElement('div');
        modal.id = 'ratingModal';
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content rating-modal">
                <button class="modal-close" id="ratingClose">✕</button>
                <h2>Notez votre expérience</h2>
                <div class="stars" id="ratingStars">
                    <button data-value="1">☆</button>
                    <button data-value="2">☆</button>
                    <button data-value="3">☆</button>
                    <button data-value="4">☆</button>
                    <button data-value="5">☆</button>
                </div>
                <textarea id="ratingComment" placeholder="Commentaires (optionnel)"></textarea>
                <div style="display:flex;gap:8px;margin-top:12px;">
                    <button id="submitRating" class="btn-cta btn-cta-primary">Envoyer</button>
                    <button id="skipRating" class="btn-cta btn-cta-secondary">Plus tard</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const stars = modal.querySelectorAll('#ratingStars button');
        let current = 0;
        stars.forEach(btn => {
            btn.addEventListener('mouseenter', () => highlightStars(parseInt(btn.dataset.value)));
            btn.addEventListener('click', () => { current = parseInt(btn.dataset.value); highlightStars(current); });
        });

        modal.querySelector('#ratingClose').addEventListener('click', closeModal);
        modal.querySelector('#skipRating').addEventListener('click', () => { closeModal(); });
        modal.querySelector('#submitRating').addEventListener('click', () => {
            const comment = modal.querySelector('#ratingComment').value.trim();
            const od = loadOrder();
            od.rating = current || 5;
            od.comment = comment || '';
            od.ratedAt = Date.now();
            saveOrder(od);
            closeModal();
            // show thanks
            const t = document.createElement('div');
            t.className = 'notification-toast';
            t.textContent = 'Merci pour votre retour !';
            Object.assign(t.style, {position:'fixed',right:'20px',bottom:'20px',background:'#25d366',color:'#fff',padding:'10px 14px',borderRadius:'8px',zIndex:9999});
            document.body.appendChild(t);
            setTimeout(()=>t.remove(),3000);
        });

        function highlightStars(n) {
            stars.forEach(s => s.textContent = (parseInt(s.dataset.value) <= n ? '★' : '☆'));
        }

        function closeModal() { modal.remove(); }
    }

    // Keep badge in sync across tabs/windows
    window.addEventListener('storage', (e) => {
        if (e.key === CART_KEY || e.key === ORDER_KEY) updateCartBadge();
    });

    // Init on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        updateCartBadge();
        injectOrderTypeSelector();
        wrapCartManager();

        // If we detect a saved order that was just completed but not rated, prompt rating
        const od = loadOrder();
        if (od && od.completedAt && !od.ratedAt) {
            // give a small delay so page loads
            setTimeout(() => showRatingModal(), 400);
        }
    });

})();
