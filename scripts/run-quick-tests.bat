@echo off
echo ========================================
echo QuantFlux - Quick Smoke Tests
echo ========================================
echo.

echo 🚀 Ejecutando solo smoke tests...
mvn test -Dtest=FunctionalTestRunner#testSmokeTests -q

echo.
echo ✅ Smoke tests completados!
echo 📊 Revisa los reportes en: target/karate-reports/functional/smoke/
echo.

echo 🔄 Actualizando datos de features...
node scripts/update-features-after-tests.js

echo.
echo 🎉 ¡Listo! Puedes abrir index.html para ver los resultados.
pause 