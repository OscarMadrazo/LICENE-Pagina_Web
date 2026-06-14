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
  const [mobileMenu, setMobileMenu] = useState(false);

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

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
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
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="
              text-2xl md:text-3xl
              font-extrabold
              bg-linear-to-r
              from-green-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            LICENE
          </Link>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center gap-6">

            <Link href="/" className="hover:text-green-400">
              Inicio
            </Link>

            <Link href="/products" className="hover:text-green-400">
              Ecosistema
            </Link>

            <Link href="#tecnologias" className="hover:text-green-400">
              Tecnologías
            </Link>

            <Link href="#reconocimientos" className="hover:text-green-400">
              Reconocimientos
            </Link>

            <Link href="/downloads" className="hover:text-green-400">
              Descargas
            </Link>

            <Link href="/contact" className="hover:text-green-400">
              Contacto
            </Link>

          </div>

          {/* Botones Desktop */}
          <div className="hidden lg:flex items-center gap-3">

            <Link
              href="/products"
              className="
                rounded-xl
                bg-linear-to-r
                from-green-500
                to-purple-500
                px-4 py-2
                font-semibold
                text-white
              "
            >
              🎮 Ecosistema
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
                    rounded-xl
                    border border-zinc-700
                    px-4 py-2
                  "
                >
                  👤 {user.name}
                </button>

                {menuOpen && (
                  <div
                    className="
                      absolute right-0 mt-2
                      w-56
                      rounded-xl
                      border border-zinc-800
                      bg-zinc-900
                    "
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-3 hover:bg-zinc-800"
                    >
                      Mi Perfil
                    </Link>

                    <Link
                      href="/my-orders"
                      className="block px-4 py-3 hover:bg-zinc-800"
                    >
                      Mis Actividades
                    </Link>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-purple-400 hover:bg-zinc-800"
                      >
                        Administración
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="
                        w-full
                        px-4 py-3
                        text-left
                        text-red-400
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
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    rounded-xl
                    bg-linear-to-r
                    from-green-500
                    to-purple-500
                    px-4 py-2
                    font-bold
                    text-white
                  "
                >
                  Registro
                </Link>
              </>
            )}

          </div>

          {/* Botón móvil */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="
              lg:hidden
              text-3xl
            "
          >
            ☰
          </button>

        </div>

        {/* Menú móvil */}
        {mobileMenu && (
          <div
            className="
              lg:hidden
              mt-4
              flex
              flex-col
              gap-3
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-4
            "
          >
            <Link href="/">Inicio</Link>
            <Link href="/products">Ecosistema</Link>
            <Link href="/downloads">Descargas</Link>
            <Link href="/contact">Contacto</Link>

            <div className="border-t border-zinc-800 pt-3" />

            {user ? (
              <>
                <Link href="/profile">
                  Mi Perfil
                </Link>

                <Link href="/my-orders">
                  Mis Actividades
                </Link>

                {user.role === "ADMIN" && (
                  <Link href="/admin">
                    Administración
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="text-left text-red-400"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  Login
                </Link>

                <Link href="/register">
                  Registro
                </Link>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}