import { prisma } from "@/lib/prisma";
import CreateProductForm from "@/components/CreateProductForm";
import DeleteProductButton from "@/components/DeleteProductButton";
import EditProductButton from "@/components/EditProductButton";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ModulesPage() {
  const modules = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
    <main className="min-h-screen bg-zinc-950 p-4 md:p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl md:text-5xl font-bold">
          Administrar Módulos LICENE
        </h1>

        <p className="mt-3 text-zinc-400">
          Gestión de videojuegos, aplicaciones,
          experiencias inmersivas y tecnologías educativas.
        </p>

        <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <p className="text-green-400 font-semibold">
            Total de módulos registrados: {modules.length}
          </p>
        </div>

        <div className="mt-8">
          <CreateProductForm
            brands={brands}
            categories={categories}
          />
        </div>

        <div className="mt-10 grid gap-6">

          {modules.map((module) => (
            <div
              key={module.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
              "
            >
              <div className="grid md:grid-cols-[220px_1fr]">

                <div className="h-52 md:h-full bg-zinc-800">

                  {module.imageUrl ? (
                    <Image
                      src={module.imageUrl}
                      alt={module.name}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      🎮
                    </div>
                  )}

                </div>

                <div className="p-6">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-bold">
                      {module.name}
                    </h2>

                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                      Activo
                    </span>

                  </div>

                  <p className="mt-3 text-zinc-400">
                    {module.description}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <div className="rounded-xl bg-zinc-800 p-4">
                      <p className="text-sm text-zinc-500">
                        SKU
                      </p>

                      <p className="font-semibold">
                        {module.sku}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-800 p-4">
                      <p className="text-sm text-zinc-500">
                        Tecnología
                      </p>

                      <p className="font-semibold text-cyan-400">
                        {module.brand.name}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-800 p-4">
                      <p className="text-sm text-zinc-500">
                        Experiencia
                      </p>

                      <p className="font-semibold text-purple-400">
                        {module.category.name}
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <EditProductButton
                      productId={module.id}
                    />

                    <DeleteProductButton
                      productId={module.id}
                    />

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}