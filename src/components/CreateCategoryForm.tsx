"use client";

import { useState } from "react";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");

  async function createExperienceType() {
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

      <h2 className="mb-2 text-2xl font-bold">
        Crear Tipo de Experiencia
      </h2>

      <p className="mb-6 text-zinc-400">
        Agrega una clasificación para los módulos educativos de LICENE.
      </p>

      <div className="flex gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ejemplo: Realidad Virtual, Aplicación Móvil..."
          className="flex-1 rounded-lg bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-cyan-500"
        />

        <button
          onClick={createExperienceType}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold hover:bg-cyan-700"
        >
          Guardar Tipo
        </button>

      </div>

    </div>
  );
}