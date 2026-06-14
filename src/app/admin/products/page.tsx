import { prisma } from "@/lib/prisma";
import CreateProductForm from "@/components/CreateProductForm";
import DeleteProductButton from "@/components/DeleteProductButton";
import EditProductButton from "@/components/EditProductButton";

export default async function ModulesPage() {
  const modules = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      name: "asc",
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
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Administrar Módulos LICENE
        </h1>

        <p className="text-zinc-400 mb-8">
          Gestión de videojuegos, aplicaciones y experiencias educativas.
        </p>

        <CreateProductForm
          brands={brands}
          categories={categories}
        />

        <div className="overflow-hidden rounded-xl bg-zinc-900">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>
                <th className="p-4 text-left">
                  Módulo
                </th>

                <th className="p-4 text-left">
                  Identificador
                </th>

                <th className="p-4 text-left">
                  Tecnología
                </th>

                <th className="p-4 text-left">
                  Tipo de Experiencia
                </th>

                <th className="p-4 text-left">
                  Estado
                </th>

                <th className="p-4 text-left">
                  Acciones
                </th>
              </tr>

            </thead>

            <tbody>

              {modules.map((module) => (
                <tr
                  key={module.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {module.name}
                  </td>

                  <td className="p-4">
                    {module.sku}
                  </td>

                  <td className="p-4">
                    {module.brand.name}
                  </td>

                  <td className="p-4">
                    {module.category.name}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                      Activo
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <EditProductButton
                        productId={module.id}
                      />

                      <DeleteProductButton
                        productId={module.id}
                      />

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}