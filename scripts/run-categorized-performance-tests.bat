@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    PROBLEMATIC ENDPOINTS PERFORMANCE TESTS
echo ========================================
echo.

:: Verificar si Maven está disponible
mvn -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Maven no está instalado o no está en el PATH
    echo Por favor, instala Maven y asegúrate de que esté en el PATH
    pause
    exit /b 1
)

:: Menú principal
:menu
echo Selecciona el tipo de test de performance categorizado:
echo.
echo 1. Tests de endpoints críticos (funcionalidad core)
echo 2. Tests de carga pesada (grandes volúmenes de datos)
echo 3. Tests de puntos de estrangulamiento (bottlenecks)
echo 4. Tests de latencia alta (delays de red/BD)
echo 5. Tests de uso intensivo de recursos (CPU/memoria/disco)
echo 6. Todos los tests categorizados
echo 7. Test específico por categoría
echo 8. Salir
echo.
set /p choice="Ingresa tu opción (1-8): "

if "%choice%"=="1" goto critical_endpoints
if "%choice%"=="2" goto heavy_load
if "%choice%"=="3" goto bottleneck_endpoints
if "%choice%"=="4" goto high_latency
if "%choice%"=="5" goto resource_intensive
if "%choice%"=="6" goto all_categorized
if "%choice%"=="7" goto specific_category
if "%choice%"=="8" goto exit
echo Opción inválida. Por favor, selecciona 1-8.
goto menu

:critical_endpoints
echo.
echo ========================================
echo Ejecutando tests de ENDPOINTS CRÍTICOS...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#testCriticalEndpointsPerformance
goto end

:heavy_load
echo.
echo ========================================
echo Ejecutando tests de CARGA PESADA...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#testHeavyLoadEndpointsPerformance
goto end

:bottleneck_endpoints
echo.
echo ========================================
echo Ejecutando tests de PUNTOS DE ESTRANGULAMIENTO...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#testBottleneckEndpointsPerformance
goto end

:high_latency
echo.
echo ========================================
echo Ejecutando tests de LATENCIA ALTA...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#testHighLatencyEndpointsPerformance
goto end

:resource_intensive
echo.
echo ========================================
echo Ejecutando tests de USO INTENSIVO DE RECURSOS...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#testResourceIntensiveEndpointsPerformance
goto end

:all_categorized
echo.
echo ========================================
echo Ejecutando TODOS los tests categorizados...
echo ========================================
echo.
echo 🔍 Ejecutando tests de endpoints críticos...
mvn test -Dtest=PerformanceTestRunner#testCriticalEndpointsPerformance
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Tests de endpoints críticos fallaron
    pause
    exit /b 1
)

echo.
echo ⚡ Ejecutando tests de carga pesada...
mvn test -Dtest=PerformanceTestRunner#testHeavyLoadEndpointsPerformance
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Tests de carga pesada fallaron
    pause
    exit /b 1
)

echo.
echo 🔧 Ejecutando tests de puntos de estrangulamiento...
mvn test -Dtest=PerformanceTestRunner#testBottleneckEndpointsPerformance
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Tests de puntos de estrangulamiento fallaron
    pause
    exit /b 1
)

echo.
echo 🌐 Ejecutando tests de latencia alta...
mvn test -Dtest=PerformanceTestRunner#testHighLatencyEndpointsPerformance
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Tests de latencia alta fallaron
    pause
    exit /b 1
)

echo.
echo 💾 Ejecutando tests de uso intensivo de recursos...
mvn test -Dtest=PerformanceTestRunner#testResourceIntensiveEndpointsPerformance
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Tests de uso intensivo de recursos fallaron
    pause
    exit /b 1
)

echo.
echo ✅ Todos los tests categorizados completados exitosamente!
goto end

:specific_category
echo.
echo ========================================
echo Selecciona la categoría específica:
echo ========================================
echo.
echo 1. Endpoints Críticos (@critical)
echo 2. Carga Pesada (@heavy_load)
echo 3. Puntos de Estrangulamiento (@bottleneck)
echo 4. Latencia Alta (@high_latency)
echo 5. Uso Intensivo de Recursos (@resource_intensive)
echo 6. Volver al menú principal
echo.
set /p specific_choice="Ingresa tu opción (1-6): "

if "%specific_choice%"=="1" (
    echo Ejecutando tests de endpoints críticos...
    mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @critical"
) else if "%specific_choice%"=="2" (
    echo Ejecutando tests de carga pesada...
    mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @heavy_load"
) else if "%specific_choice%"=="3" (
    echo Ejecutando tests de puntos de estrangulamiento...
    mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @bottleneck"
) else if "%specific_choice%"=="4" (
    echo Ejecutando tests de latencia alta...
    mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @high_latency"
) else if "%specific_choice%"=="5" (
    echo Ejecutando tests de uso intensivo de recursos...
    mvn test -Dtest=PerformanceTestRunner#testAllPerformance -Dkarate.options="--tags @resource_intensive"
) else if "%specific_choice%"=="6" (
    goto menu
) else (
    echo Opción inválida.
    goto specific_category
)
goto end

:end
echo.
echo 📊 Reportes generados en:
echo    - Critical Endpoints: target/karate-reports/performance/critical-endpoints/
echo    - Heavy Load: target/karate-reports/performance/heavy-load-endpoints/
echo    - Bottleneck: target/karate-reports/performance/bottleneck-endpoints/
echo    - High Latency: target/karate-reports/performance/high-latency-endpoints/
echo    - Resource Intensive: target/karate-reports/performance/resource-intensive-endpoints/
echo.
echo 🔍 Revisa los reportes para identificar problemas de rendimiento por categoría
echo.
pause

:exit
echo.
echo 👋 ¡Hasta luego! 