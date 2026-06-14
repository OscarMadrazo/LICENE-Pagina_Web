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
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function createProduct() {
    if (
      !name ||
      !description ||
      !sku ||
      !price ||
      !stock ||
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
        price,
        stock,
        brandId,
        categoryId,
      }),
    });

    if (!response.ok) {
      alert("Error al guardar producto");
      return;
    }

    alert("Producto creado correctamente");
    window.location.reload();
  }

  return (
    <div className="mb-8 rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Crear Producto
      </h2>

      <div className="grid gap-4">
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
        />

        <input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
        />

        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
        >
          <option value="">
            Selecciona una marca
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
          className="rounded-lg bg-zinc-800 p-3"
        >
          <option value="">
            Selecciona una categoría
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
          onClick={createProduct}
          className="rounded-lg bg-blue-600 p-3 font-semibold hover:bg-blue-700"
        >
          Guardar Producto
        </button>
      </div>
    </div>
  );
}