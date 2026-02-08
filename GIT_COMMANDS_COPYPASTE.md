# 🚀 COMMANDES GIT EXACTES À COPIER-COLLER
## Déploiement Crepitas Kinshasa → GitHub
**Exécutez MAINTENANT dans PowerShell**

---

## ✅ VERSION RAPIDE (RECOMMANDÉE)

### Copier-Coller UNE SEULE COMMANDE:

```powershell
cd c:\restau ; .\DEPLOY_GIT.ps1
```

**C'est tout !** Le script fait:
- ✅ git add .
- ✅ git commit -m "prod: finalisation..."
- ✅ git branch -M main
- ✅ git push -u origin main
- ✅ Affiche confirmation

---

## ✅ VERSION MANUELLE (4 commandes)

### Copier-Coller ligne par ligne:

```powershell
# Commande 1: Naviguer au projet
cd c:\restau

# Commande 2: Ajouter tous fichiers
git add .

# Commande 3: Créer le commit
git commit -m "prod: finalisation Crepitas Kinshasa pour déploiement Render"

# Commande 4: Pousser vers GitHub
git push -u origin main
```

---

## ✅ VÉRIFICATION (Après le push)

```powershell
# Vérifier que tout est OK:
git status

# Résultat attendu:
# On branch main
# Your branch is up to date with 'origin/main'.
# nothing to commit, working tree clean
```

---

## ❓ ET SI CA NE MARCHE PAS?

### Erreur: "scripts is disabled"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\DEPLOY_GIT.ps1
```

### Erreur: "Could not read from remote repository"
```powershell
git remote add origin https://github.com/YOUR_USERNAME/crepitas-kinshasa.git
git push -u origin main
```

### Erreur: "branch 'main' has no upstream"
```powershell
git push -u origin main
```

---

## 📊 FICHIERS INCLUS

- ✅ Tous HTML (6 fichiers)
- ✅ Tous CSS (1 fichier)
- ✅ Tous JavaScript (1 fichier)
- ✅ Configuration (render.yaml, robots.txt, .gitignore)
- ✅ Documentation (16+ fichiers)
- ✅ Dossier img/
- ✅ 44 Produits (CONFIG dans script.js)

---

## 🎯 RÉSUMÉ

| Étape | Commande | Temps |
|-------|----------|-------|
| 1 | `cd c:\restau` | 1 sec |
| 2 | `.\DEPLOY_GIT.ps1` | 10 sec |
| 3 | Attendre confirmation | 2 sec |
| **TOTAL** | **Copier-coller = Fait** | **~15 sec** |

---

**Résultat**: Tous fichiers sur GitHub ✅

Ensuite:
1. Visit https://render.com
2. Create Static Site
3. Select repo: crepitas-kinshasa
4. Deploy

**Go-live en 30 min total!** 🚀
