const fs = require('fs');
const path = require('path');

console.log('🔄 Generando HTML con datos embebidos...');

// Función para leer y procesar archivo JSON
function readJsonFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.warn(`Error leyendo ${filePath}:`, error.message);
    }
    return null;
}

// Función para calcular estadísticas de un archivo JSON
function calculateStatsFromJson(data) {
    if (!data || !Array.isArray(data)) return { total: 0, passed: 0, failed: 0 };
    
    let total = 0;
    let passed = 0;
    let failed = 0;
    
    data.forEach(feature => {
        if (feature.elements) {
            feature.elements.forEach(element => {
                if (element.type === 'scenario') {
                    total++;
                    let scenarioPassed = true;
                    
                    if (element.steps) {
                        element.steps.forEach(step => {
                            if (step.result && step.result.status === 'failed') {
                                scenarioPassed = false;
                            }
                        });
                    }
                    
                    if (scenarioPassed) {
                        passed++;
                    } else {
                        failed++;
                    }
                }
            });
        }
    });
    
    return { total, passed, failed };
}

// Función para generar cards HTML
function generateFeatureCards() {
    const functionalDir = path.join(__dirname, '../src/main/resources/functional/complete');
    const performanceDir = path.join(__dirname, '../src/main/resources/performance');
    
    let functionalStats = { total: 0, passed: 0, failed: 0 };
    let performanceStats = { total: 0, passed: 0, failed: 0 };
    let functionalCards = [];
    let performanceCards = [];
    
    // Procesar archivos funcionales
    const functionalFiles = [
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
    
    functionalFiles.forEach(fileName => {
        const filePath = path.join(functionalDir, fileName);
        const data = readJsonFile(filePath);
        if (data) {
            const stats = calculateStatsFromJson(data);
            functionalStats.total += stats.total;
            functionalStats.passed += stats.passed;
            functionalStats.failed += stats.failed;
            
            const featureName = fileName.replace('.json', '').replace('features.', '').replace(/\./g, ' ');
            const successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;
            
            functionalCards.push({
                name: featureName,
                total: stats.total,
                passed: stats.passed,
                failed: stats.failed,
                successRate: successRate,
                fileName: fileName
            });
        }
    });
    
    // Procesar archivos de performance
    const performanceFiles = [
        'features.performance.TokenDataPerformance.json',
        'features.performance.TokenDataPerformanceAdvanced.json',
        'features.performance.TokenListPerformance.json',
        'features.performance.TokenPricePerformance.json',
        'features.performance.TradeListPerformance.json',
        'features.performance.GlobalLoadTest.json'
    ];
    
    performanceFiles.forEach(fileName => {
        const filePath = path.join(performanceDir, fileName);
        const data = readJsonFile(filePath);
        if (data) {
            const stats = calculateStatsFromJson(data);
            performanceStats.total += stats.total;
            performanceStats.passed += stats.passed;
            performanceStats.failed += stats.failed;
            
            const featureName = fileName.replace('.json', '').replace('features.performance.', '').replace(/\./g, ' ');
            const successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;
            
            performanceCards.push({
                name: featureName,
                total: stats.total,
                passed: stats.passed,
                failed: stats.failed,
                successRate: successRate,
                fileName: fileName
            });
        }
    });
    
    return {
        functional: {
            stats: functionalStats,
            cards: functionalCards
        },
        performance: {
            stats: performanceStats,
            cards: performanceCards
        }
    };
}

// Generar los datos
const data = generateFeatureCards();

// Crear el HTML con los datos embebidos
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuantFlux - Dashboard de Tests</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            color: white;
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .stat-number.success { color: #28a745; }
        .stat-number.warning { color: #ffc107; }
        .stat-number.danger { color: #dc3545; }
        
        .stat-label {
            font-size: 1.1rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .features-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .section-title {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #333;
            text-align: center;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .feature-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #007bff;
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .feature-name {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        
        .feature-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .feature-stat {
            text-align: center;
        }
        
        .feature-stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #007bff;
        }
        
        .feature-stat-label {
            font-size: 0.8rem;
            color: #666;
            text-transform: uppercase;
        }
        
        .success-rate {
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .success-rate.high { color: #28a745; }
        .success-rate.medium { color: #ffc107; }
        .success-rate.low { color: #dc3545; }
        
        .footer {
            text-align: center;
            color: white;
            margin-top: 40px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 QuantFlux</h1>
            <p>Dashboard de Tests Funcionales y Performance</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number success" id="totalTests">${data.functional.stats.total + data.performance.stats.total}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-number success" id="passedTests">${data.functional.stats.passed + data.performance.stats.passed}</div>
                <div class="stat-label">Tests Exitosos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number danger" id="failedTests">${data.functional.stats.failed + data.performance.stats.failed}</div>
                <div class="stat-label">Tests Fallidos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number ${Math.round(((data.functional.stats.passed + data.performance.stats.passed) / (data.functional.stats.total + data.performance.stats.total)) * 100) >= 90 ? 'success' : Math.round(((data.functional.stats.passed + data.performance.stats.passed) / (data.functional.stats.total + data.performance.stats.total)) * 100) >= 70 ? 'warning' : 'danger'}" id="successRate">${Math.round(((data.functional.stats.passed + data.performance.stats.passed) / (data.functional.stats.total + data.performance.stats.total)) * 100)}%</div>
                <div class="stat-label">Tasa de Éxito</div>
            </div>
        </div>
        
        <div class="features-section">
            <h2 class="section-title">🧪 Tests Funcionales</h2>
            <div class="features-grid">
                ${data.functional.cards.map(card => `
                    <div class="feature-card">
                        <div class="feature-name">${card.name}</div>
                        <div class="feature-stats">
                            <div class="feature-stat">
                                <div class="feature-stat-value">${card.total}</div>
                                <div class="feature-stat-label">Total</div>
                            </div>
                            <div class="feature-stat">
                                <div class="feature-stat-value" style="color: #28a745;">${card.passed}</div>
                                <div class="feature-stat-label">Exitosos</div>
                            </div>
                            <div class="feature-stat">
                                <div class="feature-stat-value" style="color: #dc3545;">${card.failed}</div>
                                <div class="feature-stat-label">Fallidos</div>
                            </div>
                        </div>
                        <div class="success-rate ${card.successRate >= 90 ? 'high' : card.successRate >= 70 ? 'medium' : 'low'}">
                            ${card.successRate}% Éxito
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="features-section">
            <h2 class="section-title">⚡ Tests de Performance</h2>
            <div class="features-grid">
                ${data.performance.cards.map(card => `
                    <div class="feature-card">
                        <div class="feature-name">${card.name}</div>
                        <div class="feature-stats">
                            <div class="feature-stat">
                                <div class="feature-stat-value">${card.total}</div>
                                <div class="feature-stat-label">Total</div>
                            </div>
                            <div class="feature-stat">
                                <div class="feature-stat-value" style="color: #28a745;">${card.passed}</div>
                                <div class="feature-stat-label">Exitosos</div>
                            </div>
                            <div class="feature-stat">
                                <div class="feature-stat-value" style="color: #dc3545;">${card.failed}</div>
                                <div class="feature-stat-label">Fallidos</div>
                            </div>
                        </div>
                        <div class="success-rate ${card.successRate >= 90 ? 'high' : card.successRate >= 70 ? 'medium' : 'low'}">
                            ${card.successRate}% Éxito
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="footer">
            <p>📊 Dashboard generado automáticamente - QuantFlux Testing Suite</p>
        </div>
    </div>
</body>
</html>`;

// Escribir el archivo HTML
const outputPath = path.join(__dirname, '../src/main/resources/index.html');
fs.writeFileSync(outputPath, htmlContent);

console.log('✅ Dashboard generado exitosamente en src/main/resources/index.html');
console.log(`📊 Estadísticas funcionales: ${data.functional.stats.total} total, ${data.functional.stats.passed} exitosos, ${data.functional.stats.failed} fallidos`);
console.log(`⚡ Estadísticas performance: ${data.performance.stats.total} total, ${data.performance.stats.passed} exitosos, ${data.performance.stats.failed} fallidos`); 