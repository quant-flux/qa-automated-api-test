const fs = require('fs');
const path = require('path');

console.log('🔄 Actualizando datos del dashboard...');

// Rutas de origen y destino
const sourceFunctionalDir = path.join(__dirname, '../target/karate-reports/functional/complete');
const sourcePerformanceDir = path.join(__dirname, '../target/karate-reports/performance');
const destFunctionalDir = path.join(__dirname, '../src/main/resources/functional/complete');
const destPerformanceDir = path.join(__dirname, '../src/main/resources/performance');

// Función para copiar archivo
function copyFile(sourcePath, destPath) {
    try {
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ Copiado: ${path.basename(sourcePath)}`);
            return true;
        } else {
            console.log(`❌ No encontrado: ${sourcePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error copiando ${sourcePath}:`, error.message);
        return false;
    }
}

// Función para crear directorio si no existe
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 Creado directorio: ${dirPath}`);
    }
}

// Asegurar que los directorios de destino existan
ensureDir(destFunctionalDir);
ensureDir(destPerformanceDir);

// Copiar archivos funcionales
console.log('\n📊 Copiando archivos funcionales...');
const functionalFiles = [
    'karate-summary-json.txt',
    'features.app.HealthCheck.json',
    'features.tokens.TokenData.json',
    'features.tokens.TokenDataValidation.json',
    'features.tokens.TokenList.json',
    'features.tokens.TokenPrice.json',
    'features.tokens.TokenPrices.json',
    'features.tokens.TokenPricesMulti.json',
    'features.tokens.TokenMeta.json',
    'features.tokens.TokenHolders.json',
    'features.tokens.TokenNewListing.json',
    'features.tokens.TokenTrending.json',
    'features.trade.TradeList.json',
    'features.trade.TradeOHLCV.json'
];

let functionalCopied = 0;
functionalFiles.forEach(file => {
    const sourcePath = path.join(sourceFunctionalDir, file);
    const destPath = path.join(destFunctionalDir, file);
    if (copyFile(sourcePath, destPath)) {
        functionalCopied++;
    }
});

// Copiar archivos de performance
console.log('\n⚡ Copiando archivos de performance...');
const performanceFiles = [
    'karate-summary-json.txt',
    'features.performance.TokenDataPerformance.json',
    'features.performance.TokenDataPerformanceAdvanced.json',
    'features.performance.TokenListPerformance.json',
    'features.performance.TokenPricePerformance.json',
    'features.performance.TradeListPerformance.json',
    'features.performance.GlobalLoadTest.json'
];

let performanceCopied = 0;
performanceFiles.forEach(file => {
    const sourcePath = path.join(sourcePerformanceDir, file);
    const destPath = path.join(destPerformanceDir, file);
    if (copyFile(sourcePath, destPath)) {
        performanceCopied++;
    }
});

// Resumen
console.log('\n📈 Resumen de actualización:');
console.log(`   Funcionales: ${functionalCopied}/${functionalFiles.length} archivos copiados`);
console.log(`   Performance: ${performanceCopied}/${performanceFiles.length} archivos copiados`);

if (functionalCopied > 0 || performanceCopied > 0) {
    console.log('\n✅ Datos del dashboard actualizados correctamente');
    console.log('🌐 El dashboard ahora debería mostrar estadísticas reales');
} else {
    console.log('\n❌ No se pudieron copiar archivos. Verifica que los tests se hayan ejecutado.');
} 