'use client';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { toast } from 'sonner';
import { useCart } from '@/lib/stores/cart-store/use-cart';
import React from 'react';
import { useRouter } from 'next/navigation';

const BuyBtn = ({ name, price, description, images, id }: Product) => {
  const router = useRouter();
  const addItem = useCart(c => c.addItem);
  const items = useCart(c => c.items);

  const current = items.find(i => i.id === id);

  const handleClick = () => {
    if (!current)
      addItem({
        name,
        price,
        description,
        imageUrl: images[0],
        id,
        quantity: 1,
      });

    router.push('/cart');
  };

  return (
    <Button onClick={handleClick} className='w-full'>
      Buy Now
    </Button>
  );
};

export default BuyBtn;
