# 🧪 Playwright Sandbox Tests

Este repositorio contiene pruebas de automatización E2E desarrolladas con [Playwright](https://playwright.dev/) y [TypeScript](https://www.typescriptlang.org/) para testear un entorno de sandbox. El sandbox es el sandbox que ha creado Patricio Miner [Free Range Testers](https://www.linkedin.com/in/patricio-m-690b3729/) como un recurso de apoyo a los curso que dicta en su [academia](https://www.freerangetesters.com/academia).

---

## 🚀 Cómo Empezar

Sigue estos pasos para configurar tu entorno local y ejecutar las pruebas.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

* **Node.js y npm:** Se recomienda usar las últimas versiones estables. Puedes gestionarlas con [Nodist](https://github.com/nodists/nodist) si usas Windows:
    ```bash
    # Para instalar Nodist con Chocolatey (si aún no lo tienes)
    choco install nodist

    # Para instalar la última versión estable de Node.js
    nodist + latest

    # Para usar esa versión
    nodist latest
    ```
* **Git:** Para clonar el repositorio y llevar el control de todo el ecosistema que se forma con los archivos del proyecto. Git lo puedes descargar desde desde [git-scm.com](https://git-scm.com/downloads).
* **Visual Studio Code (VS Code):** Tu editor de código preferido (opcional pero recomendado). Lo puedes descargar [aquí](https://code.visualstudio.com/)

### Configuración del Entorno

1.  **Clonar el Repositorio:**
    Abre tu terminal (Git Bash) y clona este repositorio:
    ```bash
    git clone [https://github.com/ProgrammerDwarf/playwright-frt-curso.git](https://github.com/ProgrammerDwarf/playwright-frt-curso.git)
    cd playwright-frt-curso
    ```
    *(Si estás configurando tu propio repo por primera vez y ya lo tienes local, este paso es para futuros colaboradores.)*

2.  **Instalar Dependencias:**
    Una vez dentro del directorio del proyecto, instala todas las dependencias de Node.js (incluyendo Playwright):
    ```bash
    npm install
    ```
    Durante la instalación de Playwright, los **binarios de los navegadores** (Chromium, Firefox, WebKit) se descargarán automáticamente. Si no se descargan, puedes forzar su instalación con:
    ```bash
    npx playwright install
    ```

### Extensiones de VS Code Recomendadas

Si usas Visual Studio Code, te recomendamos instalar las siguientes extensiones para una mejor experiencia de desarrollo:

* **Playwright Test for VSCode** (`ms-playwright.playwright`)
    * Proporciona ejecución de pruebas directamente desde el editor, depuración, y visualización de reportes.
* **Playwright Test Snippets** (`markskelton.playwright-test-snippets`)
    * Ofrece fragmentos de código útiles para escribir pruebas Playwright más rápido.

---

## ⚙️ Ejecución de Pruebas

Puedes ejecutar tus pruebas de varias maneras:

### Desde la Línea de Comandos

* **Ejecutar todas las pruebas:**
    ```bash
    npx playwright test
    ```
* **Ejecutar pruebas en un navegador específico (ej. Chromium):**
    ```bash
    npx playwright test --project=chromium
    ```
* **Ejecutar una prueba específica (por nombre de archivo):**
    ```bash
    npx playwright test tests/ejemplo.spec.ts
    ```
* **Ejecutar pruebas con interfaz de usuario (UI Mode):**
    ```bash
    npx playwright test --ui
    ```
    Esto abrirá una interfaz gráfica donde puedes ver las pruebas, ejecutarlas paso a paso y depurarlas.
    

### Desde Visual Studio Code

Las extensiones de Playwright para VS Code también te permiten ejecutar y depurar pruebas directamente desde el panel de `Testing` (icono del matraz) o haciendo clic en los botones `Run` (símbolo de "play" verde) que aparecen junto a tus pruebas en el editor.

---

## 📊 Reportes de Pruebas

Playwright genera reportes de las ejecuciones. Por defecto, un reporte HTML se genera después de cada ejecución.

* **Ver el último reporte HTML:**
    ```bash
    npx playwright show-report
    ```
    Esto abrirá el reporte en tu navegador predeterminado. Los reportes se guardan en la carpeta `playwright-report/` (la cual está ignorada por Git por como configuré el repo).

---

## 🤝 Contribución

Se sigue un flujo de trabajo basado en **GitHub Flow**.

1.  **Clona** el repositorio.
2.  Asegúrate de que tu rama `main` esté **actualizada**: `git pull origin main`.
3.  Crea una **nueva rama** para tus cambios: `git checkout -b feature/nombre-de-la-feature`.
4.  Realiza tus cambios y haz **commits** descriptivos.
5.  **Empuja** o haz **push** tu rama al origen: `git push origin feature/nombre-de-la-feature`.
6.  Abre un **Pull Request (PR)** a la rama `main` en GitHub.
7.  Después de la revisión y aprobación, tu PR será fusionado.

---

## 📄 Licencia

Por el momento este repo no dispone de ninguna licencia 