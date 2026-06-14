import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const liceneModule = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      brand: true,
      category: true,
    },
  });

  if (!liceneModule) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 md:grid-cols-2">

          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

            {liceneModule.imageUrl ? (
              <Image
                src={liceneModule.imageUrl}
                alt={liceneModule.name}
                width={1200}
                height={800}
                className="h-[500px] w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-[500px] items-center justify-center">
                <span className="text-xl text-zinc-500">
                  Imagen próximamente
                </span>
              </div>
            )}

          </div>

          <div>

            <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
              Módulo Educativo LICENE
            </span>

            <h1 className="mt-6 text-5xl font-bold">
              {liceneModule.name}
            </h1>

            <p className="mt-6 text-lg text-zinc-400">
              {liceneModule.description}
            </p>

            <div className="mt-10 space-y-4">

              <div className="rounded-xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-500">
                  Tecnología Utilizada
                </p>

                <p className="text-xl font-bold text-cyan-400">
                  {liceneModule.brand.name}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-500">
                  Tipo de Experiencia
                </p>

                <p className="text-xl font-bold text-cyan-400">
                  {liceneModule.category.name}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-500">
                  Integración
                </p>

                <p className="text-xl font-bold text-green-400">
                  Ecosistema LICENE
                </p>
              </div>

            </div>

            <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

              <h2 className="text-2xl font-bold text-cyan-400">
                Objetivo Educativo
              </h2>

              <p className="mt-4 text-zinc-300">
                Este módulo forma parte del ecosistema educativo LICENE,
                diseñado para fortalecer el aprendizaje mediante tecnologías
                interactivas, videojuegos educativos, realidad virtual,
                realidad mixta y experiencias inclusivas orientadas al
                desarrollo académico de los estudiantes.
              </p>

            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h2 className="text-2xl font-bold">
                Competencias Desarrolladas
              </h2>

              <ul className="mt-4 space-y-2 text-zinc-400">
                <li>• Pensamiento lógico y resolución de problemas</li>
                <li>• Aprendizaje interactivo</li>
                <li>• Uso de tecnologías educativas</li>
                <li>• Participación activa en entornos digitales</li>
                <li>• Desarrollo de habilidades cognitivas</li>
              </ul>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}