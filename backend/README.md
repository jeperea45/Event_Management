# Backend - Documentación

Este es el backend de la aplicación, construido con **Node.js**, **Express** y **MongoDB**. Proporciona una API RESTful para gestionar la autenticación de usuarios y la creación, lectura, actualización y eliminación de eventos.

---

## **Instalación**

Sigue estos pasos para configurar y ejecutar el backend:

1. **Clonar el repositorio:**
   ```bash
   git clone [<url-del-repositorio>](https://github.com/jeperea45/Event_Management)
   cd Event_Management
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las siguientes variables:
     ```env
     MONGO_URI=<tu-cadena-de-conexión-de-mongodb>
     PORT=5000
     JWT_SECRET=<tu-clave-secreta-para-jwt>
     ```

4. **Ejecutar el servidor:**
   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:5000`.

---

## **Estructura del Proyecto**

### **1. Configuración**
- **`config/db.js`**:  
  Contiene la lógica para conectarse a la base de datos MongoDB utilizando Mongoose.  
  - **Funcionalidad:**  
    - Conecta a la base de datos usando la URI proporcionada en las variables de entorno.
    - Maneja errores de conexión.

### **2. Controladores**
- **`controllers/authController.js`**:  
  Gestiona la autenticación de usuarios (registro, inicio de sesión, cierre de sesión y perfil).  
  - **Funciones principales:**  
    - `register`: Registra un nuevo usuario.
    - `login`: Inicia sesión y genera un token JWT.
    - `logout`: Cierra la sesión del usuario.
    - `profile`: Obtiene los datos del perfil del usuario.

- **`controllers/eventController.js`**:  
  Gestiona la creación, lectura, actualización y eliminación de eventos.  
  - **Funciones principales:**  
    - `createEvent`: Crea un nuevo evento.
    - `getEvents`: Obtiene todos los eventos.
    - `filterEvents`: Filtra eventos por descripción, fecha o ubicación.
    - `updateEvent`: Actualiza un evento existente.
    - `deleteEvent`: Elimina un evento.

### **3. Middleware**
- **`middleware/authMiddleware.js`**:  
  Verifica la autenticación del usuario mediante un token JWT.  
  - **Funcionalidad:**  
    - Valida el token y permite el acceso a rutas protegidas.

### **4. Modelos**
- **`models/Event.js`**:  
  Define el esquema de MongoDB para los eventos.  
  - **Campos:**  
    - `name`, `date`, `time`, `location`, `description`, `userId`.

- **`models/User.js`**:  
  Define el esquema de MongoDB para los usuarios.  
  - **Campos:**  
    - `email`, `password`.

### **5. Rutas**
- **`routes/authRoutes.js`**:  
  Define las rutas para la autenticación (`/api/auth`).  
  - **Endpoints:**  
    - `POST /register`: Registro de usuario.
    - `POST /login`: Inicio de sesión.
    - `POST /logout`: Cierre de sesión.

- **`routes/eventRoutes.js`**:  
  Define las rutas para la gestión de eventos (`/api/events`).  
  - **Endpoints:**  
    - `POST /create`: Crear evento.
    - `GET /getEvents`: Obtener todos los eventos.
    - `GET /filter`: Filtrar eventos.
    - `PUT /:id`: Actualizar evento.
    - `DELETE /:id`: Eliminar evento.

### **6. Servidor**
- **`server.js`**:  
  Configura y ejecuta el servidor Express.  
  - **Funcionalidad:**  
    - Configura CORS, cookies y sesiones.
    - Conecta a la base de datos.
    - Define las rutas principales.

---

## **Endpoints de la API**

### **Autenticación**
- **Registro de usuario:**  
  `POST /api/auth/register`  
  - **Body:**  
    ```json
    {
      "email": "usuario@example.com",
      "password": "contraseña123"
    }
    ```

- **Inicio de sesión:**  
  `POST /api/auth/login`  
  - **Body:**  
    ```json
    {
      "email": "usuario@example.com",
      "password": "contraseña123"
    }
    ```

- **Cierre de sesión:**  
  `POST /api/auth/logout`

### **Eventos**
- **Crear evento:**  
  `POST /api/events/create`  
  - **Body:**  
    ```json
    {
      "name": "Concierto",
      "date": "2023-12-25",
      "time": "20:00",
      "location": "Teatro Principal",
      "description": "Concierto de Navidad"
    }
    ```

- **Obtener todos los eventos:**  
  `GET /api/events/getEvents`

- **Filtrar eventos:**  
  `GET /api/events/filter?description=concierto&startDate=2023-12-01&endDate=2023-12-31&location=teatro`

- **Actualizar evento:**  
  `PUT /api/events/:id`  
  - **Body:**  
    ```json
    {
      "name": "Concierto Actualizado",
      "date": "2023-12-26",
      "time": "21:00",
      "location": "Teatro Principal",
      "description": "Concierto de Navidad Actualizado"
    }
    ```

- **Eliminar evento:**  
  `DELETE /api/events/:id`

---

## **Dependencias Principales**

- **Express**: Framework para construir APIs.
- **Mongoose**: ODM para MongoDB.
- **dotenv**: Manejo de variables de entorno.
- **jsonwebtoken**: Generación y verificación de tokens JWT.
- **cookie-parser**: Manejo de cookies.
- **cors**: Configuración de CORS para permitir solicitudes desde el frontend.

---

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar este backend! 🚀
