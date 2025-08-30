import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { formatCurrency } from '@/lib/app-utils';
import React from 'react';

interface Props {
  discount: number;
  delivery: number;
  tax: number;
  subtotal: number;
  total: number;
}

const OrderSummary = ({ discount, delivery, tax, total, subtotal }: Props) => {
  return (
    <Card className='max-h-fit'>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <div className='flex justify-between'>
          <span>Subtotal</span>
          <span>PKR {formatCurrency(subtotal)}</span>
        </div>
        <div className='flex justify-between '>
          <span>Discount</span>
          <span>PKR {formatCurrency(discount)}</span>
        </div>

        <div className='flex justify-between'>
          <span>Delivery</span>
          <span>PKR {formatCurrency(delivery)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Tax</span>
          <span>PKR {formatCurrency(tax)}</span>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between items-baseline-last'>
        <span>Total</span>
        <span className='text-lg font-semibold'>
          PKR {formatCurrency(total)}
        </span>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
