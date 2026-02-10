/**
 * faq.js - Gestion de la page FAQ
 * Accordéons, recherche, filtrage par catégorie
 */

const FAQManager = (() => {
    let expandedItems = new Set();

    function init() {
        setupEventListeners();
        
        if (window.ThemeManager) {
            ThemeManager.applyThemeVariables();
        }
        if (window.CommonModule && typeof window.CommonModule.updateCartBadge === 'function') {
            window.CommonModule.updateCartBadge();
        }
    }

    function setupEventListeners() {
        // Clic sur les questions - Accordéon
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                toggleFAQItem(question);
            });
        });

        // Filtrage par catégorie
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterByCategory(e.target.dataset.category);
            });
        });

        // Recherche
        document.getElementById('faqSearch').addEventListener('input', (e) => {
            searchFAQ(e.target.value);
        });
    }

    // Basculer l'affichage d'un élément FAQ
    function toggleFAQItem(question) {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const toggle = question.querySelector('.faq-toggle');

        if (expandedItems.has(item)) {
            // Fermer
            item.classList.remove('expanded');
            answer.style.maxHeight = null;
            toggle.textContent = '+';
            expandedItems.delete(item);
        } else {
            // Ouvrir
            item.classList.add('expanded');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            toggle.textContent = '−';
            expandedItems.add(item);
        }
    }

    // Filtrer par catégorie
    function filterByCategory(category) {
        // Mise à jour du bouton actif
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Filtrage des éléments
        const items = document.querySelectorAll('.faq-item');
        let visibleCount = 0;

        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.3s ease-out';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Réinitialiser la recherche
        document.getElementById('faqSearch').value = '';

        scrollToTop();
    }

    // Rechercher dans la FAQ
    function searchFAQ(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const items = document.querySelectorAll('.faq-item');
        let visibleCount = 0;

        items.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (question.includes(term) || answer.includes(term) || term === '') {
                item.style.display = 'block';
                visibleCount++;

                // Mettre en évidence le terme de recherche dans la question
                if (term) {
                    highlightSearch(item, searchTerm);
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Afficher un message s'il n'y a pas de résultats
        if (visibleCount === 0 && term) {
            showNoResults();
        } else {
            removeNoResults();
        }
    }

    // Mettre en évidence le terme de recherche
    function highlightSearch(item, searchTerm) {
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        // Mettre en évidence dans la question
        if (question.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            question.innerHTML = question.innerHTML.replace(
                regex,
                '<mark class="search-highlight">$1</mark>'
            );
        }
    }

    // Afficher message "Aucun résultat"
    function showNoResults() {
        removeNoResults();
        
        const faqList = document.querySelector('.faq-list');
        const noResults = document.createElement('div');
        noResults.className = 'no-results-message';
        noResults.innerHTML = `
            <p>❌ Aucune FAQ ne correspond à votre recherche.</p>
            <p>Veuillez <a href="../pages/contact.html">contacter-nous</a> si vous avez d'autres questions.</p>
        `;
        
        faqList.appendChild(noResults);
    }

    // Supprimer le message "Aucun résultat"
    function removeNoResults() {
        const msg = document.querySelector('.no-results-message');
        if (msg) msg.remove();
    }

    // Scroller vers le haut
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', FAQManager.init);
