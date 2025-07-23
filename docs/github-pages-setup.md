# Configuración de GitHub Pages para Reportes de Tests

## Estructura de Reportes

Este proyecto está configurado para mostrar automáticamente los reportes de tests en GitHub Pages a través de un workflow de GitHub Actions.

### Estructura de Directorios

```
reports/
├── index.html                    # Página de navegación principal
├── functional/                   # Reportes de tests funcionales
│   ├── karate-summary.html      # Reporte principal funcional
│   ├── karate-tags.html         # Reporte por tags
│   ├── karate-timeline.html     # Timeline de ejecución
│   └── [archivos de features]   # Reportes individuales por feature
└── performance/                  # Reportes de tests de performance
    ├── karate-summary.html      # Reporte principal performance
    ├── karate-tags.html         # Reporte por tags
    ├── karate-timeline.html     # Timeline de ejecución
    └── [archivos de features]   # Reportes individuales por feature
```

## Workflow de GitHub Actions

El archivo `.github/workflows/deploy-reports.yml` se encarga de:

1. **Ejecutar Tests**: Ejecuta tanto `FunctionalTestRunner` como `PerformanceTestRunner`
2. **Generar Reportes**: Los reportes se generan automáticamente en `target/karate-reports/`
3. **Organizar Estructura**: Copia los reportes a una estructura organizada
4. **Crear Navegación**: Genera un `index.html` con enlaces a ambos reportes
5. **Desplegar**: Publica todo en GitHub Pages

## URLs de Acceso

Una vez desplegado, los reportes estarán disponibles en:

- **Página Principal**: `https://[usuario].github.io/[repo]/`
- **Tests Funcionales**: `https://[usuario].github.io/[repo]/functional/karate-summary.html`
- **Tests de Performance**: `https://[usuario].github.io/[repo]/performance/karate-summary.html`

## Configuración de GitHub Pages

Para activar esta configuración:

1. **Habilitar GitHub Pages**:
   - Ve a Settings > Pages
   - Source: "GitHub Actions"

2. **Configurar Permisos**:
   - Settings > Actions > General
   - Workflow permissions: "Read and write permissions"

3. **Configurar Environment** (opcional):
   - Settings > Environments
   - Crear environment "github-pages" si no existe

## Triggers del Workflow

El workflow se ejecuta automáticamente en:
- Push a `main` branch
- Push a `test-advanced-performance` branch
- Manual trigger (workflow_dispatch)

## Ventajas de esta Configuración

1. **Reportes Automáticos**: Se generan y publican automáticamente con cada push
2. **Separación Clara**: Tests funcionales y de performance en directorios separados
3. **Navegación Intuitiva**: Página principal con enlaces directos a ambos reportes
4. **Acceso Directo**: URLs directas a los reportes de Karate
5. **Siempre Actualizados**: Los reportes reflejan siempre el estado más reciente de los tests

## Personalización

Para modificar la configuración:

1. **Cambiar Estructura**: Editar el workflow en `.github/workflows/deploy-reports.yml`
2. **Modificar Diseño**: Editar el HTML generado en el paso "Create Navigation Index"
3. **Agregar Más Runners**: Añadir nuevos pasos para copiar reportes adicionales
4. **Cambiar Triggers**: Modificar las condiciones `on` del workflow

## Troubleshooting

### Problemas Comunes

1. **Workflow no se ejecuta**:
   - Verificar que GitHub Pages esté habilitado
   - Comprobar permisos de Actions

2. **Reportes no aparecen**:
   - Verificar que los tests se ejecuten correctamente
   - Comprobar que los archivos se copien a la estructura correcta

3. **Errores de permisos**:
   - Verificar configuración de permisos en Settings > Actions
   - Comprobar que el environment "github-pages" esté configurado

### Logs y Debugging

Los logs del workflow están disponibles en:
- Actions > Deploy Test Reports to GitHub Pages > [ejecución específica]

Cada paso del workflow muestra logs detallados para debugging. 

---

## **¿Cómo lo solucionamos?**

Debemos asegurarnos de que los enlaces y los `onclick` de los cards apunten a la ruta correcta:

```
karate-reports/functional/complete/features.app.HealthCheck.html
```
(no a `functional/complete/…`)

---

### **Pasos a seguir:**

1. **Actualizar los scripts de los dashboards**  
   - En `src/main/resources/functional-report.html` y `src/main/resources/performance-report.html`, los enlaces de los cards deben ser:
     ```js
     window.open('karate-reports/functional/complete/' + f.file.replace('.feature', '') + '.html', '_blank');
     ```
     y
     ```js
     window.open('karate-reports/performance/' + f.file.replace('.feature', '') + '.html', '_blank');
     ```
   - Y los `<a href="...">` igual.

2. **Sincronizar los dashboards actualizados a la carpeta docs**  
   - Ejecuta el script de sincronización para que los dashboards actualizados se copien a `docs/`.

---

### **¿Qué hago ahora?**

Voy a asegurarme de que los enlaces en los dashboards fuente están correctos y te recuerdo que debes volver a sincronizar (o lo hago por ti si lo necesitas).

¿Quieres que lo corrija y sincronice de inmediato? 