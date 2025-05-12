<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 🧭 Weather App Backend

Este proyecto es un backend desarrollado con **NestJS** y **TypeScript** que permite consultar el clima de distintas ciudades, gestionar favoritos y exponer una API REST para el consumo de datos. Se eligió **NestJS** por su arquitectura modular, soporte nativo para TypeScript y su enfoque en buenas prácticas como la inyección de dependencias.

---

## ⚙️ Arquitectura del Proyecto

### Estructura del Proyecto

El proyecto sigue una estructura modular, donde cada funcionalidad principal (como `weather`, `favorites`, etc.) está encapsulada en su propio módulo. Esto facilita la escalabilidad y el mantenimiento del código. No se escogio arquitecturas tales como la hexagonal o DDD, ya que la aplicación es relativamente simple y no justifica la complejidad adicional.

```
└── 📁weather-app-backend
    └── 📁src
        └── app.module.ts
        └── 📁cities
            └── 📁favorites
        └── 📁common
        └── 📁config
        └── 📁core
            └── 📁auth
            └── 📁users
        └── 📁weather
        └── main.ts
    └── 📁test
        └── app.e2e-spec.ts
        └── jest-e2e.json
    └── .env
    └── .env.example
    └── .gitignore
    └── .prettierrc
    └── docker-compose.yml
    └── eslint.config.mjs
    └── nest-cli.json
    └── package.json
    └── README.md
    └── REQUIREMENTS.md
    └── tsconfig.build.json
    └── tsconfig.json
```

### Decisiones de Diseño

- **Modularidad**: Cada módulo tiene controladores, servicios y entidades independientes.
- **Inyección de Dependencias**: Uso extensivo de la inyección de dependencias para desacoplar componentes.
- **Filtros de Excepciones**: Manejo centralizado de errores con filtros personalizados.

---

## 📦 Paquetes y Herramientas Utilizadas

### Paquetes Principales

- **NestJS**: Framework principal para construir la API REST.
- **TypeORM**: ORM para interactuar con la base de datos (PostgreSQL).
- **Axios**: Cliente HTTP para consumir la API externa de WeatherAPI.
- **Class-Validator y Class-Transformer**: Validación y transformación de datos en DTOs.
- **Cache Manager**: Implementación de caché en memoria para optimizar el rendimiento.

### Justificación de Paquetes

- **NestJS**: Su arquitectura modular y soporte para TypeScript lo hacen ideal para aplicaciones escalables.
- **TypeORM**: Permite manejar la persistencia de datos de manera declarativa y con migraciones.
- **Axios**: Es un cliente HTTP robusto y ampliamente utilizado.
- **Cache Manager**: Mejora el rendimiento al evitar solicitudes repetitivas a la API externa.
- **Class-Validator**: Garantiza que los datos recibidos cumplan con las reglas de negocio.

---

## 🛠️ Endpoints y Funcionalidades

Cada controlador esta documentado con Swagger, lo que permite una fácil visualización y prueba de los endpoints. Ademas de que cada DTO esta validado con `class-validator` y `class-transformer`, lo que permite una validación de los datos de entrada y salida.

Este es accesible en la ruta `/api` una vez que la aplicación está en ejecución. Teniendo en consideracion que el prefijo global de la API es `/api`, por lo que los endpoints quedan de la siguiente manera:

- **`POST /api/auth/login`**: Autenticación de usuarios.
- **`GET /api/weather?city=...`**: Devuelve datos del clima de una ciudad.

### Endpoints Implementados

- **`POST /auth/login`**: Autenticación de usuarios.
- **`POST /auth/register`**: Registro de nuevos usuarios.

- **`GET /weather?city=...`**: Consulta del clima de una ciudad.
- **`GET /weather/autocomplete?city=...`**: Consulta de autocompletado de ciudades.
- **`GET /weather/forecast?city=...`**: Consulta del pronóstico del clima.

- **`GET /favorites`**: Obtiene la lista de ciudades favoritas.
- **`POST /favorites`**: Agrega una ciudad a la lista de favoritas.
- **`DELETE /favorites/:id`**: Elimina una ciudad de la lista de favoritas.
- **`GET /favorites/:id`**: Obtiene los detalles de una ciudad favorita.

---

## 🧪 Pruebas

### Pruebas Unitarias

El rango abarcado de las pruebas unitarias incluye parte de la lógica de negocio y la validación de datos.

- **Controladores**: Verificación de la lógica de los controladores y sus respuestas.
- **Servicios**: Validación de la lógica de negocio en los servicios.
- **DTOs**: Validación de los datos de entrada y salida utilizando `class-validator` y `class-transformer`.

---

## 🚀 Entorno de desarrollo

### Requisitos Previos

- **Node.js**: Versión 18 o superior.
- **Docker**: Para ejecutar la base de datos PostgreSQL.
- **Docker Compose**: Para orquestar los contenedores de la aplicación y la base de datos.

### Instalación

Para este caso y por comodidad, se utilizara el gestor de paquetes `yarn`, pero puedes usar `npm` si lo prefieres. Asegúrate de tenerlo instalado en tu sistema.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/adiazt01/weather-app-backend.git

   cd weather-app-backend

   yarn install
   ```

2. Crea un archivo `.env` a partir del archivo `.env.example` y configura las variables de entorno necesarias.

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` y configura las variables de entorno necesarias, como la URL de la base de datos y la clave de la API de WeatherAPI.

3. Levanta la base de datos con Docker:
   ```bash
   docker-compose up -d
   ```
4. Ahora podes ejecutar la aplicación en modo desarrollo:

   ```bash
   yarn start:dev
   ```

5. Accede a la documentación de la API en `http://localhost:3000/api`.

6. Para ejecutar las pruebas unitarias, puedes usar el siguiente comando:

   ```bash
   yarn test
   ```
