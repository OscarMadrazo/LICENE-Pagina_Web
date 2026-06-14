import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [
    productsCount,
    usersCount,
    brandsCount,
    categoriesCount,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.brand.count(),
    prisma.category.count(),
  ]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          Panel Administrativo LICENE
        </h1>

        <p className="text-zinc-400 mb-10">
          Gestión integral del ecosistema educativo LICENE
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">

          <div className="rounded-2xl border border-cyan-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Módulos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-cyan-400">
              {productsCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-yellow-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Usuarios
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-400">
              {usersCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Tecnologías
            </p>

            <h2 className="mt-2 text-4xl font-bold text-purple-400">
              {brandsCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-pink-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Tipos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-pink-400">
              {categoriesCount}
            </h2>
          </div>

        </div>

        <h2 className="mb-6 text-3xl font-bold">
          Administración
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <Link
            href="/admin/products"
            className="rounded-2xl bg-zinc-900 p-6 border border-zinc-800 hover:border-cyan-500 transition"
          >
            <h2 className="text-2xl font-bold">
              🎮 Módulos LICENE
            </h2>

            <p className="mt-3 text-zinc-400">
              Administrar videojuegos y experiencias educativas.
            </p>
          </Link>

          <Link
            href="/admin/brands"
            className="rounded-2xl bg-zinc-900 p-6 border border-zinc-800 hover:border-purple-500 transition"
          >
            <h2 className="text-2xl font-bold">
              ⚙ Tecnologías
            </h2>

            <p className="mt-3 text-zinc-400">
              Unity, Flutter, Firebase, Photon y más.
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-2xl bg-zinc-900 p-6 border border-zinc-800 hover:border-pink-500 transition"
          >
            <h2 className="text-2xl font-bold">
              📚 Tipos
            </h2>

            <p className="mt-3 text-zinc-400">
              Clasificación de módulos educativos.
            </p>
          </Link>

        </div>

        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h3 className="text-xl font-bold text-cyan-400">
            Estado del Proyecto LICENE
          </h3>

          <p className="mt-3 text-zinc-400">
            Plataforma educativa con videojuegos desarrollados en Unity,
            aplicación móvil Flutter, realidad virtual, realidad mixta,
            integración Firebase, Photon y Roblox Studio.
          </p>

        </div>

      </div>
    </main>
  );
}