/**
 * contact.js - Gestion de la page contact
 * Formulaire de contact, envoi messages
 */

const ContactPageManager = (() => {
    function init() {
        setupEventListeners();
        
        if (window.ThemeManager) {
            ThemeManager.applyThemeVariables();
        }
        if (window.CommonModule && typeof window.CommonModule.updateCartBadge === 'function') {
            window.CommonModule.updateCartBadge();
        }

        // Pré-remplir avec les données utilisateur si connecté
        prefillUserData();
    }

    function setupEventListeners() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Compteur de caractères
        const messageField = document.getElementById('contactMessage');
        if (messageField) {
            messageField.addEventListener('input', updateCharCount);
        }
    }

    // Pré-remplir le formulaire avec les données utilisateur
    function prefillUserData() {
        const user = JSON.parse(localStorage.getItem('crepitas_user') || 'null');
        
        if (user) {
            document.getElementById('contactName').value = user.name || '';
            document.getElementById('contactEmail').value = user.email || '';
            document.getElementById('contactPhone').value = user.phone || '';
        }
    }

    // Mettre à jour le compteur de caractères
    function updateCharCount() {
        const message = document.getElementById('contactMessage');
        const charCount = document.getElementById('charCount');
        const count = message.value.length;
        
        charCount.textContent = `${count} / 1000 caractères`;
        
        if (count > 900) {
            charCount.style.color = '#f44336';
        } else if (count > 750) {
            charCount.style.color = '#ff9800';
        } else {
            charCount.style.color = 'var(--text-secondary, #666)';
        }
    }

    // Traiter l'envoi du formulaire
    function handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value.trim();
        const privacy = document.getElementById('contactPrivacy').checked;

        // Validation
        if (!name || !email || !phone || !subject || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        if (!privacy) {
            showNotification('Vous devez accepter de recevoir une réponse', 'error');
            return;
        }

        // Validation email
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer un email valide', 'error');
            return;
        }

        // Créer l'objet message
        const contactMessage = {
            id: `MSG-${Date.now()}`,
            date: new Date().toLocaleString('fr-CD'),
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            status: 'nouveau',
            replied: false
        };

        // Sauvegarder le message
        let messages = JSON.parse(localStorage.getItem('crepitas_messages') || '[]');
        messages.push(contactMessage);
        localStorage.setItem('crepitas_messages', JSON.stringify(messages));

        // Afficher le succès
        showSuccessModal(name, email);

        // Réinitialiser le formulaire
        e.target.reset();
        document.getElementById('charCount').textContent = '0 / 1000 caractères';

        // Suggestion d'appel WhatsApp
        suggestWhatsApp(phone);
    }

    // Validation email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Afficher modal de succès
    function showSuccessModal(name, email) {
        const modal = document.getElementById('successModal');
        const message = document.getElementById('successMessage');
        
        message.textContent = `Merci ${name}! Nous avons bien reçu votre message et vous répondrons à l'adresse ${email} dans les 24 heures.`;

        modal.classList.remove('hidden');
    }

    // Fermer la modal de succès
    window.closeSuccessModal = function() {
        document.getElementById('successModal').classList.add('hidden');
        // Rediriger vers l'accueil
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 500);
    };

    // Suggestion d'utiliser WhatsApp
    function suggestWhatsApp(phone) {
        // Créer une notification avec lien WhatsApp
        const notif = document.createElement('div');
        notif.className = 'notification notification-info';
        notif.innerHTML = `
            <span>💬 Ou contactez-nous directement sur WhatsApp</span>
            <a href="https://wa.me/243123456789" target="_blank" class="notification-link">Ouvrir WhatsApp</a>
        `;
        notif.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            background: #25D366;
            color: white;
            border-radius: 4px;
            z-index: 999;
            animation: slideInUp 0.3s ease-out;
            display: flex;
            max-width: 300px;
            gap: 10px;
            align-items: center;
        `;
        
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => notif.remove(), 300);
        }, 8000);
    }

    // Notification
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
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', ContactPageManager.init);

// Animations CSS pour le script
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-link {
        color: white;
        text-decoration: underline;
        cursor: pointer;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
