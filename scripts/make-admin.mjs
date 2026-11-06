// Da el rol de administrador a un usuario ya registrado.
// Uso: npm run make-admin -- correo@ejemplo.com
// Necesita DATABASE_URL en el entorno (o en .env).
import { PrismaClient } from "@prisma/client";

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error("Uso: npm run make-admin -- correo@ejemplo.com");
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
    select: { name: true, email: true },
  });

  console.log(`${user.name} <${user.email}> ahora es administrador.`);
} catch (error) {
  if (error?.code === "P2025") {
    console.error(`No existe un usuario con el correo ${email}. Regístralo primero en la página.`);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
