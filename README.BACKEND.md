# 🚀 Retorna - Backend

## 🏗️ Arquitectura del Proyecto
El backend de Retorna ha sido desarrollado en **Node.js** con **TypeScript**, sin ningún framework de por medio. La estructura del proyecto sigue una organización modular con las siguientes carpetas:

- 📂 **config/**: Configuración del proyecto.
- 📂 **controllers/**: Controladores de la API.
- 📂 **enums/**: Enumeraciones utilizadas en el proyecto.
- 📂 **interfaces/**: Definiciones de tipos y estructuras de datos.
- 📂 **models/**: Modelos para la base de datos MongoDB.
- 📂 **services/**: Lógica de negocio.
- 📂 **tests/**: Pruebas unitarias e integración con Jest.
- 📂 **utils/**: Funciones auxiliares y reutilizables.

## 🛠️ Instalación y Ejecución
Para ejecutar el backend, es necesario tener instalado **Node.js** en una versión **mayor a 15**. Luego, sigue estos pasos:

1. 📥 Instalar dependencias:
   ```sh
   npm install
   ```
2. ▶️ Iniciar el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```
3. 🧪 Ejecutar las pruebas con Jest:
   ```sh
   npm test
   ```

## 🌍 Servidor en Producción
El backend está desplegado utilizando **Ngrok**, con la siguiente URL:
🔗 [https://totally-fleet-worm.ngrok-free.app/](https://totally-fleet-worm.ngrok-free.app/)

## 📜 Documentación de la API
La documentación Swagger está disponible en el siguiente enlace:
🔗 [https://app.swaggerhub.com/apis-docs/retorna/Retorna/1.0.0#/](https://app.swaggerhub.com/apis-docs/retorna/Retorna/1.0.0#/)

Puedes configurar Swagger para ejecutarlo de manera local o directamente desde la URL de Ngrok.

## 🔑 Variables de Entorno
Para ejecutar el proyecto, se deben definir las siguientes variables de entorno en un archivo `.env`:

```
MONGO_URI=mongodb+srv://jvivas97:ZLFja3zfcQcOpxMC@money.fkqeo.mongodb.net/task-app
PORT=3000
```

## 🔄 Endpoints Disponibles
El controlador maneja las siguientes funciones de la API:

- **`GET /tasks`** → 📌 `getAllTask` - Obtiene todas las tareas.
- **`POST /tasks`** → ✏️ `CreateTask` - Crea una nueva tarea.
- **`PUT /tasks/:id`** → 🔄 `UpdateTask` - Actualiza una tarea existente.
- **`DELETE /tasks/:id`** → ❌ `DeleteTask` - Elimina una tarea.
- **`DELETE /tasks/clear-completed`** → 🧹 `clearCompleteTask` - Elimina todas las tareas completadas.

## 🧪 Pruebas con Jest
El backend cuenta con **pruebas automatizadas** utilizando **Jest**, las cuales verifican el correcto funcionamiento de todos los endpoints y la conexión a la API.

Para ejecutar las pruebas, usa el siguiente comando:
```sh
npm test
```

---


