import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      brand: true,
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 md:grid-cols-2">

          <div className="overflow-hidden rounded-2xl bg-zinc-900">

            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={800}
                className="h-96 w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-96 items-center justify-center">
                <span className="text-zinc-500">
                  Sin imagen
                </span>
              </div>
            )}

          </div>

          <div>

            <h1 className="text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-zinc-400">
              {product.description}
            </p>

            <p className="mt-8 text-4xl font-bold text-blue-500">
              ${product.price.toLocaleString()}
            </p>

            <div className="mt-8 space-y-3">

              <p>
                <strong>SKU:</strong> {product.sku}
              </p>

              <p>
                <strong>Marca:</strong> {product.brand.name}
              </p>

              <p>
                <strong>Categoría:</strong> {product.category.name}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

            </div>

            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />

          </div>

        </div>

      </div>
    </main>
  );
}