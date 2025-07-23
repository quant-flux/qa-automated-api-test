async function cargarYMostrarFeatures() {
    const indexResp = await fetch('karate-reports/performance/index.json');
    const featuresList = await indexResp.json();

    // Definición de categorías y palabras clave asociadas
    const categorias = [
        { nombre: 'Pruebas de Carga', icono: '🌐', keywords: ['Load'] },
        { nombre: 'Pruebas de Estrés', icono: '🔥', keywords: ['Stress'] },
        { nombre: 'Pruebas de Endurance', icono: '⏳', keywords: ['Endurance'] },
        { nombre: 'Pruebas de Latencia', icono: '⏱️', keywords: ['Latency'] },
        { nombre: 'Pruebas de Concurrencia', icono: '🤹', keywords: ['Concurrency'] },
        { nombre: 'Bottleneck Endpoints', icono: '🚧', keywords: ['Bottleneck'] },
        { nombre: 'Resource Intensive', icono: '💾', keywords: ['ResourceIntensive'] },
        { nombre: 'Token Performance', icono: '💰', keywords: ['Token'] },
        { nombre: 'Trade Performance', icono: '💱', keywords: ['Trade'] },
        { nombre: 'Otros', icono: '📁', keywords: [] }
    ];

    // Agrupar features por categoría
    const featuresPorCategoria = {};
    categorias.forEach(cat => featuresPorCategoria[cat.nombre] = []);

    for (const featureName of featuresList) {
        let asignada = false;
        for (const cat of categorias) {
            if (cat.keywords.some(kw => featureName.includes(kw))) {
                featuresPorCategoria[cat.nombre].push(featureName);
                asignada = true;
                break;
            }
        }
        if (!asignada) {
            featuresPorCategoria['Otros'].push(featureName);
        }
    }

    const container = document.getElementById('features-container');
    container.innerHTML = '';

    for (const cat of categorias) {
        const featuresCat = featuresPorCategoria[cat.nombre];
        if (!featuresCat.length) continue;

        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `<h3 class="category-title">${cat.icono} ${cat.nombre}</h3>`;

        const grid = document.createElement('div');
        grid.className = 'features-grid';

        for (const featureName of featuresCat) {
            try {
                const featureResp = await fetch(`karate-reports/performance/${featureName}.json`);
                const featureData = await featureResp.json();

                const nombre = featureData.name || featureName;
                const descripcion = featureData.description || "Sin descripción";
                const passed = featureData.stats && featureData.stats.failCount === 0;
                const estado = passed ? "success" : "danger";

                const card = document.createElement('div');
                card.className = 'feature-card';
                card.onclick = () => openKarateReport(featureName);

                card.innerHTML = `
                    <div class="feature-header">
                        <span class="feature-icon">${cat.icono}</span>
                        <div class="feature-name">${nombre}</div>
                    </div>
                    <div class="feature-description">${descripcion}</div>
                    <div class="stat-number ${estado}" style="margin-top:10px;">${passed ? "✔️" : "❌"}</div>
                `;
                grid.appendChild(card);
            } catch (e) {
                // Si hay error leyendo el JSON, lo ignoramos
                continue;
            }
        }
        section.appendChild(grid);
        container.appendChild(section);
    }
}

window.onload = cargarYMostrarFeatures; 