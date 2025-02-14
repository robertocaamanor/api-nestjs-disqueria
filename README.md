# Artistas Service

Este es un servicio API construido con el framework [NestJS](https://nestjs.com/) para gestionar artistas y países.

## Descripción

El servicio permite crear, actualizar, eliminar y obtener información sobre artistas y países. También incluye autenticación JWT para proteger las rutas.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd api-nestjs-disqueria
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración

Asegúrate de tener una base de datos PostgreSQL en funcionamiento y configura las variables de entorno necesarias en el archivo [docker-compose.yml](http://_vscodecontentref_/1).

## Uso

### Desarrollo

Para iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
```
### Producción

Para construir y ejecutar el servidor en modo producción:
```bash
npm run build
npm run start:prod
```

### Docker
Para ejecutar el proyecto usando Docker:

```
docker-compose up --build
```

### Endpoints
La documentación de la API está disponible en /api una vez que el servidor esté en funcionamiento. Utiliza Swagger para explorar y probar los endpoints.

### Pruebas
Para ejecutar las pruebas unitarias:

```
npm run test
```

Para ejecutar las pruebas end-to-end:
```
npm run test:e2e
```

Para ver la cobertura de las pruebas:
```
npm run test:cov
```
