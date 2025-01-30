# Aplicación de Gestión de Eventos

Esta es una aplicación full-stack para gestionar eventos. Permite a los usuarios registrarse, iniciar sesión, crear eventos, filtrarlos, actualizarlos y eliminarlos. El proyecto está dividido en dos partes principales: el **backend** (construido con Node.js, Express y MongoDB) y el **frontend** (construido con React y TypeScript).

---

## **Tabla de Contenidos**

1. [Instalación y Configuración](#instalación-y-configuración)
2. [Documentación del Backend](#documentación-del-backend)
3. [Documentación del Frontend](#documentación-del-frontend)
4. [Funcionalidades Principales](#funcionalidades-principales)
5. [Licencia](#licencia)

---

## **Instalación y Configuración**

Sigue estos pasos para configurar y ejecutar la aplicación:

### **Backend**
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jeperea45/Event_Management
   cd Event_Management/backend
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

   Para más detalles, consulta la [Documentación del Backend](./backend/README.md).

### **Frontend**
1. **Clonar el repositorio:**
   ```bash
   cd Event_Management/frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`.

   Para más detalles, consulta la [Documentación del Frontend](./frontend/README.md).

---

## **Documentación del Backend**

El backend de la aplicación está construido con **Node.js**, **Express** y **MongoDB**. Proporciona una API RESTful para gestionar la autenticación de usuarios y la creación, lectura, actualización y eliminación de eventos.

### **Estructura del Proyecto**
- **`config/db.js`**: Conexión a la base de datos MongoDB.
- **`controllers/`**: Lógica para manejar autenticación y eventos.
- **`middleware/`**: Middleware para autenticación.
- **`models/`**: Esquemas de MongoDB para usuarios y eventos.
- **`routes/`**: Definición de rutas para la API.
- **`server.js`**: Configuración y ejecución del servidor.

### **Endpoints de la API**
- **Autenticación:**  
  - `POST /api/auth/register`: Registro de usuarios.
  - `POST /api/auth/login`: Inicio de sesión.
  - `POST /api/auth/logout`: Cierre de sesión.

- **Eventos:**  
  - `POST /api/events/create`: Crear evento.
  - `GET /api/events/getEvents`: Obtener todos los eventos.
  - `GET /api/events/filter`: Filtrar eventos por fecha o ubicación.
  - `PUT /api/events/:id`: Actualizar evento.
  - `DELETE /api/events/:id`: Eliminar evento.

Para más detalles, consulta el [README del Backend](./backend/README.md).

---

## **Documentación del Frontend**

El frontend de la aplicación está construido con **React** y **TypeScript**. Proporciona una interfaz de usuario intuitiva para gestionar la autenticación y los eventos.

### **Estructura del Proyecto**
- **`components/`**: Componentes reutilizables (formularios, tarjetas, filtros, etc.).
- **`pages/`**: Páginas principales de la aplicación (Home, Auth).
- **`Types/`**: Interfaces TypeScript para eventos, filtros y autenticación.
- **`utils/`**: Utilidades como la configuración de Axios para las solicitudes HTTP.
- **`App.tsx`**: Componente raíz de la aplicación.

### **Funcionalidades**
- **Autenticación:**  
  - Registro e inicio de sesión.
  - Protección de rutas con JWT.

- **Gestión de Eventos:**  
  - Crear, editar, eliminar y listar eventos.
  - Filtrar eventos por fecha o ubicación.

Para más detalles, consulta el [README del Frontend](./frontend/README.md).

---

## **Funcionalidades Principales**

### **Autenticación**
- Registro de usuarios.
- Inicio y cierre de sesión.
- Protección de rutas con JWT.

### **Gestión de Eventos**
- Creación de eventos.
- Visualización de todos los eventos.
- Filtrado de eventos por fecha o ubicación.
- Actualización y eliminación de eventos.

---

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar esta aplicación! 🚀
