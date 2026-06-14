"use client";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
}

export default function AddToCartButton({
  id,
  name,
  price,
  imageUrl,
}: Props) {
  function addToCart() {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existing = cart.find(
      (item) => item.id === id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        imageUrl,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Producto agregado al carrito");
  }

  return (
    <button
      onClick={addToCart}
      className="mt-8 rounded-lg bg-green-600 px-8 py-3 font-semibold hover:bg-green-700"
    >
      Agregar al carrito
    </button>
  );
}