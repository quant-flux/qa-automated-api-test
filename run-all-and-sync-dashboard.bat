@echo off
echo ========================================
echo   QUANTFLUX TESTING SUITE
echo   Ejecucion Completa y Sincronizacion
echo ========================================
echo.

echo 🚀 Ejecutando tests funcionales...
call mvn test -Dtest=FunctionalTestRunner#testAllFunctional
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Algunos tests funcionales fallaron, pero continuando...
)

echo.
echo ⚡ Ejecutando tests de performance...
call mvn test -Dtest=PerformanceTestRunner#testAllPerformance
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Algunos tests de performance fallaron, pero continuando...
)

echo.
echo 🔄 Sincronizando dashboards integralmente...
node scripts/sync-all-dashboards.js

echo.
echo ✅ Proceso completado!
echo 📊 Dashboards actualizados en docs/
echo.
echo Presiona cualquier tecla para abrir el dashboard principal...
pause >nul
start docs/index.html 