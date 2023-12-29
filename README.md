<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Aplicacion de control de productos y almacenes

Aplicacion realizada que permite la carga, actualizacion y eliminacion de un almacen y productos relizados con PHP para el BackEnd, y React, Axios y AntDesign en el FrontEnd. Este ultimo utilizando TypeScript.

> Notas a tener en cuenta:

> 1-. Las seeds que se corren en esta aplicacion son datos totalmente fictiocios, es decir, no se va a encontrar un nombre de producto como por ejemplo "Schweppes".

> 2.- Una vez en el FrontEnd si al querer realizar una consulta este mismo no lo permite eperar unos segundos y recargar la pagina.

## Instalacion

### API
- Clonar o descargar el repositorio.
- En el directorio del proyecto crear un archivo con el nombre `.env`
- Copiar lo que se encuentre en el archivo `.env.example` en su archivo `.env` y configurar la base de datos.
- En consola navegar hacia el directorio donde se encuentra el proyecto y ejecutar `composer install`.
- En la misma consola ejecutar las migraciones `php artisan migrate`.
- Inicar el servidor php con el comando `php artisan serve`.

### Front End
- Dentro del proyecto clonado dirigirse hacia la ruta del front end con el comando `cd warehouse_dashboard`.
- Una vez dentro del directorio ejecutar `npm install`.
- Finalizada la ejecucion, iniciar el servidor del front `npm run dev`.

Si se han realizados los pasos correctamente ahora mismo usted podra divisar la pestaña de login en `http://localhost:5173/login`.

> Notas a tener en cuenta:

> 3.- Al iniciar el sistema y base de datos debe registrar un usuario, ya que las seeds son completamente ficticias y no hay un usuario de prueba preconfigurado
