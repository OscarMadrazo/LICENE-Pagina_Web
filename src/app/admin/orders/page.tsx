import { prisma } from "@/lib/prisma";

export default async function ActivityPage() {
  const records = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-4xl font-bold">
          Actividad del Sistema
        </h1>

        <p className="mb-8 text-zinc-400">
          Seguimiento de registros y actividad de usuarios dentro de la plataforma LICENE.
        </p>

        {records.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-6">
            No existen registros disponibles.
          </div>
        ) : (
          <div className="space-y-6">

            {records.map((record) => (
              <div
                key={record.id}
                className="rounded-xl bg-zinc-900 p-6"
              >
                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="font-bold text-cyan-400">
                      Registro #{record.id.slice(0, 8)}
                    </h2>

                    <p className="text-zinc-400">
                      {new Date(
                        record.createdAt
                      ).toLocaleString()}
                    </p>

                    <p className="mt-3">
                      <strong>Usuario:</strong>{" "}
                      {record.user
                        ? record.user.name
                        : "Usuario no identificado"}
                    </p>

                    <p className="text-zinc-400">
                      {record.user?.email}
                    </p>

                  </div>

                  <div>
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                      Registrado
                    </span>
                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="mb-3 font-semibold">
                    Módulos Relacionados
                  </h3>

                  <div className="space-y-2">

                    {record.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg bg-zinc-800 p-3"
                      >
                        <p className="font-semibold">
                          {item.product.name}
                        </p>

                        <p className="text-sm text-zinc-400">
                          Actividad registrada dentro del ecosistema LICENE.
                        </p>
                      </div>
                    ))}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}