"use client";

import { useState } from "react";

export default function CreateBrandForm() {
  const [name, setName] = useState("");

  async function createTechnology() {
    if (!name.trim()) return;

    await fetch("/api/brands/create", {
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
        Crear Tecnología
      </h2>

      <p className="mb-6 text-zinc-400">
        Agrega una tecnología utilizada dentro del ecosistema LICENE.
      </p>

      <div className="flex gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ejemplo: Unity, Flutter, Firebase..."
          className="flex-1 rounded-lg bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-cyan-500"
        />

        <button
          onClick={createTechnology}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold hover:bg-cyan-700"
        >
          Guardar Tecnología
        </button>

      </div>

    </div>
  );
}