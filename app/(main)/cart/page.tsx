import { Container } from '@/components/layout/container';
import React from 'react';
import OrderSummary from './order-summary';
import CartItems from './cart-items';

const Page = async () => {
  return (
    <Container className='space-y-5 md:space-y-0 md:space-x-5 md:grid md:grid-cols-4'>
      <div className='md:col-span-3 max-h-fit'>
        <CartItems />
      </div>
      <OrderSummary delivery={500} tax={500} gross={1879} />
    </Container>
  );
};

export default Page;
