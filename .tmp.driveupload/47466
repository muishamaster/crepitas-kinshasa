# ============================================================
# SCRIPT DEPLOYMENT - Crepitas Kinshasa (PowerShell)
# Version: 2.0.0 | Date: 8 Février 2026
# Plateforme: Windows PowerShell (7+) / PowerShell Core
# ============================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 CREPITAS KINSHASA - Workflow Git & Deployment Render   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ============================================================
# ÉTAPE 1 : Configuration Initiale Git
# ============================================================

Write-Host "[1/5] Vérifier le status Git actuel..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer"

# ============================================================
# ÉTAPE 2 : Ajouter tous les fichiers
# ============================================================

Write-Host ""
Write-Host "[2/5] Ajouter tous les fichiers au staging area..." -ForegroundColor Yellow
git add .

Write-Host "✓ Fichiers ajoutés avec succès" -ForegroundColor Green
Write-Host ""
Write-Host "Fichiers à commiter :" -ForegroundColor Cyan
git diff --cached --name-only
Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer"

# ============================================================
# ÉTAPE 3 : Créer le commit
# ============================================================

Write-Host ""
Write-Host "[3/5] Créer un commit professionnel..." -ForegroundColor Yellow

$commitMessage = @"
feat: rebranding Crepitas Kinshasa et menu 44 articles

- Mise à jour complète branding Crepitas
- Menu exhaustif avec 44 produits (11 par catégorie)
- Images hero avec URLs Unsplash temporaires
- Configuration Render.yaml pour déploiement automatisé
- Fichier robots.txt pour optimisation SEO
- Fichier .gitignore pour sécurité
- Corrections chemins relatifs et casse fichiers
- Optimisation caching et en-têtes sécurité
- Fonction WhatsApp prête domaine public
- Documentation déploiement complète (DEPLOYMENT_RENDER.md)
- Manifest projet (MANIFEST.md)

Repository: Crepitas Kinshasa
Version: 2.0.0
Date: 8 Février 2026
"@

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Commit créé avec succès" -ForegroundColor Green
} else {
    Write-Host "⚠️ Vérifiez si des changements existent" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer"

# ============================================================
# ÉTAPE 4 : Renommer branche (si nécessaire)
# ============================================================

Write-Host ""
Write-Host "[4/5] Vérifier/Renommer branche principale..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branche nommée 'main'" -ForegroundColor Green
Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer"

# ============================================================
# ÉTAPE 5 : Pousser vers GitHub
# ============================================================

Write-Host ""
Write-Host "[5/5] Pousser les modifications vers GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "En attente de connexion GitHub..." -ForegroundColor Cyan

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✅ SUCCÈS ! Modifications poussées vers GitHub             ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Vérifiez votre repository :" -ForegroundColor Cyan
    Write-Host "https://github.com/[YOUR-USERNAME]/crepitas-kinshasa" -ForegroundColor Blue
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║  ⚠️ ERREUR lors du push                                     ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible causes:" -ForegroundColor Yellow
    Write-Host "1. Vérifiez votre connexion Internet" -ForegroundColor Yellow
    Write-Host "2. Assurez-vous que SSH keys / GitHub token est configuré" -ForegroundColor Yellow
    Write-Host "3. Repository existant sur GitHub" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pour créer le repository :" -ForegroundColor Cyan
    Write-Host "https://github.com/new" -ForegroundColor Blue
    Write-Host ""
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  📋 PROCHAINES ÉTAPES                                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Vérifier GitHub" -ForegroundColor Yellow
Write-Host "   https://github.com/[YOUR-USERNAME]" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Créer compte Render" -ForegroundColor Yellow
Write-Host "   https://render.com" -ForegroundColor Blue
Write-Host ""
Write-Host "3. Connecter Render à GitHub" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Créer Static Site" -ForegroundColor Yellow
Write-Host "   Utiliser render.yaml pour configuration automatique" -ForegroundColor Green
Write-Host ""
Write-Host "5. Lire documentation" -ForegroundColor Yellow
Write-Host "   DEPLOYMENT_RENDER.md pour instructions détaillées" -ForegroundColor Green
Write-Host ""
Write-Host "✨ Félicitations ! 🎉" -ForegroundColor Magenta
Write-Host "Crepitas Kinshasa est prêt pour Render !" -ForegroundColor Magenta
Write-Host ""

Read-Host "Appuyez sur Entrée pour terminer"
