// Helpers para validar el cuerpo de las peticiones en el servidor.

export function cleanString(
  value: unknown,
  maxLength = 200
): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  if (!trimmed || trimmed.length > maxLength) return null;

  return trimmed;
}

// Igual que cleanString, pero un campo vacío es válido y se guarda como null.
export function optionalString(
  value: unknown,
  maxLength = 200
): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;

  return cleanString(value, maxLength) ?? undefined;
}

export function normalizeEmail(value: unknown): string | null {
  const email = cleanString(value, 254)?.toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return email;
}

export function toNonNegativeNumber(value: unknown): number | null {
  const number = Number(value);

  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function toNonNegativeInt(value: unknown): number | null {
  const number = toNonNegativeNumber(value);

  return number !== null && Number.isInteger(number) ? number : null;
}

export async function readJson(
  req: Request
): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();

    return body && typeof body === "object" && !Array.isArray(body)
      ? body
      : null;
  } catch {
    return null;
  }
}
