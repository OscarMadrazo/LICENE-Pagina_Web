import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/dal";
import { cleanString, readJson } from "@/lib/validation";

// Lógica compartida para crear registros que solo tienen un nombre único
// (tecnologías y categorías) desde el panel de administración.
export async function createNamed(
  req: NextRequest,
  create: (name: string) => Promise<unknown>,
  label: string
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const name = cleanString((await readJson(req))?.name, 100);

  if (!name) {
    return NextResponse.json(
      {
        success: false,
        message: "El nombre es obligatorio (máximo 100 caracteres)",
      },
      {
        status: 400,
      }
    );
  }

  try {
    return NextResponse.json(await create(name));
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: `Ya existe una ${label} con ese nombre`,
        },
        {
          status: 409,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: `Error al crear la ${label}`,
      },
      {
        status: 500,
      }
    );
  }
}
