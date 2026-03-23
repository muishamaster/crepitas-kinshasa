# 🛠️ DOCUMENTATION TECHNIQUE - BENI BK

## Architecture du Projet

```
BENI BK (Restaurant Premium Congolais)
├── Frontend
│   ├── HTML (7 pages statiques)
│   ├── CSS Pur (1039 lignes, variables CSS)
│   └── JavaScript ES6+ (Modules Pattern)
├── Design
│   ├── Système de couleurs (Gold #d4af37, Dark #0f0f0f)
│   ├── Typographie (Playfair Display, Poppins)
│   └── Responsive (Mobile-first)
└── Data
    └── Produits stockés en CONFIG.PRODUCTS (script.js)
```

---

## 🗂️ Structure des Fichiers

### Pages HTML

#### `index.html` (201 lignes)
- **Hero Section:** Image fond + overlay sombre
- **Navigation:** Logo + Menu + Panier
- **Contenu:** Menu rapide + Paiement sécurisé
- **Scripts:** cartManager.init()

#### `menu.html` (170 lignes)
- **Layout:** Main section + Sidebar panier
- **Système d'onglets:** Catégories dynamiques
- **Produits:** Générés depuis script.js
- **Modal paiement:** M-Pesa, Airtel, Orange, WhatsApp
- **QR Code:** Généré dynamiquement

#### `menu-du-jour.html` (247 lignes) **[NOUVEAU]**
- **Hero personnalisé:** Breadcrumb + Titre
- **Spécialité du Chef:** Image 600x400 + Détails
- **6 Suggestions:** Grille responsive
- **Avantages:** 4 points clés
- **Footer:** Infos restaurant

#### Catégories (`entrees.html`, `plats.html`, `desserts.html`, `boissons.html`)
- Structure identique à menu.html
- Catégorie pré-sélectionnée
- Produits dynamiques

### Fichiers CSS

#### `style.css` (1490 lignes)
```css
/* Structure */
:root { --variables: colors, shadows, transitions }
*    { box-sizing, reset }
body { gradient background, fixed texture }

/* Sections */
.navbar          /* Navigation sticky */
.hero            /* Hero avec image */
.payment-bar     /* Modes de paiement */
.main-container  /* Layout 2 colonnes */
.menu-section    /* Produits */
.cart-sidebar    /* Panier */
.modal           /* Modal paiement */

/* Menu du Jour */
.hero-menu-jour     /* Hero page spéciale */
.chef-specialty     /* Spécialité du chef */
.suggestions-grid   /* 6 suggestions */
.advantages         /* Points clés */
```

**Responsive Breakpoints:**
- `@media (max-width: 1024px)` - Tablette
- `@media (max-width: 768px)` - Mobile
- `@media (max-width: 480px)` - Petit mobile

### Fichiers JavaScript

#### `script.js` (957 lignes)
```javascript
// Configuration
const CONFIG = {
    DELIVERY_FEE: 1000,
    WHATSAPP_NUMBER: '243977970594',
    PAYMENT_PROVIDERS: { mpesa, airtel, orange },
    PRODUCTS: { entrees[], plats[], desserts[], boissons[] }
}

// Modules
const cartManager = (() => {
    // Gestion du panier
    addToCart()
    removeFromCart()
    clearCart()
    updateQuantity()
    
    // Calculs
    calculateSubtotal()
    calculateTotal()
    
    // Paiement
    openPaymentModal()
    closePaymentModal()
    processPayment(provider)
    sendToWhatsApp()
    
    // UI
    updateUI()
    updatePaymentAmount()
    
    return { ... }
})()

const qrCodeManager = (() => {
    // Génération QR Code
    generate()
    toggle()
    return { ... }
})()

// Notifications
showNotification(message, type)

// Initialization
document.addEventListener('DOMContentLoaded', init)
```

---

## 🎨 Système de Design

### Variables CSS

```css
:root {
    /* Couleurs */
    --gold: #d4af37;
    --gold-light: #e8c547;
    --dark-bg: #0f0f0f;
    --dark-secondary: #1a1a1a;
    --text-light: #e8e8e8;
    --text-secondary: #a0a0a0;
    
    /* Effects */
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.6);
    --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.4);
    --shadow-sm: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

### Typographie

```
Titres:   Playfair Display (serif, 700)
  - Hero: clamp(2.5rem, 8vw, 4.5rem)
  - H2:   clamp(1.8rem, 5vw, 2.8rem)
  - H3:   1.2rem
  - H4:   1rem

Corps:    Poppins (sans-serif)
  - Regular: 1rem (line-height: 1.6)
  - Small:   0.9rem
  - Label:   0.85rem
```

### Couleurs

| Usage | Couleur | Code |
|-------|---------|------|
| Accent | Or | #d4af37 |
| Fond | Noir | #0f0f0f |
| Texte | Blanc cassé | #e8e8e8 |
| Secondaire | Gris | #a0a0a0 |
| Bordure | Or transparent | rgba(212,175,55,0.2) |

---

## 📦 Gestion des Produits

### Structure des Produits

```javascript
{
    id: 1,              // Identifiant unique
    name: 'String',     // Nom du produit
    description: 'String',
    price: 25000,       // En FC (Francs Congolais)
    image: 'URL',       // Image Unsplash 300x250
    category: 'entrees' // entrees|plats|desserts|boissons
}
```

### Ajouter un Produit

```javascript
// Dans CONFIG.PRODUCTS.entrees[] (ou autre catégorie)
{
    id: 45,
    name: 'Nouveau Plat',
    description: 'Description délicieuse',
    price: 35000,
    image: 'https://images.unsplash.com/...',
    category: 'entrees'
}
```

### Images Unsplash

Format URL: `https://images.unsplash.com/photo-[ID]?w=300&h=250&fit=crop`

**Exemples utilisés:**
- Poulet grillé: `photo-1598103442097-8b74394b95c6`
- Fruits rouges: `photo-1568050109203-d6b2b1e00c36`
- Café: `photo-1559056199-641a0ac8b3f4`
- Cocktail: `photo-1556766336-f5d94f89f764`

---

## 💳 Système de Paiement

### Deep Links Mobile Money

```javascript
PAYMENT_PROVIDERS = {
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
}
```

### Flux de Paiement

```
Client Panier → "PASSER COMMANDE" → Modal Paiement
                                  ├── M-Pesa  → Deep Link *256#
                                  ├── Airtel  → Deep Link *144#
                                  ├── Orange  → Deep Link *150#
                                  └── WhatsApp → Message structuré
```

### Message WhatsApp

```
🍽️ *Nouvelle Commande BENI BK*

📋 *Détail de la commande:*
━━━━━━━━━━━━━━━━━━━━━
1. Poulet Mayo Classique
   1 × 25 000 FC = 25 000 FC
...
━━━━━━━━━━━━━━━━━━━━━
📦 *Sous-total:* XXX FC
🚚 *Frais livraison:* 1 000 FC
💰 *Total:* XXX FC

✅ Je souhaite passer cette commande...
```

---

## 📱 Panier Persistant

### LocalStorage

```javascript
// Clé de stockage
const storageKey = 'beniCookieCart';

// Au chargement
cart = JSON.parse(localStorage.getItem(storageKey)) || [];

// À la modification
localStorage.setItem(storageKey, JSON.stringify(cart));

// Structure
[
    {
        id: 1,
        name: 'Poulet Mayo',
        price: 25000,
        quantity: 2
    }
]
```

---

## 🎯 Calculs

### Montant Total

```javascript
const calculateSubtotal = () => {
    return cart.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );
};

const calculateTotal = () => {
    return calculateSubtotal() + CONFIG.DELIVERY_FEE;
};
```

---

## 🔐 Sécurité

### Validation
- ✅ Vérification du panier non vide
- ✅ Vérification montant > 0
- ✅ Échappement des montants
- ✅ Validation format URL

### Protection
- ✅ Pas de stockage données sensibles côté client
- ✅ Deep links natifs (pas d'API intermédiaire)
- ✅ Messages WhatsApp end-to-end chiffrés
- ✅ HTTPS recommandé

---

## 🚀 Déploiement

### Environnement Production

1. **Remplacer le numéro WhatsApp:**
   ```javascript
   WHATSAPP_NUMBER: 'VOTRE_NUMERO'
   ```

2. **Activer les deep links:**
   ```javascript
   window.location.href = deepLink; // Ligne 676
   ```

3. **Ajouter domaine personnalisé** pour HTTPS

4. **Configurer analytics:**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/..."></script>
   ```

### Hébergement Recommandé
- Netlify (gratuit, CI/CD)
- Vercel (alternative)
- GitHub Pages (statique)

---

## 🐛 Debugging

### Console Browser
```javascript
// Vérifier le panier
console.log(cartManager.getCart());

// Vérifier calculs
console.log(cartManager.calculateTotal());

// Vérifier produits
console.log(CONFIG.PRODUCTS);
```

### Network Tab
- Vérifier les images charge
- Vérifier les requêtes API (s'il y en a)

---

## 📈 Optimisations Futures

### Performance
- [ ] Lazy loading images
- [ ] Service Worker (offline mode)
- [ ] Minification CSS/JS
- [ ] Compression gzip

### Features
- [ ] Compte client/historique commandes
- [ ] Favoris/Save items
- [ ] Coupons discount
- [ ] Notifications push
- [ ] Intégration paiement en ligne

### Analytics
- [ ] Produits populaires
- [ ] Temps de consultation
- [ ] Conversion rate
- [ ] Heatmaps

---

## 📞 Support Développement

Pour toute question:
- Consulter les commentaires du code
- Vérifier la console browser
- Tester sur différents navigateurs
- Valider HTML/CSS avec W3C

---

**Dernière mise à jour:** 6 Février 2026
**Version:** 2.0 (avec images réelles et paiement complet)
