# ✅ CHECKLIST PRÉ-PRODUCTION

## 🚀 Avant de Mettre en Ligne

### Configuration Critique

- [ ] **Numéro WhatsApp**
  - Remplacer `243977970594` par votre numéro
  - Fichier: `script.js` ligne 13
  - Format: Sans le + (ex: 243977970594)

- [ ] **Numéro de Livraison**
  - Fichier: `script.js` ligne 12
  - Clé: `WHATSAPP_NUMBER`

- [ ] **Frais de Livraison**
  - Vérifier le montant: `DELIVERY_FEE: 1000` FC
  - Fichier: `script.js` ligne 12
  - Modifier si besoin

- [ ] **Mode Paiement**
  - Vérifier codes d'accès (*256#, *144#, *150#)
  - Tester les deep links sur Android/iOS

### Pages et Contenu

- [ ] **Vérifier tous les liens** fonctionnent
  - [ ] Accueil → Menu
  - [ ] Accueil → Menu du Jour
  - [ ] Menu → Catégories
  - [ ] Catégories → Menu principal
  - [ ] Footer → Pages

- [ ] **Images** chargent correctement
  - [ ] Produits (44)
  - [ ] Hero page d'accueil
  - [ ] Menu du Jour (7)

- [ ] **Textes corrects**
  - [ ] Noms de plats
  - [ ] Descriptions appétissantes
  - [ ] Prix en FC
  - [ ] Infos restaurant (footer)

### Fonctionnalités

- [ ] **Panier**
  - [ ] Ajouter produits
  - [ ] Augmenter/diminuer quantités
  - [ ] Supprimer items
  - [ ] Vider le panier
  - [ ] Persistent après rechargement

- [ ] **Calculs**
  - [ ] Sous-total correct
  - [ ] Frais livraison ajoutés
  - [ ] Total correct

- [ ] **Modal Paiement**
  - [ ] Montant correct affiché
  - [ ] 3 options Mobile Money visibles
  - [ ] Bouton WhatsApp fonctionnel
  - [ ] Message WhatsApp structuré

- [ ] **QR Code**
  - [ ] S'affiche au clic
  - [ ] Correct et lisible
  - [ ] Se cache au reclic

### Responsive Design

Test sur au moins:
- [ ] **Desktop** (1920x1080, 1366x768)
- [ ] **Tablette** (iPad: 768x1024)
- [ ] **Mobile** (iPhone: 375x667, Android: 360x800)

Vérifier:
- [ ] Images responsive
- [ ] Textes lisibles
- [ ] Navigation facile
- [ ] Boutons cliquables

### Performance

- [ ] Temps de chargement < 3s
- [ ] Images optimisées
- [ ] Pas d'erreurs console
- [ ] Pas de warnings CSS

### Navigateurs

Tester sur:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Sécurité

- [ ] HTTPS activé (important!)
- [ ] Pas de données sensibles en localStorage
- [ ] Validation des montants
- [ ] Échappement des entrées utilisateur

### SEO/Analytics

- [ ] Meta descriptions ajoutées
- [ ] Titles optimisés
- [ ] Open Graph (og:image, og:title, og:description)
- [ ] Google Analytics (optionnel)
- [ ] Favicon présent

### Hébergement

- [ ] Domaine configuré
- [ ] SSL/HTTPS activé
- [ ] Email fonctionnel
- [ ] Backups configurées
- [ ] CDN (optionnel)

---

## 📋 Après Mise en Ligne

### Monitoring

- [ ] Vérifier les erreurs logs
- [ ] Consulter Google Analytics
- [ ] Tester les notifications WhatsApp
- [ ] Vérifier les performances

### Maintenance

- [ ] Backup quotidiens
- [ ] Mise à jour contenu (Menu du Jour)
- [ ] Support client 24/7
- [ ] Feedback clients

### Optimisations Futures

- [ ] Ajouter compte client
- [ ] Historique commandes
- [ ] Favoris/Save items
- [ ] Push notifications
- [ ] Coupons/Promotions

---

## 🔗 Ressources Importantes

### Documentation
- `IMPROVEMENTS_SUMMARY.md` - Résumé complet
- `TECHNICAL_DOCS.md` - Documentation technique
- `PAYMENT_GUIDE.md` - Guide système paiement
- `TEST.html` - Page de test

### Fichiers Critiques
- `script.js` - Configuration + Logique
- `style.css` - Design
- `menu-du-jour.html` - Page nouvelle

### Contact Support
- WhatsApp: Lien dans le site
- Numéro: +243 977 970 594 (à remplacer)
- Horaires: 11h-23h (Lundi-Dimanche)

---

## ✨ Checklist Finale

- [ ] ✅ Tous les fichiers créés/modifiés
- [ ] ✅ Images remplacées (44)
- [ ] ✅ Hero image ajoutée
- [ ] ✅ Menu du Jour créé
- [ ] ✅ Paiement intégré
- [ ] ✅ WhatsApp ajouté
- [ ] ✅ Navigation mise à jour
- [ ] ✅ Documentation complète
- [ ] ✅ Tests effectués
- [ ] ✅ Prêt pour production ✨

---

## 🎯 En Cas de Problème

### Images ne chargent pas
1. Vérifier la connexion Internet
2. Vérifier les URLs Unsplash
3. Vérifier le format: `https://images.unsplash.com/photo-...?w=300&h=250&fit=crop`

### Paiement ne fonctionne pas
1. Vérifier le numéro WhatsApp
2. Tester sur Android/iOS séparément
3. Consulter les logs du navigateur (F12)

### Panier ne sauvegarde pas
1. Vérifier localStorage dans DevTools
2. Vérifier la clé: `beniCookieCart`
3. Vérifier les permissions

### Performance lente
1. Optimiser les images (réduire taille)
2. Minifier CSS/JS
3. Activer le gzip sur le serveur
4. Utiliser un CDN

---

**Date:** 6 Février 2026  
**Status:** Prêt pour Production ✅
