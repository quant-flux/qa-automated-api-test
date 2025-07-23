# Performance Testing Structure

## Estructura de Performance Tests

### 1. **Performance Tests Centralizados**
- Ubicación: `src/test/resources/features/performance/`
- Archivos: 
  - `TokenDataPerformance.feature` - Tests de performance para endpoints de datos de tokens
  - `TokenDataPerformanceAdvanced.feature` - Tests avanzados de performance para datos de tokens
  - `TokenListPerformance.feature` - Tests de performance para listado de tokens
  - `TokenPricePerformance.feature` - Tests de performance para precios de tokens
  - `TokenPriceMultiPerformance.feature` - Tests de performance para precios múltiples de tokens
  - `TradeListPerformance.feature` - Tests de performance para listado de trades
  - `GlobalLoadTest.feature` - Tests de carga global cross-endpoints
  - `ProblematicEndpointsPerformance.feature` - Tests específicos para endpoints problemáticos
  - `ExtremeLoadPerformance.feature` - Tests de carga extrema y situaciones problemáticas
- Propósito: Todos los tests de performance centralizados en un directorio

### 2. **Configuración**
- Archivo: `src/test/resources/helpers/performance-config.js`
- Datos: `src/test/resources/data/performance/performance-test-data.json`
- Umbrales configurables para diferentes tipos de tests

### 3. **Tags de Performance**
Los tests están organizados con tags específicos para facilitar la ejecución y reportes:

#### **Categorías Principales:**
- `@performance` - Todos los tests de performance
- `@baseline` - Tests de línea base (tiempos normales)
- `@load` - Tests de carga (diferentes niveles de carga)
- `@stress` - Tests de estrés (carga máxima)
- `@endurance` - Tests de resistencia (carga prolongada)
- `@global` - Tests globales cross-endpoints
- `@advanced` - Tests avanzados con validaciones complejas
- `@critical` - Tests de endpoints críticos del sistema
- `@heavy_load` - Tests de carga pesada y grandes volúmenes
- `@bottleneck` - Tests de puntos de estrangulamiento
- `@high_latency` - Tests de latencia alta
- `@resource_intensive` - Tests de uso intensivo de recursos

#### **Subcategorías de Carga:**
- `@light` - Carga ligera
- `@medium` - Carga media
- `@heavy` - Carga pesada
- `@configured` - Carga configurada desde JSON

## Ejecución de Tests

### **Runners Disponibles:**

#### 1. **PerformanceTestRunner** - Tests individuales
```bash
# Todos los tests de performance
mvn test -Dtest=PerformanceTestRunner#testAllPerformance

# Tests específicos
mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance
mvn test -Dtest=PerformanceTestRunner#testGlobalPerformance
```

#### 2. **PerformanceTestRunner** - Tests individuales y agrupados
```bash
# Tests de baseline
mvn test -Dtest=PerformanceTestRunner#generateBaselinePerformanceReport

# Tests de carga
mvn test -Dtest=PerformanceTestRunner#generateLoadPerformanceReport

# Tests de estrés
mvn test -Dtest=PerformanceTestRunner#generateStressPerformanceReport

# Tests de endurance
mvn test -Dtest=PerformanceTestRunner#generateEndurancePerformanceReport

# Tests avanzados
mvn test -Dtest=PerformanceTestRunner#generateAdvancedPerformanceReport

# Tests configurables
mvn test -Dtest=PerformanceTestRunner#testCustomThreshold
mvn test -Dtest=PerformanceTestRunner#testHighLoad
mvn test -Dtest=PerformanceTestRunner#testStressLoad
```

### **Scripts de Conveniencia:**
```bash
# Generar todos los reportes de performance organizados
scripts/generate-performance-reports.bat

# Tests específicos por categoría
scripts/run-categorized-performance-tests.bat

# Generar reportes de tests funcionales
scripts/generate-functional-reports.bat
```

## Reportes HTML

### **Estructura de Reportes:**
```
target/karate-reports/
├── functional/                  # Tests funcionales (sin performance)
│   ├── index.html              # Reporte principal consolidado
│   ├── smoke/                  # Smoke tests
│   ├── positive/               # Casos positivos
│   ├── negative/               # Casos negativos
│   ├── tokens/                 # Features de tokens
│   ├── trade/                  # Features de trading
│   └── app/                    # Features de aplicación
└── performance/                 # Reportes por categorías de performance
    ├── index.html              # Reporte principal consolidado
    ├── baseline/               # Tests de baseline
    ├── load/                   # Tests de carga
    ├── stress/                 # Tests de estrés
    ├── endurance/              # Tests de endurance
    ├── advanced/               # Tests avanzados
    ├── token-data/             # Performance de token data
    ├── token-list/             # Performance de token list
    ├── token-price/            # Performance de token price
    ├── trade-list/             # Performance de trade list
    └── global-load/            # Tests de carga global
```

### **Acceso a Reportes:**
- **Tests Funcionales:** `target/karate-reports/functional/index.html`
- **Tests de Performance:** `target/karate-reports/performance/index.html`
- **Reportes por Categoría:** `target/karate-reports/functional/[categoria]/karate-summary.html`
- **Reportes de Performance:** `target/karate-reports/performance/[categoria]/karate-summary.html`

### **Ventajas de la Organización:**
1. **Separación Clara:** Los tests de performance aparecen agrupados en el reporte
2. **Análisis Focalizado:** Puedes revisar solo los tests de performance sin ruido
3. **Comparación por Categorías:** Fácil comparar resultados entre diferentes tipos de tests
4. **Reportes Específicos:** Cada categoría tiene su propio reporte HTML
5. **Integración Completa:** Los reportes de performance están integrados en la estructura general de reportes
6. **Navegación Intuitiva:** Página de índice con navegación visual entre categorías
7. **Reportes Organizados:** Tests agrupados por directorios y tags

## Configuración de Umbrales

### **Umbrales Disponibles:**
- `FAST`: 1000ms (respuesta rápida)
- `NORMAL`: 2000ms (respuesta normal)
- `SLOW`: 5000ms (respuesta lenta)
- `VERY_SLOW`: 10000ms (respuesta muy lenta)

### **Configuración:**
Los umbrales se configuran en `performance-test-data.json` y se acceden mediante `performanceConfig.getThreshold('NOMBRE')`

## Mejores Prácticas

1. **Ejecutar Baseline Primero:** Siempre ejecuta tests de baseline antes de load/stress
2. **Revisar Umbrales:** Ajusta los umbrales según la realidad de tu API
3. **Monitorear Tendencias:** Compara reportes entre ejecuciones
4. **Usar Tags Específicos:** Ejecuta solo las categorías que necesitas
5. **Documentar Cambios:** Actualiza umbrales cuando cambie la infraestructura
6. **Usar Reportes Organizados:** Aprovecha la navegación por categorías para análisis más eficiente

## Archivos de Performance

### **Tests Específicos por Endpoint:**
- `TokenDataPerformance.feature` - Performance de `/token/data`
- `TokenDataPerformanceAdvanced.feature` - Performance avanzada de `/token/data` con múltiples escenarios
- `TokenListPerformance.feature` - Performance de `/token/list`
- `TokenPricePerformance.feature` - Performance de `/token/price`
- `TokenPriceMultiPerformance.feature` - Performance de `/token/price/multi`
- `TradeListPerformance.feature` - Performance de `/trade/list`

### **Tests Globales:**
- `GlobalLoadTest.feature` - Carga general del sistema

### **Tests de Endpoints Críticos:**
- `CriticalEndpointsPerformance.feature` - Tests para endpoints críticos del sistema:
  - `/token/price` - Precio de tokens (funcionalidad core)
  - `/token/data` - Datos de tokens (funcionalidad core)
  - `/token/list` - Lista de tokens (funcionalidad core)
  - `/trade/list` - Lista de trades (funcionalidad core)
  - Concurrencia de endpoints críticos
  - Disponibilidad 24/7

### **Tests de Carga Pesada:**
- `HeavyLoadEndpointsPerformance.feature` - Tests para endpoints con grandes volúmenes de datos:
  - `/token/prices/multi` - Múltiples tokens con variaciones de precio
  - `/token/price/multi` - Múltiples tokens con precios actuales
  - `/token/list` - Paginación máxima
  - `/token/holders` - Grandes datasets
  - `/token/new_listing` - Grandes datasets
  - Procesamiento de volúmenes de datos
  - Tests de throughput

### **Tests de Puntos de Estrangulamiento:**
- `BottleneckEndpointsPerformance.feature` - Tests para identificar bottlenecks:
  - `/trade/ohlcv/` - Datos OHLCV (datasets grandes)
  - `/token/trending` - Cálculos complejos
  - Queries complejas de base de datos
  - Operaciones intensivas en memoria
  - Operaciones intensivas en CPU
  - Operaciones intensivas en red
  - Detección de bottlenecks

### **Tests de Latencia Alta:**
- `HighLatencyEndpointsPerformance.feature` - Tests para endpoints con latencia alta:
  - Llamadas a APIs externas
  - Operaciones lentas de base de datos
  - Cache miss scenarios
  - Delays de red
  - Latencia geográfica
  - Análisis de patrones de latencia
  - Detección de degradación de latencia
  - Escenarios de timeout

### **Tests de Uso Intensivo de Recursos:**
- `ResourceIntensiveEndpointsPerformance.feature` - Tests para endpoints que consumen muchos recursos:
  - Operaciones intensivas en memoria
  - Operaciones intensivas en CPU
  - Operaciones intensivas en disco I/O
  - Operaciones intensivas en ancho de banda de red
  - Operaciones intensivas en conexiones de BD
  - Operaciones concurrentes de recursos
  - Agotamiento de recursos
  - Detección de memory leaks
  - Monitoreo de uso de recursos

## Tags de Performance

### **Por Tipo:**
- `@performance` - Todos los tests de performance
- `@baseline` - Performance baseline
- `@load` - Load testing
- `@stress` - Stress testing
- `@endurance` - Endurance testing

### **Por Intensidad:**
- `@light` - Carga ligera
- `@medium` - Carga media
- `@heavy` - Carga pesada

### **Por Alcance:**
- `@global` - Tests globales
- `@specific` - Tests específicos por endpoint

## Ejecución

### **Ejecutar todos los performance tests:**
```bash
mvn test -Dtest=PerformanceTestRunner#testAllPerformance
```

### **Ejecutar tests específicos:**
```bash
# Solo tests de tokens
mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
mvn test -Dtest=PerformanceTestRunner#testTokenListPerformance
mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance

# Solo tests de trades
mvn test -Dtest=PerformanceTestRunner#testTradeListPerformance

# Solo tests globales
mvn test -Dtest=PerformanceTestRunner#testGlobalPerformance
```

### **Ejecutar por intensidad:**
```bash
# Solo tests ligeros
mvn test -Dtest=PerformanceTestRunner#testLightPerformance

# Solo tests medios
mvn test -Dtest=PerformanceTestRunner#testMediumPerformance

# Solo tests pesados
mvn test -Dtest=PerformanceTestRunner#testHeavyPerformance
```

### **Ejecutar por tags:**
```bash
# Solo baseline
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @baseline"

# Solo load tests
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @load"

# Solo stress tests
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @stress"

# Solo endpoints críticos
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @critical"

# Solo carga pesada
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @heavy_load"

# Solo puntos de estrangulamiento
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @bottleneck"

# Solo latencia alta
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @high_latency"

# Solo uso intensivo de recursos
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @resource_intensive"
```

### **Ejecutar tests específicos por categoría:**
```bash
# Todos los endpoints críticos
mvn test -Dtest=PerformanceTestRunner#testCriticalEndpointsPerformance

# Todos los tests de carga pesada
mvn test -Dtest=PerformanceTestRunner#testHeavyLoadEndpointsPerformance

# Todos los tests de puntos de estrangulamiento
mvn test -Dtest=PerformanceTestRunner#testBottleneckEndpointsPerformance

# Todos los tests de latencia alta
mvn test -Dtest=PerformanceTestRunner#testHighLatencyEndpointsPerformance

# Todos los tests de uso intensivo de recursos
mvn test -Dtest=PerformanceTestRunner#testResourceIntensiveEndpointsPerformance

# Endpoint específico por categoría
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @trade_ohlcv"
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @token_trending"
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @token_prices_multi"
```

## Reportes de Performance

### **Reportes Separados:**
Los tests de performance generan reportes separados en directorios específicos:

```
target/karate-reports/performance/
├── token-data/                    # Reportes de TokenDataPerformance
├── token-data-advanced/           # Reportes de TokenDataPerformanceAdvanced
├── token-list/                    # Reportes de TokenListPerformance
├── token-price/                   # Reportes de TokenPricePerformance
├── trade-list/                    # Reportes de TradeListPerformance
├── global/                        # Reportes de GlobalLoadTest
├── light-load/                    # Reportes de tests ligeros
├── medium-load/                   # Reportes de tests medios
└── heavy-load/                    # Reportes de tests pesados
```

### **Acceso a Reportes:**
- **Reporte General:** `target/karate-reports/karate-summary.html`
- **Reportes de Performance:** `target/karate-reports/performance/[tipo]/karate-summary.html`
- **Reporte Específico:** `target/karate-reports/performance/token-price/karate-summary.html`

### **Ventajas de Reportes Separados:**
1. **Organización Clara:** Cada tipo de test tiene su propio directorio de reportes
2. **Fácil Navegación:** Reportes específicos por funcionalidad
3. **Análisis Detallado:** Permite analizar performance por endpoint
4. **Comparación:** Facilita comparar performance entre diferentes tipos de tests

## Thresholds de Performance

### **Response Time Thresholds:**
- **FAST**: < 500ms
- **NORMAL**: < 1000ms
- **SLOW**: < 2000ms
- **TIMEOUT**: < 5000ms

### **Load Configurations:**
- **LIGHT**: 10 concurrent users, 30s duration
- **MEDIUM**: 50 concurrent users, 60s duration
- **HEAVY**: 100 concurrent users, 120s duration

### **Stress Configurations:**
- **MODERATE**: 200 concurrent users, 300s duration
- **HIGH**: 500 concurrent users, 600s duration

## Monitoreo y Reportes

Los tests de performance generan reportes que incluyen:
- Response times promedio, mínimo y máximo
- Throughput (requests/segundo)
- Error rates
- Percentiles (50th, 90th, 95th, 99th)

## Estructura de Datos

Los tests utilizan datos centralizados en:
- `src/test/resources/data/performance/performance-test-data.json` - Umbrales y configuraciones
- `src/test/resources/data/tokens/token-addresses.json` - Direcciones de tokens para testing

## Ejemplos de Uso

### **Ejecutar y Analizar Performance de Token Price:**
```bash
# Ejecutar test específico
mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance

# Ver reporte específico
# Abrir: target/karate-reports/performance/token-price/karate-summary.html
```

### **Ejecutar Todos los Tests de Performance:**
```bash
# Ejecutar todos los tests
mvn test -Dtest=PerformanceTestRunner#testAllPerformance

# Ver reporte general
# Abrir: target/karate-reports/performance/karate-summary.html
```

### **Comparar Performance por Intensidad:**
```bash
# Ejecutar tests ligeros
mvn test -Dtest=PerformanceTestRunner#testLightPerformance

# Ejecutar tests pesados
mvn test -Dtest=PerformanceTestRunner#testHeavyPerformance

# Comparar reportes en:
# target/karate-reports/performance/light-load/
# target/karate-reports/performance/heavy-load/
``` 