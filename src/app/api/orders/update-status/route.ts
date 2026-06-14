import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const {
      orderId,
      status,
    } = body;

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
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