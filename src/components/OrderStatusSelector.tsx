"use client";

import { useState } from "react";

interface Props {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusSelector({
  orderId,
  currentStatus,
}: Props) {
  const [status, setStatus] =
    useState(currentStatus);

  async function updateStatus(
    newStatus: string
  ) {
    setStatus(newStatus);

    try {
      const response = await fetch(
        "/api/orders/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            orderId,
            status: newStatus,
          }),
        }
      );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          "Error al actualizar estado"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Error al actualizar estado"
      );
    }
  }

  return (
    <select
      value={status}
      onChange={(e) =>
        updateStatus(e.target.value)
      }
      className="mt-2 rounded-lg bg-zinc-800 px-3 py-2 text-white"
    >
      <option value="Pendiente">
        🟡 Pendiente
      </option>

      <option value="Pagado">
        💳 Pagado
      </option>

      <option value="Preparando">
        🔵 Preparando
      </option>

      <option value="Enviado">
        🚚 Enviado
      </option>

      <option value="Entregado">
        ✅ Entregado
      </option>

      <option value="Cancelado">
        ❌ Cancelado
      </option>
    </select>
  );
}