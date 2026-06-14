"use client";

import { useState } from "react";
import Image from "next/image";

type Brand = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  brandId: string;
  categoryId: string;
  imageUrl?: string | null;
};

interface Props {
  product: Product;
  brands: Brand[];
  categories: Category[];
}

export default function EditProductForm({
  product,
  brands,
  categories,
}: Props) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [sku, setSku] = useState(product.sku);
  const [brandId, setBrandId] = useState(product.brandId);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [imageUrl, setImageUrl] = useState(
    product.imageUrl ?? ""
  );

  async function updateModule() {
    const response = await fetch("/api/products/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
        name,
        description,
        sku,
        price: 0,
        stock: 1,
        brandId,
        categoryId,
        imageUrl,
      }),
    });

    if (!response.ok) {
      alert("Error al actualizar módulo");
      return;
    }

    alert("Módulo actualizado correctamente");
    window.location.href = "/admin/products";
  }

  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-2 text-3xl font-bold">
        Editar Módulo LICENE
      </h2>

      <p className="mb-6 text-zinc-400">
        Actualiza la información de esta experiencia educativa.
      </p>

      <div className="grid gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del módulo"
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción educativa"
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          rows={5}
        />

        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Identificador del módulo"
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL de la imagen"
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        {imageUrl && (
          <div className="overflow-hidden rounded-xl border border-zinc-700">
            <Image
              src={imageUrl}
              alt="Vista previa"
              width={1200}
              height={600}
              className="h-60 w-full object-cover"
              unoptimized
            />
          </div>
        )}

        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        >
          {brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={updateModule}
          className="rounded-lg bg-cyan-600 p-3 font-semibold hover:bg-cyan-700"
        >
          Guardar Cambios
        </button>

      </div>

    </div>
  );
}