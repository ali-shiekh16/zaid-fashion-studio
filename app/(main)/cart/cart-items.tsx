import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProducts } from '@/lib/data/products/get-products';
import React from 'react';
import CartItem from './cart-item';

const CartItems = async () => {
  const { data } = await getProducts();

  return (
    <Card className='max-h-fit'>
      <CardHeader>
        <CardTitle>
          <CardTitle>Shopping Cart</CardTitle>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 divide-muted divide-y'>
        {data?.length && data.map(p => <CartItem {...p} />)}
      </CardContent>
    </Card>
  );
};

export default CartItems;
