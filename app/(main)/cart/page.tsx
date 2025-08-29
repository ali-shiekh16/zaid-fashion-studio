import { Container } from '@/components/layout/container';
import React from 'react';
import OrderSummary from './order-summary';
import CartItems from './cart-items';
import AddressForm from './address-form';
const Page = async () => {
  return (
    <Container className='md:space-x-5 md:grid md:grid-cols-5 space-y-5 md:space-y-0'>
      <div className='md:col-span-3 max-h-fit space-y-5'>
        <OrderSummary delivery={499} tax={499} gross={3175} />
        <CartItems />
      </div>

      <div className='md:col-span-2'>
        <AddressForm />
      </div>
    </Container>
  );
};

export default Page;
