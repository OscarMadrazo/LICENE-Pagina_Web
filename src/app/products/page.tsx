import ProductCard from "@/components/ProductCard";
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

        <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
          Ecosistema LICENE
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Módulos Educativos
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Explora las experiencias educativas,
          videojuegos, aplicaciones móviles,
          plataformas colaborativas y tecnologías
          desarrolladas dentro del ecosistema LICENE.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imageUrl: product.imageUrl ?? "",
              }}
            />
          ))}

        </div>

      </div>
    </main>
  );
}