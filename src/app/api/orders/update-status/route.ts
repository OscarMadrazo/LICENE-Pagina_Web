import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { ORDER_STATUSES } from "@/lib/order-status";
import { cleanString, readJson } from "@/lib/validation";

export async function POST(
  req: NextRequest
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const body = await readJson(req);
    const orderId = cleanString(body?.orderId, 64);
    const status = body?.status;

    if (
      !orderId ||
      !ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Pedido o estado no válido",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status as string,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
