@echo off
echo ========================================
echo    QUANTFLUX - ACTUALIZAR DASHBOARD
echo ========================================
echo.

echo 📊 Actualizando datos del dashboard...
node scripts/update-dashboard-data.js
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error actualizando dashboard
    pause
    exit /b 1
)

echo.
echo ✅ Dashboard actualizado exitosamente!
echo 🌐 Abriendo dashboard...
start src\main\resources\index.html

echo.
echo 📋 Resumen:
echo    - Dashboard: Actualizado y abierto
echo    - Nota: Los tests deben haberse ejecutado previamente
echo.
pause 