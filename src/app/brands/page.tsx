import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TechnologiesPage() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-12">

          <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
            Ecosistema Tecnológico LICENE
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Tecnologías Utilizadas
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Conoce las tecnologías, plataformas y herramientas
            utilizadas para el desarrollo de videojuegos educativos,
            aplicaciones móviles, realidad virtual, realidad mixta
            y experiencias de aprendizaje inclusivas dentro del
            ecosistema LICENE.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
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
              <h2 className="text-2xl font-bold">
                {brand.name}
              </h2>

              <p className="mt-3 text-zinc-400">
                Tecnología integrada dentro de LICENE.
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