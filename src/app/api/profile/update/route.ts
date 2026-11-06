import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { publicUserSelect, requireUser } from "@/lib/dal";
import {
  cleanString,
  optionalString,
  readJson,
} from "@/lib/validation";

const OPTIONAL_FIELDS = {
  phone: 30,
  address: 300,
  city: 100,
  state: 100,
  zipCode: 20,
} as const;

export async function POST(
  req: NextRequest
) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  try {
    const body = await readJson(req);

    const name = cleanString(body?.name, 100);

    if (!name || name.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "El nombre debe tener entre 3 y 100 caracteres",
        },
        {
          status: 400,
        }
      );
    }

    const data: Record<string, string | null> = { name };

    for (const [field, maxLength] of Object.entries(OPTIONAL_FIELDS)) {
      const value = optionalString(body?.[field], maxLength);

      if (value === undefined && body?.[field] !== undefined) {
        return NextResponse.json(
          {
            success: false,
            message: `El campo ${field} no es válido`,
          },
          {
            status: 400,
          }
        );
      }

      if (value !== undefined) data[field] = value;
    }

    // Solo se actualiza el usuario de la sesión, nunca un id enviado por el cliente.
    const user = await prisma.user.update({
      where: {
        id: auth.user.id,
      },
      data,
      select: publicUserSelect,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
