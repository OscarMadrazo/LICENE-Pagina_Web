"use client";

import { useRouter } from "next/navigation";

export default function EditProductButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(
          `/admin/products/edit/${productId}`
        )
      }
      className="rounded bg-yellow-600 px-3 py-1 hover:bg-yellow-700"
    >
      Editar
    </button>
  );
}