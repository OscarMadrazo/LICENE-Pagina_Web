import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const brands = [
    "NVIDIA",
    "AMD",
    "Intel",
    "MSI",
    "ASUS",
    "Gigabyte",
    "Corsair",
    "Kingston",
    "Samsung",
    "Acer"
  ];

  for (const name of brands) {
    await prisma.brand.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  return NextResponse.json({
    success: true,
  });
}