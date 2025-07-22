const fs = require('fs');
const path = require('path');
const { generateFeaturesJSON } = require('./generate-features-cards.js');

console.log('🔄 Updating features data after tests...\n');

try {
    // Generar el JSON actualizado con los datos de features
    const data = generateFeaturesJSON();
    
    console.log('✅ Features data updated successfully!');
    console.log(`📊 Functional Features: ${data.functional.totalFeatures} features, ${data.functional.totalScenarios} scenarios`);
    console.log(`📊 Performance Features: ${data.performance.totalFeatures} features, ${data.performance.totalScenarios} scenarios`);
    
    // Verificar que los reportes de Karate existen
    console.log('\n🔍 Checking Karate reports...');
    
    const functionalReportsDir = 'target/karate-reports/functional';
    const performanceReportsDir = 'target/karate-reports/performance';
    
    if (fs.existsSync(functionalReportsDir)) {
        const functionalFiles = fs.readdirSync(functionalReportsDir)
            .filter(file => file.endsWith('.html') && file !== 'karate-summary.html');
        console.log(`✅ Functional reports found: ${functionalFiles.length} HTML files`);
    } else {
        console.log('⚠️  Functional reports directory not found');
    }
    
    if (fs.existsSync(performanceReportsDir)) {
        const performanceFiles = fs.readdirSync(performanceReportsDir)
            .filter(file => file.endsWith('.html') && file !== 'karate-summary.html');
        console.log(`✅ Performance reports found: ${performanceFiles.length} HTML files`);
    } else {
        console.log('⚠️  Performance reports directory not found');
    }
    
    console.log('\n🎉 Features data update completed!');
    console.log('💡 You can now open the landing pages to see the updated feature cards.');
    
} catch (error) {
    console.error('❌ Error updating features data:', error.message);
    process.exit(1);
} 