@echo off
echo ========================================
echo    Ejecutando Tests con Dashboard Auto
echo ========================================

echo.
echo [1/3] Compilando proyecto...
call mvn clean compile test-compile

echo.
echo [2/3] Ejecutando tests con generación automática de dashboard...
call mvn test -Dtest=DashboardTestRunner

echo.
echo [3/3] Abriendo dashboard generado...
if exist "target\karate-reports\functional\complete\index.html" (
    start "target\karate-reports\functional\complete\index.html"
    echo ✅ Dashboard abierto en el navegador
) else (
    echo ❌ No se pudo abrir el dashboard
)

echo.
echo ========================================
echo    Proceso completado
echo ========================================
echo.
echo 📊 Dashboard disponible en:
echo    target\karate-reports\functional\complete\index.html
echo.
echo 🔄 El dashboard se genera automáticamente con:
echo    - Estadísticas actualizadas en tiempo real
echo    - Enlaces funcionando correctamente
echo    - Timestamp de última ejecución
echo.
pause 