# Configuración CI/CD Independiente - Tests Funcionales vs Performance

## Visión General

Este proyecto implementa una estrategia de CI/CD independiente donde:

- **Tests Funcionales**: Se ejecutan automáticamente en cada commit
- **Tests de Performance**: Se ejecutan de forma independiente en horarios específicos o bajo demanda

## Estructura de Workflows

### 1. **Tests Funcionales** (`.github/workflows/deploy-reports.yml`)
- **Trigger**: Cada push a `main` o `test-advanced-performance`
- **Frecuencia**: Automático en cada commit
- **Propósito**: Validar funcionalidad básica y regresiones
- **Duración**: Rápida (2-5 minutos)
- **Runner**: `FunctionalTestRunner`

### 2. **Tests de Performance Programados** (`.github/workflows/performance-tests-scheduled.yml`)
- **Trigger**: Programado (Lunes, Miércoles, Viernes a las 8:00 AM UTC)
- **Frecuencia**: 3 veces por semana
- **Propósito**: Monitoreo continuo de performance
- **Duración**: Media (10-30 minutos)
- **Runner**: `PerformanceTestRunner`

### 3. **Tests de Performance Bajo Demanda** (`.github/workflows/performance-tests-on-demand.yml`)
- **Trigger**: Manual con parámetros configurables
- **Frecuencia**: Según necesidad
- **Propósito**: Tests específicos con configuraciones personalizadas
- **Duración**: Variable según configuración
- **Runner**: `PerformanceTestRunner`

## Configuración Detallada

### Tests Funcionales (Automáticos)

```yaml
# Se ejecuta en cada commit
on:
  push:
    branches: [ main, test-advanced-performance ]
  workflow_dispatch:

# Ejecuta solo FunctionalTestRunner
- name: Run Functional Tests
  run: mvn test -Dtest=FunctionalTestRunner
```

**Ventajas:**
- ✅ Feedback inmediato en cada cambio
- ✅ Detección temprana de regresiones
- ✅ Validación rápida de funcionalidad
- ✅ No interrumpe el flujo de desarrollo
- ✅ Reportes nativos de Karate sin dependencias adicionales

### Tests de Performance Programados

```yaml
# Se ejecuta automáticamente en horarios específicos
on:
  schedule:
    - cron: '0 8 * * 1,3,5'  # Lunes, Miércoles, Viernes 8:00 AM UTC
  workflow_dispatch:
  issues:
    types: [opened, edited]
```

**Configuración:**
- **Horario**: Lunes, Miércoles, Viernes a las 8:00 AM UTC
- **Trigger Manual**: Disponible con parámetros
- **Trigger por Issues**: Con label "performance-test"

**Ventajas:**
- ✅ Monitoreo regular sin interrumpir desarrollo
- ✅ Detección de degradación de performance gradual
- ✅ Ejecución en horarios de baja actividad
- ✅ Múltiples formas de trigger

### Tests de Performance Bajo Demanda

```yaml
# Configuración personalizable
workflow_dispatch:
  inputs:
    test_category: [all, token-data, token-list, token-price, trade-list, global-load]
    load_intensity: [light, medium, heavy, stress]
    duration_minutes: "5"
    concurrent_users: "50"
    environment: [staging, production, development]
```

**Opciones de Configuración:**
- **Categoría**: Tests específicos por endpoint
- **Intensidad**: Niveles de carga configurables
- **Duración**: Tiempo de ejecución personalizable
- **Usuarios**: Número de usuarios concurrentes
- **Ambiente**: Diferentes entornos de testing

## Runners Disponibles

### **FunctionalTestRunner**
- **Propósito**: Ejecutar tests funcionales
- **Cobertura**: Tokens, Trade, App features
- **Exclusión**: Tests de performance (`~@performance`)
- **Reportes**: Múltiples directorios organizados por categoría

### **PerformanceTestRunner**
- **Propósito**: Ejecutar tests de performance
- **Cobertura**: Load, stress, endurance tests
- **Configuración**: Parámetros personalizables
- **Reportes**: Métricas detalladas de performance

## Casos de Uso

### 1. **Desarrollo Diario**
```bash
# El desarrollador hace commit
git commit -m "Nueva funcionalidad"
git push

# Automáticamente se ejecutan tests funcionales
# Los tests de performance se ejecutan según el cronograma
```

### 2. **Antes de un Release**
```bash
# Ejecutar tests de performance específicos
# Ir a Actions > Performance Tests - On Demand
# Configurar:
# - Category: all
# - Load Intensity: heavy
# - Duration: 15 minutes
# - Concurrent Users: 100
```

### 3. **Investigación de Performance**
```bash
# Ejecutar tests específicos para un endpoint
# Ir a Actions > Performance Tests - On Demand
# Configurar:
# - Category: token-price
# - Load Intensity: stress
# - Duration: 10 minutes
# - Concurrent Users: 200
```

### 4. **Trigger por Issue**
```bash
# Crear issue con label "performance-test"
# El workflow se ejecuta automáticamente
# Los resultados se comentan en el issue
```

## Reportes y Artefactos

### Estructura de Reportes
```
GitHub Pages:
├── / (navegación principal)
├── /functional/karate-summary.html (tests funcionales)
└── /performance/karate-summary.html (tests de performance)
```

### Artefactos Generados
- **Tests Funcionales**: Reportes HTML nativos de Karate
- **Tests de Performance**: 
  - Reportes HTML nativos de Karate
  - Artefactos descargables (30 días de retención)
  - Resúmenes de ejecución en Markdown

## Configuración de GitHub

### 1. **Habilitar GitHub Pages**
- Settings > Pages > Source: "GitHub Actions"

### 2. **Configurar Permisos**
- Settings > Actions > General > Workflow permissions: "Read and write permissions"

### 3. **Configurar Environment** (opcional)
- Settings > Environments > Crear "github-pages"

### 4. **Configurar Labels** (para trigger por issues)
- Issues > Labels > Crear "performance-test"

## Monitoreo y Alertas

### 1. **Notificaciones Automáticas**
- Los tests de performance comentan automáticamente en issues
- Alertas especiales para tests de stress
- Resúmenes de ejecución con métricas clave

### 2. **Métricas de Seguimiento**
- Response times promedio, mínimo y máximo
- Throughput (requests/segundo)
- Error rates
- Percentiles (50th, 90th, 95th, 99th)

### 3. **Comparación de Resultados**
- Los reportes permiten comparar ejecuciones
- Identificación de tendencias de performance
- Detección de regresiones

## Ventajas de esta Configuración

### Para el Equipo de Desarrollo
- ✅ **Feedback Rápido**: Tests funcionales en cada commit
- ✅ **Sin Interrupciones**: Performance tests no bloquean desarrollo
- ✅ **Flexibilidad**: Tests de performance bajo demanda
- ✅ **Visibilidad**: Reportes organizados y accesibles
- ✅ **Simplicidad**: Sin dependencias adicionales de dashboard

### Para el Equipo de QA/Performance
- ✅ **Monitoreo Continuo**: Tests programados regulares
- ✅ **Configuración Flexible**: Parámetros personalizables
- ✅ **Análisis Detallado**: Reportes completos con métricas
- ✅ **Integración**: Resultados en GitHub Pages

### Para el Negocio
- ✅ **Calidad Garantizada**: Tests automáticos en cada cambio
- ✅ **Performance Monitoreada**: Detección temprana de problemas
- ✅ **Recursos Optimizados**: Tests de performance solo cuando es necesario
- ✅ **Transparencia**: Reportes públicos y accesibles

## Scripts Locales

### **run-performance-tests.bat**
- Script interactivo para ejecutar tests de performance localmente
- Menú con todas las opciones disponibles
- Configuración personalizable
- Apertura automática de reportes

## Troubleshooting

### Problemas Comunes

1. **Tests Funcionales Fallan**
   - Verificar cambios en el código
   - Revisar configuración de endpoints
   - Comprobar datos de prueba

2. **Tests de Performance No Se Ejecutan**
   - Verificar configuración de cron
   - Comprobar permisos de Actions
   - Revisar triggers del workflow

3. **Reportes No Se Actualizan**
   - Verificar configuración de GitHub Pages
   - Comprobar permisos de deployment
   - Revisar logs del workflow

### Logs y Debugging
- **Actions**: Ver logs detallados de cada workflow
- **Artifacts**: Descargar reportes para análisis offline
- **GitHub Pages**: Ver reportes publicados en tiempo real 