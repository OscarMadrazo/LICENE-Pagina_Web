import Link from "next/link";

// Página amable para direcciones que no existen.
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/80 p-10 text-center shadow-2xl">
        <p className="bg-linear-to-r from-green-400 to-purple-500 bg-clip-text text-7xl font-black text-transparent">404</p>
        <h1 className="mt-4 text-3xl font-bold">Página no encontrada</h1>
        <p className="mt-4 text-zinc-400">La página que buscas no existe o cambió de lugar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-linear-to-r from-green-500 to-purple-500 px-6 py-3 font-bold text-black transition hover:opacity-90"
          >
            Ir al inicio
          </Link>
          <Link href="/products" className="rounded-xl border border-zinc-700 px-6 py-3 font-bold transition hover:bg-zinc-800">
            Ver productos
          </Link>
        </div>
      </div>
    </main>
  );
}
