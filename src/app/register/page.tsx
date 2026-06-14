"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);

  function validateForm() {
    if (name.trim().length < 3) {
      alert(
        "El nombre debe tener al menos 3 caracteres"
      );
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Ingresa un correo válido");
      return false;
    }

    if (password.length < 8) {
      alert(
        "La contraseña debe tener al menos 8 caracteres"
      );
      return false;
    }

    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (!hasNumber) {
      alert(
        "La contraseña debe contener al menos un número"
      );
      return false;
    }

    if (!hasUpperCase) {
      alert(
        "La contraseña debe contener al menos una mayúscula"
      );
      return false;
    }

    if (password !== confirmPassword) {
      alert(
        "Las contraseñas no coinciden"
      );
      return false;
    }

    return true;
  }

  async function register() {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
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

      alert(
        "Cuenta creada correctamente"
      );

      window.location.href = "/login";
    } catch (error) {
      console.error(error);

      alert(
        "Error al registrar usuario"
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
            Registro de usuarios para la plataforma educativa inclusiva LICENE
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <button
            onClick={register}
            disabled={loading}
            className="w-full rounded-lg bg-cyan-600 py-3 font-semibold hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading
              ? "Creando cuenta..."
              : "Registrarse en LICENE"}
          </button>

        </div>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Plataforma educativa enfocada en videojuegos,
          realidad virtual, realidad mixta, aplicaciones móviles
          y tecnologías inclusivas para el aprendizaje.
        </div>

      </div>

    </main>
  );
}