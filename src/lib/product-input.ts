import {
  cleanString,
  optionalString,
  toNonNegativeInt,
  toNonNegativeNumber,
} from "@/lib/validation";

export interface ProductInput {
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  brandId: string;
  categoryId: string;
  imageUrl: string | null;
}

// Valida los datos de un producto enviados desde el panel de administración.
export function parseProductInput(
  body: Record<string, unknown> | null
): { data: ProductInput; error?: never } | { data?: never; error: string } {
  const name = cleanString(body?.name, 150);
  const description = cleanString(body?.description, 5000);
  const sku = cleanString(body?.sku, 64);
  const price = toNonNegativeNumber(body?.price);
  const stock = toNonNegativeInt(body?.stock);
  const brandId = cleanString(body?.brandId, 64);
  const categoryId = cleanString(body?.categoryId, 64);
  const imageUrl = optionalString(body?.imageUrl, 2048);

  if (!name || !description || !sku) {
    return { error: "Nombre, descripción y SKU son obligatorios" };
  }

  if (price === null || stock === null) {
    return { error: "Precio y stock deben ser números válidos (sin negativos)" };
  }

  if (!brandId || !categoryId) {
    return { error: "Selecciona una tecnología y una categoría" };
  }

  if (imageUrl === undefined && body?.imageUrl !== undefined) {
    return { error: "La URL de la imagen no es válida" };
  }

  if (imageUrl && !/^(https?:\/\/|\/)/.test(imageUrl)) {
    return { error: "La imagen debe ser una URL http(s) o una ruta que empiece con /" };
  }

  return {
    data: {
      name,
      description,
      sku,
      price,
      stock,
      brandId,
      categoryId,
      imageUrl: imageUrl ?? null,
    },
  };
}
