import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { parseProductInput } from "@/lib/product-input";
import { readJson } from "@/lib/validation";

export async function POST(
  req: NextRequest
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const input = parseProductInput(await readJson(req));

    if (!input.data) {
      return NextResponse.json(
        {
          success: false,
          message: input.error,
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.product.create({
        data: input.data,
      });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
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

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al crear el producto",
      },
      {
        status: 500,
      }
    );
  }
}
