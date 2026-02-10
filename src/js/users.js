/**
 * ===================================================================
 * Module Utilisateurs - Gestion des comptes avec localStorage
 * ===================================================================
 */

const userManager = (() => {
  let currentUser = null;

  /**
   * Initialisation
   */
  const init = () => {
    loadCurrentUser();
    updateUI();
  };

  /**
   * Charger l'utilisateur actuel
   */
  const loadCurrentUser = () => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.localStorage.user);
      currentUser = saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Erreur chargement utilisateur:', e);
      currentUser = null;
    }
  };

  /**
   * Sauvegarder l'utilisateur
   */
  const saveCurrentUser = () => {
    try {
      if (currentUser) {
        localStorage.setItem(APP_CONFIG.localStorage.user, JSON.stringify(currentUser));
      }
    } catch (e) {
      console.error('Erreur sauvegarde utilisateur:', e);
    }
  };

  /**
   * Créer un nouveau compte
   */
  const register = (email, password, name, phone = '') => {
    const errors = [];

    // Validation
    if (!email || !email.includes('@')) errors.push('Email invalide');
    if (!password || password.length < 4) errors.push('Mot de passe trop court (min 4 caractères)');
    if (!name || name.length < 2) errors.push('Nom trop court');

    if (errors.length > 0) {
      showNotification(errors.join('\n'), 'error');
      return false;
    }

    // Vérifier si l'utilisateur existe déjà
    const allUsers = getAllUsers();
    if (allUsers.find(u => u.email === email)) {
      showNotification('Cet email est déjà utilisé', 'error');
      return false;
    }

    // Créer le nouvel utilisateur
    currentUser = {
      id: 'user_' + Date.now(),
      email,
      password: hashPassword(password), // Hasher le mot de passe
      name,
      phone,
      avatar: generateAvatar(),
      createdAt: new Date().toISOString(),
      preferences: {
        notifications: true,
        newsletter: false
      },
      addresses: [],
      orderHistory: []
    };

    // Sauvegarder
    const allUsers = getAllUsers();
    allUsers.push(currentUser);
    localStorage.setItem('crepitas_all_users', JSON.stringify(allUsers));
    
    saveCurrentUser();
    showNotification('Compte créé avec succès!', 'success');
    return true;
  };

  /**
   * Connexion
   */
  const login = (email, password) => {
    const allUsers = getAllUsers();
    const user = allUsers.find(u => u.email === email);

    if (!user) {
      showNotification('Email ou mot de passe incorrect', 'error');
      return false;
    }

    if (user.password !== hashPassword(password)) {
      showNotification('Email ou mot de passe incorrect', 'error');
      return false;
    }

    currentUser = user;
    saveCurrentUser();
    showNotification(`Bienvenue ${user.name}!`, 'success');
    return true;
  };

  /**
   * Déconnexion
   */
  const logout = () => {
    currentUser = null;
    localStorage.removeItem(APP_CONFIG.localStorage.user);
    showNotification('Déconnecté', 'info');
    return true;
  };

  /**
   * Obtenir l'utilisateur actuel
   */
  const getCurrentUser = () => currentUser;

  /**
   * Vérifier si connecté
   */
  const isConnected = () => currentUser !== null;

  /**
   * Mettre à jour le profil
   */
  const updateProfile = (updates) => {
    if (!currentUser) return false;

    currentUser = { ...currentUser, ...updates };
    saveCurrentUser();

    // Mettre à jour dans la liste globale
    const allUsers = getAllUsers();
    const idx = allUsers.findIndex(u => u.id === currentUser.id);
    if (idx >= 0) {
      allUsers[idx] = currentUser;
      localStorage.setItem('crepitas_all_users', JSON.stringify(allUsers));
    }

    return true;
  };

  /**
   * Ajouter une adresse
   */
  const addAddress = (address) => {
    if (!currentUser) return false;

    if (!currentUser.addresses) {
      currentUser.addresses = [];
    }

    currentUser.addresses.push({
      id: 'addr_' + Date.now(),
      ...address
    });

    saveCurrentUser();
    return true;
  };

  /**
   * Obtenir toutes les utilisateurs (admin)
   */
  const getAllUsers = () => {
    try {
      const saved = localStorage.getItem('crepitas_all_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  };

  /**
   * Hasher un mot de passe (simple, pour démo seulement)
   */
  const hashPassword = (password) => {
    return btoa(password); // Base64 encoding - À remplacer par bcrypt en production
  };

  /**
   * Générer un avatar
   */
  const generateAvatar = () => {
    const avatars = ['👤', '🧑', '👨', '👩'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  /**
   * Mettre à jour l'interface utilisateur
   */
  const updateUI = () => {
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar && currentUser) {
      userAvatar.textContent = currentUser.avatar;
      userAvatar.title = currentUser.name;
    }
  };

  return {
    init,
    register,
    login,
    logout,
    getCurrentUser,
    isConnected,
    updateProfile,
    addAddress,
    getAllUsers
  };
})();
