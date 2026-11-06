import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

// Campos del usuario que se pueden enviar al navegador (nunca el hash de la contraseña).
export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
} as const;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
};

// El rol se lee de la base de datos en cada petición, no del token,
// para que un cambio de rol o un usuario eliminado tenga efecto de inmediato.
export const getSessionUser = cache(
  async (): Promise<SessionUser | null> => {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    const session = await decrypt(token);

    if (!session) return null;

    return prisma.user.findUnique({
      where: { id: session.userId },
      select: publicUserSelect,
    });
  }
);

export function isAdmin(user: SessionUser | null) {
  return user?.role === "ADMIN";
}

// Para Route Handlers: devuelve el usuario o una respuesta de error lista para regresar.
export async function requireUser(): Promise<
  | { user: SessionUser; error?: never }
  | { user?: never; error: NextResponse }
> {
  const user = await getSessionUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { success: false, message: "Debes iniciar sesión" },
        { status: 401 }
      ),
    };
  }

  return { user };
}

export async function requireAdmin(): Promise<
  | { user: SessionUser; error?: never }
  | { user?: never; error: NextResponse }
> {
  const result = await requireUser();

  if (result.error) return result;

  if (!isAdmin(result.user)) {
    return {
      error: NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 }
      ),
    };
  }

  return result;
}

// Para páginas de servidor del panel de administración.
export async function requireAdminPage() {
  const user = await getSessionUser();

  if (!isAdmin(user)) {
    redirect(user ? "/" : "/login");
  }

  return user;
}
