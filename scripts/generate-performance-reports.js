const fs = require('fs');
const path = require('path');

console.log('🔄 Generando reporte de performance con datos dinámicos...');

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

// Función para generar el reporte de performance
function generatePerformanceReport() {
    const performanceDir = path.join(__dirname, '../src/main/resources/performance');
    
    let totalStats = { total: 0, passed: 0, failed: 0 };
    let featureCards = [];
    
    // Archivos de performance
    const performanceFiles = [
        { name: 'Token Data Performance', file: 'features.performance.TokenDataPerformance.json' },
        { name: 'Token Data Performance Advanced', file: 'features.performance.TokenDataPerformanceAdvanced.json' },
        { name: 'Token List Performance', file: 'features.performance.TokenListPerformance.json' },
        { name: 'Token Price Performance', file: 'features.performance.TokenPricePerformance.json' },
        { name: 'Trade List Performance', file: 'features.performance.TradeListPerformance.json' },
        { name: 'Global Load Test', file: 'features.performance.GlobalLoadTest.json' }
    ];
    
    performanceFiles.forEach(feature => {
        const filePath = path.join(performanceDir, feature.file);
        const data = readJsonFile(filePath);
        if (data) {
            const stats = calculateStatsFromJson(data);
            totalStats.total += stats.total;
            totalStats.passed += stats.passed;
            totalStats.failed += stats.failed;
            
            const successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;
            
            featureCards.push({
                name: feature.name,
                total: stats.total,
                passed: stats.passed,
                failed: stats.failed,
                successRate: successRate
            });
        }
    });
    
    const overallSuccessRate = totalStats.total > 0 ? Math.round((totalStats.passed / totalStats.total) * 100) : 0;
    
    // Generar el HTML del reporte de performance
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuantFlux - Reporte de Tests de Performance</title>
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
        
        .back-link {
            display: inline-block;
            padding: 10px 20px;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .stat-number.success { color: #28a745; }
        .stat-number.warning { color: #ffc107; }
        .stat-number.danger { color: #dc3545; }
        
        .stat-label {
            font-size: 1rem;
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
        <a href="index.html" class="back-link">← Volver al Dashboard Principal</a>
        
        <div class="header">
            <h1>⚡ Tests de Performance</h1>
            <p>Análisis de rendimiento y carga de la API</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number success">${totalStats.total}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-number success">${totalStats.passed}</div>
                <div class="stat-label">Tests Exitosos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number danger">${totalStats.failed}</div>
                <div class="stat-label">Tests Fallidos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number ${overallSuccessRate >= 90 ? 'success' : overallSuccessRate >= 70 ? 'warning' : 'danger'}">${overallSuccessRate}%</div>
                <div class="stat-label">Tasa de Éxito</div>
            </div>
        </div>
        
        <div class="features-section">
            <h2 class="section-title">📊 Features de Performance</h2>
            <div class="features-grid">
                ${featureCards.map(card => `
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
                        <div class="success-rate ${card.successRate >= 90 ? 'high' : card.successRate >= 70 ? 'medium' : 'low'}">${card.successRate}% Éxito</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="footer">
            <p>📊 QuantFlux Testing Suite - Reporte de Tests de Performance</p>
        </div>
    </div>
</body>
</html>`;

    // Escribir el archivo HTML
    const outputPath = path.join(__dirname, '../src/main/resources/performance-report.html');
    fs.writeFileSync(outputPath, htmlContent);
    
    console.log('✅ Reporte de performance generado exitosamente en src/main/resources/performance-report.html');
    console.log(`📊 Estadísticas: ${totalStats.total} total, ${totalStats.passed} exitosos, ${totalStats.failed} fallidos (${overallSuccessRate}% éxito)`);
    
    return { totalStats, featureCards };
}

// Ejecutar la generación
generatePerformanceReport(); 