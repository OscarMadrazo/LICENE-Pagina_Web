"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function removeItem(id: string) {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  function increaseQuantity(id: string) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  function decreaseQuantity(id: string) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  function clearCart() {
    setCart([]);

    localStorage.removeItem("cart");
  }

  async function finishOrder() {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      const savedUser =
        localStorage.getItem("user");

      if (!savedUser) {
        alert(
          "Debes iniciar sesión para realizar una compra"
        );

        window.location.href = "/login";
        return;
      }

      const user = JSON.parse(savedUser);

      const missingFields = [];

      if (!user.name)
        missingFields.push("Nombre");

      if (!user.phone)
        missingFields.push("Teléfono");

      if (!user.address)
        missingFields.push("Dirección");

      if (!user.city)
        missingFields.push("Ciudad");

      if (!user.state)
        missingFields.push("Estado");

      if (!user.zipCode)
        missingFields.push(
          "Código Postal"
        );

      if (missingFields.length > 0) {
        alert(
          `Completa tu perfil antes de comprar.\n\nFaltan:\n${missingFields.join(
            "\n"
          )}`
        );

        window.location.href =
          "/profile";

        return;
      }

      const response = await fetch(
        "/api/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            items: cart,
            userId: user.id,
          }),
        }
      );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          "Error al crear pedido"
        );
        return;
      }

      alert(
        "Pedido creado correctamente"
      );

      localStorage.removeItem(
        "cart"
      );

      setCart([]);
    } catch (error) {
      console.error(error);

      alert(
        "Error al procesar pedido"
      );
    }
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold">
          Carrito de Compras
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-8">
            <p className="text-zinc-400">
              Tu carrito está vacío.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl bg-zinc-900 p-4"
                >
                  <div className="h-24 w-24 overflow-hidden rounded-lg bg-zinc-800">

                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                        Sin imagen
                      </div>
                    )}

                  </div>

                  <div className="flex-1">

                    <h2 className="font-bold">
                      {item.name}
                    </h2>

                    <div className="mt-2 flex items-center gap-3">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="h-8 w-8 rounded bg-zinc-700 hover:bg-zinc-600"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="h-8 w-8 rounded bg-zinc-700 hover:bg-zinc-600"
                      >
                        +
                      </button>

                    </div>

                    <p className="mt-2 text-blue-400">
                      ${item.price.toLocaleString()}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
                  >
                    Eliminar
                  </button>

                </div>
              ))}

            </div>

            <div className="mt-8 rounded-xl bg-zinc-900 p-6">

              <h2 className="text-2xl font-bold">
                Total:
              </h2>

              <p className="mt-2 text-3xl font-bold text-green-400">
                ${total.toLocaleString()}
              </p>

              <div className="mt-6 flex gap-4">

                <button
                  onClick={clearCart}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
                >
                  Vaciar Carrito
                </button>

                <button
                  onClick={finishOrder}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
                >
                  Finalizar Compra
                </button>

              </div>

            </div>
          </>
        )}

      </div>
    </main>
  );
}