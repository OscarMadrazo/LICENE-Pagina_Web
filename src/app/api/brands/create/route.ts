import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const brand = await prisma.brand.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(brand);

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