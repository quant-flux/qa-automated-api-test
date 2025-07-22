const fs = require('fs');
const path = require('path');

// Función para extraer información de un archivo .feature
function extractFeatureInfo(featurePath) {
    try {
        const content = fs.readFileSync(featurePath, 'utf8');
        const lines = content.split('\n');
        
        let featureName = '';
        let description = '';
        let scenarios = 0;
        let tags = [];
        
        for (let line of lines) {
            line = line.trim();
            
            // Extraer nombre del feature
            if (line.startsWith('Feature:')) {
                featureName = line.replace('Feature:', '').trim();
            }
            
            // Extraer descripción (líneas después del Feature: hasta el primer Scenario:)
            if (featureName && !line.startsWith('Scenario:') && !line.startsWith('@') && line.length > 0) {
                if (!description) {
                    description = line;
                }
            }
            
            // Contar scenarios
            if (line.startsWith('Scenario:')) {
                scenarios++;
            }
            
            // Extraer tags
            if (line.startsWith('@')) {
                const tag = line.substring(1).split(' ')[0];
                if (tag && !tags.includes(tag)) {
                    tags.push(tag);
                }
            }
        }
        
        // Si no hay descripción, usar el nombre del archivo
        if (!description) {
            description = `Tests for ${featureName}`;
        }
        
        return {
            name: featureName,
            description: description,
            scenarios: scenarios,
            tags: tags,
            filename: path.basename(featurePath, '.feature'),
            category: getCategoryFromPath(featurePath)
        };
    } catch (error) {
        console.error(`Error reading feature file ${featurePath}:`, error.message);
        return null;
    }
}

// Función para determinar la categoría basada en la ruta
function getCategoryFromPath(featurePath) {
    if (featurePath.includes('/performance/')) {
        return 'performance';
    } else if (featurePath.includes('/tokens/')) {
        return 'tokens';
    } else if (featurePath.includes('/trade/')) {
        return 'trade';
    } else if (featurePath.includes('/app/')) {
        return 'app';
    } else {
        return 'common';
    }
}

// Función para generar el HTML de una card
function generateFeatureCard(featureInfo) {
    const iconMap = {
        'tokens': 'fa-coins',
        'trade': 'fa-chart-line',
        'performance': 'fa-tachometer-alt',
        'app': 'fa-heartbeat',
        'common': 'fa-cogs'
    };
    
    const colorMap = {
        'tokens': '#28a745',
        'trade': '#007bff',
        'performance': '#dc3545',
        'app': '#17a2b8',
        'common': '#6c757d'
    };
    
    const icon = iconMap[featureInfo.category] || 'fa-file-alt';
    const color = colorMap[featureInfo.category] || '#6c757d';
    
    // Generar la ruta al reporte de Karate
    const reportPath = `target/karate-reports/functional/features.${featureInfo.category}.${featureInfo.filename}.html`;
    
    return `
        <div class="feature-card" onclick="window.open('${reportPath}', '_blank')">
            <div class="feature-icon" style="color: ${color}">
                <i class="fas ${icon}"></i>
            </div>
            <div class="feature-content">
                <h3 class="feature-title">${featureInfo.name}</h3>
                <p class="feature-description">${featureInfo.description}</p>
                <div class="feature-meta">
                    <span class="feature-scenarios">
                        <i class="fas fa-list"></i> ${featureInfo.scenarios} scenarios
                    </span>
                    ${featureInfo.tags.length > 0 ? `
                        <span class="feature-tags">
                            <i class="fas fa-tags"></i> ${featureInfo.tags.join(', ')}
                        </span>
                    ` : ''}
                </div>
            </div>
            <div class="feature-arrow">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `;
}

// Función para generar todas las cards de features funcionales
function generateFunctionalFeaturesCards() {
    const featuresDir = 'src/test/resources/features';
    const featureFiles = [];
    
    // Recopilar todos los archivos .feature (excluyendo performance)
    function collectFeatures(dir) {
        const items = fs.readdirSync(dir);
        for (let item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // No incluir la carpeta performance para features funcionales
                if (item !== 'performance') {
                    collectFeatures(fullPath);
                }
            } else if (item.endsWith('.feature')) {
                featureFiles.push(fullPath);
            }
        }
    }
    
    collectFeatures(featuresDir);
    
    const features = featureFiles
        .map(extractFeatureInfo)
        .filter(feature => feature !== null)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    const cardsHTML = features.map(generateFeatureCard).join('');
    
    return {
        features: features,
        cardsHTML: cardsHTML,
        totalFeatures: features.length,
        totalScenarios: features.reduce((sum, f) => sum + f.scenarios, 0)
    };
}

// Función para generar todas las cards de features de performance
function generatePerformanceFeaturesCards() {
    const performanceDir = 'src/test/resources/features/performance';
    const featureFiles = [];
    
    if (fs.existsSync(performanceDir)) {
        const items = fs.readdirSync(performanceDir);
        for (let item of items) {
            if (item.endsWith('.feature')) {
                featureFiles.push(path.join(performanceDir, item));
            }
        }
    }
    
    const features = featureFiles
        .map(extractFeatureInfo)
        .filter(feature => feature !== null)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    const cardsHTML = features.map(generateFeatureCard).join('');
    
    return {
        features: features,
        cardsHTML: cardsHTML,
        totalFeatures: features.length,
        totalScenarios: features.reduce((sum, f) => sum + f.scenarios, 0)
    };
}

// Función para generar el JSON con la información de features
function generateFeaturesJSON() {
    const functional = generateFunctionalFeaturesCards();
    const performance = generatePerformanceFeaturesCards();
    
    const data = {
        functional: {
            features: functional.features,
            totalFeatures: functional.totalFeatures,
            totalScenarios: functional.totalScenarios
        },
        performance: {
            features: performance.features,
            totalFeatures: performance.totalFeatures,
            totalScenarios: performance.totalScenarios
        }
    };
    
    fs.writeFileSync('src/test/resources/features-data.json', JSON.stringify(data, null, 2));
    console.log('✅ Features data generated: src/test/resources/features-data.json');
    
    return data;
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    console.log('🔍 Generating features cards...\n');
    
    const data = generateFeaturesJSON();
    
    console.log('📊 Functional Features:');
    console.log(`  - Total features: ${data.functional.totalFeatures}`);
    console.log(`  - Total scenarios: ${data.functional.totalScenarios}`);
    
    console.log('\n📊 Performance Features:');
    console.log(`  - Total features: ${data.performance.totalFeatures}`);
    console.log(`  - Total scenarios: ${data.performance.totalScenarios}`);
    
    console.log('\n✅ Features cards generation completed!');
}

module.exports = {
    generateFunctionalFeaturesCards,
    generatePerformanceFeaturesCards,
    generateFeaturesJSON
}; 