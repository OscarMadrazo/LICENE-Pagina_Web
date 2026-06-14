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
    async function loadProducts() {
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

    loadProducts();
  }, [q]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">
            Buscando...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-4xl font-bold">
          Resultados para: {q}
        </h1>

        {products.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-6">
            No se encontraron productos.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>
    </main>
  );
}