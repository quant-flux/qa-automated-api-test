# 📊 Tests de Rendimiento - API de Tokens y Trading

## 📋 Resumen Ejecutivo

Este documento describe la suite completa de tests de rendimiento implementada para la API de Tokens y Trading. Los tests están diseñados para validar el comportamiento de la API bajo diferentes condiciones de carga y estrés, asegurando que cumpla con los umbrales de rendimiento establecidos.

**🚀 ÚLTIMA ACTUALIZACIÓN**: Julio 2024 - Implementadas mejoras avanzadas con thresholds específicos por endpoint, métricas de percentiles y validaciones de throughput.

## 🎯 Objetivos de los Tests de Rendimiento

### Objetivos Principales
- **Validar tiempos de respuesta** bajo diferentes cargas
- **Identificar cuellos de botella** en endpoints críticos
- **Asegurar escalabilidad** de la API
- **Detectar degradación** de rendimiento bajo estrés
- **Validar estabilidad** en condiciones extremas

### Métricas Clave
- **Response Time**: Tiempo de respuesta de cada endpoint
- **Throughput**: Número de requests por segundo
- **Error Rate**: Tasa de errores bajo carga
- **Resource Utilization**: Uso de recursos del sistema
- **Percentiles**: P50, P90, P95, P99 de tiempos de respuesta

## 🏗️ Arquitectura de Tests

### Estructura de Archivos
```
src/test/resources/features/performance/
├── TokenDataPerformance.feature           # Tests de datos de tokens
├── TokenDataPerformanceAdvanced.feature   # Tests avanzados de datos
├── TokenListPerformance.feature           # Tests de listado de tokens
├── TokenPricePerformance.feature          # Tests de precios
├── TradeListPerformance.feature           # Tests de listado de trades
├── GlobalLoadTest.feature                 # Tests de carga global
├── AdvancedPerformanceValidation.feature  # 🆕 Tests avanzados con métricas
└── README.md                              # Documentación específica

src/test/resources/data/performance/
└── performance-test-data.json             # Configuración centralizada mejorada

src/test/resources/helpers/
└── performance-config.js                  # 🆕 Configuración avanzada de performance
```

## 📊 Configuración de Umbrales Mejorada

### Thresholds de Response Time
```json
{
  "ULTRA_FAST": 500ms,    // 🆕 Respuesta ultra rápida (< 500ms)
  "FAST": 1000ms,         // Respuesta rápida (< 1s)
  "NORMAL": 2000ms,       // Respuesta normal (< 2s)
  "SLOW": 5000ms,         // Respuesta lenta (< 5s)
  "TIMEOUT": 10000ms      // Timeout máximo (< 10s)
}
```

### 🆕 Thresholds Específicos por Endpoint
```json
{
  "token_price": {
    "baseline": "ULTRA_FAST",  // 500ms - Precios deben ser ultra rápidos
    "load": "FAST",            // 1000ms
    "stress": "NORMAL"         // 2000ms
  },
  "token_data": {
    "baseline": "FAST",        // 1000ms
    "load": "NORMAL",          // 2000ms
    "stress": "SLOW"           // 5000ms
  },
  "token_list": {
    "baseline": "NORMAL",      // 2000ms
    "load": "SLOW",            // 5000ms
    "stress": "TIMEOUT"        // 10000ms
  },
  "trade_list": {
    "baseline": "NORMAL",      // 2000ms
    "load": "SLOW",            // 5000ms
    "stress": "TIMEOUT"        // 10000ms
  }
}
```

### 🆕 Métricas de Percentiles
```json
{
  "p50": 1000,   // 50% de requests < 1s
  "p90": 2000,   // 90% de requests < 2s
  "p95": 3000,   // 95% de requests < 3s
  "p99": 5000    // 99% de requests < 5s
}
```

### 🆕 Targets de Throughput
```json
{
  "token_price": 1000,    // 1000 req/s - Precios críticos
  "token_data": 500,      // 500 req/s
  "token_list": 200,      // 200 req/s
  "trade_list": 300       // 300 req/s
}
```

### 🆕 Thresholds de Error Rate
```json
{
  "baseline": 0.1,    // 0.1% máximo en condiciones normales
  "load": 1.0,        // 1% máximo bajo carga
  "stress": 5.0       // 5% máximo bajo estrés
}
```

### Configuraciones de Carga Mejoradas
```json
{
  "LIGHT": {
    "concurrent": 10,    // 10 usuarios concurrentes
    "duration": 30,      // 30 segundos de duración
    "rampUp": 5,         // 5 segundos de ramp-up
    "description": "Light load for baseline validation"
  },
  "MEDIUM": {
    "concurrent": 50,    // 50 usuarios concurrentes
    "duration": 60,      // 60 segundos de duración
    "rampUp": 10,        // 10 segundos de ramp-up
    "description": "Medium load for normal usage simulation"
  },
  "HEAVY": {
    "concurrent": 100,   // 100 usuarios concurrentes
    "duration": 120,     // 120 segundos de duración
    "rampUp": 20,        // 20 segundos de ramp-up
    "description": "Heavy load for peak usage simulation"
  }
}
```

### 🆕 Configuraciones de Estrés Extendidas
```json
{
  "MODERATE": {
    "concurrent": 200,   // 200 usuarios concurrentes
    "duration": 300,     // 5 minutos de duración
    "rampUp": 30,        // 30 segundos de ramp-up
    "description": "Moderate stress test"
  },
  "HIGH": {
    "concurrent": 500,   // 500 usuarios concurrentes
    "duration": 600,     // 10 minutos de duración
    "rampUp": 60,        // 60 segundos de ramp-up
    "description": "High stress test"
  },
  "EXTREME": {
    "concurrent": 1000,  // 🆕 1000 usuarios concurrentes
    "duration": 900,     // 15 minutos de duración
    "rampUp": 120,       // 2 minutos de ramp-up
    "description": "Extreme stress test"
  }
}
```

## 🔍 Tests Individuales por Endpoint

### 1. Token Data Performance Tests
**Archivo**: `TokenDataPerformance.feature`

#### Objetivo
Validar el rendimiento del endpoint `/token/data/{address}` que proporciona información completa de un token específico.

#### Scenarios Implementados
- **@baseline**: Test básico con threshold FAST (1000ms) 🆕
- **@load @light**: Carga ligera con threshold NORMAL (2000ms) 🆕
- **@load @medium**: Carga media con threshold SLOW (5000ms)
- **@stress**: Test de estrés con threshold TIMEOUT (10000ms)
- **@endurance**: Test de resistencia con threshold NORMAL (2000ms)
- **@mixed**: Test con múltiples direcciones de tokens

#### 🆕 Métricas Avanzadas
- **Percentile Target**: P90 para baseline, P95 para carga, P99 para estrés
- **Throughput Target**: 500 req/s para baseline, 400 req/s para carga ligera
- **Error Rate**: 0.1% máximo para baseline

#### Datos de Test Extendidos
```json
{
  "primary": "Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP",
  "secondary": "CnGb7hJsGdsFyQP2uXNWrUgT5K1tovBA3mNnUZcTpump",
  "tertiary": "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs",
  "high_volume": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  // 🆕
  "low_volume": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"   // 🆕
}
```

#### Análisis de Configuración
✅ **Thresholds mejorados**: FAST para baseline, NORMAL para carga ligera
✅ **Datos reales**: Direcciones de tokens válidas incluyendo alto y bajo volumen
✅ **Validaciones avanzadas**: Percentiles y throughput
✅ **Métricas específicas**: Error rate y validaciones de estructura

### 2. Token Data Performance Advanced Tests
**Archivo**: `TokenDataPerformanceAdvanced.feature`

#### Objetivo
Tests avanzados para el endpoint de datos de tokens, incluyendo casos edge y validaciones complejas.

#### Características Especiales
- Validaciones de estructura de respuesta más detalladas
- Tests con diferentes tipos de tokens
- Verificación de campos requeridos
- Tests de casos edge

#### Análisis de Configuración
✅ **Validaciones avanzadas**: Estructura de respuesta completa
✅ **Casos edge**: Diferentes tipos de tokens
✅ **Métricas extendidas**: Monitoreo de performance avanzado

### 3. Token List Performance Tests
**Archivo**: `TokenListPerformance.feature`

#### Objetivo
Validar el rendimiento del endpoint `/token/list` que proporciona listado paginado de tokens.

#### Scenarios Implementados
- **@baseline**: Test básico con threshold NORMAL (2000ms)
- **@medium_load**: Carga media con threshold SLOW (5000ms)
- **@pagination**: Test con parámetros de paginación
- **@large_page**: 🆕 Test con páginas grandes (100 elementos)

#### 🆕 Configuración de Paginación Extendida
```json
{
  "small": {
    "limit": 10,
    "page": 1
  },
  "medium": {
    "limit": 50,
    "page": 1
  },
  "large": {
    "limit": 100,
    "page": 1
  }
}
```

#### Análisis de Configuración
✅ **Paginación mejorada**: Tests con diferentes tamaños de página
✅ **Thresholds apropiados**: NORMAL para baseline, SLOW para carga
✅ **Métricas específicas**: Throughput target de 200 req/s para baseline

### 4. Token Price Performance Tests
**Archivo**: `TokenPricePerformance.feature`

#### Objetivo
Validar el rendimiento del endpoint `/token/price/{address}` que proporciona precios actuales de tokens.

#### Scenarios Implementados
- **@baseline**: Test básico con threshold ULTRA_FAST (500ms) 🆕
- **@light_load**: Carga ligera con threshold FAST (1000ms) 🆕
- **@stress**: Test de estrés con threshold NORMAL (2000ms) 🆕

#### Análisis de Configuración
✅ **Thresholds ultra estrictos**: ULTRA_FAST para baseline (500ms)
✅ **Configuración realista**: Precios son datos críticos que deben ser ultra rápidos
✅ **Throughput alto**: Target de 1000 req/s para baseline
✅ **Percentiles estrictos**: P90 para baseline, P95 para carga

### 5. Trade List Performance Tests
**Archivo**: `TradeListPerformance.feature`

#### Objetivo
Validar el rendimiento del endpoint `/trade/list` que proporciona listado de trades con filtros.

#### Scenarios Implementados
- **@baseline**: Test básico con threshold NORMAL (2000ms)
- **@heavy_load**: Carga pesada con threshold SLOW (5000ms)
- **@filtering**: Test con parámetros de filtrado
- **@complex_filtering**: 🆕 Test con filtros complejos

#### 🆕 Configuración de Filtros Extendida
```json
{
  "basic": {
    "token_address": "Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP"
  },
  "complex": {
    "token_address": "Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP",
    "timeframe": "24h",
    "min_amount": 1000
  }
}
```

#### Análisis de Configuración
✅ **Filtros avanzados**: Tests con filtros complejos
✅ **Thresholds apropiados**: NORMAL para baseline, SLOW para carga pesada
✅ **Métricas específicas**: Throughput target de 300 req/s para baseline

### 6. Global Load Test
**Archivo**: `GlobalLoadTest.feature`

#### Objetivo
Tests de carga global que validan múltiples endpoints simultáneamente, simulando uso real de la API.

#### Scenarios Implementados
- **@global @load**: Carga global en todos los endpoints
- **@global @stress**: Estrés global en múltiples endpoints
- **@global @endurance**: Test de resistencia global

#### Características Especiales
- Tests secuenciales de múltiples endpoints
- Validación de rendimiento integrado
- Simulación de flujos de usuario reales

#### Análisis de Configuración
✅ **Cobertura completa**: Todos los endpoints principales
✅ **Thresholds apropiados**: SLOW para carga global
✅ **Validaciones integradas**: Performance cross-endpoint

### 7. 🆕 Advanced Performance Validation Tests
**Archivo**: `AdvancedPerformanceValidation.feature`

#### Objetivo
Tests avanzados que implementan todas las nuevas métricas y validaciones de performance.

#### Scenarios Implementados
- **@advanced @percentiles**: Validación de percentiles con múltiples requests
- **@advanced @endpoint_specific**: Validación de thresholds específicos por endpoint
- **@advanced @pagination_performance**: Tests de paginación con diferentes tamaños
- **@advanced @complex_filtering**: Tests de filtros complejos
- **@advanced @memory_monitoring**: Simulación de monitoreo de memoria
- **@advanced @stress_validation**: Validación de estrés en múltiples endpoints
- **@advanced @throughput_validation**: Validación de throughput para endpoints de alto volumen

#### Características Avanzadas
- **Tracking de métricas**: Monitoreo automático de response times
- **Cálculo de percentiles**: P50, P90, P95, P99 en tiempo real
- **Validación de throughput**: Verificación de requests por segundo
- **Monitoreo de memoria**: Simulación de uso de recursos
- **Validaciones complejas**: Filtros y paginación avanzada

## 📈 Datos de Test Actuales

### Direcciones de Tokens Utilizadas
```json
{
  "primary": "Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP",
  "secondary": "CnGb7hJsGdsFyQP2uXNWrUgT5K1tovBA3mNnUZcTpump", 
  "tertiary": "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs",
  "high_volume": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  // 🆕
  "low_volume": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"   // 🆕
}
```

### 🆕 Validaciones Implementadas
```json
{
  "min_response_size": 100,
  "max_response_size": 10000,
  "required_fields": ["address", "name", "symbol"],
  "performance_fields": ["response_time", "status_code", "response_size"]  // 🆕
}
```

### 🆕 Configuración de Monitoreo
```json
{
  "enable_memory_tracking": true,
  "enable_cpu_tracking": true,
  "enable_network_latency": true,
  "sampling_rate": 0.1
}
```

## ⚠️ Análisis y Recomendaciones

### ✅ Aspectos Positivos Implementados
1. **🆕 Thresholds ultra estrictos**: ULTRA_FAST (500ms) para precios
2. **🆕 Configuración específica por endpoint**: Thresholds personalizados
3. **🆕 Métricas de percentiles**: P50, P90, P95, P99 implementadas
4. **🆕 Targets de throughput**: Objetivos específicos por endpoint
5. **🆕 Error rate thresholds**: Límites de tasa de errores
6. **🆕 Tests avanzados**: Validaciones complejas implementadas
7. **🆕 Monitoreo de recursos**: Simulación de memoria y CPU
8. **🆕 Configuración centralizada**: JSON mejorado con descripciones

### 🔧 Mejoras Implementadas

#### 1. ✅ Thresholds Más Estrictos para Endpoints Críticos
```json
{
  "ULTRA_FAST": 500,     // 🆕 Implementado para precios
  "TOKEN_PRICE_FAST": 500,    // Precios deben ser ultra rápidos
  "TOKEN_DATA_NORMAL": 1000,  // Datos de tokens moderadamente rápidos
  "LIST_ENDPOINTS_NORMAL": 2000  // Listados pueden ser un poco más lentos
}
```

#### 2. ✅ Métricas de Percentiles Implementadas
```json
{
  "p50": 1000,   // 50% de requests < 1s
  "p90": 2000,   // 90% de requests < 2s
  "p95": 3000,   // 95% de requests < 3s
  "p99": 5000    // 99% de requests < 5s
}
```

#### 3. ✅ Throughput Targets por Endpoint
```json
{
  "token_price": "1000 req/s",  // 🆕 Implementado
  "token_data": "500 req/s",    // 🆕 Implementado
  "token_list": "200 req/s",    // 🆕 Implementado
  "trade_list": "300 req/s"     // 🆕 Implementado
}
```

#### 4. ✅ Error Rate Thresholds
```json
{
  "baseline": "0.1%",  // 🆕 Implementado
  "load": "1%",        // 🆕 Implementado
  "stress": "5%"       // 🆕 Implementado
}
```

### 📊 Métricas Adicionales Implementadas

#### 1. ✅ Percentiles de Response Time
```json
{
  "p50": 1000,   // 50% de requests < 1s
  "p90": 2000,   // 90% de requests < 2s
  "p95": 3000,   // 95% de requests < 3s
  "p99": 5000    // 99% de requests < 5s
}
```

#### 2. ✅ Throughput por Endpoint
```json
{
  "token_price": "1000 req/s",
  "token_data": "500 req/s", 
  "token_list": "200 req/s",
  "trade_list": "300 req/s"
}
```

#### 3. ✅ Error Rate Thresholds
```json
{
  "baseline": "0.1%",
  "load": "1%",
  "stress": "5%"
}
```

## 🚀 Ejecución de Tests

### Comandos Disponibles
```bash
# Todos los tests de performance
mvn test -Dtest=PerformanceTestRunner#testAllPerformance

# Tests específicos por endpoint
mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance
mvn test -Dtest=PerformanceTestRunner#testTokenListPerformance
mvn test -Dtest=PerformanceTestRunner#testTradeListPerformance
mvn test -Dtest=PerformanceTestRunner#testGlobalLoadTest

# 🆕 Tests avanzados
mvn test -Dtest=PerformanceTestRunner#testAdvancedPerformanceValidation

# Tests por intensidad
mvn test -Dtest=PerformanceTestRunner#testLightPerformance
mvn test -Dtest=PerformanceTestRunner#testMediumPerformance
mvn test -Dtest=PerformanceTestRunner#testHeavyPerformance

# 🆕 Tests agrupados por tipo
mvn test -Dtest=PerformanceTestRunner#generateBaselinePerformanceReport
mvn test -Dtest=PerformanceTestRunner#generateLoadPerformanceReport
mvn test -Dtest=PerformanceTestRunner#generateStressPerformanceReport
mvn test -Dtest=PerformanceTestRunner#generateAdvancedPerformanceReport
```

### Reportes Generados
- **HTML Reports**: `target/karate-reports/performance/`
- **JSON Data**: `target/karate-reports/performance/*.json`
- **Timeline**: `target/karate-reports/performance/karate-timeline.html`
- **Tags Analysis**: `target/karate-reports/performance/karate-tags.html`
- **🆕 Advanced Reports**: `target/karate-reports/performance/advanced-validation/`

## 📋 Checklist de Validación

### Configuración
- [x] Thresholds definidos para todos los endpoints
- [x] 🆕 Thresholds específicos por endpoint implementados
- [x] 🆕 Métricas de percentiles implementadas
- [x] 🆕 Targets de throughput definidos
- [x] 🆕 Error rate thresholds implementados
- [x] Datos de test reales y válidos
- [x] Configuración centralizada en JSON
- [x] Validaciones de respuesta implementadas

### Cobertura
- [x] Tests para todos los endpoints principales
- [x] Diferentes niveles de carga (baseline, load, stress)
- [x] Tests de resistencia (endurance)
- [x] Tests globales de integración
- [x] 🆕 Tests avanzados con métricas complejas
- [x] 🆕 Tests de paginación y filtros

### Monitoreo
- [x] Logging de tiempos de respuesta
- [x] Validación de thresholds
- [x] Reportes HTML detallados
- [x] Estadísticas de éxito/fallo
- [x] 🆕 Tracking de métricas avanzadas
- [x] 🆕 Cálculo de percentiles en tiempo real
- [x] 🆕 Validación de throughput
- [x] 🆕 Monitoreo de recursos (simulado)

### Pendientes
- [ ] Tests de carga concurrente real con herramientas externas
- [ ] Monitoreo de recursos del sistema real
- [ ] Tests de latencia de red real
- [ ] Integración con herramientas de APM
- [ ] Tests de base de datos específicos

## 📞 Contacto y Soporte

Para preguntas sobre los tests de rendimiento o solicitar modificaciones:
- **Repositorio**: [quant-flux/qa-automated-api-test](https://github.com/quant-flux/qa-automated-api-test)
- **Documentación**: Este archivo y `src/test/resources/features/performance/README.md`
- **Reportes**: Disponibles en GitHub Pages después de cada ejecución

---

**Última actualización**: Julio 2024  
**Versión**: 2.0 - Mejoras Avanzadas Implementadas  
**Autor**: Equipo de QA Automation 