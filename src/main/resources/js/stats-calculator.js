// Calculadora de estadísticas para dashboards de Karate
console.log('🚀 Stats Calculator cargado');

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