# Configuración de Tests Externos por Commit

## Resumen

Esta configuración permite que los tests se ejecuten automáticamente en **otro repositorio** cada vez que se hace un commit en este repositorio, sin importar si los tests fallan.

## Arquitectura

```
Repositorio A (Este) → Trigger → Repositorio B (Otro) → Ejecuta Tests
```

## Configuración Paso a Paso

### 1. En el Repositorio A (Este - Donde haces commits)

#### A. Configurar Secrets
Ve a **Settings > Secrets and variables > Actions** y agrega:

- `EXTERNAL_REPO_OWNER`: El propietario del repositorio donde se ejecutarán los tests
- `EXTERNAL_REPO_NAME`: El nombre del repositorio donde se ejecutarán los tests  
- `EXTERNAL_REPO_TOKEN`: Token con permisos para disparar workflows en el repositorio externo

#### B. El workflow ya está configurado
El archivo `.github/workflows/trigger-external-tests.yml` ya está listo y se ejecutará automáticamente en:
- Push a `main` y `develop`
- Pull requests (abierto, sincronizado, reabierto)

### 2. En el Repositorio B (Otro - Donde se ejecutan los tests)

#### A. Crear el workflow
Copia el archivo `external-repo-workflow.yml` a `.github/workflows/external-test-runner.yml` en el repositorio B.

#### B. Configurar Secrets (opcional)
Si quieres que los resultados se comenten en el repositorio A:
- `SOURCE_REPO_TOKEN`: Token con permisos para comentar en el repositorio A

## Cómo Funciona

1. **Haces un commit** en el repositorio A
2. **Se dispara automáticamente** el workflow `trigger-external-tests.yml`
3. **Se envía un evento** al repositorio B
4. **Se ejecutan los tests** en el repositorio B
5. **Se guardan los resultados** como artifacts
6. **Se comenta el resultado** en el PR (si aplica)

## Ejemplo de Uso

```bash
# En el repositorio A
git add .
git commit -m "Nueva funcionalidad"
git push origin main

# Automáticamente se ejecutarán los tests en el repositorio B
```

## Configuración de Tokens

### Para EXTERNAL_REPO_TOKEN:
1. Ve a Settings > Developer settings > Personal access tokens
2. Crea un token con permisos:
   - `repo` (acceso completo a repositorios privados)
   - `workflow` (disparar workflows)

### Para SOURCE_REPO_TOKEN (opcional):
1. Mismo proceso que arriba
2. Permisos necesarios:
   - `repo` (para comentar en PRs)

## Verificación

### En el repositorio A:
- Ve a Actions tab
- Verás el workflow "Trigger External Tests" ejecutándose

### En el repositorio B:
- Ve a Actions tab  
- Verás el workflow "External Test Runner" ejecutándose
- Los artifacts contendrán los resultados de los tests

## Troubleshooting

### Los tests no se disparan:
1. Verificar que los secrets estén configurados correctamente
2. Verificar que el token tenga permisos suficientes
3. Revisar los logs del workflow "Trigger External Tests"

### Error de permisos:
1. Verificar que el token tenga acceso al repositorio externo
2. Verificar que el repositorio externo tenga el workflow configurado

### Los tests no se ejecutan en el repositorio B:
1. Verificar que el archivo `.github/workflows/external-test-runner.yml` esté en el repositorio B
2. Verificar que el `event_type` coincida: `external-test-trigger`

## Personalización

### Cambiar ramas que disparan tests:
Edita el archivo `trigger-external-tests.yml`:
```yaml
on:
  push:
    branches: [main, develop, feature/*]  # Agregar más ramas
```

### Cambiar qué tests se ejecutan:
Edita el archivo `external-repo-workflow.yml`:
```yaml
- name: Run API tests
  run: mvn test -Dtest=TuRunnerEspecifico  # Cambiar el runner
```

### Agregar más información en los comentarios:
Modifica la sección "Comment on source repository" en `external-repo-workflow.yml`

## Ventajas de esta Configuración

✅ **Separación de responsabilidades**: Los tests se ejecutan en un repositorio dedicado
✅ **No bloquea commits**: Los tests pueden fallar sin afectar el desarrollo
✅ **Trazabilidad**: Cada commit tiene su ejecución de tests asociada
✅ **Flexibilidad**: Fácil de modificar qué tests ejecutar
✅ **Escalabilidad**: Puedes agregar más repositorios fácilmente 