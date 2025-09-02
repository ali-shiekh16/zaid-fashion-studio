import { Address } from './address';

export enum OrderStatus {
  draft = 'draft',
  pending = 'pending',
  confirmed = 'confirmed',
  shipped = 'shipped',
  delivered = 'delivered',
  canceled = 'canceled',
}

type Product = {
  id: string;
  name: string;
  description: string;
  product_images: { id: number; image_url: string }[];
};

type OrderItem = {
  id: number;
  order_id: number;
  price: number;
  quantity: number;
  products: Product;
};

export type Order = {
  id: string;
  user_id?: string;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
  tracking_id?: string;
  order_items: OrderItem[];
  addresses: Address[];
};
