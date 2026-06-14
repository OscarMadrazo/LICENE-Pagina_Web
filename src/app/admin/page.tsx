import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [
    productsCount,
    ordersCount,
    usersCount,
    brandsCount,
    categoriesCount,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.brand.count(),
    prisma.category.count(),
  ]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <h1 className="text-5xl font-bold mb-2">
          Panel Administrativo
        </h1>

        <p className="text-zinc-400 mb-10">
          Administración general de OK Dock
        </p>

        {/* ESTADÍSTICAS */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-12">

          <div className="rounded-2xl border border-cyan-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Productos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-cyan-400">
              {productsCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Pedidos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-400">
              {ordersCount}
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
              Marcas
            </p>

            <h2 className="mt-2 text-4xl font-bold text-purple-400">
              {brandsCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-pink-500/30 bg-zinc-900 p-6">
            <p className="text-zinc-400 text-sm">
              Categorías
            </p>

            <h2 className="mt-2 text-4xl font-bold text-pink-400">
              {categoriesCount}
            </h2>
          </div>

        </div>

        {/* ACCESOS RÁPIDOS */}

        <h2 className="mb-6 text-3xl font-bold">
          Accesos Rápidos
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/admin/products"
            className="
              rounded-2xl
              bg-zinc-900
              p-6
              transition
              hover:-translate-y-1
              hover:border-cyan-500
              border border-zinc-800
            "
          >
            <h2 className="text-2xl font-bold">
              📦 Productos
            </h2>

            <p className="mt-3 text-zinc-400">
              Administrar catálogo completo.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="
              rounded-2xl
              bg-zinc-900
              p-6
              transition
              hover:-translate-y-1
              hover:border-green-500
              border border-zinc-800
            "
          >
            <h2 className="text-2xl font-bold">
              🛒 Pedidos
            </h2>

            <p className="mt-3 text-zinc-400">
              Gestionar compras y envíos.
            </p>
          </Link>

          <Link
            href="/admin/brands"
            className="
              rounded-2xl
              bg-zinc-900
              p-6
              transition
              hover:-translate-y-1
              hover:border-purple-500
              border border-zinc-800
            "
          >
            <h2 className="text-2xl font-bold">
              🏷️ Marcas
            </h2>

            <p className="mt-3 text-zinc-400">
              Administrar fabricantes.
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="
              rounded-2xl
              bg-zinc-900
              p-6
              transition
              hover:-translate-y-1
              hover:border-pink-500
              border border-zinc-800
            "
          >
            <h2 className="text-2xl font-bold">
              📂 Categorías
            </h2>

            <p className="mt-3 text-zinc-400">
              Organizar catálogo.
            </p>
          </Link>

        </div>

        {/* MENSAJE */}

        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h3 className="text-xl font-bold text-cyan-400">
            Estado del Proyecto
          </h3>

          <p className="mt-3 text-zinc-400">
            Sistema de catálogo, usuarios,
            pedidos, carrito de compras,
            administración y seguimiento de pedidos
            funcionando correctamente.
          </p>

        </div>

      </div>
    </main>
  );
}