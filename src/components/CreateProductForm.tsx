"use client";

import { useState } from "react";

type Brand = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

interface CreateProductFormProps {
  brands: Brand[];
  categories: Category[];
}

export default function CreateProductForm({
  brands,
  categories,
}: CreateProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function createModule() {
    if (
      !name ||
      !description ||
      !sku ||
      !brandId ||
      !categoryId
    ) {
      alert("Completa todos los campos");
      return;
    }

    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        sku,
        price: 0,
        stock: 1,
        brandId,
        categoryId,
      }),
    });

    if (!response.ok) {
      alert("Error al guardar módulo");
      return;
    }

    alert("Módulo creado correctamente");
    window.location.reload();
  }

  return (
    <div className="mb-8 rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-2 text-2xl font-bold">
        Crear Módulo LICENE
      </h2>

      <p className="mb-6 text-zinc-400">
        Registra una nueva experiencia educativa dentro del ecosistema LICENE.
      </p>

      <div className="grid gap-4">

        <input
          placeholder="Nombre del módulo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <textarea
          placeholder="Descripción educativa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <input
          placeholder="Identificador del módulo"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        >
          <option value="">
            Selecciona una tecnología
          </option>

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
          <option value="">
            Selecciona un tipo de experiencia
          </option>

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
          onClick={createModule}
          className="rounded-lg bg-cyan-600 p-3 font-semibold hover:bg-cyan-700"
        >
          Guardar Módulo
        </button>

      </div>

    </div>
  );
}