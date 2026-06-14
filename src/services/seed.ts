import { prisma } from "@/lib/prisma";

async function main() {
  const brand = await prisma.brand.create({
    data: {
      name: "Unity",
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "Videojuegos Educativos",
    },
  });

  await prisma.product.create({
    data: {
      sku: "LICENE-001",
      name: "LICENE 3D",
      description:
        "Videojuego educativo inclusivo desarrollado en Unity.",
      price: 0,
      stock: 999,
      brandId: brand.id,
      categoryId: category.id,
    },
  });

  console.log("Módulo LICENE creado");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });