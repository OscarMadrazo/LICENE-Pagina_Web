import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">

        <div className="text-center">

          <span
            className="
              rounded-full
              border
              border-green-500
              px-4
              py-2
              text-sm
              text-green-400
            "
          >
            Ecosistema LICENE
          </span>

          <h1
            className="
              mt-6
              text-4xl
              md:text-6xl
              font-extrabold
            "
          >
            Módulos Educativos
          </h1>

          <p
            className="
              mt-4
              mx-auto
              max-w-3xl
              text-zinc-400
            "
          >
            Explora las experiencias educativas,
            videojuegos, aplicaciones móviles,
            realidad virtual, realidad aumentada
            y plataformas colaborativas que forman
            parte del ecosistema LICENE.
          </p>

          <p className="mt-6 text-green-400">
            Módulos disponibles: {products.length}
          </p>

        </div>

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
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