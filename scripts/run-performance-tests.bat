@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Performance Tests Runner - QuantFlux
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
echo Selecciona el tipo de test de performance:
echo.
echo 1. Todos los tests de performance
echo 2. Tests de baseline
echo 3. Tests de carga
echo 4. Tests de estrés
echo 5. Tests de resistencia
echo 6. Tests avanzados
echo 7. Test específico por categoría
echo 8. Test personalizado con parámetros
echo 9. Salir
echo.
set /p choice="Ingresa tu opción (1-9): "

if "%choice%"=="1" goto all_tests
if "%choice%"=="2" goto baseline_tests
if "%choice%"=="3" goto load_tests
if "%choice%"=="4" goto stress_tests
if "%choice%"=="5" goto endurance_tests
if "%choice%"=="6" goto advanced_tests
if "%choice%"=="7" goto specific_tests
if "%choice%"=="8" goto custom_tests
if "%choice%"=="9" goto exit
echo Opción inválida. Por favor, selecciona 1-9.
goto menu

:all_tests
echo.
echo ========================================
echo Ejecutando TODOS los tests de performance...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#testAllPerformance
goto end

:baseline_tests
echo.
echo ========================================
echo Ejecutando tests de BASELINE...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#generateBaselinePerformanceReport
goto end

:load_tests
echo.
echo ========================================
echo Ejecutando tests de CARGA...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#generateLoadPerformanceReport
goto end

:stress_tests
echo.
echo ========================================
echo Ejecutando tests de ESTRÉS...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#generateStressPerformanceReport
goto end

:endurance_tests
echo.
echo ========================================
echo Ejecutando tests de RESISTENCIA...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#generateEndurancePerformanceReport
goto end

:advanced_tests
echo.
echo ========================================
echo Ejecutando tests AVANZADOS...
echo ========================================
mvn test -Dtest=PerformanceTestRunner#generateAdvancedPerformanceReport
goto end

:specific_tests
echo.
echo ========================================
echo Tests específicos por categoría:
echo ========================================
echo.
echo 1. Token Data Performance
echo 2. Token List Performance
echo 3. Token Price Performance
echo 4. Trade List Performance
echo 5. Global Load Test
echo 6. Volver al menú principal
echo.
set /p specific_choice="Selecciona categoría (1-6): "

if "%specific_choice%"=="1" (
    echo Ejecutando Token Data Performance...
    mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
) else if "%specific_choice%"=="2" (
    echo Ejecutando Token List Performance...
    mvn test -Dtest=PerformanceTestRunner#testTokenListPerformance
) else if "%specific_choice%"=="3" (
    echo Ejecutando Token Price Performance...
    mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance
) else if "%specific_choice%"=="4" (
    echo Ejecutando Trade List Performance...
    mvn test -Dtest=PerformanceTestRunner#testTradeListPerformance
) else if "%specific_choice%"=="5" (
    echo Ejecutando Global Load Test...
    mvn test -Dtest=PerformanceTestRunner#testGlobalPerformance
) else if "%specific_choice%"=="6" (
    goto menu
) else (
    echo Opción inválida.
    goto specific_tests
)
goto end

:custom_tests
echo.
echo ========================================
echo Test personalizado con parámetros
echo ========================================
echo.
echo Configuraciones disponibles:
echo.
echo INTENSIDAD DE CARGA:
echo - light: 10 usuarios concurrentes, 30s duración
echo - medium: 50 usuarios concurrentes, 60s duración
echo - heavy: 100 usuarios concurrentes, 120s duración
echo - stress: 200 usuarios concurrentes, 300s duración
echo.
echo CATEGORÍAS:
echo - token-data: Tests de datos de tokens
echo - token-list: Tests de listado de tokens
echo - token-price: Tests de precios de tokens
echo - trade-list: Tests de listado de trades
echo - global: Tests globales de carga
echo.
set /p intensity="Intensidad (light/medium/heavy/stress): "
set /p category="Categoría (token-data/token-list/token-price/trade-list/global): "
set /p duration="Duración en segundos (opcional, presiona Enter para usar default): "

echo.
echo ========================================
echo Configuración personalizada:
echo Intensidad: %intensity%
echo Categoría: %category%
if not "%duration%"=="" echo Duración: %duration% segundos
echo ========================================
echo.

:: Ejecutar test personalizado
if "%category%"=="token-data" (
    mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance
) else if "%category%"=="token-list" (
    mvn test -Dtest=PerformanceTestRunner#testTokenListPerformance
) else if "%category%"=="token-price" (
    mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance
) else if "%category%"=="trade-list" (
    mvn test -Dtest=PerformanceTestRunner#testTradeListPerformance
) else if "%category%"=="global" (
    mvn test -Dtest=PerformanceTestRunner#testGlobalPerformance
) else (
    echo Categoría no válida. Ejecutando todos los tests...
    mvn test -Dtest=PerformanceTestRunner#testAllPerformance
)
goto end

:end
echo.
echo ========================================
echo Tests completados!
echo ========================================
echo.
echo Reportes disponibles en:
echo - target/karate-reports/performance/karate-summary.html
echo - target/karate-reports/performance/karate-tags.html
echo - target/karate-reports/performance/karate-timeline.html
echo.
echo ¿Deseas abrir el reporte principal? (s/n)
set /p open_report="Respuesta: "
if /i "%open_report%"=="s" (
    start target/karate-reports/performance/karate-summary.html
)
echo.
echo ¿Ejecutar otro test? (s/n)
set /p another="Respuesta: "
if /i "%another%"=="s" (
    goto menu
)

:exit
echo.
echo ¡Gracias por usar Performance Tests Runner!
echo.
pause 