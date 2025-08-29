import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/app-utils';
import type { CartItem } from '@/lib/stores/cart-store/types';
import { useCart } from '@/lib/stores/cart-store/use-cart';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import { toast } from 'sonner';

const CartItem = ({
  name: title,
  description,
  imageUrl,
  price,
  id,
}: CartItem) => {
  const items = useCart(c => c.items);
  const updateQty = useCart(c => c.updateQuantity);
  const removeItem = useCart(c => c.removeItem);

  const current = items.find(i => i.id === id);

  const handleIncrement = () => {
    if (!current) return;
    updateQty(id, Math.min(current.quantity + 1, current.stock || 1000));
  };

  const handleDecrement = () => {
    if (!current) return;
    updateQty(id, Math.max(1, current.quantity - 1));
  };

  const handleRemove = () => {
    if (!current) return;

    removeItem(id);

    toast.success('Article Removed!');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = +e.currentTarget.value;

    if (!current) return;

    updateQty(id, Math.max(1, Math.min(val, current.stock || 1000)));
  };

  return (
    <div className='relative py-3 w-full'>
      <div className='md:flex md:items-center md:space-x-3 w-full'>
        {imageUrl && (
          <Image
            className='hidden md:block object-contain rounded-lg aspect-square bg-gray-50'
            src={imageUrl}
            alt={title}
            width='200'
            height={'200'}
          />
        )}
        <div className='w-full'>
          <h2 className='text-lg font-medium max-w-full'>{title}</h2>
          <p className='text-muted-foreground max-w-sm text-sm truncate'>
            {description}
          </p>

          <div className='flex items-center justify-between w-full mt-5'>
            <strong className='font-medium text-lg  block order-1'>
              PKR {formatCurrency(price * (current?.quantity || 1))}
            </strong>

            <div className='flex space-x-3 items-center'>
              <span
                className='rounded-full border border-muted p-2 cursor-pointer'
                onClick={handleDecrement}
              >
                <Minus size='16' />
              </span>

              <span>
                <Input
                  className='max-w-18'
                  value={current?.quantity || 1}
                  onChange={handleChange}
                  type='number'
                />
              </span>

              <span
                className='rounded-full border border-muted p-2 cursor-pointer'
                onClick={handleIncrement}
              >
                <Plus size='16' className='size-sm text-sm' />
              </span>
            </div>
          </div>
        </div>
      </div>

      <span
        className='absolute inset-y-2 md:inset-y-4 inset-x-[92%] md:inset-x-[97%] cursor-pointer'
        onClick={handleRemove}
      >
        <X size='16' />
      </span>
    </div>
  );
};

export default CartItem;
