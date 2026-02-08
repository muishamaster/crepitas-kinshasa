# 🚀 CREPITAS KINSHASA - Guide Déploiement Render
## Version: 2.0.0 | Date: 8 Février 2026

---

## 📋 PRÉ-REQUIS

✅ Compte GitHub actif avec le repository initialisé  
✅ Compte Render.com (gratuit)  
✅ Git installé localement  
✅ Terminal/PowerShell prêt

---

## 🔧 ÉTAPE 1 : Configuration Git Local

### 1.1 Vérifier le statut Git
```powershell
git status
```

### 1.2 Ajouter tous les fichiers (incluant les nouveaux)
```powershell
git add .
```

### 1.3 Créer un commit professionnel
```powershell
git commit -m "feat: rebranding Crepitas Kinshasa et menu 44 articles

- Mise à jour des images hero avec URLs Unsplash
- Ajout de 44 produits (11 par catégorie)
- Configuration Render.yaml pour déploiement automatisé
- Ajout robots.txt pour SEO
- Corrections chemins relatifs et casse fichiers
- Optimisation caching et en-têtes sécurité
"
```

### 1.4 Pousser vers GitHub (branche main)
```powershell
git branch -M main
git push -u origin main
```

Vérifier : https://github.com/[votre-username]/crepitas-kinshasa

---

## 🎯 ÉTAPE 2 : Déploiement sur Render

### 2.1 Se connecter à Render.com
1. Aller à : https://render.com
2. Sign up avec GitHub
3. Autoriser Render à accéder vos repositories

### 2.2 Créer Static Site

**Option A : Via Dashboard (Interface Web)**
```
1. Cliquer "New +" → "Static Site"
2. Sélectionner le repository "crepitas-kinshasa"
3. Remplir :
   - Name: crepitas-kinshasa
   - Publish directory: . (point = racine)
   - Build command: (laisser vide)
4. Cliquer "Create Static Site"
```

**Option B : Via Blueprint (render.yaml) - RECOMMANDÉ**
```
1. Aller à : https://render.com/blueprints
2. Cliquer "New Blueprint Instance"
3. Connecter votre GitHub
4. Render détectera render.yaml automatiquement
5. Cliquer "Apply"
```

### 2.3 Vérifier le déploiement
```
Attendre 2-3 minutes...
Status doit passer à "Live" (vert)
URL: https://crepitas-kinshasa.onrender.com
```

---

## ✅ VÉRIFICATIONS POST-DÉPLOIEMENT

### 3.1 Tester le site
```
1. Ouvrir : https://crepitas-kinshasa.onrender.com
2. Vérifier :
   ✓ Images s'affichent (hero, produits)
   ✓ Menu responsive fonctionne
   ✓ Panier ajoute/supprime produits
   ✓ WhatsApp bouton fonctionne
   ✓ Paiement Mobile Money prêt
```

### 3.2 Vérifier SEO
```
1. robots.txt accessible : 
   https://crepitas-kinshasa.onrender.com/robots.txt

2. Vérifier console (F12) :
   ✓ Pas d'erreurs 404
   ✓ Images chargent depuis Unsplash
   ✓ Scripts sans erreurs
```

### 3.3 Tester depuis mobile
```
- Accéder via téléphone
- Tester bouton WhatsApp
- Vérifier responsive design
```

---

## 🔐 Configuration Domaine Personnalisé (Optionnel)

```
1. Render Dashboard → Settings
2. Custom Domain
3. Ajouter : crepitas-kinshasa.cd (si disponible)
4. Mettre à jour DNS chez registrar
```

---

## 📊 Monitoring & Maintenance

### Logs en temps réel
```
Render Dashboard → Logs → Tail logs
```

### Cache & Redeploiement
```
Render Dashboard → Manual Deploy
(Si changements non pris en compte)
```

### Activer auto-deploy
```
Par défaut : activé
Trigger : À chaque push sur main
```

---

## 🚨 Troubleshooting

### Erreur 404 sur pages
→ Vérifier `errorDocument: index.html` dans render.yaml

### Images ne s'affichent pas
→ Vérifier URLs Unsplash encore valides
→ Check console.log() pour erreurs

### WhatsApp ne fonctionne pas
→ Vérifier WHATSAPP_NUMBER dans script.js ligne 13
→ Format: 243977970594 (sans +)

### Site lent
→ Vérifier cache-control headers
→ Optimiser images (déjà en place)

---

## 📱 Spécifications Crepitas Kinshasa

- **Nom**: Crepitas Kinshasa
- **Description**: Crêperie Artisanale Premium - Kinshasa, RDC
- **Produits**: 44 articles (4 catégories)
- **Paiement**: M-Pesa, Airtel Money, Orange Money
- **Contact WhatsApp**: +243 977 970 594
- **Devise**: FC (Francs Congolais)

---

## 📞 Support Render

- Docs: https://render.com/docs
- Status: https://status.render.com
- Help: support@render.com

---

✨ **Félicitations ! Crepitas Kinshasa est en ligne !** 🎉
