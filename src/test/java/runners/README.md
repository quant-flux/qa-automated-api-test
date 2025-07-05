# Runners de Tests - Documentación

## 🏗️ Arquitectura de Testing Simplificada

El proyecto ahora tiene una **estructura limpia y simplificada** con solo 2 runners principales:

### **📁 Estructura de Features:**
```
features/
├── tokens/                    # Tests funcionales de tokens
├── trade/                     # Tests funcionales de trading
├── app/                       # Tests funcionales de la aplicación
└── performance/               # Tests de performanceel
```

### **🎯 Separación de Responsabilidades:**
- **Features Funcionales:** Validan comportamiento y lógica de negocio
- **Features de Performance:** Validan tiempos de respuesta y escalabilidad

---

## FunctionalTestRunner

Runner dedicado exclusivamente a **tests funcionales** (rápidos, se ejecutan en cada commit).

### 🎯 Funcionalidades Disponibles

#### 1. Tests Funcionales Generales
- `testAllFunctional()`: Todos los tests funcionales (excluye @performance)
- `testSmokeTests()`: Solo tests críticos (@smoke)
- `testPositiveScenarios()`: Tests de casos positivos (@positive)
- `testNegativeScenarios()`: Tests de casos negativos (@negative)

#### 2. Tests por Módulo
- `testTokenFeatures()`: Todos los features de tokens
- `testTradeFeatures()`: Todos los features de trading
- `testAppFeatures()`: Todos los features de la aplicación

#### 3. Tests por Feature Específico
- `testTokenData()`: Feature TokenData.feature
- `testTokenList()`: Feature TokenList.feature
- `testTokenPrice()`: Feature TokenPrice.feature
- `testTradeList()`: Feature TradeList.feature

### 🚀 Uso Rápido
```bash
# Todos los tests funcionales
mvn test -Dtest=FunctionalTestRunner#testAllFunctional

# Solo smoke tests (más rápido)
mvn test -Dtest=FunctionalTestRunner#testSmokeTests

# Tests por módulo
mvn test -Dtest=FunctionalTestRunner#testTokenFeatures
```

---

## PerformanceTestRunner

Runner dedicado exclusivamente a **tests de performance** (lentos, se ejecutan bajo demanda).

### 🎯 Funcionalidades Disponibles

#### 1. Tests de Performance Generales
- `testAllPerformance()`: Todos los tests de performance
- `testLightPerformance()`: Tests con carga ligera (@light)
- `testMediumPerformance()`: Tests con carga media (@medium)
- `testHeavyPerformance()`: Tests con carga pesada (@heavy)

#### 2. Tests por Endpoint
- `testTokenDataPerformance()`: Performance específico de datos de token
- `testTokenDataPerformanceAdvanced()`: Performance avanzado de datos de token
- `testTokenListPerformance()`: Performance de lista de tokens
- `testTokenPricePerformance()`: Performance de precios de tokens
- `testTradeListPerformance()`: Performance de lista de trades
- `testGlobalLoadTest()`: Tests de carga global

#### 3. Tests Agrupados por Tipo
- `generateBaselinePerformanceReport()`: Tests de baseline (@baseline)
- `generateLoadPerformanceReport()`: Tests de carga (@load)
- `generateStressPerformanceReport()`: Tests de estrés (@stress)
- `generateEndurancePerformanceReport()`: Tests de resistencia (@endurance)
- `generateAdvancedPerformanceReport()`: Tests avanzados (@advanced)

#### 4. Tests Configurables
- `testCustomThreshold()`: Tests con threshold personalizado (@custom-threshold)
- `testHighLoad()`: Tests de alta carga (@high-load)
- `testStressLoad()`: Tests de carga de estrés (@stress-load)

### 🚀 Uso Rápido
```bash
# Todos los tests de performance
mvn test -Dtest=PerformanceTestRunner#testAllPerformance

# Solo tests de baseline (más rápido)
mvn test -Dtest=PerformanceTestRunner#generateBaselinePerformanceReport

# Tests por endpoint específico
mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
```

---

## 📊 Scripts de Generación de Reportes

### **Tests Funcionales:**
```bash
# Ejecutar script de tests funcionales
scripts/generate-functional-reports.bat
```

### **Tests de Performance:**
```bash
# Ejecutar script de tests de performance
scripts/generate-performance-reports.bat
```

---

## 🎯 Beneficios de la Arquitectura Simplificada

### **1. Simplicidad**
- Solo 2 runners principales
- Estructura clara y fácil de entender
- Sin duplicación de funcionalidad

### **2. CI/CD Eficiente**
- **Tests funcionales:** Rápidos, se ejecutan en cada commit
- **Tests de performance:** Lentos, se ejecutan bajo demanda

### **3. Debugging Claro**
- Separación clara entre problemas funcionales y de performance
- Reportes específicos para cada tipo de test

### **4. Mantenimiento Simplificado**
- Features más pequeños y enfocados
- Configuración específica para cada tipo de test

### **5. Escalabilidad**
- Fácil agregar nuevos tipos de tests
- Configuración independiente de thresholds y parámetros

---

## 📁 Ubicación de Reportes

### **Tests Funcionales:**
```
target/karate-reports/functional/
├── index.html                   # Reporte principal consolidado
├── smoke/                       # Smoke tests
├── positive/                    # Casos positivos
├── negative/                    # Casos negativos
├── tokens/                      # Features de tokens
├── trade/                       # Features de trading
└── app/                         # Features de aplicación
```

### **Tests de Performance:**
```
target/karate-reports/performance/
├── index.html                   # Reporte principal consolidado
├── baseline/                    # Tests de baseline
├── load/                        # Tests de carga
├── stress/                      # Tests de estrés
├── endurance/                   # Tests de resistencia
├── advanced/                    # Tests avanzados
├── token-data/                  # Performance de token data
├── token-list/                  # Performance de token list
├── token-price/                 # Performance de token price
├── trade-list/                  # Performance de trade list
└── global-load/                 # Tests de carga global
```

---

## 🔄 Migración desde Runners Anteriores

### **Runners Eliminados:**
- ❌ `TokensEndpointsRunner` - Mezclaba responsabilidades
- ❌ `CategorizedReportRunner` - Funcionalidad duplicada
- ❌ `CompleteReportRunner` - Funcionalidad duplicada

### **Nuevos Comandos Equivalentes:**

**Antes:**
```bash
mvn test -Dtest=TokensEndpointsRunner#testAllFeatures
mvn test -Dtest=CategorizedReportRunner#generateTokenTestsReport
mvn test -Dtest=CompleteReportRunner#generateFunctionalReport
```

**Ahora:**
```bash
mvn test -Dtest=FunctionalTestRunner#testAllFunctional
mvn test -Dtest=FunctionalTestRunner#testTokenFeatures
mvn test -Dtest=FunctionalTestRunner#testAllFunctional
```

---

## 📝 Notas Importantes

- Todos los tests generan reportes HTML y JSON
- Los reportes se guardan en directorios separados para facilitar el análisis
- Los tests funcionales excluyen automáticamente los tests de performance
- Los tests de performance se ejecutan solo cuando se solicitan específicamente
- La estructura simplificada facilita el mantenimiento y la escalabilidad 

# Flujo de ejecución:
1. Checkout del código
2. Setup de Java 17
3. Ejecutar tests funcionales
4. Ejecutar tests de performance  
5. Generar reporte principal
6. Crear resumen de resultados
7. Subir artifacts (reportes)
8. Comentar en PR (si aplica) 