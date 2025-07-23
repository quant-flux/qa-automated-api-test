const fs = require('fs');
const path = require('path');

/**
 * Script para generar las tarjetas de tests de performance organizadas por categorías
 */

// Configuración de categorías
const categories = {
    'latencia': {
        title: '⚡ Tests de Latencia',
        tests: [
            'TokenPricePerformance',
            'TokenPriceMultiPerformance',
            'HighLatencyEndpointsPerformance'
        ]
    },
    'carga': {
        title: '📈 Tests de Carga',
        tests: [
            'TokenDataPerformance',
            'TokenDataPerformanceAdvanced',
            'TokenListPerformance',
            'TradeListPerformance',
            'GlobalLoadTest',
            'HeavyLoadEndpointsPerformance'
        ]
    },
    'estres': {
        title: '🔥 Tests de Estrés',
        tests: [
            'AdvancedPerformanceValidation'
        ]
    },
    'analisis': {
        title: '🔍 Tests de Análisis',
        tests: [
            'BottleneckEndpointsPerformance',
            'CriticalEndpointsPerformance',
            'ResourceIntensiveEndpointsPerformance'
        ]
    },
    'concurrencia': {
        title: '🔄 Tests de Concurrencia',
        tests: [
            'TokenMetaPerformance',
            'TokenNewListingPerformance',
            'TokenTrendingPerformance',
            'TradeOHLCVPerformance',
            'HealthCheckPerformance'
        ]
    }
};

/**
 * Lee los datos de un archivo JSON de Karate
 */
function readKarateData(testName) {
    const jsonPath = path.join(__dirname, '../docs/karate-reports/performance', `features.performance.${testName}.json`);
    
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
function generateFeatureCard(testName, data) {
    if (!data) {
        return `<!-- ${testName} - Datos no disponibles -->`;
    }
    
    const totalTests = data.scenariosPassed + data.scenariosfailed;
    const passedTests = data.scenariosPassed;
    const failedTests = data.scenariosfailed;
    const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(0) : 0;
    
    const rateClass = successRate >= 90 ? 'high' : successRate >= 70 ? 'medium' : 'low';
    const displayName = testName.replace('Performance', '').replace(/([A-Z])/g, ' $1').trim();
    
    // Iconos por categoría
    const icons = {
        'TokenPrice': '💰',
        'TokenPriceMulti': '💎',
        'HighLatencyEndpoints': '⏱️',
        'TokenData': '📊',
        'TokenDataAdvanced': '📈',
        'TokenList': '📋',
        'TradeList': '📈',
        'GlobalLoadTest': '🌐',
        'HeavyLoadEndpoints': '🏋️',
        'AdvancedPerformanceValidation': '🔥',
        'BottleneckEndpoints': '🔍',
        'CriticalEndpoints': '⚠️',
        'ResourceIntensiveEndpoints': '💻',
        'TokenMeta': 'ℹ️',
        'TokenNewListing': '🆕',
        'TokenTrending': '📈',
        'TradeOHLCV': '📊',
        'HealthCheck': '🏥'
    };
    
    // Buscar el icono correcto basado en el nombre del test
    let icon = '⚡';
    for (const [key, value] of Object.entries(icons)) {
        if (testName.includes(key)) {
            icon = value;
            break;
        }
    }
    
    // Descripciones por test
    const descriptions = {
        'TokenPrice': 'Validación de latencia en consultas de precios',
        'TokenPriceMulti': 'Pruebas de rendimiento multi-precio',
        'HighLatencyEndpoints': 'Análisis de endpoints con alta latencia',
        'TokenData': 'Tests de carga para datos de tokens',
        'TokenDataAdvanced': 'Validación avanzada de datos de tokens',
        'TokenList': 'Rendimiento en listado de tokens',
        'TradeList': 'Pruebas de carga para listas de trades',
        'GlobalLoadTest': 'Test de carga global del sistema',
        'HeavyLoadEndpoints': 'Endpoints bajo carga pesada',
        'AdvancedPerformanceValidation': 'Validación avanzada de performance',
        'BottleneckEndpoints': 'Identificación de cuellos de botella',
        'CriticalEndpoints': 'Endpoints críticos del sistema',
        'ResourceIntensiveEndpoints': 'Endpoints intensivos en recursos',
        'TokenMeta': 'Metadatos de tokens bajo carga',
        'TokenNewListing': 'Nuevos listados de tokens',
        'TokenTrending': 'Tokens en tendencia',
        'TradeOHLCV': 'Datos OHLCV de trades',
        'HealthCheck': 'Verificación de salud del sistema'
    };
    
    // Buscar la descripción correcta basada en el nombre del test
    let description = 'Test de performance';
    for (const [key, value] of Object.entries(descriptions)) {
        if (testName.includes(key)) {
            description = value;
            break;
        }
    }
    
    return `
                    <div class="feature-card" onclick="window.open('karate-reports/performance/features.performance.${testName}.html', '_blank')">
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
        
        category.tests.forEach(testName => {
            const data = readKarateData(testName);
            html += generateFeatureCard(testName, data);
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
function updatePerformanceReport() {
    const htmlPath = path.join(__dirname, '../docs/performance-report.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ Archivo performance-report.html no encontrado');
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
            <h2 class="section-title">📊 Tests de Performance por Categorías</h2>
            ${generateCategoriesHTML()}`;
        
        const newHtmlContent = htmlContent.substring(0, startIndex) + 
                              newFeaturesSection + 
                              htmlContent.substring(endIndex);
        
        fs.writeFileSync(htmlPath, newHtmlContent);
        
        console.log('✅ Archivo performance-report.html actualizado con categorías');
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
    updatePerformanceReport();
}

module.exports = { updatePerformanceReport, generateCategoriesHTML }; 