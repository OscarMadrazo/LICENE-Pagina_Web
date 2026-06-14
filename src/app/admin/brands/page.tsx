import CreateBrandForm from "@/components/CreateBrandForm";
import { prisma } from "@/lib/prisma";

export default async function TechnologiesPage() {
  const technologies = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Administrar Tecnologías
        </h1>

        <p className="text-zinc-400 mb-8">
          Tecnologías utilizadas dentro del ecosistema LICENE.
        </p>

        <CreateBrandForm />

        <div className="rounded-xl bg-zinc-900 overflow-hidden">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>
                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Tecnología
                </th>
              </tr>

            </thead>

            <tbody>

              {technologies.map((technology) => (
                <tr
                  key={technology.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {technology.id}
                  </td>

                  <td className="p-4">
                    {technology.name}
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