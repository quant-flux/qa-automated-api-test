const fs = require('fs');
const path = require('path');

/**
 * SCRIPT INTEGRAL DE SINCRONIZACIÓN DE DASHBOARDS
 * Combina todas las funcionalidades de sincronización en uno solo
 */

// Configuración de rutas
const config = {
    // Origen
    srcMain: path.join(__dirname, '../src/main/resources'),
    targetDir: path.join(__dirname, '../target/karate-reports'),
    
    // Destino
    docsDir: path.join(__dirname, '../docs'),
    destFunctionalDir: path.join(__dirname, '../src/main/resources/functional/complete'),
    destPerformanceDir: path.join(__dirname, '../src/main/resources/performance'),
    
    // Archivos de dashboards
    dashboardFiles: ['index.html', 'functional-report.html', 'performance-report.html']
};

/**
 * Copia archivos de un directorio a otro recursivamente
 */
function copyDirectory(source, destination, description = '') {
    if (!fs.existsSync(source)) {
        console.log(`⚠️  Directorio no encontrado: ${source}`);
        return 0;
    }
    
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const files = fs.readdirSync(source);
    let copiedCount = 0;
    
    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            copiedCount += copyDirectory(sourcePath, destPath);
        } else {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ Copiado: ${file}`);
            copiedCount++;
        }
    });
    
    return copiedCount;
}

/**
 * Actualiza las estadísticas en un archivo HTML
 */
function updateStatistics(htmlFile, jsonFile, type) {
    if (!fs.existsSync(htmlFile) || !fs.existsSync(jsonFile)) {
        console.log(`⚠️  Archivo no encontrado: ${htmlFile} o ${jsonFile}`);
        return false;
    }

    try {
        // Leer el JSON de Karate
        const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        
        // Calcular estadísticas
        const totalTests = jsonData.scenariosPassed + jsonData.scenariosfailed;
        const passedTests = jsonData.scenariosPassed;
        const failedTests = jsonData.scenariosfailed;
        const successRate = ((passedTests / totalTests) * 100).toFixed(1);
        
        // Leer el HTML
        let htmlContent = fs.readFileSync(htmlFile, 'utf8');
        
        // Actualizar estadísticas generales (buscando por contexto)
        const rateClass = successRate >= 90 ? 'success' : successRate >= 70 ? 'warning' : 'danger';
        
        // Buscar y reemplazar cada estadística específicamente
        htmlContent = htmlContent.replace(
            /<div class="stat-number[^>]*>\d+<\/div>\s*<div class="stat-label">Total Tests<\/div>/,
            `<div class="stat-number success">${totalTests}</div>\n                <div class="stat-label">Total Tests</div>`
        );
        
        htmlContent = htmlContent.replace(
            /<div class="stat-number[^>]*>\d+<\/div>\s*<div class="stat-label">Tests Exitosos<\/div>/,
            `<div class="stat-number success">${passedTests}</div>\n                <div class="stat-label">Tests Exitosos</div>`
        );
        
        htmlContent = htmlContent.replace(
            /<div class="stat-number[^>]*>\d+<\/div>\s*<div class="stat-label">Tests Fallidos<\/div>/,
            `<div class="stat-number danger">${failedTests}</div>\n                <div class="stat-label">Tests Fallidos</div>`
        );
        
        htmlContent = htmlContent.replace(
            /<div class="stat-number[^>]*>\d+%<\/div>\s*<div class="stat-label">Tasa de Éxito<\/div>/,
            `<div class="stat-number ${rateClass}">${successRate}%</div>\n                <div class="stat-label">Tasa de Éxito</div>`
        );
        
        // Guardar el HTML actualizado
        fs.writeFileSync(htmlFile, htmlContent);
        
        console.log(`✅ Estadísticas actualizadas en ${type}:`);
        console.log(`   Total: ${totalTests}, Exitosos: ${passedTests}, Fallidos: ${failedTests}, Tasa: ${successRate}%`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error actualizando ${type}:`, error.message);
        return false;
    }
}

/**
 * Copia archivos JSON específicos para datos del dashboard
 */
function copyDashboardData() {
    console.log('\n📊 Copiando datos específicos del dashboard...');
    
    // Archivos funcionales
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
    
    // Archivos de performance
    const performanceFiles = [
        'karate-summary-json.txt',
        'features.performance.TokenDataPerformance.json',
        'features.performance.TokenDataPerformanceAdvanced.json',
        'features.performance.TokenListPerformance.json',
        'features.performance.TokenPricePerformance.json',
        'features.performance.TradeListPerformance.json',
        'features.performance.GlobalLoadTest.json'
    ];
    
    let functionalCopied = 0;
    let performanceCopied = 0;
    
    // Copiar archivos funcionales
    functionalFiles.forEach(file => {
        const sourcePath = path.join(config.targetDir, 'functional/complete', file);
        const destPath = path.join(config.destFunctionalDir, file);
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            functionalCopied++;
        }
    });
    
    // Copiar archivos de performance
    performanceFiles.forEach(file => {
        const sourcePath = path.join(config.targetDir, 'performance', file);
        const destPath = path.join(config.destPerformanceDir, file);
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            performanceCopied++;
        }
    });
    
    console.log(`   Funcionales: ${functionalCopied} archivos copiados`);
    console.log(`   Performance: ${performanceCopied} archivos copiados`);
    
    return { functionalCopied, performanceCopied };
}

/**
 * Función principal de sincronización integral
 */
function syncAllDashboards() {
    console.log('🚀 INICIANDO SINCRONIZACIÓN INTEGRAL DE DASHBOARDS');
    console.log('=' .repeat(60));
    
    let totalFilesCopied = 0;
    let statsUpdated = 0;
    
    // 1. Verificar dashboards HTML (NO sobrescribir docs/ con diseño personalizado)
    console.log('\n📋 PASO 1: Verificando dashboards HTML...');
    config.dashboardFiles.forEach(file => {
        const src = path.join(config.srcMain, file);
        const dest = path.join(config.docsDir, file);
        
        if (fs.existsSync(dest)) {
            console.log(`✅ Dashboard encontrado en docs/: ${file}`);
        } else if (fs.existsSync(src)) {
            // Solo copiar a docs/ si no existe (primera vez)
            fs.copyFileSync(src, dest);
            console.log(`✅ Dashboard copiado a docs/ (primera vez): ${file}`);
            totalFilesCopied++;
        } else {
            console.log(`⚠️  Dashboard no encontrado: ${file}`);
        }
    });
    
    // 2. Copiar reportes Karate de target/ a docs/
    console.log('\n📊 PASO 2: Copiando reportes Karate...');
    if (fs.existsSync(config.targetDir)) {
        const karateReportsDest = path.join(config.docsDir, 'karate-reports');
        const copied = copyDirectory(config.targetDir, karateReportsDest, 'reportes Karate');
        totalFilesCopied += copied;
        console.log(`   Total reportes copiados: ${copied}`);
    } else {
        console.log('⚠️  No se encontraron reportes Karate en target/');
    }
    
    // 3. Copiar datos específicos para dashboards
    const dataResults = copyDashboardData();
    
    // 4. Actualizar estadísticas en dashboards HTML
    console.log('\n📈 PASO 3: Actualizando estadísticas...');
    
    // Actualizar estadísticas funcionales
    const functionalStatsFile = path.join(config.docsDir, 'functional-report.html');
    const functionalJsonFile = path.join(config.docsDir, 'karate-reports/functional/complete/karate-summary-json.txt');
    if (updateStatistics(functionalStatsFile, functionalJsonFile, 'Functional Report')) {
        statsUpdated++;
    }
    
    // Actualizar estadísticas de performance
    const performanceStatsFile = path.join(config.docsDir, 'performance-report.html');
    const performanceJsonFile = path.join(config.docsDir, 'karate-reports/performance/karate-summary-json.txt');
    if (updateStatistics(performanceStatsFile, performanceJsonFile, 'Performance Report')) {
        statsUpdated++;
    }
    
    // 5. Generar categorías de tests
    console.log('\n🎨 PASO 4: Generando categorías de tests...');
    
    try {
        // Generar categorías funcionales
        const { updateFunctionalReport } = require('./generate-functional-categories');
        updateFunctionalReport();
        console.log('✅ Categorías funcionales generadas');
        
        // Generar categorías de performance
        const { updatePerformanceReport } = require('./generate-performance-categories');
        updatePerformanceReport();
        console.log('✅ Categorías de performance generadas');
        
    } catch (error) {
        console.log('⚠️  Error generando categorías:', error.message);
    }
    
    // Resumen final
    console.log('\n' + '=' .repeat(60));
    console.log('✅ SINCRONIZACIÓN INTEGRAL COMPLETADA');
    console.log('=' .repeat(60));
    console.log(`📁 Archivos copiados: ${totalFilesCopied}`);
    console.log(`📊 Dashboards actualizados: ${statsUpdated}`);
    console.log(`📋 Datos funcionales: ${dataResults.functionalCopied} archivos`);
    console.log(`⚡ Datos performance: ${dataResults.performanceCopied} archivos`);
    console.log('\n🌐 Los dashboards están listos en docs/');
    console.log('📈 Las estadísticas reflejan los resultados reales de las pruebas');
    console.log('🎨 Las categorías están organizadas por tipo de test');
}

// Ejecutar si se llama directamente
if (require.main === module) {
    syncAllDashboards();
}

module.exports = { syncAllDashboards }; 