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

En el curso, `accept` le está diciendo al servidor, en este caso Github: "Mirá, usá la versión 3 de tu API para responder a mis solicitudes" 
