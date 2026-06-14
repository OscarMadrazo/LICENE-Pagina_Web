import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });

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