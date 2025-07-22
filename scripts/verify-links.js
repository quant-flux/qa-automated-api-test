const fs = require('fs');
const path = require('path');

// Función para verificar si un archivo existe
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (error) {
        return false;
    }
}

// Función para extraer enlaces de un archivo HTML
function extractLinks(htmlContent) {
    const linkRegex = /href=["']([^"']+)["']/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(htmlContent)) !== null) {
        links.push(match[1]);
    }
    
    return links;
}

// Función para verificar enlaces
function verifyLinks() {
    const htmlFiles = [
        'index.html',
        'functional-report.html',
        'performance-report.html'
    ];
    
    console.log('🔍 Verificando enlaces en archivos HTML...\n');
    
    htmlFiles.forEach(file => {
        if (!fileExists(file)) {
            console.log(`❌ Archivo no encontrado: ${file}`);
            return;
        }
        
        console.log(`📄 Verificando: ${file}`);
        const content = fs.readFileSync(file, 'utf8');
        const links = extractLinks(content);
        
        links.forEach(link => {
            // Ignorar enlaces externos y enlaces internos que no sean archivos
            if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) {
                return;
            }
            
            // Verificar si el archivo existe
            if (fileExists(link)) {
                console.log(`  ✅ ${link}`);
            } else {
                console.log(`  ❌ ${link} - NO ENCONTRADO`);
            }
        });
        
        console.log('');
    });
}

// Función para mostrar estadísticas del proyecto
function showProjectStats() {
    console.log('📊 Estadísticas del Proyecto QuantFlux\n');
    
    // Contar archivos de features
    const featuresDir = 'src/test/resources/features';
    if (fileExists(featuresDir)) {
        const featureFiles = fs.readdirSync(featuresDir, { recursive: true })
            .filter(file => file.endsWith('.feature'));
        
        console.log(`📁 Archivos de features encontrados: ${featureFiles.length}`);
        
        // Contar scenarios (aproximado)
        let totalScenarios = 0;
        featureFiles.forEach(file => {
            const content = fs.readFileSync(path.join(featuresDir, file), 'utf8');
            const scenarios = (content.match(/Scenario:/g) || []).length;
            totalScenarios += scenarios;
        });
        
        console.log(`🧪 Total de scenarios: ${totalScenarios}`);
        
        // Separar funcionales vs performance
        const performanceFiles = featureFiles.filter(file => file.includes('performance'));
        const functionalFiles = featureFiles.filter(file => !file.includes('performance'));
        
        console.log(`  - Funcionales: ${functionalFiles.length} archivos`);
        console.log(`  - Performance: ${performanceFiles.length} archivos`);
    }
    
    // Verificar reportes generados
    console.log('\n📈 Reportes Generados:');
    const reportPaths = [
        'target/karate-reports/functional/complete/karate-summary.html',
        'target/karate-reports/performance/karate-summary.html'
    ];
    
    reportPaths.forEach(reportPath => {
        if (fileExists(reportPath)) {
            console.log(`  ✅ ${reportPath}`);
        } else {
            console.log(`  ❌ ${reportPath} - NO ENCONTRADO`);
        }
    });
}

// Ejecutar verificaciones
if (require.main === module) {
    verifyLinks();
    showProjectStats();
}

module.exports = { verifyLinks, showProjectStats }; 