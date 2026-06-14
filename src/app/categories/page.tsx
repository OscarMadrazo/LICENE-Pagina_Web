import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="mb-2 text-5xl font-bold">
          Categorías
        </h1>

        <p className="mb-10 text-zinc-400">
          Encuentra exactamente lo que buscas.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6
                transition
                hover:border-cyan-500
                hover:scale-105
              "
            >
              <h2 className="text-xl font-bold">
                {category.name}
              </h2>

              <p className="mt-3 text-zinc-400">
                Ver productos →
              </p>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}