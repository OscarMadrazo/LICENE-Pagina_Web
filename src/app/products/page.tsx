import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <h1 className="text-5xl font-bold">
          Módulos Educativos
        </h1>

        <p className="mt-4 text-green-400">
          Productos encontrados: {products.length}
        </p>

        <div className="mt-12">

          {products.map((product) => (
            <div
              key={product.id}
              className="
                mb-6
                rounded-xl
                border
                border-white
                p-4
              "
            >
              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="mt-2 text-zinc-300">
                {product.description}
              </p>

              <p className="mt-2 text-green-400">
                SKU: {product.sku}
              </p>

              <p className="text-cyan-400">
                ID: {product.id}
              </p>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}