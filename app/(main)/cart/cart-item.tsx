import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/app-utils';
import { Product } from '@/lib/types/product';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const CartItem = ({ name: title, description, images, price }: Product) => {
  return (
    <div className='relative py-3 w-full'>
      <div className='md:flex md:items-center md:space-x-3 w-full overflow-hidden'>
        <Image
          className='hidden md:block object-contain rounded-lg aspect-square bg-gray-50'
          src={images[0]}
          alt={title}
          width='200'
          height={'200'}
        />

        <div className='w-full'>
          <h2 className='text-lg font-medium'>{title}</h2>
          <p className='text-muted-foreground text-sm truncate'>
            {description}
          </p>

          <div className='flex items-center justify-between w-full mt-5'>
            <strong className='font-medium text-lg  block order-1'>
              PKR {formatCurrency(price)}
            </strong>

            <div className='flex space-x-3 items-center'>
              <span className='rounded-full border border-muted p-2 cursor-pointer'>
                <Minus size='16' />
              </span>

              <span>1</span>

              <span className='rounded-full border border-muted p-2 cursor-pointer'>
                <Plus size='16' className='size-sm text-sm' />
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className='absolute inset-y-2 md:inset-y-4 inset-x-[92%] md:inset-x-[97%]'>
        <X size='16' />
      </span>
    </div>
  );
};

export default CartItem;
