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
│   └── TokenHolders.feature        # Holders de tokens
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

### Ejecutar todos los tests:
```bash
mvn clean test
```

### Ejecutar tests específicos por tags:
```bash
# Solo tests de smoke
mvn test -Dkarate.options="--tags @smoke"

# Solo tests positivos
mvn test -Dkarate.options="--tags @positive"

# Excluir tests negativos
mvn test -Dkarate.options="--tags ~@negative"
```

### Ejecutar tests específicos por archivo:
```bash
# Solo tests de lista de tokens
mvn test -Dtest=TokensEndpointsRunner#testTokenList

# Solo tests de metadata
mvn test -Dtest=TokensEndpointsRunner#testTokenMeta
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