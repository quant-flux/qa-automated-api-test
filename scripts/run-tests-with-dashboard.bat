@echo off
echo ========================================
echo    Ejecutando Tests con Dashboard
echo ========================================

echo.
echo [1/3] Ejecutando tests funcionales...
call mvn clean test -Dtest=FunctionalTestRunner

echo.
echo [2/3] Copiando archivos del dashboard...
if exist "target\karate-reports\functional\complete" (
    copy "src\main\resources\index.html" "target\karate-reports\functional\complete\index.html"
    if exist "src\main\resources\js" (
        xcopy "src\main\resources\js" "target\karate-reports\functional\complete\js\" /E /I /Y
    )
    echo ✅ Dashboard copiado exitosamente
) else (
    echo ❌ No se encontró el directorio de reportes
)

echo.
echo [3/3] Abriendo dashboard...
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
pause 