// Calculador de estadísticas para reportes de tests
class StatsCalculator {
    constructor() {
        this.jsonFiles = [
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
    }

    async calculateFunctionalStats() {
        try {
            // Intentar leer el archivo de resumen desde functional/complete/
            let response = await fetch('functional/complete/karate-summary-json.txt');
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Datos funcionales leídos:', data);
                
                // Extraer estadísticas del formato de Karate
                const totalScenarios = data.scenariosPassed + data.scenariosfailed;
                const successRate = totalScenarios > 0 ? Math.round((data.scenariosPassed / totalScenarios) * 100) : 0;
                
                return {
                    totalTests: totalScenarios,
                    passedTests: data.scenariosPassed,
                    failedTests: data.scenariosfailed,
                    successRate: successRate
                };
            }
        } catch (error) {
            console.warn('No se pudo leer karate-summary-json.txt desde functional/complete/, intentando método alternativo:', error);
        }

        // Método alternativo: intentar leer archivos JSON individuales desde functional/complete/
        try {
            let totalTests = 0;
            let passedTests = 0;
            let failedTests = 0;
            
            // Procesar cada archivo JSON desde functional/complete/
            for (const fileName of this.jsonFiles) {
                try {
                    const response = await fetch(`functional/complete/${fileName}`);
                    if (response.ok) {
                        const data = await response.json();
                        
                        // Procesar cada feature en el archivo
                        data.forEach(feature => {
                            if (feature.elements) {
                                feature.elements.forEach(element => {
                                    if (element.type === 'scenario') {
                                        totalTests++;
                                        
                                        // Verificar si todos los steps del scenario pasaron
                                        let scenarioPassed = true;
                                        if (element.steps) {
                                            element.steps.forEach(step => {
                                                if (step.result && step.result.status === 'failed') {
                                                    scenarioPassed = false;
                                                }
                                            });
                                        }
                                        
                                        if (scenarioPassed) {
                                            passedTests++;
                                        } else {
                                            failedTests++;
                                        }
                                    }
                                });
                            }
                        });
                    }
                } catch (error) {
                    console.warn(`No se pudo leer el archivo ${fileName}:`, error);
                }
            }
            
            // Calcular tasa de éxito
            const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
            
            return {
                totalTests,
                passedTests,
                failedTests,
                successRate
            };
            
        } catch (error) {
            console.error('Error al calcular estadísticas funcionales:', error);
            return {
                totalTests: 0,
                passedTests: 0,
                failedTests: 0,
                successRate: 0
            };
        }
    }

    async calculatePerformanceStats() {
        console.log('🔍 Iniciando cálculo de estadísticas de performance...');
        try {
            // Intentar leer el archivo de resumen desde performance/
            console.log('📁 Intentando leer karate-summary-json.txt desde performance/...');
            let response = await fetch('performance/karate-summary-json.txt');
            console.log('📊 Respuesta del directorio performance:', response.ok ? 'OK' : 'FAILED');
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Datos de performance leídos correctamente:', data);
                
                // Extraer estadísticas del formato de Karate
                const totalScenarios = data.scenariosPassed + data.scenariosfailed;
                const successRate = totalScenarios > 0 ? Math.round((data.scenariosPassed / totalScenarios) * 100) : 0;
                
                return {
                    totalTests: totalScenarios,
                    passedTests: data.scenariosPassed,
                    failedTests: data.scenariosfailed,
                    successRate: successRate
                };
            } else {
                console.warn('❌ No se pudo leer el archivo desde performance/');
            }
        } catch (error) {
            console.warn('❌ Error al leer karate-summary-json.txt, intentando método alternativo:', error);
        }

        // Método alternativo: intentar leer archivos JSON individuales desde performance/
        try {
            let totalTests = 0;
            let passedTests = 0;
            let failedTests = 0;
            
            // Archivos JSON de performance
            const performanceJsonFiles = [
                'features.performance.TokenDataPerformance.json',
                'features.performance.TokenDataPerformanceAdvanced.json',
                'features.performance.TokenListPerformance.json',
                'features.performance.TokenPricePerformance.json',
                'features.performance.TradeListPerformance.json',
                'features.performance.GlobalLoadTest.json'
            ];
            
            // Procesar cada archivo JSON de performance desde performance/
            for (const fileName of performanceJsonFiles) {
                try {
                    const response = await fetch(`performance/${fileName}`);
                    if (response.ok) {
                        const data = await response.json();
                        
                        // Procesar cada feature en el archivo
                        data.forEach(feature => {
                            if (feature.elements) {
                                feature.elements.forEach(element => {
                                    if (element.type === 'scenario') {
                                        totalTests++;
                                        
                                        // Verificar si todos los steps del scenario pasaron
                                        let scenarioPassed = true;
                                        if (element.steps) {
                                            element.steps.forEach(step => {
                                                if (step.result && step.result.status === 'failed') {
                                                    scenarioPassed = false;
                                                }
                                            });
                                        }
                                        
                                        if (scenarioPassed) {
                                            passedTests++;
                                        } else {
                                            failedTests++;
                                        }
                                    }
                                });
                            }
                        });
                    }
                } catch (error) {
                    console.warn(`No se pudo leer el archivo de performance ${fileName}:`, error);
                }
            }
            
            // Calcular tasa de éxito
            const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
            
            return {
                totalTests,
                passedTests,
                failedTests,
                successRate
            };
            
        } catch (error) {
            console.error('Error al calcular estadísticas de performance:', error);
            return {
                totalTests: 0,
                passedTests: 0,
                failedTests: 0,
                successRate: 0
            };
        }
    }

    updateElementColor(element, successRate) {
        if (successRate >= 90) {
            element.className = 'stat-number success';
        } else if (successRate >= 70) {
            element.className = 'stat-number warning';
        } else {
            element.className = 'stat-number danger';
        }
    }
}

// Función global para actualizar estadísticas funcionales
async function updateFunctionalStats() {
    const calculator = new StatsCalculator();
    const stats = await calculator.calculateFunctionalStats();
    
    // Actualizar elementos del DOM
    const totalElement = document.getElementById('totalTests');
    const passedElement = document.getElementById('passedTests');
    const failedElement = document.getElementById('failedTests');
    const successRateElement = document.getElementById('successRate');
    
    if (totalElement) totalElement.textContent = stats.totalTests;
    if (passedElement) passedElement.textContent = stats.passedTests;
    if (failedElement) failedElement.textContent = stats.failedTests;
    if (successRateElement) {
        successRateElement.textContent = stats.successRate + '%';
        calculator.updateElementColor(successRateElement, stats.successRate);
    }
    
    console.log(`Estadísticas funcionales calculadas: ${stats.totalTests} total, ${stats.passedTests} exitosos, ${stats.failedTests} fallidos, ${stats.successRate}% éxito`);
    
    return stats;
}

// Función global para actualizar estadísticas de performance
async function updatePerformanceStats() {
    console.log('🚀 Iniciando updatePerformanceStats...');
    const calculator = new StatsCalculator();
    const stats = await calculator.calculatePerformanceStats();
    
    console.log('📊 Estadísticas obtenidas:', stats);
    
    // Actualizar elementos del DOM
    const totalElement = document.getElementById('totalTests');
    const passedElement = document.getElementById('passedTests');
    const failedElement = document.getElementById('failedTests');
    const successRateElement = document.getElementById('successRate');
    
    console.log('🔍 Elementos del DOM encontrados:');
    console.log('  - totalTests:', totalElement ? 'SÍ' : 'NO');
    console.log('  - passedTests:', passedElement ? 'SÍ' : 'NO');
    console.log('  - failedTests:', failedElement ? 'SÍ' : 'NO');
    console.log('  - successRate:', successRateElement ? 'SÍ' : 'NO');
    
    if (totalElement) {
        totalElement.textContent = stats.totalTests;
        console.log('✅ totalTests actualizado a:', stats.totalTests);
    }
    if (passedElement) {
        passedElement.textContent = stats.passedTests;
        console.log('✅ passedTests actualizado a:', stats.passedTests);
    }
    if (failedElement) {
        failedElement.textContent = stats.failedTests;
        console.log('✅ failedTests actualizado a:', stats.failedTests);
    }
    if (successRateElement) {
        successRateElement.textContent = stats.successRate + '%';
        calculator.updateElementColor(successRateElement, stats.successRate);
        console.log('✅ successRate actualizado a:', stats.successRate + '%');
    }
    
    console.log(`🏁 Estadísticas de performance calculadas: ${stats.totalTests} total, ${stats.passedTests} exitosos, ${stats.failedTests} fallidos, ${stats.successRate}% éxito`);
    
    return stats;
} 