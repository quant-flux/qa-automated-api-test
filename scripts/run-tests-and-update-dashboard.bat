@echo off
echo ========================================
echo    QUANTFLUX - TESTS Y DASHBOARD
echo ========================================
echo.

echo 🔄 Ejecutando tests funcionales...
call mvn test -Dtest=FunctionalTestRunner#testCompleteReport
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error ejecutando tests funcionales
    pause
    exit /b 1
)

echo.
echo ⚡ Ejecutando tests de performance...
call mvn test -Dtest=PerformanceTestRunner
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error ejecutando tests de performance
    pause
    exit /b 1
)

echo.
echo 📊 Actualizando datos del dashboard...
node scripts/update-dashboard-data.js
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error actualizando dashboard
    pause
    exit /b 1
)

echo.
echo ✅ Proceso completado exitosamente!
echo 🌐 Abriendo dashboard...
start src\main\resources\index.html

echo.
echo 📋 Resumen:
echo    - Tests funcionales: Completados
echo    - Tests de performance: Completados  
echo    - Dashboard: Actualizado y abierto
echo.
pause 