// Estados válidos de un pedido; deben coincidir con las opciones de OrderStatusSelector.
export const ORDER_STATUSES = [
  "Pendiente",
  "Pagado",
  "Preparando",
  "Enviado",
  "Entregado",
  "Cancelado",
] as const;
