import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const {
      userId,
      name,
      phone,
      address,
      city,
      state,
      zipCode,
    } = body;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phone,
        address,
        city,
        state,
        zipCode,
      },
    });

    return NextResponse.json({
      success: true,
      user,
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