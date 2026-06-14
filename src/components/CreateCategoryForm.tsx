"use client";

import { useState } from "react";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");

  async function createCategory() {
    if (!name.trim()) return;

    await fetch("/api/categories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    window.location.reload();
  }

  return (
    <div className="mb-8 rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-4 text-xl font-bold">
        Crear Categoría
      </h2>

      <div className="flex gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la categoría"
          className="flex-1 rounded-lg bg-zinc-800 p-3 outline-none"
        />

        <button
          onClick={createCategory}
          className="rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700"
        >
          Crear
        </button>

      </div>

    </div>
  );
}