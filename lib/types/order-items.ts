interface Product {
  id: number;
  name: string;
  description: string;
  product_images: { id: number; image_url: string }[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  products: Product;
  quantity: number;
  price: number;
}
