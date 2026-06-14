import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Editar Producto
        </h1>

        <EditProductForm
          product={product}
          brands={brands}
          categories={categories}
        />

      </div>
    </main>
  );
}