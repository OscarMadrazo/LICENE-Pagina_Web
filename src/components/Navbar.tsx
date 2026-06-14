"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function loadUser() {
      try {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch {
        setUser(null);
      }
    }

    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    }

    loadUser();

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  function logout() {
    localStorage.removeItem("user");

    alert("Sesión cerrada");

    window.location.href = "/";
  }

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-zinc-800
        bg-zinc-950/95
        backdrop-blur-md
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="
            whitespace-nowrap
            text-3xl
            font-extrabold
            bg-gradient-to-r
            from-green-400
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          LICENE
        </Link>

        <div className="hidden items-center gap-6 lg:flex">

          <Link
            href="/"
            className="transition hover:text-green-400"
          >
            Inicio
          </Link>

          <Link
            href="/products"
            className="transition hover:text-green-400"
          >
            Ecosistema
          </Link>

          <Link
            href="#tecnologias"
            className="transition hover:text-green-400"
          >
            Tecnologías
          </Link>

          <Link
            href="#reconocimientos"
            className="transition hover:text-green-400"
          >
            Reconocimientos
          </Link>

          <Link
            href="/downloads"
            className="transition hover:text-green-400"
          >
            Descargas
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-green-400"
          >
            Contacto
          </Link>

        </div>

        <div className="flex items-center gap-3">

          <Link
            href="/products"
            className="
              rounded-xl
              bg-gradient-to-r
              from-green-500
              to-purple-500
              px-4 py-2
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            🎮 Ecosistema
          </Link>

          <Link
            href="/downloads"
            className="
              rounded-xl
              border border-green-500
              px-4 py-2
              font-semibold
              text-green-400
              transition
              hover:bg-green-500/10
            "
          >
            📥 Descargas
          </Link>

          {user ? (
            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="
                  flex items-center gap-2
                  rounded-xl
                  border border-zinc-700
                  px-4 py-2
                  transition
                  hover:border-green-500
                "
              >
                👤

                <span className="hidden md:block">
                  {user.name}
                </span>

                <span className="text-xs">
                  ▼
                </span>
              </button>

              {menuOpen && (
                <div
                  className="
                    absolute right-0 mt-2
                    w-56
                    overflow-hidden
                    rounded-xl
                    border border-zinc-800
                    bg-zinc-900
                    shadow-2xl
                  "
                >
                  <Link
                    href="/profile"
                    className="
                      block px-4 py-3
                      transition
                      hover:bg-zinc-800
                    "
                  >
                    Mi Perfil
                  </Link>

                  <Link
                    href="/my-orders"
                    className="
                      block px-4 py-3
                      transition
                      hover:bg-zinc-800
                    "
                  >
                    Mis Actividades
                  </Link>

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="
                        block px-4 py-3
                        text-purple-400
                        transition
                        hover:bg-zinc-800
                      "
                    >
                      Administración
                    </Link>
                  )}

                  <div className="border-t border-zinc-800" />

                  <button
                    onClick={logout}
                    className="
                      w-full
                      px-4 py-3
                      text-left
                      text-red-400
                      transition
                      hover:bg-zinc-800
                    "
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="
                  rounded-xl
                  border border-zinc-700
                  px-4 py-2
                  transition
                  hover:border-green-500
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-green-500
                  to-purple-500
                  px-4 py-2
                  font-bold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Registro
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}