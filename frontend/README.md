# Frontend - Documentación

Este es el frontend de la aplicación, construido con **React** y **TypeScript**. Proporciona una interfaz de usuario para gestionar la autenticación de usuarios y la creación, visualización, filtrado, actualización y eliminación de eventos.

---

## **Instalación**

Sigue estos pasos para configurar y ejecutar el frontend:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jeperea45/Event_Management
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

---

## **Estructura del Proyecto**

### **1. Componentes**
- **`AuthForms.tsx`**:  
  Gestiona el formulario de autenticación (registro e inicio de sesión).  
  - **Funcionalidad:**  
    - Permite a los usuarios registrarse e iniciar sesión.
    - Muestra mensajes de éxito o error.

- **`EventCard.tsx`**:  
  Muestra la tarjeta de un evento con su información.  
  - **Campos mostrados:**  
    - `name`, `description`, `date`, `location`.

- **`EventForm.tsx`**:  
  Gestiona el formulario para crear o editar eventos.  
  - **Funcionalidad:**  
    - Permite crear nuevos eventos o editar eventos existentes.
    - Incluye validaciones y manejo de errores.

- **`Filters.tsx`**:  
  Proporciona filtros para buscar eventos por fecha y ubicación.  
  - **Filtros disponibles:**  
    - Fecha.
    - Ubicación.

- **`SearchBar.tsx`**:  
  Permite buscar eventos por nombre o descripción.  
  - **Funcionalidad:**  
    - Filtra eventos en tiempo real según el texto ingresado.

### **2. Páginas**
- **`Home.tsx`**:  
  Es la página principal de la aplicación.  
  - **Funcionalidad:**  
    - Muestra una lista de eventos.
    - Incluye botones para crear eventos, editar eventos y cerrar sesión.
    - Integra los componentes `SearchBar` y `Filters`.

### **3. Tipos**
- **`Types/index.ts`**:  
  Define las interfaces TypeScript utilizadas en la aplicación.  
  - **Interfaces principales:**  
    - `Event`: Representa un evento.
    - `FilterState`: Representa el estado de los filtros.
    - `AuthState`: Representa el estado de autenticación.

### **4. Utilidades**
- **`api.ts`**:  
  Contiene funciones para realizar solicitudes HTTP al backend utilizando **Axios**.  
  - **Configuración de Axios:**  
    ```typescript
    export const api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
    });
    ```
  - **Endpoints utilizados:**  
    - Autenticación (`/auth/login`, `/auth/register`).
    - Eventos (`/events/create`, `/events/getEvents`, `/events/filter`, `/events/:id`, `/events/:id`).

### **5. Aplicación Principal**
- **`App.tsx`**:  
  Es el componente raíz de la aplicación.  
  - **Funcionalidad:**  
    - Gestiona el enrutamiento (`react-router-dom`).
    - Controla el estado global de la aplicación (autenticación, eventos, filtros).
    - Integra los componentes `AuthForms` y `Home`.

---

## **Funcionalidades Principales**

### **Autenticación**
- **Registro de usuarios:**  
  Permite a los nuevos usuarios registrarse en la aplicación.

- **Inicio de sesión:**  
  Permite a los usuarios autenticarse y acceder a la aplicación.

- **Cierre de sesión:**  
  Permite a los usuarios cerrar su sesión.

### **Gestión de Eventos**
- **Crear evento:**  
  Permite a los usuarios crear nuevos eventos.

- **Ver eventos:**  
  Muestra una lista de todos los eventos disponibles.

- **Filtrar eventos:**  
  Permite filtrar eventos por fecha y ubicación.

- **Editar evento:**  
  Permite a los usuarios modificar eventos existentes.

- **Eliminar evento:**  
  Permite a los usuarios eliminar eventos.

---

## **Dependencias Principales**

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Agrega tipado estático al proyecto.
- **React Router**: Manejo de rutas en la aplicación.
- **Axios**: Cliente HTTP para realizar solicitudes al backend.
- **Lucide React**: Iconos utilizados en la interfaz de usuario.
- **date-fns**: Librería para formatear y manipular fechas.

---

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar este frontend! 🚀
