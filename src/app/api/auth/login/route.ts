import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { publicUserSelect } from "@/lib/dal";
import { normalizeEmail, readJson } from "@/lib/validation";

// Cuando el correo no existe se compara contra este hash, para que la respuesta
// tarde lo mismo y no revele qué correos están registrados.
const DUMMY_HASH = bcrypt.hashSync("licene-usuario-inexistente", 10);

function invalidCredentials() {
  return NextResponse.json(
    {
      success: false,
      message: "Correo o contraseña incorrectos",
    },
    {
      status: 401,
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await readJson(req);
    const email = normalizeEmail(body?.email);
    const password = body?.password;

    if (!email || typeof password !== "string" || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Correo y contraseña requeridos",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        ...publicUserSelect,
        password: true,
      },
    });

    if (!user) {
      await bcrypt.compare(password, DUMMY_HASH);
      return invalidCredentials();
    }

    const { password: passwordHash, ...publicUser } = user;

    if (!(await bcrypt.compare(password, passwordHash))) {
      return invalidCredentials();
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: publicUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}
