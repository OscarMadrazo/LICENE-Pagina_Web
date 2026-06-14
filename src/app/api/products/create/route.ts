import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        sku: body.sku,
        price: Number(body.price),
        stock: Number(body.stock),
        brandId: body.brandId,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}