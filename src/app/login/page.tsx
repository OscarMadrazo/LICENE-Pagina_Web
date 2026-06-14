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

      alert("Bienvenido " + data.user.name);

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
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8">

        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Iniciar Sesión
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 p-3 text-white"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 p-3 text-white"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
          >
            {loading
              ? "Ingresando..."
              : "Ingresar"}
          </button>

        </div>

      </div>
    </main>
  );
}