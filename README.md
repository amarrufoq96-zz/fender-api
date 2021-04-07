<!-- Tabla de contenido -->
## Tabla de contenido

* [Sobre el proyecto](#sobre-el-proyecto)
  * [Construido con](#construido-con)
* [Empezando](#empezando)
* [Prerrequisitos](#prerrequisitos)
* [Instalación](#instalación)
* [Aplicación](#aplicación)
  * [Capa de configuración](#capa-de-configuración)
  * [Capa de base de datos](#capa-de-base-de-datos)
  * [Capa de lógica](#capa-de-lógica)
  * [Capa de rutas](#capa-de-rutas)
* [Depedencias default ](#dependencias-default)
* [Recomendaciones](#recomendaciones)
* [Configuración del editor de código](#configuración-del-editor-de-código)
* [Configuración de eslint](#configuración-de-eslint)
* [Configuración de gitignore](#configuración-de-gitignore)

<!-- Sobre el proyecto -->
## Sobre el proyecto
![Nombre del Proyecto][project-screenshot]
![Nombre de la Arquitectura][architecture-screenshot]

Hay muchas arquitecturas disponibles, sin embargo, no encontré una que realmente se adaptara a los proyectos que normalmente trabajamos en IUNNGO, así que creé este proyecto con una Arquitectura de Capas tomando elemento de otros proyectos como Eventos, CloudZoco y Mensajería. 

Este es el por qué:
* Tener una arquitectura solida en todos los proyectos que se desarrollen en CompuSoluciones.
* Tener un estándar dentro de la empresa que nos permita un desarrollo más ágil.
* Ahorro en tiempo al momento de realizar un proyecto desde cero.

Por supuesto, ninguna base servirá para todos los proyectos, ya que sus necesidades pueden ser diferentes. Así que agregaré más funcionalidades en un futuro También puede sugerir cambios bifurcando este repositorio y creando una solicitud de extracción o abriendo un issue.


### Construido con
Tecnologías y lenguaje de programación que se usaron para el desarrollo de este proyecto.
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [NodeJS](https://nodejs.org/es/)
* [Koa JS](https://koajs.com/)


<!-- Empezando -->
### Empezando

Instrucciones sobre cómo configurar su proyecto localmente. Para obtener una copia local en funcionamiento, siga estos sencillos pasos.


### Prerrequisitos

Tener instalado Node JS versión recomendable 12.18 y NPM versión 6.11

* Node JS (https://nodejs.org/es/download/)
```sh
node --version
```
* NPM
```sh
npm --version
```

### Instalación

1. Obtenga una clave API gratuita para CRYPTR y otra para JWT en https://passwordsgenerator.net/es/
2. Clonar repositorio
```sh
git clone git@gitlab.compusoluciones.com:base/api-rest.git
```
3. Instalar paquetes de NPM
```sh
npm install
```
4. Configuración de variables de entorno `.env`
```.env
AWS_SMTP_PASSWORD=CONTRASEÑA
AWS_SMTP_PORT=PUERTO
AWS_SMTP_SERVER=SERVER
AWS_SMTP_USERNAME=USUARIO
CRYPTR=INTRODUZCA SU API CRYPTR
JWT=INTRODUZCA SU API JWT
NODE_ENV=development / sandbox / production
PORT=PUERTO
BDD_DATABASE=NOMBRE DE LA BASE DE DATOS
BDD_HOST=SERVER
BDD_PASSWORD=CONTRASEÑA
BDD_USER=USUARIO
```
5. Ejecutar el proyecto en local
```sh
nodemon
```

### Aplicación
 

### Capa de configuración


### Capa de base de datos


### Capa de lógica


### Capa de rutas


### Depedencias default 


### Recomendaciones


### Configuración del editor de código


### Configuración de eslint


### Configuración de gitignore


### Documentación

1. Ejecutar el siguiente comando para generar la documentación de ejemplo.
```sh
 apidoc -i documentation/ -o docs/
```


<!--  Ligas y Imagenes -->
[project-screenshot]: https://i.imgur.com/1kTGrIX.png
[architecture-screenshot]: https://i.imgur.com/WwS6zKO.png