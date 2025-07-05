# 🚀 API Testing Project - Karate Framework

Este proyecto contiene tests automatizados para la API de tokens utilizando el framework Karate, con una arquitectura moderna que separa tests funcionales y de performance.

## 📁 Estructura del Proyecto

```
src/test/resources/features/
├── app/
│   └── HealthCheck.feature          # Health check endpoint
├── tokens/
│   ├── TokenList.feature           # Lista de tokens con filtros y paginación
│   ├── TokenMeta.feature           # Metadata de tokens
│   ├── TokenData.feature           # Datos completos de tokens
│   ├── TokenPrice.feature          # Precio actual de tokens
│   ├── TokenPrices.feature         # Variaciones de precios de un token
│   ├── TokenPricesMulti.feature    # Precios múltiples de tokens
│   ├── TokenHolders.feature        # Holders de tokens
│   └── TokenNewListing.feature     # Nuevos listados de tokens
├── trade/
│   ├── TradeOHLCV.feature          # Datos OHLCV para trading
│   └── TradeList.feature           # Lista de trades recientes
├── performance/                     # Tests de performance
│   ├── TokenDataPerformance.feature
│   ├── TokenListPerformance.feature
│   ├── TokenPricePerformance.feature
│   ├── TradeListPerformance.feature
│   └── GlobalLoadTest.feature
└── karate-config.js                # Configuración global de Karate
```

## 🏗️ Arquitectura de Testing

El proyecto utiliza una **arquitectura moderna y simplificada** con dos runners principales:

### **🎯 FunctionalTestRunner**
- **Propósito**: Tests funcionales (rápidos, se ejecutan en cada commit)
- **Ubicación**: `src/test/java/runners/FunctionalTestRunner.java`
- **Reportes**: `target/karate-reports/functional/`

### **⚡ PerformanceTestRunner**
- **Propósito**: Tests de performance (lentos, se ejecutan bajo demanda)
- **Ubicación**: `src/test/java/runners/PerformanceTestRunner.java`
- **Reportes**: `target/karate-reports/performance/`

## 🏷️ Tags de Organización

Los escenarios están organizados con tags para facilitar la ejecución selectiva:

### **Tests Funcionales:**
- **@smoke**: Tests críticos para verificar funcionalidad básica
- **@positive**: Tests de casos exitosos
- **@negative**: Tests de casos de error
- **@boundary**: Tests de valores límite
- **@validation**: Tests de validación de estructura de datos
- **@cleanup**: Tests de limpieza de datos

### **Tests de Performance:**
- **@performance**: Todos los tests de performance
- **@baseline**: Tests de línea base
- **@load**: Tests de carga
- **@stress**: Tests de estrés
- **@endurance**: Tests de resistencia
- **@light**: Carga ligera
- **@medium**: Carga media
- **@heavy**: Carga pesada

## 🚀 Ejecución de Tests

### **📋 Tests Funcionales**

#### Ejecutar todos los tests funcionales:
```bash
mvn test -Dtest=FunctionalTestRunner#testAllFunctional
```

#### Ejecutar tests específicos:
```bash
# Solo smoke tests (más rápido)
mvn test -Dtest=FunctionalTestRunner#testSmokeTests

# Solo tests positivos
mvn test -Dtest=FunctionalTestRunner#testPositiveScenarios

# Solo tests negativos
mvn test -Dtest=FunctionalTestRunner#testNegativeScenarios

# Tests por módulo
mvn test -Dtest=FunctionalTestRunner#testTokenFeatures
mvn test -Dtest=FunctionalTestRunner#testTradeFeatures
mvn test -Dtest=FunctionalTestRunner#testAppFeatures

# Tests por feature específico
mvn test -Dtest=FunctionalTestRunner#testTokenData
mvn test -Dtest=FunctionalTestRunner#testTokenList
mvn test -Dtest=FunctionalTestRunner#testTokenPrice
mvn test -Dtest=FunctionalTestRunner#testTradeList
```

### **⚡ Tests de Performance**

#### Ejecutar todos los tests de performance:
```bash
mvn test -Dtest=PerformanceTestRunner#testAllPerformance
```

#### Ejecutar tests específicos de performance:
```bash
# Tests por intensidad
mvn test -Dtest=PerformanceTestRunner#testLightPerformance
mvn test -Dtest=PerformanceTestRunner#testMediumPerformance
mvn test -Dtest=PerformanceTestRunner#testHeavyPerformance

# Tests por endpoint
mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
mvn test -Dtest=PerformanceTestRunner#testTokenListPerformance
mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance
mvn test -Dtest=PerformanceTestRunner#testTradeListPerformance

# Tests agrupados
mvn test -Dtest=PerformanceTestRunner#generateBaselinePerformanceReport
mvn test -Dtest=PerformanceTestRunner#generateLoadPerformanceReport
mvn test -Dtest=PerformanceTestRunner#generateStressPerformanceReport
```

### **📊 Scripts de Conveniencia**

#### Generar reportes funcionales:
```bash
scripts/generate-functional-reports.bat
```

#### Generar reportes de performance:
```bash
scripts/generate-performance-reports.bat
```

### **🔧 Comandos Avanzados**

#### Ejecutar tests con configuración personalizada:
```bash
# Tests con paralelización
mvn test -Dtest=FunctionalTestRunner#testAllFunctional -Dkarate.options="--threads 4"

# Tests con timeout personalizado
mvn test -Dtest=FunctionalTestRunner#testAllFunctional -Dkarate.options="--timeout 30000"

# Tests en modo debug
mvn test -Dtest=FunctionalTestRunner#testAllFunctional -Dkarate.options="--debug"
```

## 📊 Reportes

### **Estructura de Reportes:**
```
target/karate-reports/
├── index.html                     # Reporte principal general
├── functional/                    # Tests funcionales
│   ├── index.html                # Reporte principal consolidado
│   ├── complete/                 # Reporte completo
│   ├── smoke/                    # Smoke tests
│   ├── positive/                 # Casos positivos
│   ├── negative/                 # Casos negativos
│   ├── tokens/                   # Features de tokens
│   ├── trade/                    # Features de trading
│   └── app/                      # Features de aplicación
└── performance/                   # Tests de performance
    ├── index.html                # Reporte principal consolidado
    ├── baseline/                 # Tests de baseline
    ├── load/                     # Tests de carga
    ├── stress/                   # Tests de estrés
    ├── endurance/                # Tests de resistencia
    ├── advanced/                 # Tests avanzados
    ├── token-data/               # Performance de token data
    ├── token-list/               # Performance de token list
    ├── token-price/              # Performance de token price
    ├── trade-list/               # Performance de trade list
    └── global-load/              # Tests de carga global
```

### **Acceso a Reportes:**
- **Reporte Principal**: `target/karate-reports/index.html`
- **Tests Funcionales**: `target/karate-reports/functional/complete/index.html`
- **Tests de Performance**: `target/karate-reports/performance/index.html`

## 🔧 Configuración

### URL Base
La URL base se configura en `src/test/resources/karate-config.js`:
```javascript
function fn() {
  return {
    baseUrl: 'https://full-api.cloud-service-app.com/api'
  };
}
```

### Endpoints Cubiertos

Basado en la [documentación de la API](https://full-api.cloud-service-app.com/api-json):

#### 🏥 App Endpoints
- `GET /` - Health check

#### 🪙 Token Endpoints
- `GET /token/list` - Lista de tokens con filtros
- `GET /token/meta/{address}` - Metadata de token
- `GET /token/data/{address}` - Datos completos de token
- `GET /token/price/{address}` - Precio actual
- `GET /token/prices/{address}` - Variaciones de precios
- `GET /token/prices/multi` - Precios múltiples
- `GET /token/holders/{address}` - Holders de token

#### 📈 Trade Endpoints
- `GET /trade/ohlcv/{address}` - Datos OHLCV
- `GET /trade/list/{address}` - Lista de trades

## 🧪 Tipos de Tests

### **Tests Funcionales**
1. **Tests Positivos (@positive)**: Verifican funcionalidad normal
2. **Tests Negativos (@negative)**: Verifican manejo de errores
3. **Tests de Límites (@boundary)**: Prueban valores mínimos y máximos
4. **Tests de Smoke (@smoke)**: Tests críticos para verificación rápida
5. **Tests de Validación (@validation)**: Validan estructura y calidad de datos
6. **Tests de Limpieza (@cleanup)**: Detectan campos no deseados

### **Tests de Performance**
1. **Tests de Baseline (@baseline)**: Tiempos de respuesta normales
2. **Tests de Carga (@load)**: Diferentes niveles de carga
3. **Tests de Estrés (@stress)**: Carga máxima del sistema
4. **Tests de Resistencia (@endurance)**: Carga prolongada
5. **Tests Avanzados (@advanced)**: Validaciones complejas

## 📋 Casos de Uso Cubiertos

### Token List
- ✅ Paginación (page, limit)
- ✅ Filtros (name, symbol, created_on, created_time)
- ✅ Ordenamiento (sort_by, order)
- ✅ Casos límite y errores

### Token Metadata/Data
- ✅ Datos básicos de tokens
- ✅ Información de mercado
- ✅ Manejo de direcciones inválidas

### Price Endpoints
- ✅ Precio actual individual
- ✅ Variaciones de precios
- ✅ Precios múltiples (hasta 10 tokens)
- ✅ Diferentes intervalos de tiempo

### Trading Data
- ✅ Datos OHLCV con diferentes intervalos
- ✅ Lista de trades recientes
- ✅ Diferentes formatos de precio

## 🔍 Validaciones Implementadas

- ✅ Códigos de estado HTTP
- ✅ Estructura de respuesta JSON
- ✅ Tipos de datos correctos
- ✅ Campos requeridos presentes
- ✅ Manejo de errores apropiado
- ✅ Validación de parámetros
- ✅ Ausencia de campos no deseados
- ✅ Tiempos de respuesta (performance)

## 🧹 Validaciones de Limpieza de Datos

### Funciones de Validación Disponibles:

#### `validateNoUnwantedFields(responseData)`
Valida que un objeto de respuesta no contenga campos no deseados:
- `_id`
- `deleted`
- `poolId`
- `isAmm`
- `isToken2022`

#### `validateNoUnwantedFieldsInArray(responseArray)`
Valida que un array de respuestas no contenga campos no deseados en ninguno de sus elementos.

#### `validatePriceVariationsFields(responseData)`
Valida que un objeto de respuesta contenga todos los campos de precio y variaciones:
- `address`, `price`
- `price_5m`, `percent_5m`, `volume_5m`
- `price_30m`, `percent_30m`, `volume_30m`
- `price_1h`, `percent_1h`, `volume_1h`
- `price_6h`, `percent_6h`, `volume_6h`
- `price_24h`, `percent_24h`, `volume_24h`

#### `validateBasicTokenFields(responseData)`
Valida campos básicos de un token:
- `address`, `name`, `symbol`, `decimals`

#### `validateTokenDataFields(responseData)`
Valida todos los campos completos de datos de token:
- `address`, `name`, `symbol`, `image`, `decimals`
- `creator`, `create_tx`, `created_time`
- `total_supply`, `supply`, `holders`
- `price`, `volume_24h`, `market_cap`, `price_change_24h`

### Uso en Features:
```gherkin
@validation @cleanup
Scenario: Validate no unwanted fields are present
  * url baseUrl + getEndpoint('token_data') + getValidToken(0).address
  When method get
  Then status 200
  And match response.status == 'success'
  And def validationResult = validateNoUnwantedFields(response.data)
  And match validationResult == true

@smoke @positive
Scenario: Get price variations for single token
  * url baseUrl + getEndpoint('token_prices') + getValidToken(0).address
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data.address == getValidToken(0).address
  And def validationResult = validatePriceVariationsFields(response.data)
  And match validationResult == true
```

### Comandos para Ejecutar Validaciones:
```bash
# Solo validaciones de limpieza
mvn test -Dtest=FunctionalTestRunner#testAllFunctional -Dkarate.options="--tags @cleanup"

# Validaciones de limpieza y estructura
mvn test -Dtest=FunctionalTestRunner#testAllFunctional -Dkarate.options="--tags @validation"

# Validaciones específicas de tokens
mvn test -Dtest=FunctionalTestRunner#testTokenFeatures -Dkarate.options="--tags @cleanup"
```

## 🛠️ Tecnologías Utilizadas

- **Karate Framework**: Framework de testing API
- **Maven**: Gestión de dependencias y build
- **JUnit 5**: Framework de testing
- **Java 17**: Lenguaje de programación

## 📝 Notas Importantes

1. **Direcciones de Tokens**: Los tests usan direcciones reales de la API
2. **Datos Dinámicos**: Algunos valores pueden variar entre ejecuciones
3. **Rate Limiting**: Considerar límites de la API en ejecuciones masivas
4. **Configuración**: Verificar URL base antes de ejecutar tests
5. **Separación de Tests**: Los tests funcionales y de performance están completamente separados
6. **Reportes Organizados**: Cada tipo de test tiene su propia estructura de reportes

## 🤝 Contribución

Para agregar nuevos tests:
1. Crear archivo `.feature` en la carpeta apropiada (`tokens/`, `trade/`, `app/`, o `performance/`)
2. Usar tags para categorización
3. Seguir convenciones de nomenclatura
4. Actualizar este README si es necesario
5. Usar los runners apropiados (`FunctionalTestRunner` o `PerformanceTestRunner`)

## 📚 Documentación Adicional

- **Runners**: Ver `src/test/java/runners/README.md` para detalles de los runners
- **Datos de Prueba**: Ver `src/test/resources/data/README.md` para estructura de datos
- **Performance**: Ver `src/test/resources/features/performance/README.md` para tests de performance 