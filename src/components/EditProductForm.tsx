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
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());
  const [brandId, setBrandId] = useState(product.brandId);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [imageUrl, setImageUrl] = useState(
    product.imageUrl ?? ""
  );

  async function updateProduct() {
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
        price,
        stock,
        brandId,
        categoryId,
        imageUrl,
      }),
    });

    if (!response.ok) {
      alert("Error al actualizar producto");
      return;
    }

    alert("Producto actualizado correctamente");
    window.location.href = "/admin/products";
  }

  return (
    <div className="rounded-xl bg-zinc-900 p-6">
      <div className="grid gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="rounded-lg bg-zinc-800 p-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="rounded-lg bg-zinc-800 p-3"
          rows={4}
        />

        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU"
          className="rounded-lg bg-zinc-800 p-3"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio"
          className="rounded-lg bg-zinc-800 p-3"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="rounded-lg bg-zinc-800 p-3"
        />

        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL de la imagen"
          className="rounded-lg bg-zinc-800 p-3"
        />

        {imageUrl && (
          <div className="overflow-hidden rounded-lg border border-zinc-700">
            <Image
              src={imageUrl}
              alt="Preview"
              width={800}
              height={400}
              className="h-48 w-full object-cover"
              unoptimized
            />
          </div>
        )}

        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3"
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
          className="rounded-lg bg-zinc-800 p-3"
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
          onClick={updateProduct}
          className="rounded-lg bg-green-600 p-3 font-semibold hover:bg-green-700"
        >
          Guardar Cambios
        </button>

      </div>
    </div>
  );
}