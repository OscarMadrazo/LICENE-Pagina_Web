import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function LearningAreasPage() {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-12">

          <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
            Ecosistema Educativo LICENE
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Áreas de Aprendizaje
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Explora las diferentes áreas educativas,
            modalidades de aprendizaje y experiencias
            interactivas desarrolladas dentro del
            ecosistema LICENE.
          </p>

        </div>

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
                transition-all
                duration-300
                hover:scale-105
                hover:border-cyan-500
                hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
              "
            >
              <h2 className="text-xl font-bold">
                {category.name}
              </h2>

              <p className="mt-3 text-zinc-400">
                Área educativa integrada dentro de LICENE.
              </p>

              <p className="mt-4 font-semibold text-cyan-400">
                Explorar →
              </p>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}