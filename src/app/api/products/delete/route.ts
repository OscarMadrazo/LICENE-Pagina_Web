import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { cleanString, readJson } from "@/lib/validation";

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const body = await readJson(req);
    const id = cleanString(body?.id, 64);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Producto no válido",
        },
        {
          status: 400,
        }
      );
    }

    const orderCount = await prisma.orderItem.count({
      where: {
        productId: id,
      },
    });

    // Un producto que ya aparece en pedidos no se puede borrar sin romper el
    // historial: se desactiva para que deje de mostrarse en la tienda.
    if (orderCount > 0) {
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });

      return NextResponse.json({
        success: true,
        deactivated: true,
      });
    }

    await prisma.$transaction([
      prisma.productImage.deleteMany({
        where: {
          productId: id,
        },
      }),
      prisma.product.delete({
        where: {
          id,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al eliminar el producto",
      },
      {
        status: 500,
      }
    );
  }
}
