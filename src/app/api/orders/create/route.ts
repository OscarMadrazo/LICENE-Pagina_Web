import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { readJson } from "@/lib/validation";

const MAX_ITEMS = 50;
const MAX_QUANTITY = 99;

function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status,
    }
  );
}

export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const user = auth.user;

  try {
    const body = await readJson(req);
    const rawItems = body?.items;

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return errorResponse("Carrito vacío");
    }

    if (rawItems.length > MAX_ITEMS) {
      return errorResponse("El carrito tiene demasiados productos");
    }

    // Agrupa por producto y valida cantidades. Del cliente solo se acepta
    // el id y la cantidad: el precio siempre se toma de la base de datos.
    const quantities = new Map<string, number>();

    for (const item of rawItems) {
      const id = item?.id;
      const quantity = Number(item?.quantity);

      if (
        typeof id !== "string" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_QUANTITY
      ) {
        return errorResponse("Hay un producto con datos no válidos en el carrito");
      }

      quantities.set(id, (quantities.get(id) ?? 0) + quantity);
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: [...quantities.keys()],
        },
        isActive: true,
      },
      select: {
        id: true,
        price: true,
      },
    });

    if (products.length !== quantities.size) {
      return errorResponse(
        "Algún producto del carrito ya no está disponible. Actualiza tu carrito."
      );
    }

    const missingFields = [
      ["Teléfono", user.phone],
      ["Dirección", user.address],
      ["Ciudad", user.city],
      ["Estado", user.state],
      ["Código Postal", user.zipCode],
    ]
      .filter(([, value]) => !value)
      .map(([label]) => label);

    if (missingFields.length > 0) {
      return errorResponse(
        `Completa tu perfil antes de comprar. Faltan: ${missingFields.join(", ")}`
      );
    }

    const items = products.map((product) => ({
      productId: product.id,
      price: product.price,
      quantity: quantities.get(product.id)!,
    }));

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        total,

        status: "Pendiente",

        user: {
          connect: {
            id: user.id,
          },
        },

        customerName: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,

        items: {
          create: items,
        },
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return errorResponse("Error al crear el pedido", 500);
  }
}
