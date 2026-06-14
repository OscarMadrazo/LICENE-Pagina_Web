"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModules() {
      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(q)}`
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadModules();
  }, [q]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        <div className="mx-auto max-w-7xl">

          <h1 className="text-4xl font-bold">
            Buscando módulos...
          </h1>

          <p className="mt-4 text-zinc-400">
            Consultando experiencias educativas dentro del ecosistema LICENE.
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
            Búsqueda Inteligente LICENE
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Resultados para: {q}
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Módulos educativos, tecnologías, recursos digitales
            y experiencias de aprendizaje encontradas dentro del
            ecosistema LICENE.
          </p>

        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-2xl font-bold">
              Sin resultados
            </h2>

            <p className="mt-3 text-zinc-400">
              No se encontraron módulos relacionados con la búsqueda realizada.
            </p>

          </div>
        ) : (
          <>
            <p className="mb-6 text-zinc-400">
              Se encontraron {products.length} resultados.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          </>
        )}

      </div>
    </main>
  );
}