"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export default function ProfilePage() {
  const [user, setUser] =
    useState<User | null>(null);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [stateValue, setStateValue] =
    useState("");

  const [zipCode, setZipCode] =
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
    setAddress(parsedUser.address || "");
    setCity(parsedUser.city || "");
    setStateValue(parsedUser.state || "");
    setZipCode(parsedUser.zipCode || "");
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
          address,
          city,
          state: stateValue,
          zipCode,
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
      address,
      city,
      state: stateValue,
      zipCode,
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

        {/* HEADER */}

        <div className="mb-8 rounded-3xl border border-cyan-500/20 bg-zinc-900 p-8">

          <div className="flex items-center gap-6">

            <div
              className="
                flex h-20 w-20 items-center
                justify-center rounded-full
                bg-cyan-500 text-3xl
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

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="rounded-3xl bg-zinc-900 p-8">

          <h2 className="mb-8 text-2xl font-bold">
            Información Personal
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-zinc-400">
                Nombre
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
                Correo
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

            <div>
              <label className="mb-2 block text-zinc-400">
                Código Postal
              </label>

              <input
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value)
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

            <div className="md:col-span-2">
              <label className="mb-2 block text-zinc-400">
                Dirección
              </label>

              <input
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
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
                Ciudad
              </label>

              <input
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
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
                Estado
              </label>

              <input
                value={stateValue}
                onChange={(e) =>
                  setStateValue(
                    e.target.value
                  )
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
            Guardar Cambios
          </button>

        </div>

      </div>
    </main>
  );
}