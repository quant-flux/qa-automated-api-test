@echo off
echo ========================================
echo Generando Reportes de Tests Funcionales
echo ========================================

echo.
echo 1. Generando reporte de tests funcionales generales...
mvn test -Dtest=FunctionalTestRunner#testAllFunctional -q

echo.
echo 2. Generando reportes por tipo de test...
echo    - Smoke Tests...
mvn test -Dtest=FunctionalTestRunner#testSmokeTests -q

echo    - Positive Scenarios...
mvn test -Dtest=FunctionalTestRunner#testPositiveScenarios -q

echo    - Negative Scenarios...
mvn test -Dtest=FunctionalTestRunner#testNegativeScenarios -q

echo.
echo 3. Generando reportes por modulo...
echo    - Token Features...
mvn test -Dtest=FunctionalTestRunner#testTokenFeatures -q

echo    - Trade Features...
mvn test -Dtest=FunctionalTestRunner#testTradeFeatures -q

echo    - App Features...
mvn test -Dtest=FunctionalTestRunner#testAppFeatures -q

echo.
echo 4. Generando reportes por feature especifico...
echo    - Token Data...
mvn test -Dtest=FunctionalTestRunner#testTokenData -q

echo    - Token List...
mvn test -Dtest=FunctionalTestRunner#testTokenList -q

echo    - Token Price...
mvn test -Dtest=FunctionalTestRunner#testTokenPrice -q

echo    - Trade List...
mvn test -Dtest=FunctionalTestRunner#testTradeList -q

echo.
echo ========================================
echo Reportes de Tests Funcionales Generados
echo ========================================
echo.
echo Ubicacion de los reportes:
echo - target/karate-reports/functional/
echo - target/karate-reports/functional/smoke/
echo - target/karate-reports/functional/positive/
echo - target/karate-reports/functional/negative/
echo - target/karate-reports/functional/tokens/
echo - target/karate-reports/functional/trade/
echo - target/karate-reports/functional/app/
echo.
echo Para abrir el reporte principal:
echo start target/karate-reports/functional/karate-summary.html
echo.
pause 