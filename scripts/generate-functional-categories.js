const fs = require('fs');
const path = require('path');

/**
 * Script para generar las tarjetas de tests funcionales con el diseño original
 */

// Configuración de categorías funcionales
const categories = {
    'app': {
        title: '🏥 Tests de Aplicación',
        tests: [
            { name: 'HealthCheck', prefix: 'app' }
        ]
    },
    'tokens': {
        title: '🪙 Tests de Tokens',
        tests: [
            { name: 'TokenData', prefix: 'tokens' },
            { name: 'TokenDataValidation', prefix: 'tokens' },
            { name: 'TokenList', prefix: 'tokens' },
            { name: 'TokenPrice', prefix: 'tokens' },
            { name: 'TokenPrices', prefix: 'tokens' },
            { name: 'TokenPriceMulti', prefix: 'tokens' },
            { name: 'TokenPricesMulti', prefix: 'tokens' },
            { name: 'TokenMeta', prefix: 'tokens' },
            { name: 'TokenHolders', prefix: 'tokens' },
            { name: 'TokenNewListing', prefix: 'tokens' },
            { name: 'TokenTrending', prefix: 'tokens' }
        ]
    },
    'trade': {
        title: '📈 Tests de Trading',
        tests: [
            { name: 'TradeList', prefix: 'trade' },
            { name: 'TradeOHLCV', prefix: 'trade' }
        ]
    },
    'common': {
        title: '🔧 Tests Comunes',
        tests: [
            { name: 'DataCleanup', prefix: 'common' },
            { name: 'TestData', prefix: 'common' }
        ]
    }
};

/**
 * Lee los datos de un archivo JSON de Karate
 */
function readKarateData(testName, prefix) {
    const jsonPath = path.join(__dirname, '../docs/karate-reports/functional/complete', `features.${prefix}.${testName}.json`);
    
    if (!fs.existsSync(jsonPath)) {
        console.log(`⚠️  Archivo no encontrado: ${testName}.json`);
        return null;
    }
    
    try {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Los archivos JSON de Karate son arrays con información detallada
        if (Array.isArray(data) && data.length > 0) {
            const feature = data[0];
            let totalScenarios = 0;
            let passedScenarios = 0;
            let failedScenarios = 0;
            
            // Contar escenarios por estado
            if (feature.elements) {
                feature.elements.forEach(element => {
                    if (element.type === 'scenario') {
                        totalScenarios++;
                        const hasFailedStep = element.steps && element.steps.some(step => step.result && step.result.status === 'failed');
                        if (hasFailedStep) {
                            failedScenarios++;
                        } else {
                            passedScenarios++;
                        }
                    }
                });
            }
            
            return {
                scenariosPassed: passedScenarios,
                scenariosfailed: failedScenarios,
                totalScenarios: totalScenarios
            };
        }
        
        return null;
    } catch (error) {
        console.error(`❌ Error leyendo ${testName}.json:`, error.message);
        return null;
    }
}

/**
 * Genera una tarjeta de feature con el diseño original
 */
function generateFeatureCard(testName, data, prefix) {
    if (!data) {
        return `<!-- ${testName} - Datos no disponibles -->`;
    }
    
    const totalTests = data.scenariosPassed + data.scenariosfailed;
    const passedTests = data.scenariosPassed;
    const failedTests = data.scenariosfailed;
    const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(0) : 0;
    
    const rateClass = successRate >= 90 ? 'high' : successRate >= 70 ? 'medium' : 'low';
    const displayName = testName.replace(/([A-Z])/g, ' $1').trim();
    
    // Iconos por categoría
    const icons = {
        'HealthCheck': '🏥',
        'TokenData': '📊',
        'TokenDataValidation': '✅',
        'TokenList': '📋',
        'TokenPrice': '💰',
        'TokenPrices': '💼',
        'TokenPriceMulti': '💼💼',
        'TokenPricesMulti': '💼💼💼',
        'TokenMeta': 'ℹ️',
        'TokenHolders': '👥',
        'TokenNewListing': '🆕',
        'TokenTrending': '📈',
        'TradeList': '📈',
        'TradeOHLCV': '📊',
        'DataCleanup': '🧹',
        'TestData': '🧪'
    };
    
    // Buscar el icono correcto basado en el nombre del test
    let icon = '⚡';
    for (const [key, value] of Object.entries(icons)) {
        if (testName === key) {
            icon = value;
            break;
        }
    }
    
    // Descripciones por test
    const descriptions = {
        'HealthCheck': 'Verificación del estado de salud de la API',
        'TokenData': 'Validación de datos de tokens',
        'TokenDataValidation': 'Validación de integridad de datos de tokens',
        'TokenList': 'Listado y filtrado de tokens',
        'TokenPrice': 'Consultas de precios de tokens',
        'TokenPrices': 'Múltiples consultas de precios',
        'TokenPriceMulti': 'Consultas multi-precio de tokens',
        'TokenPricesMulti': 'Consultas multi-precio de tokens',
        'TokenMeta': 'Metadatos de tokens',
        'TokenHolders': 'Información de holders de tokens',
        'TokenNewListing': 'Nuevos listados de tokens',
        'TokenTrending': 'Tokens en tendencia',
        'TradeList': 'Listado de trades',
        'TradeOHLCV': 'Datos OHLCV de trading',
        'DataCleanup': 'Limpieza y preparación de datos',
        'TestData': 'Configuración de datos de prueba'
    };
    
    // Buscar la descripción correcta basada en el nombre del test
    let description = 'Test funcional';
    for (const [key, value] of Object.entries(descriptions)) {
        if (testName === key) {
            description = value;
            break;
        }
    }
    
    return `
                    <div class="feature-card" onclick="window.open('karate-reports/functional/complete/features.${prefix}.${testName}.html', '_blank')">
                        <div class="feature-header">
                            <div class="feature-icon">${icon}</div>
                            <div class="feature-info">
                                <div class="feature-name">${displayName}</div>
                                <div class="feature-description">${description}</div>
                            </div>
                        </div>
                        <div class="feature-success-rate ${rateClass}">${successRate}% Éxito</div>
                    </div>`;
}

/**
 * Genera el HTML completo con todas las categorías
 */
function generateCategoriesHTML() {
    let html = '';
    
    Object.entries(categories).forEach(([categoryKey, category]) => {
        html += `
            <!-- Categoría: ${category.title} -->
            <div class="category-section">
                <h3 class="category-title">${category.title}</h3>
                <div class="features-grid">`;
        
        category.tests.forEach(test => {
            const data = readKarateData(test.name, test.prefix);
            html += generateFeatureCard(test.name, data, test.prefix);
        });
        
        html += `
                </div>
            </div>`;
    });
    
    return html;
}

/**
 * Actualiza el archivo HTML con las categorías
 */
function updateFunctionalReport() {
    const htmlPath = path.join(__dirname, '../docs/functional-report.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ Archivo functional-report.html no encontrado');
        return;
    }
    
    try {
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Buscar la sección de features y reemplazarla
        const startMarker = '<div class="features-section">';
        const endMarker = '</div>\n        \n        <div class="footer">';
        
        const startIndex = htmlContent.indexOf(startMarker);
        const endIndex = htmlContent.indexOf(endMarker);
        
        if (startIndex === -1 || endIndex === -1) {
            console.error('❌ No se encontraron los marcadores en el HTML');
            return;
        }
        
        const newFeaturesSection = startMarker + `
            <h2 class="section-title">🧪 Tests Funcionales por Categorías</h2>
            ${generateCategoriesHTML()}`;
        
        const newHtmlContent = htmlContent.substring(0, startIndex) + 
                              newFeaturesSection + 
                              htmlContent.substring(endIndex);
        
        fs.writeFileSync(htmlPath, newHtmlContent);
        
        console.log('✅ Archivo functional-report.html actualizado con categorías');
        console.log('📊 Categorías generadas:');
        Object.entries(categories).forEach(([key, category]) => {
            console.log(`   ${category.title}: ${category.tests.length} tests`);
        });
        
    } catch (error) {
        console.error('❌ Error actualizando el archivo:', error.message);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    updateFunctionalReport();
}

module.exports = { updateFunctionalReport, generateCategoriesHTML }; 