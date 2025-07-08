@echo off
echo ========================================
echo    Generando Solo Dashboard
echo ========================================

echo.
echo [1/2] Compilando generador de dashboard...
call mvn compile exec:java -Dexec.mainClass="utils.DashboardGenerator"

echo.
echo [2/2] Abriendo dashboard generado...
if exist "target\karate-reports\functional\complete\index.html" (
    start "target\karate-reports\functional\complete\index.html"
    echo ✅ Dashboard abierto en el navegador
) else (
    echo ❌ No se pudo generar el dashboard
)

echo.
echo ========================================
echo    Proceso completado
echo ========================================
echo.
echo 📊 Dashboard disponible en:
echo    target\karate-reports\functional\complete\index.html
echo.
pause 