import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNamed } from "@/lib/create-named";

export async function POST(req: NextRequest) {
  return createNamed(
    req,
    (name) => prisma.category.create({ data: { name } }),
    "categoría"
  );
}
