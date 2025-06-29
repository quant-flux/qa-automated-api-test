# 📁 Estructura de Datos de Prueba

Este directorio contiene todos los datos de prueba organizados por categorías para mantener el código limpio y mantenible.

## 🗂️ Estructura de Directorios

```
data/
├── api/
│   └── endpoints.json              # Configuración de endpoints de la API
├── tokens/
│   ├── token-addresses.json        # Direcciones de tokens válidos e inválidos
│   └── pagination-params.json      # Parámetros de paginación y ordenamiento
├── trading/
│   ├── ohlcv-params.csv           # Parámetros para endpoints OHLCV
│   └── trade-addresses.json       # Pares de trading
└── test-data/
    └── expected-responses.json     # Respuestas esperadas de la API
```

## 📋 Descripción de Archivos

### 🔗 API (`api/`)
- **endpoints.json**: Contiene todas las rutas de endpoints, headers y timeouts

### 🪙 Tokens (`tokens/`)
- **token-addresses.json**: Direcciones de tokens para testing (válidos e inválidos)
- **pagination-params.json**: Parámetros de paginación, límites y opciones de ordenamiento

### 📊 Trading (`trading/`)
- **ohlcv-params.csv**: Parámetros para testing de endpoints OHLCV (intervalos, formatos, etc.)
- **trade-addresses.json**: Pares de trading y direcciones relacionadas

### 🧪 Test Data (`test-data/`)
- **expected-responses.json**: Estructuras de respuestas esperadas para validación

## 🚀 Uso en Features

Los datos se cargan automáticamente en `karate-config.js` y están disponibles a través de funciones helper:

```javascript
// Obtener token válido
getValidToken(0)

// Obtener parámetros de paginación
getPaginationParams('valid_pages', 0)

// Obtener parámetros OHLCV
getOHLCVParams(0)

// Obtener endpoint
getEndpoint('token_list')

// Obtener respuesta esperada
getExpectedResponse('token_list_response')
```

## 🔧 Mantenimiento

Para agregar nuevos datos:
1. Identifica la categoría apropiada
2. Agrega los datos al archivo correspondiente
3. Actualiza las funciones helper en `karate-config.js` si es necesario
4. Actualiza los features que usen esos datos

Esta estructura permite escalar fácilmente el proyecto manteniendo la organización y legibilidad del código.

# Terminología Estandarizada para Tests de API

## Tipos de Direcciones de Token

### 1. **Valid Address** (Dirección Válida)
- **Descripción**: Dirección de token que existe en la blockchain y tiene datos válidos
- **Ejemplo**: `Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP`
- **Comportamiento esperado**: Status 200 con datos del token

### 2. **Invalid Address Format** (Formato de Dirección Inválido)
- **Descripción**: Dirección con formato incorrecto que no cumple con el estándar Base58
- **Ejemplo**: `invalid_address_123`
- **Comportamiento esperado**: Status 200 con mensaje de error interno

### 3. **Empty Address** (Dirección Vacía)
- **Descripción**: String vacío como dirección
- **Ejemplo**: `""`
- **Comportamiento esperado**: Status 404 (recurso no encontrado)

### 4. **Non-existent Address** (Dirección Inexistente)
- **Descripción**: Dirección con formato válido pero que no existe en la blockchain
- **Ejemplo**: `11111111111111111111111111111111`
- **Comportamiento esperado**: Status 200 con mensaje de error interno

## Convenciones de Nomenclatura en Features

### Scenarios Positivos:
- `Get [resource] for valid address`
- `Get [resource] for another valid address`

### Scenarios Negativos:
- `Get [resource] for invalid address format`
- `Get [resource] for empty address`
- `Get [resource] for non-existent address`

## Archivos JSON de Datos

### `token-addresses.json`
Contiene las direcciones organizadas por tipo:
- `valid_tokens`: Array de tokens válidos
- `invalid_tokens`: Array de tokens inválidos con tipo y error esperado

### Uso en Features
```javascript
* def tokenAddresses = read('classpath:data/tokens/token-addresses.json')
* def validAddress = tokenAddresses.valid_tokens[0].address
* def invalidAddress = tokenAddresses.invalid_tokens[0].address
``` 