'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CartItem from './cart-item';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCart } from '@/lib/stores/cart-store/use-cart';

const CartItems = () => {
  const items = useCart(c => c.items);

  if (!items.length)
    return (
      <h1 className='text-3xl text-center my-10 text-muted-foreground'>
        Empty cart :(
      </h1>
    );

  return (
    <Accordion type='single' collapsible defaultValue='shopping-cart'>
      <AccordionItem value='shopping-cart'>
        <Card className='max-h-fit'>
          <CardHeader>
            <AccordionTrigger className='m-0 p-0 cursor-pointer'>
              <CardTitle>Shopping Cart</CardTitle>
            </AccordionTrigger>
          </CardHeader>

          <AccordionContent className='m-0 p-0'>
            <CardContent className='space-y-2 divide-muted divide-y'>
              {items?.length && items.map(p => <CartItem key={p.id} {...p} />)}
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default CartItems;
