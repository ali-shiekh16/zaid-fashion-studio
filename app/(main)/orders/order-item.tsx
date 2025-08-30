import { formatCurrency } from '@/lib/app-utils';
import React from 'react';
import Image from 'next/image';

interface Props {
  imageUrl?: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

const OrderItem = ({
  imageUrl,
  title,
  description,
  price,
  quantity,
}: Props) => {
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
              PKR {formatCurrency(price * quantity)}
            </strong>

            <span>Quantity: {quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
