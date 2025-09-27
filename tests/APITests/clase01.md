# Notas de la clase

## Proceso simplificado

1. Creamos una carpeta nueva dentro de tests/APITests/
2. Luego, creamos el archivo dentro de esta nueva carpeta */APITests/APITests.spec.ts
3. Modificamos el archivos playwright.config.ts/ para agregar una nueva configuración para estas pruebas de integración

## Explicación

Estando dentro de playwright.config.ts/ vamos a buscar la sección de `projects` y agregamos un nuevo proyecto.
Para ello, escribimos el nombre del proyecto, la ruta en la que playwright tendrá que buscar los archivos de prueba. También, agregaremos la URL a dónde se van a realizar las solicitudes y si hay alguna información que tengamos que enviar en la cabecera o cuerpo de la solicitud también será agregada durante esta fase. 

Uno de las cosas importantes dentro de este proceso es establecer una variable de ambiente que contiene la key que nos permitirá tener los permisos para realizar las consultas (y por ende las acciones) por medio de las pruebas de API.

### El ejercicio

Hacer uso de la API de Github para crear un issue dentro de esta plataforma sin necesidad de usar UI, sino usando la API.

### El objetivo

Introducir al estudiante al proceso de API testing con Playwright
---
### Dudas que me surgieron durante el ejercicio

1. testMatch, ¿para qué se usa y cómo?
2. use, ¿para qué se usa y cómo?
3. ¿Qué hace el HTTPHeaders y cómo lo usas?
4. ¿Los valores `accept` y `auth` de dónde se los saco o dónde los busco?


### Respuestas a estas primeras dudas

#### testMatch, ¿para qué se usa y cómo? 

Esta propiedad dentro de `projects` le dice Playwright en dónde se encuentran los archivos de pruebas que pertencen a un proyecto en específico.
**Normalmente**, Playwright busca en las carpetas del proyecto que terminen en `.spec.ts` o `test.ts`. Sin embargo, al usar proyectos estamos separando (en este ejemplo) las pruebas de UI de las de integración. En el ejemplo dictado por Patricio lo que se le está diciendo a Playwright es: "Mirá, buscá las pruebas del proyecto llamado `API Tests` dentro de la carpeta `APITest/`"

**Nota:** Los asteriscos usados son patrones de búsqueda universales llamados "glob patterns" y se usando para coincidir nombres de archivos o carpetas. 

*: Es un comodín que representa cualquier caracter (menos `/`) y se usa para coincidir cualquier nombre de archivos o de una sola carpeta.

**: Representa cualquier caracter (esta vez sí incluye `/`) para buscar dentro de directorios y subdirectorios, busca recursivamente. 

#### use, ¿para qué se usa y cómo? 

El **objeto** `use` se usa para configurar las opciones y el comportamiento de todas las pruebas del proyecto en cuestión. Es como "preparar" la mesa de trabajo antes de comenzar. 

`baseURL:` establece la URL para las peticiones de la API. Una ventaja de esto es que en las pruebas solo necesitarías escribir los endpoints o las rutas relativas ya que por defecto usará la URL en `baseURL`.

#### ¿Qué hace el HTTPHeaders y cómo lo usas?

`extraHTTPHeaders:` Cabeceras que serán agregadas a las peticiones durante las pruebas. 

#### ¿Los valores `accept` y `auth` de dónde se los saco o dónde los busco?

En el curso, `accept` le está diciendo al servidor, en este caso Github: "Mirá, usá la versión 3 de tu API para responder a mis solicitudes". Ahora `authorization`, en cambio, dice que estoy autorizado para ahcer la petición usando el token que se está entregando.

`${process.env.API_TOKEN}` es una práctica de seguridad le estás diciendo a **node** que lea el valor de la variable del sistema, evitando escribir directamente la info en el código.

### Más dudas
1. ¿La ruta usada en testMatch es relativa a qué archivo?
2. ¿Son los formatos .spec.ts y test.ts equivalentes?
3. ¿Cuándo se establece una variable de entorno en la terminal en dónde se aloja?
4. ¿Se puede crear un archivo para almacenar las variables de entorno?

### Más respuestas

#### ¿La ruta usada en testMatch es relativa a qué archivo?
Es relativa a la propiedad testDir dentro del archivo `playwright.config.ts`

#### ¿Son los formatos .spec.ts y test.ts equivalentes?
Sí, son equivalentes. 
- spec: viene de especificación, heredado del estilo de escritura en BDD
- test: convención para nombrar archivos de prueba

#### ¿Cuándo se establece una variable de entorno en la terminal en dónde se aloja?
En la memoria temporal de esa sesión de terminal. No va a ningún archivo cuando se hace de esta manera.
Es decir que al hacer esto, todos los scripts desde esa misma ventana de terminal leerán las variables de entorno establecidas.

#### ¿Se puede crear un archivo para almacenar las variables de entorno?
Sí, en la raíz del proyecto se puede crear un archivo `.env` y, dentro de este, se guardan las variables en formato clave-valor

Luego, se puede usar una librería como **dotenv** para leer el archivo al iniciar la app y cargar esas variables de entorno en `process.env` (node) haciéndolas disponibles para Playwright.

**Nota**: Al hacer esto, recordar agregar el archivo `.env` en el `.gitignore` para que no se agregue al repo cuando sea subido al Github.
**Nota 2**: Para entornos de CI/CD puede que esto no sea necesario porque las plataformas pueden contener sistemas de gestión de secretos.
