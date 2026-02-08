# ⚡ QUICK START - Crepitas Kinshasa Go Live en 30 minutes
## Visual Step-by-Step Guide
**Version: 2.0.0 | Temps estimé: 30 min | Difficulty: ⭐⭐ (Facile)**

---

## 🎯 Objectif
Déployer Crepitas Kinshasa sur Render avec domaine live.

---

## 📋 PRÉ-REQUIS CHECKLIST
```
✓ Terminal/PowerShell ouvert
✓ Compte GitHub actif
✓ Git installé
✓ Repository créé sur GitHub (ou sera créé)
```

---

## 🚀 ÉTAPES (5 MIN CHACUNE)

### ÉTAPE 1️⃣ : PUSH GITHUB (5 MIN)

**Ouvrir PowerShell en C:\restau**
```powershell
cd C:\restau
```

**Exécuter script automatisé**
```powershell
.\DEPLOY_GIT.ps1
```

**Le script fait :**
```
1. git add .              → Ajoute tous fichiers
2. git commit -m "..."   → Crée commit
3. git branch -M main    → Renomme branche
4. git push -u origin    → Pousse vers GitHub
```

**Résultat attendu :**
```
✅ Modifications poussées vers GitHub
📍 https://github.com/[USERNAME]/crepitas-kinshasa
```

💡 **Si erreur Git :** Vérifier SSH keys ou GitHub token

---

### ÉTAPE 2️⃣ : CRÉER COMPTE RENDER (3 MIN)

1. Ouvrir https://render.com
2. Cliquer **"Sign up with GitHub"**
3. Autoriser Render

```
GitHub
├─ crepitas-kinshasa ← Sélectionner ce repo
└─ Autoriser accès
```

---

### ÉTAPE 3️⃣ : DÉPLOYER SUR RENDER (5 MIN)

**Option A : Via Blueprint (RECOMMANDÉ) ⭐**
```
1. Render Dashboard → Blueprints
2. "New Blueprint Instance"
3. Sélectionner repository "crepitas-kinshasa"
4. Cliquer "Apply"
✅ Render détecte render.yaml automatiquement
```

**Option B : Via Dashboard Classique**
```
1. Render Dashboard → "New +"
2. Sélectionner "Static Site"
3. Choisir repository
4. Config :
   Name: crepitas-kinshasa
   Publish: . (point = racine)
   Build: (laisser vide)
5. Cliquer "Create"
```

**Attendre :** ~2-3 minutes (status: "Live" en vert)

```
┌─────────────────────┐
│  Status: LIVE ✅    │
│  URL: crepitas...   │
└─────────────────────┘
```

---

### ÉTAPE 4️⃣ : TESTER LE SITE (5 MIN)

**Ouvrir URL Render**
```
https://crepitas-kinshasa.onrender.com
```

**Checklist de test :**
```
☑ Page charge correctement
☑ Images s'affichent
☑ Menu responsive (mobile & desktop)
☑ Ajouter produit au panier
☑ Bouton WhatsApp fonctionne
☑ Pas d'erreurs console (F12)
```

**Test WhatsApp :**
```
1. Cliquer "Ajouter" produit
2. Cliquer "Via WhatsApp"
3. Doit ouvrir WhatsApp avec message
✅ Si oui → Succès !
```

---

### ÉTAPE 5️⃣ : VALIDER SEO (2 MIN)

**Vérifier robots.txt**
```
https://crepitas-kinshasa.onrender.com/robots.txt
```

**Doit afficher :**
```
User-agent: *
Allow: /
Disallow: *.md
...
```

---

## ✅ SUCCÈS !

```
┌─────────────────────────────────────────┐
│  🎉 CREPITAS KINSHASA EST EN LIGNE ! 🎉│
│                                         │
│  URL: https://crepitas-kinshasa...     │
│  Status: ✅ LIVE                       │
│  Products: 44 ✓                        │
│  WhatsApp: Integrated ✓                │
│  SEO: Configured ✓                     │
└─────────────────────────────────────────┘
```

---

## 📊 DASHBOARD RENDER

**Bookmarker cette URL :**
```
https://dashboard.render.com
```

**Accès rapide :**
```
Dashboard
├─ Sites → crepitas-kinshasa
├─ Logs (voir erreurs en temps réel)
├─ Settings (domaine personnalisé, etc.)
└─ Deployments (historique)
```

---

## 🔧 REDÉPLOIEMENT (Si changements)

**Simple :** Juste faire un push GitHub

```powershell
# Faire changements localement
# Puis :
git add .
git commit -m "fix: description"
git push origin main

# ✅ Render redetected automatiquement
# Redeploie en 2-3 minutes
```

**Manuel :** Si urgent

```
Dashboard → Sites → crepitas-kinshasa
Bouton "Manual Deploy" → Trigger Deploy
```

---

## 🆘 TROUBLESHOOTING RAPIDE

| Problème | Solution |
|----------|----------|
| Site 404 | Vérifier render.yaml + git push |
| Images vides | Vérifier URLs Unsplash |
| WhatsApp non-functional | Checker F12 console |
| Lent | Attendre cache (5 min) |
| Deploy échoue | Vérifier render.yaml syntax |

---

## 📱 TEST MOBILE

**Important :** Tester sur téléphone réel

```
1. Ouvrir lien sur téléphone
2. Vérifier responsive
3. Test panier (ajouter/retirer)
4. Test WhatsApp
5. Test paiement (lien vers Mobile Money)
```

---

## 🎯 PROCHAINES ÉTAPES (OPTIONNEL)

### Domaine Personnalisé (.cd)
```
Render Dashboard → Settings
Custom Domain → Ajouter nom
Mettre à jour DNS chez registrar
(Coût : ~$10/an)
```

### Analytics
```
Ajouter Google Analytics (optionnel)
- Code tracking dans <head>
- Dashboard: analytics.google.com
```

### Upgrade Plan (Si besoin)
```
Render → Free Plan → Upgrade
Options: Pro ($7/mo), Plus ($30/mo)
```

---

## 📞 BESOIN D'AIDE ?

| Ressource | Lien |
|-----------|------|
| Render Docs | https://render.com/docs |
| Git Help | git help [command] |
| GitHub Support | github.com/support |
| WhatsApp Support | +243 977 970 594 |

---

## 🎊 CÉLÉBREZ !

```
🍽️  Crepitas Kinshasa
    EN LIGNE ET PRÊT !

    ✨ 44 Produits ✨
    💳 Paiements Mobiles ✨
    📱 WhatsApp Intégré ✨
    🌐 Domaine Gratuit ✨
    🚀 Déploiement Automatique ✨

    Bienvenue à Kinshasa !
```

---

**Temps écoulé: ~30 minutes**  
**Status: ✅ PRODUCTION LIVE**  
**Prochaine action: Partager le lien !**

---

## 📋 CHECKLIST FINALE (À Cocher)

- [ ] Script DEPLOY_GIT.ps1 exécuté
- [ ] Push GitHub réussi
- [ ] Compte Render créé
- [ ] Site Render créé
- [ ] Status = "Live" ✓
- [ ] Site accessible HTTPS
- [ ] Images chargent
- [ ] Panier fonctionne
- [ ] WhatsApp testé
- [ ] robots.txt accessible
- [ ] Pas d'erreurs console
- [ ] Testé sur mobile

**Si tous ✓ → FÉLICITATIONS ! 🎉**

---

*Quick Start v2.0.0 | 8 Février 2026*
