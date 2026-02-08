@echo off
REM ============================================================
REM SCRIPT DEPLOYMENT - Crepitas Kinshasa
REM Version: 2.0.0 | Date: 8 Février 2026
REM Plateforme: Windows PowerShell / CMD
REM ============================================================

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  🚀 CREPITAS KINSHASA - Workflow Git & Deployment Render   ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM ============================================================
REM ÉTAPE 1 : Configuration Initiale Git
REM ============================================================

echo [1/5] Vérifier le status Git actuel...
git status

echo.
echo Appuyez sur une touche pour continuer...
pause

REM ============================================================
REM ÉTAPE 2 : Ajouter tous les fichiers
REM ============================================================

echo.
echo [2/5] Ajouter tous les fichiers au staging area...
git add .

echo ✓ Fichiers ajoutés avec succès
echo.
echo Fichiers à commiter :
git diff --cached --name-only
echo.
pause

REM ============================================================
REM ÉTAPE 3 : Créer le commit
REM ============================================================

echo.
echo [3/5] Créer un commit professionnel...
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
- Documentation déploiement complète (DEPLOYMENT_RENDER.md)
- Manifest projet (MANIFEST.md)

Repository: Crepitas Kinshasa
Version: 2.0.0
Date: 8 Février 2026
"

echo ✓ Commit créé avec succès
echo.
pause

REM ============================================================
REM ÉTAPE 4 : Renommer branche (si nécessaire)
REM ============================================================

echo.
echo [4/5] Vérifier/Renommer branche principale...
git branch -M main
echo ✓ Branche nommée 'main'
echo.
pause

REM ============================================================
REM ÉTAPE 5 : Pousser vers GitHub
REM ============================================================

echo.
echo [5/5] Pousser les modifications vers GitHub...
echo.
echo En attente de connexion GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║  ✅ SUCCÈS ! Modifications poussées vers GitHub             ║
    echo ╚════════════════════════════════════════════════════════════╝
    echo.
    echo 📍 Vérifiez votre repository :
    echo https://github.com/[YOUR-USERNAME]/crepitas-kinshasa
    echo.
) else (
    echo.
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║  ⚠️ ERREUR lors du push                                     ║
    echo ╚════════════════════════════════════════════════════════════╝
    echo.
    echo Possible causes:
    echo 1. Vérifiez votre connexion Internet
    echo 2. Assurez-vous que SSH keys / GitHub token est configuré
    echo 3. Repository existant sur GitHub
    echo.
    echo Pour créer le repository :
    echo https://github.com/new
    echo.
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  📋 PROCHAINES ÉTAPES                                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 1. Vérifier GitHub : https://github.com/[YOUR-USERNAME]
echo 2. Créer compte Render : https://render.com
echo 3. Connecter Render à GitHub
echo 4. Créer Static Site (utiliser render.yaml)
echo 5. Lire DEPLOYMENT_RENDER.md pour instructions détaillées
echo.
echo ✨ Félicitations ! 🎉
echo Crepitas Kinshasa est prêt pour Render !
echo.
pause
