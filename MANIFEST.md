# 📁 MANIFEST - Crepitas Kinshasa
## Structure Complète du Projet
**Date**: 8 Février 2026 | **Version**: 2.0.0

---

## 🎯 Fichiers Racine (Root)

| Fichier | Type | Description |
|---------|------|-------------|
| `index.html` | HTML | Page d'accueil principale |
| `menu.html` | HTML | Page complète du menu |
| `menu-du-jour.html` | HTML | Menu du jour spécial |
| `entrees.html` | HTML | Crêpes sucrées |
| `plats.html` | HTML | Galettes salées |
| `desserts.html` | HTML | Signatures Crepitas |
| `boissons.html` | HTML | Milkshakes & Boissons |
| `style.css` | CSS | Design système (1683 lignes) |
| `script.js` | JavaScript | Logique métier (957 lignes) |
| `ADVANCED_CONFIG.js` | JavaScript | Configuration avancée |
| `render.yaml` | YAML | **Blueprint Render (NOUVEAU)** |
| `robots.txt` | TXT | **Configuration SEO (NOUVEAU)** |
| `.gitignore` | TXT | **Fichiers à ignorer Git (NOUVEAU)** |

---

## 📄 Documentation

| Fichier | Contenu |
|---------|---------|
| `README.md` | Guide principal |
| `START_HERE.md` | Point de départ rapide |
| `DEPLOYMENT_RENDER.md` | **Guide déploiement complet (NOUVEAU)** |
| `TECHNICAL_DOCS.md` | Documentation technique |
| `CHANGELOG.md` | Historique versions |
| `HELP.html` | FAQ interactive |
| `QUICKSTART.html` | Démarrage rapide interactif |

---

## 🎨 Répertoires

### `/img/` (Images - À CRÉER)
*Actuellement: Images via Unsplash URLs*

Structure recommandée si images locales:
```
img/
├── logos/
├── products/
├── backgrounds/
└── icons/
```

---

## 📊 DONNÉES PRODUITS (script.js)

### Structure JSON
```javascript
CONFIG.PRODUCTS = {
  'crepes-sucrees': [ /* 11 articles IDs 1-11 */ ],
  'galettes-salees': [ /* 11 articles IDs 12-22 */ ],
  'signatures': [ /* 11 articles IDs 23-33 */ ],
  'boissons': [ /* 11 articles IDs 34-44 */ ]
}
```

**Total**: 44 articles en FC (Francs Congolais)

### Format Article
```javascript
{
  id: 1,           // Unique (1-44)
  name: "...",     // Nom du produit
  desc: "...",     // Description alléchante
  price: 5000,     // Prix en FC
  category: "...", // Catégorie
  img: "URL"       // URL Unsplash temporaire
}
```

---

## 🔐 Configuration Système

### Constantes (script.js)
```javascript
CONFIG = {
  DELIVERY_FEE: 1000,              // FC
  WHATSAPP_NUMBER: '243977970594', // Format international
  PAYMENT_PROVIDERS: {
    mpesa: { ... },
    airtel: { ... },
    orange: { ... }
  },
  PRODUCTS: { /* Voir ci-dessus */ }
}
```

---

## 🌐 Points d'Entrée

| Page | URL | Contenu |
|------|-----|---------|
| Accueil | `/index.html` | Hero + Menu 44 articles |
| Menu Complet | `/menu.html` | Vue détaillée tous produits |
| Menu du Jour | `/menu-du-jour.html` | Spécial quotidien |
| Catégories | `/entrees.html` | Crêpes sucrées |
| | `/plats.html` | Galettes salées |
| | `/desserts.html` | Signatures |
| | `/boissons.html` | Boissons |

---

## 🚀 DÉPLOIEMENT

### Fichiers Déploiement
- `render.yaml` → Configuration automatique Render
- `robots.txt` → Configuration SEO
- `.gitignore` → Fichiers à exclure Git
- `DEPLOYMENT_RENDER.md` → Instructions détaillées

### CDN Externe
```html
<!-- Polices Google Fonts -->
https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins

<!-- QR Code Library -->
https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js

<!-- Images Produits -->
https://images.unsplash.com/photo-[ID]
```

---

## 📏 Spécifications Techniques

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Design responsive (mobile-first)
- **ES6+ JavaScript** - Module Pattern, async/await

### Performance
- Responsive Design (320px - 1920px)
- Images optimisées (Unsplash + caching)
- Lazy loading (si nécessaire)
- Minification (prête pour production)

### Navigateurs Supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile (iOS Safari, Chrome Mobile)

---

## 🔄 Contrôle Version Git

### Structure Commits
```bash
# Initial
git init
git add .
git commit -m "feat: rebranding Crepitas Kinshasa et menu 44 articles"
git branch -M main
git push -u origin main
```

### Fichiers Trackés
```
✓ *.html (HTML)
✓ *.css (Styles)
✓ *.js (Scripts)
✓ *.md (Documentation)
✓ *.yaml (Config Render)
✓ *.txt (robots.txt, .gitignore)

✗ node_modules/ (si Node)
✗ .env / secrets
✗ .DS_Store / Thumbs.db
```

---

## 📱 Intégrations Mobiles

### WhatsApp
- Numéro: +243 977 970 594
- Format API: `wa.me/243977970594?text=MESSAGE`
- État: ✅ Production-ready

### Mobile Money
1. **M-Pesa** - *256#
2. **Airtel Money** - *144#
3. **Orange Money** - *150#

---

## 📊 Statistiques Projet

| Métrique | Valeur |
|----------|--------|
| Fichiers HTML | 8 |
| Fichiers CSS | 1 (1683 lignes) |
| Fichiers JS | 2 (957+lignes) |
| Produits | 44 |
| Catégories | 4 |
| Documentations | 7 |
| Configurations | 3 (render.yaml, robots.txt, .gitignore) |

---

## ✨ Statut Prêt Production

- ✅ Code audité (chemins relatifs valides)
- ✅ Images configurées (Unsplash URLs)
- ✅ SEO optimisé (robots.txt)
- ✅ Déploiement automatisé (render.yaml)
- ✅ WhatsApp API prêt
- ✅ Mobile Money intégré
- ✅ Responsive design validé
- ✅ Sécurité en-têtes ajoutée
- ✅ Cache stratégies définies
- ✅ Git ready pour push

---

**🎉 Projet Crepitas Kinshasa prêt pour déploiement RENDER !**
