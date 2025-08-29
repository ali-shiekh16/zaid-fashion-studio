'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/stores/cart-store/use-cart';
import { Product } from '@/lib/types/product';
import React from 'react';
import { toast } from 'sonner';

const AddCartBtn = ({ name, price, description, images, id }: Product) => {
  const addItem = useCart(c => c.addItem);
  const items = useCart(c => c.items);

  const current = items.find(i => i.id === id);

  const handleClick = () => {
    addItem({
      name,
      price,
      description,
      imageUrl: images[0],
      id,
      quantity: 1,
    });

    toast.success('Added to cart!');
  };

  return (
    <Button
      variant='outline'
      onClick={handleClick}
      className='w-full'
      disabled={!!current}
    >
      {!!current ? 'Added' : 'Add to cart'}
    </Button>
  );
};

export default AddCartBtn;
