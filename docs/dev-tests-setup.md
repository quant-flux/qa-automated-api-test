# Configuración de Tests para Repositorio de Desarrollo

## Resumen

Esta configuración permite que los tests de **este repositorio** se ejecuten automáticamente cuando los desarrolladores hagan commits en el **repositorio de desarrollo**.

## Arquitectura

```
Repositorio de Desarrollo → Trigger → Este Repositorio → Ejecuta Tests → Comenta Resultados
```

## Configuración Paso a Paso

### 1. En Este Repositorio (Donde están los tests)

#### A. El workflow ya está configurado
El archivo `.github/workflows/external-dev-tests.yml` ya está listo y se ejecutará cuando reciba el trigger del repositorio de desarrollo.

#### B. Configurar Secret (opcional)
Si quieres que los resultados se comenten en el repositorio de desarrollo:
- Ve a **Settings > Secrets and variables > Actions**
- Agrega `DEV_REPO_TOKEN`: Token con permisos para comentar en el repositorio de desarrollo

### 2. En el Repositorio de Desarrollo

#### A. Crear el workflow
Copia el archivo `dev-repo-trigger.yml` a `.github/workflows/trigger-api-tests.yml` en el repositorio de desarrollo.

#### B. Configurar Secrets
Ve a **Settings > Secrets and variables > Actions** en el repositorio de desarrollo y agrega:

- `TEST_REPO_OWNER`: El propietario de este repositorio (donde están los tests)
- `TEST_REPO_NAME`: El nombre de este repositorio (donde están los tests)
- `TEST_REPO_TOKEN`: Token con permisos para disparar workflows en este repositorio

## Cómo Funciona

1. **Desarrollador hace un commit** en el repositorio de desarrollo
2. **Se dispara automáticamente** el workflow `trigger-api-tests.yml`
3. **Se envía un evento** a este repositorio
4. **Se ejecutan los tests** en este repositorio
5. **Se guardan los resultados** como artifacts
6. **Se comentan los resultados** en el repositorio de desarrollo

## Ejemplo de Uso

```bash
# En el repositorio de desarrollo
git add .
git commit -m "Nueva funcionalidad"
git push origin develop

# Automáticamente se ejecutarán los tests en este repositorio
# y se comentarán los resultados en el repositorio de desarrollo
```

## Configuración de Tokens

### Para TEST_REPO_TOKEN (en el repo de desarrollo):
1. Ve a Settings > Developer settings > Personal access tokens
2. Crea un token con permisos:
   - `repo` (acceso completo a repositorios privados)
   - `workflow` (disparar workflows)

### Para DEV_REPO_TOKEN (en este repo - opcional):
1. Mismo proceso que arriba
2. Permisos necesarios:
   - `repo` (para comentar en PRs y crear issues)

## Verificación

### En el repositorio de desarrollo:
- Ve a Actions tab
- Verás el workflow "Trigger API Tests" ejecutándose

### En este repositorio:
- Ve a Actions tab  
- Verás el workflow "External Development Tests" ejecutándose
- Los artifacts contendrán los resultados de los tests

## Comportamiento de Comentarios

### En Pull Requests:
- Los resultados se comentan directamente en el PR

### En Commits directos:
- Se crea un issue con los resultados
- El issue se etiqueta con `api-tests` y `automated`

## Personalización

### Cambiar ramas que disparan tests:
Edita el archivo `dev-repo-trigger.yml` en el repositorio de desarrollo:
```yaml
on:
  push:
    branches: [main, develop, feature/*, hotfix/*]  # Agregar más ramas
```

### Cambiar qué tests se ejecutan:
Edita el archivo `external-dev-tests.yml` en este repositorio:
```yaml
- name: Run API tests
  run: mvn test -Dtest=TuRunnerEspecifico  # Cambiar el runner
```

### Agregar más información en los comentarios:
Modifica la sección "Comment on development repository" en `external-dev-tests.yml`

## Troubleshooting

### Los tests no se disparan:
1. Verificar que los secrets estén configurados correctamente en el repo de desarrollo
2. Verificar que el token tenga permisos suficientes
3. Revisar los logs del workflow "Trigger API Tests"

### Error de permisos:
1. Verificar que el token tenga acceso a este repositorio
2. Verificar que este repositorio tenga el workflow configurado

### Los tests no se ejecutan en este repositorio:
1. Verificar que el archivo `.github/workflows/external-dev-tests.yml` esté en este repositorio
2. Verificar que el `event_type` coincida: `dev-commit-trigger`

### Los comentarios no aparecen:
1. Verificar que `DEV_REPO_TOKEN` esté configurado
2. Verificar que el token tenga permisos para comentar en el repo de desarrollo

## Ventajas de esta Configuración

✅ **Centralización de tests**: Todos los tests están en un repositorio dedicado
✅ **No bloquea desarrollo**: Los tests pueden fallar sin afectar el desarrollo
✅ **Trazabilidad**: Cada commit tiene su ejecución de tests asociada
✅ **Flexibilidad**: Fácil de modificar qué tests ejecutar
✅ **Escalabilidad**: Puedes agregar más repositorios de desarrollo fácilmente
✅ **Separación de responsabilidades**: Tests separados del código de desarrollo 