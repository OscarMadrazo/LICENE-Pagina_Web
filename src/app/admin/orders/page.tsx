import { prisma } from "@/lib/prisma";
import OrderStatusSelector from "@/components/OrderStatusSelector";

function getStatusColor(status: string) {
  switch (status) {
    case "Pendiente":
      return "text-yellow-400";

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

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">
          Pedidos
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-6">
            No hay pedidos registrados.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl bg-zinc-900 p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="font-bold">
                      Pedido #{order.id.slice(0, 8)}
                    </h2>

                    <p className="text-zinc-400">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                    <p className="mt-2 text-blue-400">
                      Usuario:{" "}
                      {order.user
                        ? order.user.name
                        : "Invitado"}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {order.user?.email}
                    </p>

                    <div className="mt-4 rounded-lg bg-zinc-800 p-4">
                      <h3 className="mb-2 font-semibold text-white">
                        Información de Envío
                      </h3>

                      <p>
                        <strong>Nombre:</strong>{" "}
                        {order.customerName || "No registrado"}
                      </p>

                      <p>
                        <strong>Teléfono:</strong>{" "}
                        {order.phone || "No registrado"}
                      </p>

                      <p>
                        <strong>Dirección:</strong>{" "}
                        {order.address || "No registrada"}
                      </p>

                      <p>
                        <strong>Ciudad:</strong>{" "}
                        {order.city || "No registrada"}
                      </p>

                      <p>
                        <strong>Estado:</strong>{" "}
                        {order.state || "No registrado"}
                      </p>

                      <p>
                        <strong>Código Postal:</strong>{" "}
                        {order.zipCode || "No registrado"}
                      </p>
                    </div>

                    <div className="mt-3">
                      <p
                        className={`font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        Estado: {order.status}
                      </p>

                      <OrderStatusSelector
                        orderId={order.id}
                        currentStatus={order.status}
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">
                      $
                      {order.total.toLocaleString()}
                    </p>
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