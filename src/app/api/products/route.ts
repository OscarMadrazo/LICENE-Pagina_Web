import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}