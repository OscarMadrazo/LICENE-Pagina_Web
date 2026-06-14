import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await prisma.product.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        description: body.description,
        sku: body.sku,
        price: Number(body.price),
        stock: Number(body.stock),
        brandId: body.brandId,
        categoryId: body.categoryId,
        imageUrl: body.imageUrl,
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