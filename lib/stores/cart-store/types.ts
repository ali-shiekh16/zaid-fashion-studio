export interface CartItem {
  id: string; // product id
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  description: string;
  stock?: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
}
