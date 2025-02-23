import { OrderStatus } from '@prisma/client';

export const OrdersStatusList = [
  OrderStatus.COMPLETADA,
  OrderStatus.PENDIENTE,
  OrderStatus.PROCESO,
];
