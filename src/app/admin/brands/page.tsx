import CreateBrandForm from "@/components/CreateBrandForm";
import { prisma } from "@/lib/prisma";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Administrar Marcas
        </h1>

        <CreateBrandForm />

        <div className="rounded-xl bg-zinc-900 overflow-hidden">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nombre</th>
              </tr>

            </thead>

            <tbody>

              {brands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {brand.id}
                  </td>

                  <td className="p-4">
                    {brand.name}
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