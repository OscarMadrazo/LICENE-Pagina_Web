"use client";

import Link from "next/link";
import { useEffect } from "react";

// Página amable cuando algo falla (por ejemplo, si la base de datos no responde un momento).
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/80 p-10 text-center shadow-2xl">
        <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-linear-to-r from-green-400 to-purple-500" />
        <h1 className="text-3xl font-bold">Algo salió mal</h1>
        <p className="mt-4 text-zinc-400">
          No pudimos cargar esta sección. Puede ser un problema de conexión pasajero. Intenta de nuevo en unos segundos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-xl bg-linear-to-r from-green-500 to-purple-500 px-6 py-3 font-bold text-black transition hover:opacity-90"
          >
            Intentar de nuevo
          </button>
          <Link href="/" className="rounded-xl border border-zinc-700 px-6 py-3 font-bold transition hover:bg-zinc-800">
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
