import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { parseProductInput } from "@/lib/product-input";
import { cleanString, readJson } from "@/lib/validation";

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const body = await readJson(req);
    const id = cleanString(body?.id, 64);
    const input = parseProductInput(body);

    if (!id || !input.data) {
      return NextResponse.json(
        {
          success: false,
          message: input.error ?? "Producto no válido",
        },
        {
          status: 400,
        }
      );
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: input.data,
    });

    return NextResponse.json(product);

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            success: false,
            message: "Ya existe un producto con ese SKU",
          },
          {
            status: 409,
          }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          {
            success: false,
            message: "El producto no existe",
          },
          {
            status: 404,
          }
        );
      }
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al actualizar el producto",
      },
      {
        status: 500,
      }
    );
  }
}
