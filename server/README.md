# 🔐 Módulo de Control de Acceso para API REST

Este módulo provee un sistema completo y seguro de autenticación, autorización y control dinámico de accesos a endpoints para usuarios de un sistema administrativo. Desarrollado con Node.js, Express, MySQL, Redis y JWT.

---

## ⚙️ Tecnologías Usadas

- **Node.js + Express** – Backend API
- **MySQL** – Almacenamiento de usuarios, posiciones y privilegios
- **Redis** – Caché de endpoints permitidos por posición
- **JWT (Json Web Token)** – Autenticación por token
- **bcrypt** – Hash de contraseñas seguras
- **WSL + Redis CLI** – Entorno local de desarrollo

---

## 🔐 Funcionalidades de Seguridad

### ✅ Autenticación
- Inicio de sesión mediante email/usuario y contraseña.
- Contraseñas encriptadas con `bcrypt`.
- Emisión de tokens JWT (`accessToken` y `refreshToken`).
- Almacenamiento y control de sesiones activas mediante `session_refresh_tokens_systemusers`.

### ✅ Autorización basada en roles/posiciones
- Cada usuario pertenece a una posición (`system_user_positions`).
- Cada posición tiene múltiples privilegios (`system_user_positions_privileges`).
- Cada privilegio permite acceso a uno o más endpoints (`system_user_privileges_endpoints`).

### ✅ Middleware de seguridad
- `verifyToken`: Verifica la validez y firma del JWT.
- `authorizePositionAccess`: Verifica que la posición del usuario tenga acceso al endpoint solicitado.
- Los permisos se consultan primero en **Redis**, y si no existen, se generan desde MySQL y se cachean.

---

## 🧠 Estructura de Datos

### Tablas principales:

- `systemusers`: ID, username, password (hashed)
- `userdata`: Información personal y referencia a la posición
- `system_user_positions`: ID, nombre de posición
- `system_user_positions_privileges`: M:N entre posiciones y privilegios
- `system_user_privileges`: Nombre y categoría del privilegio
- `system_user_privileges_endpoints`: M:N entre privilegios y rutas
- `session_refresh_tokens_systemusers`: Tokens de sesión activos

---

## 💾 Cache en Redis

Redis almacena los endpoints permitidos por cada posición:

**Key:**
