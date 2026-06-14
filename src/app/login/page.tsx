"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  async function login() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(
        "Bienvenido al sistema LICENE, " +
          data.user.name
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      alert(
        "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">

      <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-zinc-900 p-8">

        <div className="text-center">

          <h1 className="text-5xl font-bold text-cyan-400">
            LICENE
          </h1>

          <p className="mt-4 text-zinc-400">
            Laboratorio Interactivo de Ciencias para
            Estudiantes con Necesidades Específicas
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-lg bg-cyan-600 py-3 font-semibold hover:bg-cyan-700"
          >
            {loading
              ? "Iniciando sesión..."
              : "Ingresar al Sistema"}
          </button>

        </div>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Plataforma educativa inclusiva basada en
          videojuegos, realidad virtual, realidad mixta
          y aplicaciones móviles.
        </div>

      </div>

    </main>
  );
}