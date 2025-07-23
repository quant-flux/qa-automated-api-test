# 📊 QuantFlux Test Dashboards

Este directorio contiene los dashboards de tests automatizados para la API de QuantFlux.

## 🚀 Deploy Automático Integrado

Los dashboards se despliegan automáticamente en GitHub Pages **inmediatamente después** de que se completen los tests:

1. **Tests Funcionales** - Deploy automático después de tests exitosos
2. **Tests Performance** - Deploy automático después de tests exitosos

### 📋 Configuración de GitHub Pages

Para habilitar el deploy automático:

1. **Ir a Settings > Pages** en el repositorio
2. **Source**: Seleccionar "GitHub Actions"
3. **Branch**: `main`
4. **Folder**: `/docs`

### 🔄 Deploy Integrado en Workflows

El deploy está **integrado directamente** en los workflows de tests:

#### **Workflow Funcional** (`functional-tests.yml`):
1. ✅ Ejecuta tests funcionales
2. ✅ Sincroniza dashboards
3. ✅ **Deploy automático a GitHub Pages**

#### **Workflow Performance** (`performance-tests.yml`):
1. ✅ Ejecuta tests de performance
2. ✅ Sincroniza dashboards
3. ✅ **Deploy automático a GitHub Pages**

## 📁 Estructura de Archivos

```
docs/
├── index.html              # Dashboard principal
├── functional-report.html  # Dashboard de tests funcionales
├── performance-report.html # Dashboard de tests de performance
├── karate-reports/         # Reportes detallados de Karate
│   ├── functional/         # Reportes funcionales
│   └── performance/        # Reportes de performance
└── js/                     # Scripts JavaScript
```

## 🌐 URLs de Acceso

Una vez configurado GitHub Pages, los dashboards estarán disponibles en:

- **Dashboard Principal**: `https://[usuario].github.io/[repositorio]/`
- **Tests Funcionales**: `https://[usuario].github.io/[repositorio]/functional-report.html`
- **Tests Performance**: `https://[usuario].github.io/[repositorio]/performance-report.html`

## 📊 Características de los Dashboards

### ✅ **Dashboard Principal**
- Vista general de todos los tests
- Estadísticas consolidadas
- Enlaces a reportes detallados

### ✅ **Dashboard Funcional**
- Tests organizados por categorías
- Estadísticas en tiempo real
- Iconos y descripciones
- Enlaces a reportes Karate

### ✅ **Dashboard Performance**
- Tests de carga y rendimiento
- Métricas de latencia
- Análisis de bottlenecks
- Reportes detallados por tipo

## 🔧 Mantenimiento

Los dashboards se actualizan automáticamente con cada ejecución de tests. No es necesario intervención manual.

### 📈 Estadísticas Automáticas
- Se extraen de `karate-summary-json.txt`
- Se actualizan en tiempo real
- Reflejan resultados reales de las pruebas

### 🎨 Categorías Automáticas
- Se generan dinámicamente
- Incluyen iconos y descripciones
- Se organizan por tipo de test 