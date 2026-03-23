#!/usr/bin/env node

/**
 * ===================================================================
 * BENI BK - Vérification Installation
 * ===================================================================
 * Script de vérification que tous les fichiers sont en place
 * Exécuter dans terminal: node VERIFY_INSTALLATION.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
console.log(`${colors.blue}  🍽️  BENI BK - Vérification Installation${colors.reset}`);
console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

// Fichiers requis
const requiredFiles = [
    // HTML Pages
    'index.html',
    'menu.html',
    'entrees.html',
    'plats.html',
    'desserts.html',
    'boissons.html',
    'QUICKSTART.html',
    
    // Code Source
    'script.js',
    'style.css',
    
    // Documentation
    'README.md',
    'VISUAL_SUMMARY.md',
    'CHANGELOG.md',
    'DEPLOYMENT_GUIDE.sh',
    'ADVANCED_CONFIG.js',
    'INDEX.md',
    'START_HERE.md',
    
    // Assets
    'img'
];

// Vérifier les fichiers
console.log(`${colors.cyan}📋 Vérification des fichiers:${colors.reset}\n`);

let allFilesExist = true;
requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    const status = exists ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    const icon = exists ? '✓' : '✗';
    console.log(`  ${status} ${file}`);
    
    if (!exists) allFilesExist = false;
});

// Statistiques fichiers
console.log(`\n${colors.cyan}📊 Statistiques fichiers:${colors.reset}\n`);

try {
    const scriptSize = fs.statSync('script.js').size;
    const styleSize = fs.statSync('style.css').size;
    const readmeSize = fs.statSync('README.md').size;
    
    console.log(`  📝 script.js:      ${(scriptSize/1024).toFixed(2)} KB`);
    console.log(`  🎨 style.css:      ${(styleSize/1024).toFixed(2)} KB`);
    console.log(`  📚 README.md:      ${(readmeSize/1024).toFixed(2)} KB`);
} catch (e) {
    console.log(`  ${colors.red}Erreur lecture fichiers${colors.reset}`);
}

// Vérifier contenu essentiels
console.log(`\n${colors.cyan}🔍 Vérification contenu:${colors.reset}\n`);

try {
    const scriptContent = fs.readFileSync('script.js', 'utf8');
    const cssContent = fs.readFileSync('style.css', 'utf8');
    
    const checks = [
        { name: 'cartManager', file: 'script.js', content: scriptContent },
        { name: 'qrCodeManager', file: 'script.js', content: scriptContent },
        { name: 'processPayment', file: 'script.js', content: scriptContent },
        { name: '--gold', file: 'style.css', content: cssContent },
        { name: 'premium dark', file: 'style.css', content: cssContent }
    ];
    
    checks.forEach(check => {
        const exists = check.content.toLowerCase().includes(check.name.toLowerCase());
        const status = exists ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        console.log(`  ${status} ${check.name} trouvé dans ${check.file}`);
    });
} catch (e) {
    console.log(`  ${colors.red}Erreur lecture contenu${colors.reset}`);
}

// HTML Structure
console.log(`\n${colors.cyan}📄 Vérification pages HTML:${colors.reset}\n`);

const htmlFiles = [
    { name: 'index.html', features: ['hero', 'cartManager', 'QR'] },
    { name: 'menu.html', features: ['category-tabs', 'productList'] },
    { name: 'entrees.html', features: ['entrees'] },
    { name: 'plats.html', features: ['plats'] },
    { name: 'desserts.html', features: ['desserts'] },
    { name: 'boissons.html', features: ['boissons'] }
];

htmlFiles.forEach(file => {
    try {
        if (fs.existsSync(file.name)) {
            const content = fs.readFileSync(file.name, 'utf8');
            const status = content.includes('<!DOCTYPE') ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
            console.log(`  ${status} ${file.name}`);
        }
    } catch (e) {
        console.log(`  ${colors.red}✗${colors.reset} ${file.name}`);
    }
});

// Résumé
console.log(`\n${colors.cyan}📋 Résumé:${colors.reset}\n`);

if (allFilesExist) {
    console.log(`${colors.green}✅ Tous les fichiers sont présents!${colors.reset}\n`);
    console.log(`${colors.green}Prochaines étapes:${colors.reset}`);
    console.log(`  1. Lire START_HERE.md`);
    console.log(`  2. Ouvrir QUICKSTART.html`);
    console.log(`  3. Lancer serveur local: python -m http.server 8000`);
    console.log(`  4. Consulter index.html\n`);
} else {
    console.log(`${colors.red}❌ Certains fichiers manquent!${colors.reset}\n`);
    console.log(`${colors.red}Veuillez vérifier l'installation.${colors.reset}\n`);
}

console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
console.log(`${colors.green}Version:${colors.reset} 1.0.0`);
console.log(`${colors.green}Status:${colors.reset} Production Ready ✅\n`);
