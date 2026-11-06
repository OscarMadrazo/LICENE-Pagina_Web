import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNamed } from "@/lib/create-named";

export async function POST(req: NextRequest) {
  return createNamed(
    req,
    (name) => prisma.brand.create({ data: { name } }),
    "tecnología"
  );
}
