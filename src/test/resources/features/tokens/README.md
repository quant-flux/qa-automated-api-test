# Token Features

Esta carpeta contiene todos los features de prueba para los endpoints relacionados con tokens.

## Features Disponibles

### TokenPriceMulti.feature
- **Endpoint**: `/token/price/multi`
- **Descripción**: Pruebas para el endpoint que obtiene datos de precio para múltiples tokens
- **Casos de prueba**:
  - ✅ Múltiples tokens (2-3 tokens)
  - ✅ Token único
  - ✅ Máximo de tokens (10)
  - ✅ Casos negativos (sin parámetros, array vacío, más de 10 tokens)
  - ✅ Direcciones inválidas e inexistentes
  - ✅ Validación de estructura de datos
  - ✅ Casos edge (direcciones duplicadas, mezcla de válidas/inválidas)

### TokenPricesMulti.feature
- **Endpoint**: `/token/prices/multi`
- **Descripción**: Pruebas para el endpoint que obtiene variaciones de precio para múltiples tokens
- **Casos de prueba**:
  - ✅ Múltiples tokens (2-3 tokens)
  - ✅ Token único
  - ✅ Máximo de tokens (10)
  - ✅ Casos negativos (sin parámetros, array vacío, más de 10 tokens)
  - ✅ Direcciones inválidas e inexistentes

### Otros Features
- `TokenData.feature` - Datos básicos de tokens
- `TokenList.feature` - Lista de tokens con paginación y filtros
- `TokenPrice.feature` - Precio de un token individual
- `TokenPrices.feature` - Variaciones de precio de un token
- `TokenMeta.feature` - Metadatos de tokens
- `TokenHolders.feature` - Holders de tokens
- `TokenNewListing.feature` - Nuevos listados de tokens
- `TokenTrending.feature` - Tokens trending
- `TokenDataValidation.feature` - Validaciones específicas de datos

## Diferencias entre Endpoints

### `/token/price/multi` vs `/token/prices/multi`

| Aspecto | `/token/price/multi` | `/token/prices/multi` |
|---------|---------------------|----------------------|
| **Propósito** | Datos de precio completos | Variaciones de precio |
| **Campos principales** | `price`, `market_cap`, `volume_24h`, `supply` | `price_5m`, `price_30m`, `price_1h`, `price_6h`, `price_24h` |
| **Información temporal** | Datos actuales | Variaciones en diferentes períodos |
| **Campos adicionales** | `ath`, `atl`, `roi`, `circulating_supply` | `percent_5m`, `percent_30m`, `percent_1h`, `percent_6h`, `percent_24h` |

## Ejecución de Pruebas

### Pruebas Funcionales
```bash
# Ejecutar todos los features de tokens
mvn test -Dtest=FunctionalTestRunner#testTokenFeatures

# Ejecutar solo el nuevo feature
mvn test -Dtest=FunctionalTestRunner#testAllFunctional
```

### Pruebas de Performance
```bash
# Ejecutar pruebas de performance del nuevo endpoint
mvn test -Dtest=PerformanceTestRunner#testTokenPriceMultiPerformance

# Ejecutar todas las pruebas de performance
mvn test -Dtest=PerformanceTestRunner#testAllPerformance
```

## Configuración

Los parámetros de prueba se encuentran en:
- `src/test/resources/data/tokens/token-price-multi-params.json` - Para `/token/price/multi`
- `src/test/resources/data/tokens/token-prices-multi-params.json` - Para `/token/prices/multi`

Las funciones helper están definidas en:
- `src/test/resources/karate-config.js` - Funciones `getTokenPriceMultiAddresses()` y `validateTokenPriceMultiFields()` 