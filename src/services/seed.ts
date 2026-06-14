import { prisma } from "@/lib/prisma";

async function main() {
  const brand = await prisma.brand.create({
    data: {
      name: "NVIDIA",
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "Tarjetas Gráficas",
    },
  });

  await prisma.product.create({
    data: {
      name: "RTX 5070",
      description: "Tarjeta gráfica NVIDIA RTX 5070",
      price: 18999,
      stock: 15,
      brandId: brand.id,
      categoryId: category.id,
    },
  });

  console.log("Producto creado");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });