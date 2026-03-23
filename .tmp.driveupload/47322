# 📟 COMMANDES COMPLÈTES - Déploiement Crepitas Kinshasa
## Version: 2.0.0 | Date: 8 Février 2026

---

## 🚀 OPTION 1 : Script Automatisé (RECOMMANDÉ)

### Windows PowerShell (Recommandé)
```powershell
# Ouvrir PowerShell en mode administrateur, puis :
cd C:\restau
.\DEPLOY_GIT.ps1
```

### Windows CMD
```cmd
# Ouvrir CMD en mode administrateur, puis :
cd C:\restau
DEPLOY_GIT.bat
```

---

## 📋 OPTION 2 : Commandes Manuelles (Étape par étape)

### Étape 1 : Vérifier Status Git
```powershell
cd C:\restau
git status
```

**Résultat attendu:**
```
On branch main
Untracked files:
  render.yaml
  robots.txt
  .gitignore
  DEPLOYMENT_RENDER.md
  MANIFEST.md
  ...
```

---

### Étape 2 : Ajouter Tous les Fichiers
```powershell
git add .
```

**Vérifier fichiers stagés:**
```powershell
git diff --cached --name-only
```

---

### Étape 3 : Créer le Commit
```powershell
git commit -m "feat: rebranding Crepitas Kinshasa et menu 44 articles

- Mise à jour complète branding Crepitas
- Menu exhaustif avec 44 produits (11 par catégorie)
- Images hero avec URLs Unsplash temporaires
- Configuration Render.yaml pour déploiement automatisé
- Fichier robots.txt pour optimisation SEO
- Fichier .gitignore pour sécurité
- Corrections chemins relatifs et casse fichiers
- Optimisation caching et en-têtes sécurité
- Fonction WhatsApp prête domaine public
- Documentation déploiement complète
- Manifest projet
- Checklist pré-déploiement

Repository: Crepitas Kinshasa
Version: 2.0.0
Date: 8 Février 2026
"
```

---

### Étape 4 : Renommer Branche (si nécessaire)
```powershell
git branch -M main
```

**Vérifier branche active:**
```powershell
git branch -v
```

---

### Étape 5 : Configurer Remote (si nouveau repository)
```powershell
# Si repository GitHub déjà existant :
git remote -v

# Si pas de remote, ajouter :
git remote add origin https://github.com/YOUR-USERNAME/crepitas-kinshasa.git

# Vérifier :
git remote -v
```

---

### Étape 6 : Pousser vers GitHub
```powershell
git push -u origin main
```

**Résultat attendu:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to 12 threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), XX bytes
remote: Resolving deltas: 100% (XX/XX)
To https://github.com/YOUR-USERNAME/crepitas-kinshasa.git
 * [new branch]      main -> main
branch 'main' set to track 'origin/main'.
```

✅ **Push réussi !**

---

## 🔐 Authentification GitHub (Si problème de credentials)

### Option A : GitHub CLI (Recommandé)
```powershell
# Installer GitHub CLI (si pas encore installé)
winget install gh

# Authentifier
gh auth login
# Sélectionner : GitHub.com → HTTPS → Y → Y

# Vérifier authentification
gh auth status
```

### Option B : Git Credentials Manager
```powershell
# Vérifier si GCM installé
git config --show-origin credential.helper

# Si besoin, réinstaller
winget install GCM
```

### Option C : SSH Keys
```powershell
# Vérifier clé SSH existante
Test-Path ~/.ssh/id_rsa

# Si absente, créer
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copier clé publique
Get-Content ~/.ssh/id_rsa.pub | Set-Clipboard

# Ajouter sur GitHub : https://github.com/settings/keys
```

---

## 📊 Vérifications Post-Push

### 1. Vérifier sur GitHub
```powershell
# Afficher commit log
git log --oneline -5

# Vérifier GitHub directement
# https://github.com/YOUR-USERNAME/crepitas-kinshasa/commits/main
```

### 2. Vérifier Fichiers
```powershell
# Lister fichiers trackés
git ls-tree -r HEAD --name-only

# Compter fichiers
(git ls-tree -r HEAD --name-only | Measure-Object -Line).Lines
```

### 3. Vérifier Taille Repository
```powershell
git count-objects -v
```

---

## 🎯 DÉPLOIEMENT RENDER

### Setup Render (Web Interface)

1. **Créer compte Render**
   ```
   https://render.com
   → Sign up with GitHub
   → Autoriser accès
   ```

2. **Créer Static Site**
   ```
   Dashboard → New + → Static Site
   
   ou
   
   Blueprints → New Blueprint Instance
   (auto-detect render.yaml)
   ```

3. **Configuration (si non-auto)**
   ```
   Name: crepitas-kinshasa
   Repository: crepitas-kinshasa
   Branch: main
   Publish Directory: .
   Build Command: (laisser vide)
   ```

4. **Déployer**
   ```
   Cliquer "Create Static Site"
   Attendre status = "Live"
   ```

### URLs Render
```
Production: https://crepitas-kinshasa.onrender.com
Logs: https://dashboard.render.com → Select Site
```

---

## 🧪 Tests Post-Déploiement

### 1. Site Accessible
```powershell
# Vérifier accessible
curl -I https://crepitas-kinshasa.onrender.com

# Résultat attendu : HTTP 200
```

### 2. Images Chargent
```powershell
# Tester image URL
curl -I "https://images.unsplash.com/photo-1568050109203-d6b2b1e00c36?w=1200"

# Résultat attendu : HTTP 200
```

### 3. robots.txt Accessible
```
https://crepitas-kinshasa.onrender.com/robots.txt
```

### 4. render.yaml Validé
```
https://crepitas-kinshasa.onrender.com/render.yaml
(doit retourner 404 - fichier config, pas public)
```

---

## 📱 Tests Fonctionnels

### Test 1 : Navigation
```
1. Ouvrir https://crepitas-kinshasa.onrender.com
2. Cliquer chaque menu
3. Vérifier pages chargent
```

### Test 2 : Panier
```
1. Cliquer "Ajouter" sur produit
2. Vérifier compteur panier +1
3. Cliquer "Retirer"
4. Vérifier panier vide
```

### Test 3 : WhatsApp
```
1. Ajouter produit
2. Cliquer "Via WhatsApp"
3. Doit ouvrir WhatsApp avec message
4. Vérifier numéro correct : +243 977 970 594
```

### Test 4 : Mobile
```
1. Accéder depuis téléphone
2. Vérifier responsive
3. Tester panier
4. Tester WhatsApp
```

---

## 🔍 Debugging Commandes

### Vérifier Fichiers Git
```powershell
# Fichiers modifiés
git status

# Historique commits
git log --oneline

# Différences depuis dernier commit
git diff HEAD

# Différences dans staging area
git diff --cached
```

### Nettoyer Repository
```powershell
# Supprimer untracked files (ATTENTION)
git clean -fd

# Annuler derniers changements
git reset --hard HEAD

# Annuler dernier commit (avant push)
git reset --soft HEAD~1
```

### Revert Commit (Si problème)
```powershell
# Voir commits
git log --oneline

# Revert dernier commit
git revert HEAD

# Puis push
git push origin main
```

---

## 📞 Support & Ressources

### Documentation
- Render Docs: https://render.com/docs
- Git Docs: https://git-scm.com/doc
- GitHub: https://docs.github.com

### Contact Support
- Render: support@render.com
- GitHub: github.com/support
- WhatsApp: +243 977 970 594

### Monitoring
- Render Status: https://status.render.com
- GitHub Status: https://www.githubstatus.com

---

## 📝 Cheat Sheet (Commandes Rapides)

```powershell
# Status complet
git status -sb

# Commit tout
git add . && git commit -m "feat: update"

# Push
git push origin main

# Pull (si travail en équipe)
git pull origin main

# Voir remote
git remote -v

# Changer remote URL
git remote set-url origin https://github.com/NEW-URL.git

# Clone repository
git clone https://github.com/YOUR-USERNAME/crepitas-kinshasa.git

# Sync fork
git fetch upstream && git merge upstream/main

# Tag version
git tag -a v2.0.0 -m "Version 2.0.0"
git push origin v2.0.0
```

---

## ✅ CHECKLIST FINALE

- [ ] Git repository initialisé
- [ ] Tous fichiers ajoutés (git add .)
- [ ] Commit créé avec message descriptif
- [ ] Branche nommée 'main'
- [ ] Remote origin configuré
- [ ] Push GitHub réussi ✅
- [ ] GitHub repository visible publiquement
- [ ] Compte Render créé
- [ ] Static Site Render créé
- [ ] Deploy status = "Live"
- [ ] Site accessible en HTTPS
- [ ] Images se chargent
- [ ] Panier fonctionne
- [ ] WhatsApp intégré
- [ ] robots.txt accessible
- [ ] Pas d'erreurs console
- [ ] Responsive sur mobile

---

**🎉 CREPITAS KINSHASA - PRÊT POUR PRODUCTION !**

**Version: 2.0.0 | Date: 8 Février 2026 | Status: ✅ GO LIVE**
