import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { publicUserSelect } from "@/lib/dal";
import {
  cleanString,
  normalizeEmail,
  readJson,
} from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await readJson(req);

    const name = cleanString(body?.name, 100);
    const email = normalizeEmail(body?.email);
    const password = body?.password;

    if (!body?.name || !body?.email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Todos los campos son obligatorios",
        },
        {
          status: 400,
        }
      );
    }

    if (!name || name.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El nombre debe tener entre 3 y 100 caracteres",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Correo electrónico inválido",
        },
        {
          status: 400,
        }
      );
    }

    // bcrypt solo usa los primeros 72 bytes de la contraseña.
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 72
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "La contraseña debe tener entre 8 y 72 caracteres",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El correo ya está registrado",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // El rol nunca se toma del cliente: todo registro nuevo es USER.
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: publicUserSelect,
      });

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Error interno del servidor",
      },
      {
        status: 500,
      }
    );
  }
}
