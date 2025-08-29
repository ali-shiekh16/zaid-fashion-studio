'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { formatCurrency } from '@/lib/app-utils';
import React from 'react';
import { useCart } from '@/lib/stores/cart-store/use-cart';

const OrderSummary = () => {
  const items = useCart(c => c.items);
  const tax = items.length ? 499 : 0;
  const delivery = items.length ? 499 : 0;
  const gross = items.reduce((a, b) => a + b.price * b.quantity, 0);
  const discount = items.reduce((a, b) => a + b.price * b.quantity * 0.25, 0);
  const total = gross + tax + delivery;

  // if (!items.length) return <></>;

  return (
    <Accordion type='single' collapsible defaultValue='order-summary'>
      <AccordionItem value='order-summary'>
        <Card className='max-h-fit'>
          <CardHeader>
            <AccordionTrigger className='m-0 p-0 cursor-pointer'>
              <CardTitle>Order Summary</CardTitle>
            </AccordionTrigger>
          </CardHeader>

          <AccordionContent className='m-0 p-0'>
            <CardContent className='space-y-2'>
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
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderSummary;
