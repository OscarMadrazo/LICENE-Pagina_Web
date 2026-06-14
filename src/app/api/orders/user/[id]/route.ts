import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;

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