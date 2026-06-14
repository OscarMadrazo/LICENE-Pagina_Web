import { prisma } from "@/lib/prisma";
import CreateCategoryForm from "@/components/CreateCategoryForm";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Administrar Categorías
        </h1>

        <CreateCategoryForm />

        <div className="rounded-xl bg-zinc-900 overflow-hidden">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nombre</th>
              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {category.id}
                  </td>

                  <td className="p-4">
                    {category.name}
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