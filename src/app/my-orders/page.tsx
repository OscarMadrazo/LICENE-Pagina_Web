"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

function getStatusColor(status: string) {
  switch (status) {
    case "Pendiente":
      return "text-yellow-400";

    case "Pagado":
      return "text-cyan-400";

    case "Preparando":
      return "text-blue-400";

    case "Enviado":
      return "text-purple-400";

    case "Entregado":
      return "text-green-400";

    case "Cancelado":
      return "text-red-400";

    default:
      return "text-zinc-400";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "Pendiente":
      return "🟡";

    case "Pagado":
      return "💳";

    case "Preparando":
      return "🔵";

    case "Enviado":
      return "🚚";

    case "Entregado":
      return "✅";

    case "Cancelado":
      return "❌";

    default:
      return "⚪";
  }
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedUser =
          localStorage.getItem("user");

        if (!savedUser) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);

        const response = await fetch(
          `/api/orders/user/${user.id}`
        );

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        Cargando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold">
          Mis Pedidos
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-6">
            No tienes pedidos.
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl bg-zinc-900 p-6"
              >
                <div className="mb-4 flex items-center justify-between">

                  <div>
                    <h2 className="font-bold">
                      Pedido #
                      {order.id.slice(0, 8)}
                    </h2>

                    <p className="text-zinc-400">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                    <p
                      className={`mt-2 font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}{" "}
                      {order.status}
                    </p>
                  </div>

                  <div className="text-2xl font-bold text-green-400">
                    $
                    {order.total.toLocaleString()}
                  </div>

                </div>

                <div className="space-y-2">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg bg-zinc-800 p-3"
                    >
                      <p>
                        <strong>
                          {item.product.name}
                        </strong>
                      </p>

                      <p>
                        Cantidad: {item.quantity}
                      </p>

                      <p>
                        Precio: $
                        {item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}