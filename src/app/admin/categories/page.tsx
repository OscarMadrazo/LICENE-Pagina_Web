import { prisma } from "@/lib/prisma";
import CreateCategoryForm from "@/components/CreateCategoryForm";

export default async function ExperienceTypesPage() {
  const types = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Administrar Tipos de Experiencia
        </h1>

        <p className="text-zinc-400 mb-8">
          Clasificación de módulos y experiencias educativas del ecosistema LICENE.
        </p>

        <CreateCategoryForm />

        <div className="rounded-xl bg-zinc-900 overflow-hidden">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>
                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Tipo de Experiencia
                </th>
              </tr>

            </thead>

            <tbody>

              {types.map((type) => (
                <tr
                  key={type.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {type.id}
                  </td>

                  <td className="p-4">
                    {type.name}
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