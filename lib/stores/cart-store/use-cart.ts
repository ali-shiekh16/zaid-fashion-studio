import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState } from './types';

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: item =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: id =>
        set(state => ({
          items: state.items.filter(i => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      updateQuantity: (id, quantity) =>
        set(state => ({
          items: state.items.map(i => (i.id === id ? { ...i, quantity } : i)),
        })),

      getTotal: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
