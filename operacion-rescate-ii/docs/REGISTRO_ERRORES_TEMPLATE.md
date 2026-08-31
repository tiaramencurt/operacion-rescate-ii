# Registro de Errores

Completar una fila por cada error detectado.

| N | Archivo | Problema encontrado | Como lo detectaron | Solucion aplicada |
|---|---------|---------------------|--------------------|-------------------|
| 1 | src/ejemplo.js | El token no se verificaba | Prueba manual de ruta protegida | Se uso jwt.verify con manejo de excepcion |
| 1 | `src/utils/token.js` | Sintaxis incorrecta en la exportación (`module.export` sin la "s"). | Error de ejecución al llamar a `signToken` en los controladores. | Se corrigió a `module.exports = { signToken }`. |
| 2 | `src/utils/token.js` | Nombre de variable con error tipográfico (`JWT_SECRETT`) y tiempo de expiración del token de solo 2 segundos (`expiresIn: "2s"`). | El token expiraba inmediatamente tras generarse. | Se renombró la variable a `process.env.JWT_SECRET` y se cambió la expiración a `"1h"`. |
| 3 | `src/app.js` | Ruta base de autenticación mal escrita (`/api/loginn`). | Las peticiones a `/api/auth/login` o `/api/auth/register` devolvían error 404. | Se corrigió la ruta a `app.use("/api/auth", authRoutes)`. |
| 4 | `src/controllers/authController.js` | Falta de `return` cuando hay faltante de datos y código de estado HTTP 200 al validar usuario existente o credenciales inválidas. | El servidor intentaba continuar la ejecución y enviaba respuestas con estado 200 cuando habían datos incorrectos. | Se agregaron los `return` faltantes y se cambiaron los estados a 400 y 401. |
| 5 | `src/controllers/authController.js` | Se comparaba el hash guardado de manera invertida en `bcrypt.compare(user.password, password)` y faltaba `return` cuando las credenciales eran inválidas. | El inicio de sesión fallaba aunque la contraseña fuera correcta y la función continuaba ejecutándose. | Se corrigió el orden a `bcrypt.compare(password, user.password)` y se añadió `return` antes de la respuesta 401. |
| 6 | `src/middleware/authMiddleware.js` | Uso de `jwt.decode` en lugar de `jwt.verify` y `decoded` en lugar de `!decoded`, dejando pasar peticiones inválidas. | Cualquier petición pasaba la validación sin verificar la firma o expiración del token. | Se implementó `jwt.verify` dentro de un bloque `try/catch` para validar correctamente el token. |
| 7 | `src/routes/userRoutes.js` | Orden incorrecto en el middleware de la ruta `GET /me` (`getProfile` se ejecutaba antes de `authMiddleware`). | La ruta intentaba leer `req.user` antes de autenticar, generando errores. | Se corrigió el orden a `router.get("/me", authMiddleware, getProfile)`. |
| 8 | `src/routes/userRoutes.js` | La ruta `GET /orders` no tenía el middleware de autenticación aplicado. | Usuarios sin token podían acceder a las órdenes de compra. | Se agregó `authMiddleware` a la ruta: `router.get("/orders", authMiddleware, ...)`. |
| 9 | `src/controllers/userController.js` | Permitía sobreescribir el ID del usuario actual mediante el cuerpo de la petición (`req.body.userId`). | Vulnerabilidad de seguridad donde un usuario podía modificar el perfil de otro. | Se forzó la lectura de ID desde el token: `const userId = req.user.id`. |
| 10 | `src/routes/adminRoutes.js`| La ruta `/all` carecía de verificación de rol administrador y colisionaba con el prefijo `/api/users` en `app.js`. | Cualquier usuario autenticado o no podía listar todos los usuarios del sistema. | Se ajustó la ruta base en `app.js` a `/api/admin` y se añadió un middleware para verificar que `req.user.role === 'admin'`. |

## Guia de calidad para el informe

No alcanza con escribir "habia un error y lo arreglamos".

En cada caso expliquen:

1. Que ocurria.
2. Por que ocurria.
3. Como se soluciono.
4. Como validaron que quedo funcionando.
