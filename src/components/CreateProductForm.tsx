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
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

    try {
      setLoading(true);

      const response = await fetch(
        "/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            sku,
            imageUrl,
            price: 0,
            stock: 1,
            brandId,
            categoryId,
          }),
        }
      );

      if (!response.ok) {
        alert("Error al guardar módulo");
        return;
      }

      alert(
        "Módulo creado correctamente"
      );

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "Ocurrió un error inesperado"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
      "
    >
      <h2
        className="
          text-2xl
          md:text-3xl
          font-bold
        "
      >
        Crear Módulo LICENE
      </h2>

      <p className="mt-2 text-zinc-400">
        Registra videojuegos,
        aplicaciones móviles,
        experiencias VR, AR y
        tecnologías educativas.
      </p>

      <div
        className="
          mt-6
          grid
          gap-4
        "
      >
        <input
          placeholder="Nombre del módulo"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            p-3
            outline-none
            focus:border-green-500
          "
        />

        <textarea
          placeholder="Descripción educativa"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={5}
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            p-3
            outline-none
            focus:border-green-500
          "
        />

        <input
          placeholder="SKU (Ej: LICENE-VR-001)"
          value={sku}
          onChange={(e) =>
            setSku(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            p-3
            outline-none
            focus:border-green-500
          "
        />

        <input
          placeholder="URL de imagen"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            p-3
            outline-none
            focus:border-green-500
          "
        />

        <select
          value={brandId}
          onChange={(e) =>
            setBrandId(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            p-3
          "
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
          onChange={(e) =>
            setCategoryId(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            p-3
          "
        >
          <option value="">
            Selecciona un tipo de experiencia
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <button
          onClick={createModule}
          disabled={loading}
          className="
            rounded-xl
            bg-linear-to-r
            from-green-500
            to-purple-500
            p-4
            font-bold
            text-white
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Guardando..."
            : "Guardar Módulo"}
        </button>
      </div>
    </div>
  );
}