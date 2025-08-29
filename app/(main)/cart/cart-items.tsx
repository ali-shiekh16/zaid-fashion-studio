import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProducts } from '@/lib/data/products/get-products';
import React from 'react';
import CartItem from './cart-item';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CartItems = async () => {
  const { data } = await getProducts();

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
              {data?.length && data.map(p => <CartItem {...p} />)}
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default CartItems;
