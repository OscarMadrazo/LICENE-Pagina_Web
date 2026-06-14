"use client";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  async function deleteProduct() {
    const confirmDelete = confirm(
      "¿Eliminar este producto?"
    );

    if (!confirmDelete) return;

    await fetch("/api/products/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
      }),
    });

    window.location.reload();
  }

  return (
    <button
      onClick={deleteProduct}
      className="rounded bg-red-600 px-3 py-1 hover:bg-red-700"
    >
      Eliminar
    </button>
  );
}