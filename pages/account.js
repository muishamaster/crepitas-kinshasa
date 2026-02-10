/**
 * account.js - Gestion de la page compte utilisateur
 * Authentification, profil, adresses, commandes, paramètres
 */

const AccountPageManager = (() => {
    let currentUser = null;
    let currentTab = 'profile';

    function init() {
        checkAuthentication();
        setupEventListeners();
        
        if (window.ThemeManager) {
            ThemeManager.applyThemeVariables();
        }
        if (window.CommonModule && typeof window.CommonModule.updateCartBadge === 'function') {
            window.CommonModule.updateCartBadge();
        }
    }

    function checkAuthentication() {
        const user = JSON.parse(localStorage.getItem('crepitas_user') || 'null');
        
        if (user) {
            currentUser = user;
            showAuthenticatedView();
            populateProfileData();
            loadUserOrders();
            loadUserAddresses();
        } else {
            showUnauthenticatedView();
        }
    }

    function showAuthenticatedView() {
        document.getElementById('authenticatedView').classList.remove('hidden');
        document.getElementById('unauthenticatedView').classList.add('hidden');
    }

    function showUnauthenticatedView() {
        document.getElementById('unauthenticatedView').classList.remove('hidden');
        document.getElementById('authenticatedView').classList.add('hidden');
    }

    // Remplir les données de profil
    function populateProfileData() {
        if (!currentUser) return;

        document.getElementById('profileAvatar').textContent = currentUser.avatar || '👤';
        document.getElementById('userName').textContent = currentUser.name || 'Utilisateur';
        document.getElementById('userEmail').textContent = currentUser.email || '';
        document.getElementById('userPhone').textContent = currentUser.phone || '';

        document.getElementById('editName').value = currentUser.name || '';
        document.getElementById('editEmail').value = currentUser.email || '';
        document.getElementById('editPhone').value = currentUser.phone || '';
    }

    // Charger les commandes de l'utilisateur
    function loadUserOrders() {
        const allOrders = JSON.parse(localStorage.getItem('crepitas_orders') || '[]');
        const userOrders = allOrders.filter(order => order.user === currentUser.name);

        const ordersList = document.getElementById('ordersList');
        
        if (userOrders.length === 0) {
            ordersList.innerHTML = '<p class="empty-message">Vous n\'avez pas encore de commandes.</p>';
            return;
        }

        ordersList.innerHTML = userOrders.reverse().map((order, idx) => `
            <div class="order-item" id="order-${idx}">
                <div class="order-header">
                    <div class="order-info">
                        <h4>${order.id}</h4>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <span class="order-status status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
                </div>
                
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item-line">
                            <span>${item.product.name} × ${item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toLocaleString('fr-CD')} FC</span>
                        </div>
                    `).join('')}
                </div>

                <div class="order-footer">
                    <div class="order-totals">
                        <span>Sous-total: ${order.subtotal.toLocaleString('fr-CD')} FC</span>
                        <span>Livraison: ${order.deliveryFee.toLocaleString('fr-CD')} FC</span>
                        <strong>Total: ${order.total.toLocaleString('fr-CD')} FC</strong>
                    </div>
                    <div class="order-method">
                        <span class="payment-method-badge">${order.paymentMethod}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Charger les adresses de l'utilisateur
    function loadUserAddresses() {
        const userAddresses = currentUser.addresses || [];
        const addressesList = document.getElementById('addressesList');

        if (userAddresses.length === 0) {
            addressesList.innerHTML = '<p class="empty-message">Vous n\'avez pas encore d\'adresse enregistrée.</p>';
            return;
        }

        addressesList.innerHTML = userAddresses.map((addr, idx) => `
            <div class="address-item">
                <div class="address-header">
                    <h4>${addr.label}</h4>
                    <button class="btn btn-small btn-delete-address" data-index="${idx}">🗑️ Supprimer</button>
                </div>
                <p class="address-text">${addr.street}</p>
                <p class="address-text">${addr.district}</p>
                ${addr.phone ? `<p class="address-phone">☎️ ${addr.phone}</p>` : ''}
                ${addr.notes ? `<p class="address-notes">📝 ${addr.notes}</p>` : ''}
            </div>
        `).join('');

        // Attacher les listeners de suppression
        document.querySelectorAll('.btn-delete-address').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                deleteAddress(index);
            });
        });
    }

    // Configuration des event listeners
    function setupEventListeners() {
        // Onglets profil
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                switchTab(tabName);
            });
        });

        // Onglets authentification
        document.querySelectorAll('.tab-auth-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.target.dataset.tab;
                switchAuthTab(tabName);
            });
        });

        // Déconnexion
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

        // Formulaire profil
        document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
        document.getElementById('passwordForm').addEventListener('submit', handlePasswordChange);

        // Formulaire adresse
        document.getElementById('addAddressForm').addEventListener('submit', handleAddAddress);

        // Formulaire connexion
        document.getElementById('loginForm').addEventListener('submit', handleLogin);

        // Formulaire inscription
        document.getElementById('registerForm').addEventListener('submit', handleRegister);

        // Paramètres thème
        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (window.ThemeManager) {
                    window.ThemeManager.applyTheme(e.target.value);
                }
            });
        });

        // Suppression compte
        document.getElementById('deleteAccount').addEventListener('click', showDeleteConfirmModal);
        document.getElementById('confirmDelete').addEventListener('click', handleDeleteAccount);
        document.getElementById('cancelDelete').addEventListener('click', closeDeleteConfirmModal);
    }

    // Basculer entre les onglets profil
    function switchTab(tabName) {
        // Masquer les autres onglets
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Désactiver tous les boutons d'onglet
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Afficher l'onglet sélectionné
        const tabContent = document.getElementById(`${tabName}-tab`);
        if (tabContent) {
            tabContent.classList.add('active');
        }

        // Activer le bouton
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        currentTab = tabName;
    }

    // Basculer entre les onglets authentification
    function switchAuthTab(tabName) {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-auth-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(`${tabName}Form`).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    // Gestion de la connexion
    function handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        try {
            const result = window.UserManager.login(email, password);
            if (result) {
                showNotification('Connexion réussie!', 'success');
                setTimeout(() => {
                    const redirect = new URLSearchParams(window.location.search).get('redirect');
                    window.location.href = redirect === 'cart' ? '../pages/cart.html' : '../index.html';
                }, 1000);
            } else {
                showNotification('Email ou mot de passe incorrect', 'error');
            }
        } catch (error) {
            showNotification('Erreur de connexion: ' + error.message, 'error');
        }
    }

    // Gestion de l'inscription
    function handleRegister(e) {
        e.preventDefault();

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

        if (!name || !email || !phone || !password) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (password !== passwordConfirm) {
            showNotification('Les mots de passe ne correspondent pas', 'error');
            return;
        }

        if (password.length < 4) {
            showNotification('Le mot de passe doit avoir au moins 4 caractères', 'error');
            return;
        }

        try {
            const result = window.UserManager.register(email, password, name, phone);
            if (result) {
                showNotification('Inscription réussie! Bienvenue ' + name, 'success');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            } else {
                showNotification('Cet email est déjà utilisé', 'error');
            }
        } catch (error) {
            showNotification('Erreur lors de l\'inscription: ' + error.message, 'error');
        }
    }

    // Mettre à jour le profil
    function handleProfileUpdate(e) {
        e.preventDefault();

        const name = document.getElementById('editName').value.trim();
        const phone = document.getElementById('editPhone').value.trim();

        if (!name || !phone) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        try {
            window.UserManager.updateProfile({ name, phone });
            currentUser = JSON.parse(localStorage.getItem('crepitas_user'));
            populateProfileData();
            showNotification('Profil mis à jour avec succès', 'success');
        } catch (error) {
            showNotification('Erreur: ' + error.message, 'error');
        }
    }

    // Changer le mot de passe
    function handlePasswordChange(e) {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            showNotification('Les mots de passe ne correspondent pas', 'error');
            return;
        }

        if (newPassword.length < 4) {
            showNotification('Le mot de passe doit avoir au moins 4 caractères', 'error');
            return;
        }

        // Vérifier le mot de passe actuel
        const allUsers = JSON.parse(localStorage.getItem('crepitas_all_users') || '[]');
        const user = allUsers.find(u => u.id === currentUser.id);
        
        if (!user || btoa(currentPassword) !== user.password) {
            showNotification('Mot de passe actuel incorrect', 'error');
            return;
        }

        // Mettre à jour le mot de passe
        user.password = btoa(newPassword);
        localStorage.setItem('crepitas_all_users', JSON.stringify(allUsers));

        // Mettre à jour la session
        currentUser.password = btoa(newPassword);
        localStorage.setItem('crepitas_user', JSON.stringify(currentUser));

        document.getElementById('passwordForm').reset();
        showNotification('Mot de passe changé avec succès', 'success');
    }

    // Ajouter une adresse
    function handleAddAddress(e) {
        e.preventDefault();

        const label = document.getElementById('addressLabel').value.trim();
        const street = document.getElementById('addressStreet').value.trim();
        const district = document.getElementById('addressDistrict').value.trim();
        const phone = document.getElementById('addressPhone').value.trim();
        const notes = document.getElementById('addressNotes').value.trim();

        if (!label || !street || !district) {
            showNotification('Veuillez remplir les champs obligatoires', 'error');
            return;
        }

        try {
            window.UserManager.addAddress({
                label, street, district, phone, notes
            });

            currentUser = JSON.parse(localStorage.getItem('crepitas_user'));
            loadUserAddresses();
            e.target.reset();
            showNotification('Adresse ajoutée avec succès', 'success');
        } catch (error) {
            showNotification('Erreur: ' + error.message, 'error');
        }
    }

    // Supprimer une adresse
    function deleteAddress(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette adresse?')) {
            const addresses = currentUser.addresses || [];
            addresses.splice(index, 1);
            
            const allUsers = JSON.parse(localStorage.getItem('crepitas_all_users') || '[]');
            const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
            
            if (userIndex !== -1) {
                allUsers[userIndex].addresses = addresses;
                localStorage.setItem('crepitas_all_users', JSON.stringify(allUsers));
                
                currentUser.addresses = addresses;
                localStorage.setItem('crepitas_user', JSON.stringify(currentUser));
                
                loadUserAddresses();
                showNotification('Adresse supprimée', 'success');
            }
        }
    }

    // Déconnexion
    function handleLogout() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
            window.UserManager.logout();
            showNotification('Déconnexion réussie', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        }
    }

    // Afficher modal suppression compte
    function showDeleteConfirmModal() {
        document.getElementById('deleteConfirmModal').classList.remove('hidden');
    }

    function closeDeleteConfirmModal() {
        document.getElementById('deleteConfirmModal').classList.add('hidden');
        document.getElementById('deleteConfirmEmail').value = '';
    }

    // Supprimer le compte
    function handleDeleteAccount() {
        const email = document.getElementById('deleteConfirmEmail').value.trim();

        if (email !== currentUser.email) {
            showNotification('L\'email ne correspond pas', 'error');
            return;
        }

        if (confirm('ATTENTION! Ceci supprimera définitivement votre compte et toutes ses données. Cette action est irréversible!')) {
            // Supprimer de la liste des utilisateurs
            const allUsers = JSON.parse(localStorage.getItem('crepitas_all_users') || '[]');
            const filteredUsers = allUsers.filter(u => u.id !== currentUser.id);
            localStorage.setItem('crepitas_all_users', JSON.stringify(filteredUsers));

            // Supprimer la session
            localStorage.removeItem('crepitas_user');

            showNotification('Compte supprimé définitivement', 'success');
            closeDeleteConfirmModal();
            
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        }
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
            notif.remove();
        }, 3000);
    }

    return {
        init: init,
        checkAuthentication: checkAuthentication
    };
})();

document.addEventListener('DOMContentLoaded', AccountPageManager.init);
