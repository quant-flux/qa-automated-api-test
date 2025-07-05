@echo off
echo ========================================
echo Generando Reportes de Performance
echo ========================================

echo.
echo 1. Generando reporte de performance general...
mvn test -Dtest=PerformanceTestRunner#testAllPerformance -q

echo.
echo 2. Generando reportes por categorias...
echo    - Baseline Performance...
mvn test -Dtest=PerformanceTestRunner#generateBaselinePerformanceReport -q

echo    - Load Performance...
mvn test -Dtest=PerformanceTestRunner#generateLoadPerformanceReport -q

echo    - Stress Performance...
mvn test -Dtest=PerformanceTestRunner#generateStressPerformanceReport -q

echo    - Endurance Performance...
mvn test -Dtest=PerformanceTestRunner#generateEndurancePerformanceReport -q

echo    - Advanced Performance...
mvn test -Dtest=PerformanceTestRunner#generateAdvancedPerformanceReport -q

echo.
echo 3. Generando reportes por endpoint...
echo    - Token Data Performance...
mvn test -Dtest=PerformanceTestRunner#testTokenDataPerformance -q

echo    - Token List Performance...
mvn test -Dtest=PerformanceTestRunner#testTokenListPerformance -q

echo    - Token Price Performance...
mvn test -Dtest=PerformanceTestRunner#testTokenPricePerformance -q

echo    - Trade List Performance...
mvn test -Dtest=PerformanceTestRunner#testTradeListPerformance -q

echo.
echo 4. Generando reportes de carga...
echo    - Light Load...
mvn test -Dtest=PerformanceTestRunner#testLightPerformance -q

echo    - Medium Load...
mvn test -Dtest=PerformanceTestRunner#testMediumPerformance -q

echo    - Heavy Load...
mvn test -Dtest=PerformanceTestRunner#testHeavyPerformance -q

echo.
echo 5. Generando reportes especializados...
echo    - Global Load Test...
mvn test -Dtest=PerformanceTestRunner#testGlobalLoadTest -q

echo    - Custom Threshold...
mvn test -Dtest=PerformanceTestRunner#testCustomThreshold -q

echo    - High Load...
mvn test -Dtest=PerformanceTestRunner#testHighLoad -q

echo    - Stress Load...
mvn test -Dtest=PerformanceTestRunner#testStressLoad -q

echo.
echo ========================================
echo Reportes de Performance Generados
echo ========================================
echo.
echo Ubicacion de los reportes:
echo - target/karate-reports/performance/
echo - target/karate-reports/performance/baseline/
echo - target/karate-reports/performance/load/
echo - target/karate-reports/performance/stress/
echo - target/karate-reports/performance/endurance/
echo - target/karate-reports/performance/advanced/
echo.
echo Para abrir el reporte principal:
echo start target/karate-reports/performance/index.html
echo.
pause 