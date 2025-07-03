# 🚀 API Testing Project - Karate Framework

Este proyecto contiene tests automatizados para la API de tokens utilizando el framework Karate.

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
└── karate-config.js                # Configuración global de Karate
```

## 🏷️ Tags de Organización

Los escenarios están organizados con tags para facilitar la ejecución selectiva:

- **@smoke**: Tests críticos para verificar funcionalidad básica
- **@positive**: Tests de casos exitosos
- **@negative**: Tests de casos de error
- **@boundary**: Tests de valores límite

## 🚀 Ejecución de Tests

### 📋 Comandos Generales

#### Ejecutar todos los tests:
```bash
mvn clean test
```

#### Ejecutar tests con reportes completos:
```bash
mvn clean verify
```

#### Ejecutar tests con paralelización:
```bash
mvn test -Dkarate.options="--threads 4"
```

### ✅ Tests Positivos (@positive)

#### Ejecutar solo tests positivos:
```bash
mvn test -Dkarate.options="--tags @positive"
```

#### Ejecutar tests positivos excluyendo negativos:
```bash
mvn test -Dkarate.options="--tags ~@negative"
```

#### Ejecutar tests positivos específicos por funcionalidad:
```bash
# Solo tests positivos de tokens
mvn test -Dkarate.options="--tags @positive --tags @tokens"

# Solo tests positivos de trading
mvn test -Dkarate.options="--tags @positive --tags @trading"

# Solo tests positivos de health check
mvn test -Dkarate.options="--tags @positive --tags @health"
```

### ❌ Tests Negativos (@negative)

#### Ejecutar solo tests negativos:
```bash
mvn test -Dkarate.options="--tags @negative"
```

#### Ejecutar tests negativos específicos:
```bash
# Tests negativos de tokens
mvn test -Dkarate.options="--tags @negative --tags @tokens"

# Tests negativos de trading
mvn test -Dkarate.options="--tags @negative --tags @trading"
```

#### Ejecutar tests negativos con detalle:
```bash
mvn test -Dkarate.options="--tags @negative --verbose"
```

### 🔥 Tests de Smoke (@smoke)

#### Ejecutar solo tests de smoke:
```bash
mvn test -Dkarate.options="--tags @smoke"
```

#### Ejecutar tests de smoke y positivos:
```bash
mvn test -Dkarate.options="--tags @smoke --tags @positive"
```

### 5. **Tests de Validación (@validation)**
- Validan estructura y calidad de datos
- Verifican ausencia de campos no deseados
- Comprueban integridad de respuestas

### 6. **Tests de Limpieza (@cleanup)**
- Detectan campos no deseados en respuestas
- Validan que no se incluyan campos internos
- Aseguran limpieza de datos expuestos

### 🎯 Tests por Categoría

#### Tests de Tokens:
```bash
# Todos los tests de tokens
mvn test -Dkarate.options="--tags @tokens"

# Solo tests positivos de tokens
mvn test -Dkarate.options="--tags @tokens --tags @positive"

# Solo tests negativos de tokens
mvn test -Dkarate.options="--tags @tokens --tags @negative"
```

#### Tests de Trading:
```bash
# Todos los tests de trading
mvn test -Dkarate.options="--tags @trading"

# Solo tests positivos de trading
mvn test -Dkarate.options="--tags @trading --tags @positive"

# Solo tests negativos de trading
mvn test -Dkarate.options="--tags @trading --tags @negative"
```

#### Tests de Health Check:
```bash
# Tests de health check
mvn test -Dkarate.options="--tags @health"
```

### 📁 Tests por Archivo Específico

#### Ejecutar tests específicos por archivo:
```bash
# Solo tests de lista de tokens
mvn test -Dtest=TokensEndpointsRunner#testTokenList

# Solo tests de metadata
mvn test -Dtest=TokensEndpointsRunner#testTokenMeta

# Solo tests de datos de token
mvn test -Dtest=TokensEndpointsRunner#testTokenData

# Solo tests de precio
mvn test -Dtest=TokensEndpointsRunner#testTokenPrice

# Solo tests de precios múltiples
mvn test -Dtest=TokensEndpointsRunner#testTokenPricesMulti

# Solo tests de variaciones de precios
mvn test -Dtest=TokensEndpointsRunner#testTokenPrices

# Solo tests de holders
mvn test -Dtest=TokensEndpointsRunner#testTokenHolders

# Solo tests de nuevos listados
mvn test -Dtest=TokensEndpointsRunner#testTokenNewListing

# Solo tests de OHLCV
mvn test -Dtest=TokensEndpointsRunner#testTradeOHLCV

# Solo tests de lista de trades
mvn test -Dtest=TokensEndpointsRunner#testTradeList

# Solo tests de health check
mvn test -Dtest=TokensEndpointsRunner#testHealthCheck
```

### 🔧 Comandos Avanzados

#### Ejecutar tests con configuración personalizada:
```bash
# Tests con timeout personalizado
mvn test -Dkarate.options="--tags @positive --timeout 30000"

# Tests con reportes detallados
mvn test -Dkarate.options="--tags @positive --output html"

# Tests con filtro de nombre
mvn test -Dkarate.options="--tags @positive --name 'Token List'"
```

#### Ejecutar tests de validación de limpieza de datos:
```bash
# Validar que no hay campos no deseados en las respuestas
mvn test -Dkarate.options="--tags @validation --tags @cleanup"

# Validar limpieza de datos en todos los endpoints
mvn test -Dtest=TokensEndpointsRunner -Dkarate.options="--tags @cleanup"
```

#### Ejecutar tests en modo debug:
```bash
mvn test -Dkarate.options="--tags @positive --debug"
```

#### Ejecutar tests con configuración de entorno:
```bash
# Tests para entorno de desarrollo
mvn test -Dkarate.options="--tags @positive" -Dspring.profiles.active=dev

# Tests para entorno de staging
mvn test -Dkarate.options="--tags @positive" -Dspring.profiles.active=staging
```

### 📊 Combinaciones Útiles

#### Ejecutar tests críticos (smoke + positivos):
```bash
mvn test -Dkarate.options="--tags @smoke --tags @positive"
```

#### Ejecutar tests completos excluyendo negativos:
```bash
mvn test -Dkarate.options="--tags ~@negative"
```

#### Ejecutar tests de validación completa:
```bash
mvn test -Dkarate.options="--tags @positive --tags @boundary"
```

#### Ejecutar tests de rendimiento:
```bash
mvn test -Dkarate.options="--tags @performance --threads 8"
```

## 📊 Reportes

Después de la ejecución, los reportes se generan en:
- **Reporte HTML principal**: `target/karate-reports/karate-summary.html`
- **Reportes individuales**: `target/karate-reports/features.*.html`
- **Reportes Maven**: `target/surefire-reports/`

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

### 1. **Tests Positivos (@positive)**
- Verifican funcionalidad normal
- Validan respuestas exitosas
- Comprueban estructura de datos

### 2. **Tests Negativos (@negative)**
- Verifican manejo de errores
- Validan códigos de error apropiados
- Prueban parámetros inválidos

### 3. **Tests de Límites (@boundary)**
- Prueban valores mínimos y máximos
- Verifican comportamiento en extremos
- Validan restricciones de parámetros

### 4. **Tests de Smoke (@smoke)**
- Tests críticos para verificación rápida
- Funcionalidad básica esencial
- Ejecución prioritaria

### 5. **Tests de Validación (@validation)**
- Validan estructura y calidad de datos
- Verifican ausencia de campos no deseados
- Comprueban integridad de respuestas

### 6. **Tests de Limpieza (@cleanup)**
- Detectan campos no deseados en respuestas
- Validan que no se incluyan campos internos
- Aseguran limpieza de datos expuestos

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
mvn test -Dkarate.options="--tags @cleanup"

# Validaciones de limpieza y estructura
mvn test -Dkarate.options="--tags @validation"

# Validaciones específicas de tokens
mvn test -Dkarate.options="--tags @cleanup --tags @tokens"
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

## 🤝 Contribución

Para agregar nuevos tests:
1. Crear archivo `.feature` en la carpeta apropiada
2. Usar tags para categorización
3. Seguir convenciones de nomenclatura
4. Actualizar este README si es necesario 