"use client";

import { useEffect, useState } from "react";
import {
  fetchSessionUser,
  saveCachedUser,
  type ClientUser,
} from "@/lib/client-session";

const ADDRESS_FIELDS = [
  { key: "phone", label: "Teléfono", type: "tel" },
  { key: "address", label: "Dirección", type: "text" },
  { key: "city", label: "Ciudad", type: "text" },
  { key: "state", label: "Estado", type: "text" },
  { key: "zipCode", label: "Código Postal", type: "text" },
] as const;

type AddressKey = (typeof ADDRESS_FIELDS)[number]["key"];

const inputClassName = `
  w-full rounded-xl
  bg-zinc-800 p-3
  outline-none
  focus:ring-2
  focus:ring-cyan-500
`;

export default function ProfilePage() {
  const [user, setUser] =
    useState<ClientUser | null>(null);

  const [name, setName] =
    useState("");

  const [fields, setFields] = useState<
    Record<AddressKey, string>
  >({
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchSessionUser().then((sessionUser) => {
      if (!sessionUser) {
        window.location.href = "/login";
        return;
      }

      setUser(sessionUser);
      setName(sessionUser.name || "");
      setFields({
        phone: sessionUser.phone || "",
        address: sessionUser.address || "",
        city: sessionUser.city || "",
        state: sessionUser.state || "",
        zipCode: sessionUser.zipCode || "",
      });
    });
  }, []);

  async function saveProfile() {
    if (!user) return;

    try {
      setSaving(true);

      const response = await fetch(
        "/api/profile/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            ...fields,
          }),
        }
      );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          data.message ||
            "Error al guardar perfil"
        );
        return;
      }

      saveCachedUser(data.user);
      setUser(data.user);

      alert(
        "Perfil actualizado correctamente"
      );
    } catch (error) {
      console.error(error);

      alert("Error al guardar perfil");
    } finally {
      setSaving(false);
    }
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

          <h2 className="mb-2 text-2xl font-bold">
            Información del Participante
          </h2>

          <p className="mb-8 text-zinc-400">
            Los datos de contacto y dirección son necesarios para
            solicitar módulos.
          </p>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label
                htmlFor="profile-name"
                className="mb-2 block text-zinc-400"
              >
                Nombre Completo
              </label>

              <input
                id="profile-name"
                value={name}
                maxLength={100}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className={inputClassName}
              />

            </div>

            <div>

              <label
                htmlFor="profile-email"
                className="mb-2 block text-zinc-400"
              >
                Correo Electrónico
              </label>

              <input
                id="profile-email"
                value={user?.email || ""}
                disabled
                className="
                  w-full rounded-xl
                  bg-zinc-800 p-3
                  opacity-70
                "
              />

            </div>

            {ADDRESS_FIELDS.map((field) => (
              <div key={field.key}>

                <label
                  htmlFor={`profile-${field.key}`}
                  className="mb-2 block text-zinc-400"
                >
                  {field.label}
                </label>

                <input
                  id={`profile-${field.key}`}
                  type={field.type}
                  value={fields[field.key]}
                  onChange={(e) =>
                    setFields((current) => ({
                      ...current,
                      [field.key]: e.target.value,
                    }))
                  }
                  className={inputClassName}
                />

              </div>
            ))}

          </div>

          <button
            onClick={saveProfile}
            disabled={saving || !user}
            className="
              mt-8 w-full rounded-xl
              bg-cyan-500 py-4
              font-bold text-black
              transition hover:bg-cyan-400
              disabled:opacity-60
            "
          >
            {saving
              ? "Guardando..."
              : "Guardar Información"}
          </button>

        </div>

      </div>

    </main>
  );
}
