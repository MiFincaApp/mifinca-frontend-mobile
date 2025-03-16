# Manual de Git y GitHub - MiFinca

# Manual de Uso de Git y GitHub para el Proyecto MiFinca

## Índice

1. [**Configuración Inicial de Git**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
2. [**Cómo Clonar el Repositorio**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
3. [**Creación y Gestión de Ramas Personales**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
4. [**Cómo Subir Cambios a tu Rama Personal**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
5. [**Sincronizar tu Rama Personal con los Últimos Cambios de Main**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
6. [**Crear un Pull Request (PR) hacia Main**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
7. [**Reglas y Restricciones del Repositorio**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
8. [**Comandos Útiles en Git**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)
9. [**Uso Necesario de la Terminal en PowerShell**](https://www.notion.so/Manual-de-Git-y-GitHub-MiFinca-1b8b28e92cfb80909191e4662c67522e?pvs=21)

## 1️⃣ CONFIGURACIÓN INICIAL DE GIT

Antes de empezar a trabajar, configura tu usuario en Git:

```bash
$ git config --global user.email "tu-email@ejemplo.com que tienes en github"
$ git config --global user.name "Tu Nombre de usuario de github"

```

Verifica tu configuración con:

```bash
$ git config --global --list

```

---

## 2️⃣ CÓMO CLONAR EL REPOSITORIO

Para descargar el proyecto en tu computadora:

```bash
git clone https://github.com/MiFincaApp/MiFinca.git

```

Luego, entra en la carpeta del proyecto:

```bash
cd MiFinca

```

Verifica en qué rama estás:

```bash
git branch

```

---

## 3️⃣ CREACIÓN Y GESTIÓN DE RAMAS PERSONALES

Cada desarrollador trabaja en su propia rama. Para crear tu rama y cambiarte a ella:

```bash
git checkout -b Rama-TuNombre #Al colocar tu email y usuario no es necesario hacer esto

```

Para ver en qué rama estás:

```bash
git branch

```

Para cambiar de rama:

```bash
git checkout Rama-TuNombre

```

Para eliminar una rama local (si ya no la necesitas):

```bash
git branch -d Rama-TuNombre #No recomendado solo en ocaciones especiales

```

Para eliminar una rama remota (requiere permisos adecuados):

```bash
git push origin --delete Rama-TuNombre

```

---

## 4️⃣ CÓMO SUBIR CAMBIOS A TU RAMA PERSONAL

Cada vez que hagas cambios en tu código, sigue estos pasos:

```bash
git add .  # Agrega todos los archivos modificados

```

```bash
git commit -m "Descripción breve del cambio"

```

```bash
git push origin Rama-TuNombre  # Sube los cambios a tu rama personal en GitHub

```

---

## 5️⃣ SINCRONIZAR TU RAMA PERSONAL CON LOS ÚLTIMOS CAMBIOS DE MAIN (HISTORIAL LINEAL)

⚠️ **IMPORTANTE:** No uses `git merge main`. Solo usa `git rebase`.

### Actualizar `main` local con la última versión de GitHub:

```bash
git checkout main  # Cambiar a main

```

```bash
git pull origin main  # Traer los últimos cambios de GitHub

```

### Aplicar los cambios de `main` en tu rama personal:

```bash
git checkout Rama-TuNombre

```

```bash
git rebase origin/main

```

Si hay conflictos, resuélvelos manualmente y luego ejecuta:

```bash
git add .
git rebase --continue

```

Si el `rebase` ya está listo, sube tu rama con:

```bash
git push --force-with-lease origin Rama-TuNombre

```

📌 **Nota:** `--force-with-lease` evita sobrescribir cambios de otros.

---

## 6️⃣ CREAR UN PULL REQUEST (PR) HACIA MAIN

1. Ve a [GitHub](https://github.com/Andres22/MiFinca)
2. Abre la pestaña **Pull Requests**
3. Haz clic en **New Pull Request**
4. Selecciona `main` como base y `Rama-TuNombre` como comparación
5. Describe los cambios y menciona `@FreymanMc` para revisión
6. Envía el PR y espera aprobación

✅ **Freyman revisará y aprobará los PRs antes de fusionarlos en `main`**

---

## 7️⃣ REGLAS Y RESTRICCIONES DEL REPOSITORIO

✅ **El historial de `main` debe ser lineal:**

- 🚫 **No se permiten `git merge main`**
- ✅ **Solo usa `git rebase origin/main`**

✅ **Cada desarrollador solo puede hacer `push` en su propia rama.**

✅ **Las revisiones de código en `main` las aprueba Freyman.**

✅ **Cada PR debe estar vinculado a un Issue de GitHub usando `#número-del-issue` en la descripción.**

---

## 8️⃣ COMANDOS ÚTILES EN GIT

### Ver historial de commits:

```bash
git log --oneline --graph --all

```

### Ver diferencias antes de hacer commit:

```bash
git diff

```

### Ver estado actual de la rama:

```bash
git status

```

### Deshacer el último commit (sin perder cambios):

```bash
git reset --soft HEAD~1

```

### Eliminar cambios no confirmados:

```bash
git checkout -- nombre-del-archivo

```

---

## 9️⃣ USO NECESARIO DE LA TERMINAL EN POWERSHELL

Como trabajamos en Windows, es importante conocer algunos comandos básicos en **PowerShell** para la gestión de archivos y carpetas:

### 📂 Navegación en directorios

```powershell
pwd   # Muestra en qué directorio estás
ls    # Lista los archivos y carpetas en el directorio actual
cd NombreCarpeta  # Cambiar a una carpeta específica
cd ..  # Subir un nivel en la estructura de carpetas
```

### 📂 Gestión de archivos y carpetas

```powershell
mkdir NuevaCarpeta  # Crear una nueva carpeta
rm -r CarpetaAEliminar  # Eliminar una carpeta y su contenido
rm ArchivoAEliminar.txt  # Eliminar un archivo
```

### 📂 Ver contenido de archivos sin abrirlos

```powershell
cat Archivo.txt  # Muestra el contenido de un archivo
```

---

🚀 **¡Siguiendo este flujo de trabajo, garantizamos un proyecto ordenado y estable!**