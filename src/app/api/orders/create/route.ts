import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const items: CartItem[] = body.items;
    const userId: string | undefined =
      body.userId;

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Carrito vacío",
        },
        {
          status: 400,
        }
      );
    }

    const total = items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    let user = null;

    if (userId) {
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        total,

        status: "Pendiente",

        ...(userId
          ? {
              user: {
                connect: {
                  id: userId,
                },
              },
            }
          : {}),

        customerName: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        zipCode: user?.zipCode,

        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.id,
          })),
        },
      },

      include: {
        items: true,
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

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