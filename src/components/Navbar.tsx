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
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function loadCart() {
      try {
        const cart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        const totalItems = cart.reduce(
          (
            sum: number,
            item: { quantity: number }
          ) => sum + item.quantity,
          0
        );

        setCartCount(totalItems);
      } catch {
        setCartCount(0);
      }
    }

    function loadUser() {
      try {
        const savedUser =
          localStorage.getItem("user");

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

    loadCart();
    loadUser();

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    window.addEventListener("storage", loadCart);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      window.removeEventListener(
        "storage",
        loadCart
      );
    };
  }, []);

  function logout() {
    localStorage.removeItem("user");

    alert("Sesión cerrada");

    window.location.href = "/";
  }

  function handleSearch(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      if (!search.trim()) return;

      window.location.href =
        `/search?q=${encodeURIComponent(
          search
        )}`;
    }
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
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">

        {/* LOGO */}

        <Link
          href="/"
          className="
            text-3xl
            font-extrabold
            text-cyan-400
            whitespace-nowrap
            transition
            hover:text-cyan-300
          "
        >
          OK Dock
        </Link>

        {/* MENU */}

        <div className="hidden items-center gap-6 lg:flex">

          <Link
            href="/"
            className="transition hover:text-cyan-400"
          >
            Inicio
          </Link>

          <Link
            href="/products"
            className="transition hover:text-cyan-400"
          >
            Productos
          </Link>

          <Link
            href="/categories"
            className="transition hover:text-cyan-400"
          >
            Categorías
          </Link>

          <Link
            href="/brands"
            className="transition hover:text-cyan-400"
          >
            Marcas
          </Link>

          <Link
            href="/offers"
            className="transition hover:text-cyan-400"
          >
            Ofertas
          </Link>

          <Link
            href="/build-pc"
            className="transition hover:text-cyan-400"
          >
            Arma tu PC
          </Link>

        </div>

        {/* BUSCADOR */}

        <div className="hidden flex-1 lg:flex">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleSearch}
            placeholder="Buscar productos..."
            className="
              w-full
              rounded-xl
              border border-zinc-700
              bg-zinc-900
              px-4 py-2
              outline-none
              transition
              focus:border-cyan-500
            "
          />

        </div>

        {/* DERECHA */}

        <div className="ml-auto flex items-center gap-3">

          <Link
            href="/cart"
            className="
              rounded-xl
              border border-cyan-500
              px-4 py-2
              font-semibold
              text-cyan-400
              transition
              hover:bg-cyan-500/10
            "
          >
            🛒 {cartCount}
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
                  hover:border-cyan-500
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
                    onClick={() =>
                      setMenuOpen(false)
                    }
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
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    Mis Pedidos
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
                      onClick={() =>
                        setMenuOpen(false)
                      }
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
                  hover:border-cyan-500
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  rounded-xl
                  bg-cyan-500
                  px-4 py-2
                  font-bold
                  text-black
                  transition
                  hover:bg-cyan-400
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