import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal";

// Devuelve el usuario de la sesión actual (o null) para que el navegador
// sincronice lo que muestra con lo que realmente sabe el servidor.
export async function GET() {
  const user = await getSessionUser();

  return NextResponse.json({
    success: true,
    user,
  });
}
