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
        "Usuario registrado correctamente"
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
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8">

        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Crear Cuenta
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 p-3 text-white"
          />

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-800 p-3 text-white"
          />

          <button
            onClick={register}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Registrando..."
              : "Crear Cuenta"}
          </button>

        </div>

      </div>
    </main>
  );
}