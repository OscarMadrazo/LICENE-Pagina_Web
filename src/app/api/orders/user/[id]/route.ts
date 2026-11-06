import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin, requireUser } from "@/lib/dal";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  // Cada usuario solo puede ver sus propios pedidos; un administrador, los de cualquiera.
  if (id !== auth.user.id && !isAdmin(auth.user)) {
    return NextResponse.json(
      {
        success: false,
        message: "No autorizado",
      },
      {
        status: 403,
      }
    );
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    orders,
  });
}
