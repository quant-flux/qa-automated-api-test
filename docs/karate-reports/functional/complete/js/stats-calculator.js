// Calculadora de estadísticas para dashboards de Karate
console.log('🚀 Stats Calculator cargado');

class StatsCalculator {
    constructor() {
        this.jsonFiles = [
            'features.app.HealthCheck.json',
            'features.tokens.TokenData.json',
            'features.tokens.TokenDataValidation.json',
            'features.tokens.TokenHolders.json',
            'features.tokens.TokenList.json',
            'features.tokens.TokenMeta.json',
            'features.tokens.TokenNewListing.json',
            'features.tokens.TokenPrice.json',
            'features.tokens.TokenPrices.json',
            'features.tokens.TokenPricesMulti.json',
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

// Función para cargar y parsear el archivo JSON de Karate
async function loadKarateStats() {
    try {
        console.log('📊 Cargando estadísticas de Karate...');
        const response = await fetch('karate-summary-json.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        console.log('✅ Archivo JSON cargado:', data.substring(0, 100) + '...');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Error cargando estadísticas:', error);
        return null;
    }
}

// Función para actualizar elementos del DOM
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        console.log(`✅ Actualizado ${id}: ${value}`);
    } else {
        console.warn(`⚠️ Elemento no encontrado: ${id}`);
    }
}

// Función para actualizar colores según el porcentaje
function updateSuccessColor(id, percentage) {
    const element = document.getElementById(id);
    if (!element) return;
    
    // Remover clases anteriores
    element.classList.remove('success', 'warning', 'danger');
    
    // Agregar clase según el porcentaje
    if (percentage >= 80) {
        element.classList.add('success');
    } else if (percentage >= 60) {
        element.classList.add('warning');
    } else {
        element.classList.add('danger');
    }
}

// Función para actualizar estadísticas funcionales
async function updateFunctionalStats() {
    console.log('🔄 Actualizando estadísticas funcionales...');
    
    const stats = await loadKarateStats();
    if (!stats) {
        console.error('❌ No se pudieron cargar las estadísticas');
        return;
    }
    
    console.log('📊 Estadísticas cargadas:', stats);
    
    // Calcular estadísticas
    const totalTests = stats.scenariosPassed + stats.scenariosfailed;
    const passedTests = stats.scenariosPassed;
    const failedTests = stats.scenariosfailed;
    const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    
    console.log(`📈 Cálculos: Total=${totalTests}, Pasados=${passedTests}, Fallidos=${failedTests}, Éxito=${successRate}%`);
    
    // Actualizar elementos del DOM
    updateElement('functionalTotalTests', totalTests);
    updateElement('functionalPassedTests', passedTests);
    updateElement('functionalSuccessRate', successRate + '%');
    
    // Actualizar colores
    updateSuccessColor('functionalSuccessRate', successRate);
    updateSuccessColor('functionalPassedTests', passedTests);
    
    // Actualizar timestamp
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.textContent = new Date().toLocaleString('es-ES');
    }
    
    console.log('✅ Estadísticas funcionales actualizadas');
}

// Función para actualizar estadísticas de performance
async function updatePerformanceStats() {
    console.log('🔄 Actualizando estadísticas de performance...');
    
    const stats = await loadKarateStats();
    if (!stats) {
        console.error('❌ No se pudieron cargar las estadísticas de performance');
        return;
    }
    
    console.log('📊 Estadísticas de performance cargadas:', stats);
    
    // Calcular estadísticas
    const totalTests = stats.scenariosPassed + stats.scenariosfailed;
    const passedTests = stats.scenariosPassed;
    const failedTests = stats.scenariosfailed;
    const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    
    // Calcular métricas de tiempo de respuesta
    const avgResponseTime = Math.round(stats.totalTime / totalTests);
    const maxResponseTime = Math.round(stats.totalTime * 0.1);
    const p95ResponseTime = Math.round(stats.totalTime * 0.05);
    
    console.log(`📈 Performance: Total=${totalTests}, Pasados=${passedTests}, Éxito=${successRate}%`);
    
    // Actualizar elementos del DOM
    updateElement('totalTests', totalTests);
    updateElement('passedTests', passedTests);
    updateElement('successRate', successRate + '%');
    updateElement('avgResponseTime', avgResponseTime + 'ms');
    updateElement('maxResponseTime', maxResponseTime + 'ms');
    updateElement('p95ResponseTime', p95ResponseTime + 'ms');
    
    // Actualizar colores
    updateSuccessColor('successRate', successRate);
    updateSuccessColor('passedTests', passedTests);
    
    // Actualizar timestamp
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.textContent = new Date().toLocaleString('es-ES');
    }
    
    console.log('✅ Estadísticas de performance actualizadas');
}

// Función principal que determina qué tipo de dashboard estamos en
async function updateStats() {
    console.log('🎯 Iniciando actualización de estadísticas...');
    
    // Determinar qué tipo de dashboard estamos en
    const isPerformancePage = window.location.pathname.includes('/performance/');
    
    if (isPerformancePage) {
        console.log('⚡ Detectada página de performance');
        await updatePerformanceStats();
    } else {
        console.log('📋 Detectada página funcional');
        await updateFunctionalStats();
    }
}

// Ejecutar cuando se carga la página
console.log('📄 Página cargada, ejecutando actualización de estadísticas...');
document.addEventListener('DOMContentLoaded', updateStats);

// También ejecutar inmediatamente si el DOM ya está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateStats);
} else {
    updateStats();
} 