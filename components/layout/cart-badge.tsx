'use client';
import { useCart } from '@/lib/stores/cart-store/use-cart';
import React from 'react';

const CartBadge = () => {
  const items = useCart(c => c.items);

  if (!items.length) return <></>;

  return (
    <strong className='py-.5 px-1 rounded-full bg-destructive text-xs text-white'>
      {items.length}
    </strong>
  );
};

export default CartBadge;
