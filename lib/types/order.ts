export enum OrderStatus {
  deraft = 'draft',
  pending = 'pending',
  confirmed = 'confirmed',
  shipped = 'shipped',
  delivered = 'delivered',
  canceled = 'canceled',
}

export type Order = {
  id: string;
  userId?: string;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
};
