"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function ProfilePage() {
  const [user, setUser] =
    useState<User | null>(null);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) return;

    const parsedUser =
      JSON.parse(savedUser);

    setUser(parsedUser);

    setName(parsedUser.name || "");
    setPhone(parsedUser.phone || "");
  }, []);

  async function saveProfile() {
    if (!user) return;

    const response = await fetch(
      "/api/profile/update",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          name,
          phone,
        }),
      }
    );

    const data =
      await response.json();

    if (!data.success) {
      alert(
        "Error al guardar perfil"
      );
      return;
    }

    const updatedUser = {
      ...user,
      name,
      phone,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    alert(
      "Perfil actualizado correctamente"
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8 rounded-3xl border border-cyan-500/20 bg-zinc-900 p-8">

          <div className="flex items-center gap-6">

            <div
              className="
                flex h-24 w-24 items-center
                justify-center rounded-full
                bg-cyan-500 text-4xl
                font-bold text-black
              "
            >
              {name.charAt(0).toUpperCase()}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {name || "Usuario"}
              </h1>

              <p className="mt-2 text-zinc-400">
                {user?.email}
              </p>

              <p className="mt-2 text-cyan-400">
                Participante de LICENE
              </p>

            </div>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">

          <div className="rounded-2xl bg-zinc-900 p-6">

            <h3 className="text-zinc-400">
              Módulos Explorados
            </h3>

            <p className="mt-3 text-4xl font-bold text-cyan-400">
              0
            </p>

          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">

            <h3 className="text-zinc-400">
              Actividades Registradas
            </h3>

            <p className="mt-3 text-4xl font-bold text-cyan-400">
              0
            </p>

          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">

            <h3 className="text-zinc-400">
              Estado
            </h3>

            <p className="mt-3 text-2xl font-bold text-green-400">
              Activo
            </p>

          </div>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-8">

          <h2 className="mb-8 text-2xl font-bold">
            Información del Participante
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-zinc-400">
                Nombre Completo
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full rounded-xl
                  bg-zinc-800 p-3
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />

            </div>

            <div>

              <label className="mb-2 block text-zinc-400">
                Correo Electrónico
              </label>

              <input
                value={user?.email || ""}
                disabled
                className="
                  w-full rounded-xl
                  bg-zinc-800 p-3
                  opacity-70
                "
              />

            </div>

            <div>

              <label className="mb-2 block text-zinc-400">
                Teléfono
              </label>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                  w-full rounded-xl
                  bg-zinc-800 p-3
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />

            </div>

          </div>

          <button
            onClick={saveProfile}
            className="
              mt-8 w-full rounded-xl
              bg-cyan-500 py-4
              font-bold text-black
              transition hover:bg-cyan-400
            "
          >
            Guardar Información
          </button>

        </div>

      </div>

    </main>
  );
}