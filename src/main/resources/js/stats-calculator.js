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
            // Intentar leer el archivo de resumen generado por el workflow
            const response = await fetch('karate-summary-json.txt');
            if (response.ok) {
                const data = await response.json();
                return {
                    totalTests: data.functional.totalTests || 0,
                    passedTests: data.functional.passedTests || 0,
                    failedTests: data.functional.failedTests || 0,
                    successRate: data.functional.successRate || 0
                };
            }
        } catch (error) {
            console.warn('No se pudo leer karate-summary-json.txt, intentando método alternativo:', error);
        }

        // Método alternativo: intentar leer archivos JSON individuales
        try {
            let totalTests = 0;
            let passedTests = 0;
            let failedTests = 0;
            
            // Procesar cada archivo JSON
            for (const fileName of this.jsonFiles) {
                try {
                    const response = await fetch(fileName);
                    if (response.ok) {
                        const data = await response.json();
                        
                        // Procesar cada feature en el archivo
                        data.forEach(feature => {
                            if (feature.elements) {
                                feature.elements.forEach(element => {
                                    if (element.type === 'scenario') {
                                        // Contar cada step individual como un test (como hace Maven)
                                        if (element.steps) {
                                            element.steps.forEach(step => {
                                                if (step.result) {
                                                    totalTests++;
                                                    if (step.result.status === 'passed') {
                                                        passedTests++;
                                                    } else if (step.result.status === 'failed') {
                                                        failedTests++;
                                                    }
                                                }
                                            });
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
        try {
            // Intentar leer el archivo de resumen generado por el workflow
            const response = await fetch('karate-summary-json.txt');
            if (response.ok) {
                const data = await response.json();
                return {
                    totalTests: data.performance.totalTests || 0,
                    passedTests: data.performance.passedTests || 0,
                    failedTests: data.performance.failedTests || 0,
                    successRate: data.performance.successRate || 0
                };
            }
        } catch (error) {
            console.warn('No se pudo leer karate-summary-json.txt, intentando método alternativo:', error);
        }

        // Método alternativo: intentar leer archivos JSON individuales
        try {
            let totalTests = 0;
            let passedTests = 0;
            let failedTests = 0;
            
            // Archivos JSON de performance
            const performanceJsonFiles = [
                'TokenDataPerformance.json',
                'TokenDataPerformanceAdvanced.json',
                'TokenListPerformance.json',
                'TokenPricePerformance.json',
                'TradeListPerformance.json',
                'GlobalLoadTest.json'
            ];
            
            // Procesar cada archivo JSON de performance
            for (const fileName of performanceJsonFiles) {
                try {
                    const response = await fetch(fileName);
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
    const calculator = new StatsCalculator();
    const stats = await calculator.calculatePerformanceStats();
    
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
    
    console.log(`Estadísticas de performance calculadas: ${stats.totalTests} total, ${stats.passedTests} exitosos, ${stats.failedTests} fallidos, ${stats.successRate}% éxito`);
    
    return stats;
} 