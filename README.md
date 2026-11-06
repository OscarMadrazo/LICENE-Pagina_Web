# LICENE — Página web

Sitio web del ecosistema educativo LICENE: catálogo de módulos (videojuegos educativos, apps,
realidad virtual y realidad mixta), solicitudes de módulos por parte de los participantes y un
panel de administración.

Hecho con [Next.js 16](https://nextjs.org) (App Router), React 19, Tailwind CSS 4, Prisma y
PostgreSQL. Se despliega en Vercel.

## Puesta en marcha

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` como `.env` y llena:
   - `DATABASE_URL`: la conexión a PostgreSQL.
   - `SESSION_SECRET`: una clave aleatoria de al menos 32 caracteres. Genera una con:

     ```bash
     node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
     ```

3. Aplica las migraciones de la base de datos:

   ```bash
   npx prisma migrate deploy
   ```

4. Arranca el servidor de desarrollo y abre <http://localhost:3000>:

   ```bash
   npm run dev
   ```

## Administradores

Por seguridad, nadie puede volverse administrador desde la página. Para dar el rol a una cuenta
ya registrada, ejecuta (con `DATABASE_URL` apuntando a la base de datos correspondiente):

```bash
npm run make-admin -- correo@ejemplo.com
```

## Seguridad

- **Sesiones:** al iniciar sesión el servidor guarda un token firmado (JWT HS256 con
  `SESSION_SECRET`) en una cookie `HttpOnly`, `SameSite=Lax` y `Secure` en producción. El
  navegador nunca decide quién es el usuario ni qué rol tiene.
- **Autorización:** cada ruta de `/api` comprueba la sesión en el servidor (`src/lib/dal.ts`). Las
  operaciones de catálogo y de pedidos de otros usuarios exigen rol `ADMIN`, que se lee de la
  base de datos en cada petición. El panel `/admin` se verifica en el servidor antes de generar
  cualquier dato.
- **Pedidos:** el servidor solo acepta del cliente el id y la cantidad de cada módulo. El precio
  se toma de la base de datos y el pedido se asocia al usuario de la sesión.
- **Contraseñas:** se guardan con bcrypt y nunca se envían al navegador.

## Variables de entorno en Vercel

En el proyecto de Vercel, en *Settings → Environment Variables*, deben existir `DATABASE_URL` y
`SESSION_SECRET`. Sin `SESSION_SECRET` nadie puede iniciar sesión.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el cliente de Prisma y compila para producción |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | Revisa el código con ESLint |
| `npm run make-admin -- <correo>` | Da el rol de administrador a un usuario |
