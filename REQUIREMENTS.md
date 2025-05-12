# Instrucciones  
**Fullstack Node.js**  
*(React · React Native · NestJS · Express · TypeScript · Docker)*

## 🧭 Objetivo

Construir una aplicación fullstack que permita consultar el clima de distintas ciudades, usando React (o React Native) para el frontend y NestJS o Express para el backend. La solución debe reflejar conocimientos sólidos en arquitectura, buenas prácticas, optimización de rendimiento y consumo eficiente de APIs externas.

---

## ⚙️ Requisitos Funcionales

### 1. Frontend (React o React Native)
- **Input de búsqueda:**
  - Campo de texto con autocompletado (usando el backend).
  - Validaciones para entradas vacías o inválidas.
- **Resultados del clima:**
  - Temperatura actual (Celsius y Fahrenheit).
  - Estado del clima (soleado, lluvioso, etc.) e ícono correspondiente.
  - Datos adicionales: viento, humedad, hora local.
  - Mensaje si no se encuentra la ciudad.
- **Historial de búsquedas (local):**
  - Guardar búsquedas recientes en localStorage (o AsyncStorage en móvil).
  - Permitir reconsultar una ciudad desde el historial.
- **Favoritos (persistente en backend):**
  - Marcar ciudades como favoritas.
  - Obtener, agregar y eliminar favoritos persistentes desde el backend (con DB).
- **Vistas:**
  - Vista tabla: lista de ciudades con columnas de clima, hora, etc.
  - Vista detallada: información completa de una ciudad.
- **Responsivo / Adaptado a móvil**

### 2. Backend (NestJS o Express + TypeScript)
- Exponer una API REST con los siguientes endpoints:
  - `GET /weather?city=...` → devuelve datos del clima.
    - http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=...
  - `GET /autocomplete?query=...` → devuelve sugerencias de ciudades.
    - http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond
  - `GET /favorites` → obtiene lista de favoritos.
  - `POST /favorites` → agrega ciudad a favoritos.
  - `DELETE /favorites/:city` → elimina ciudad de favoritos.
- Integración con la API externa de WeatherAPI.
- Manejo robusto de errores (ciudad no encontrada, fallos de red, etc.).
- Cache de resultados (ej: Map en memoria o Redis).
- Persistencia de favoritos en base de datos (MongoDB, PostgreSQL, etc.).

### 3. Extras Técnicos
- Autenticación básica (opcional): mock de login con JWT.
- Dockerizar backend y frontend por separado (multi-container).
- Setup de entorno usando docker-compose.

---

## 📦 Entrega

- Repositorio en GitHub, GitLab, etc.
- README.md con:
  - Instrucciones de instalación (con y sin Docker).
  - Explicación de la app (estructura, decisiones, errores manejados).
  - Descripción de endpoints del backend.

---

## 📝 Criterios de Evaluación

| Categoría        | Criterio                                                               | Puntaje |
|------------------|-----------------------------------------------------------------------|---------|
| Calidad del Código | Arquitectura limpia, uso correcto de TypeScript, separación de capas |   10    |
| Frontend UI/UX   | Autocompletado, feedback visual, diseño responsive/móvil              |   15    |
| Backend API      | Estructura REST, modularidad, manejo de errores, validaciones         |   15    |
| Base de Datos    | Manejo correcto de favoritos persistentes                             |   10    |
| Optimización     | Cache, carga diferida, hooks/middleware adecuados                     |   10    |
| Dockerización    | Uso correcto de Docker y Docker Compose                               |   10    |
| Extras opcionales| JWT Auth, PWA, pruebas, internacionalización                          |   10    |
| Documentación    | Instrucciones claras y detalles técnicos                              |   10    |
| Pruebas Unitarias| Al menos 3 backend, 2 frontend                                        |   10    |
| **Total**        |                                                                       |  100    |

---