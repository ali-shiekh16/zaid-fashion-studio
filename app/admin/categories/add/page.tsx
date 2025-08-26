import { Container } from '@/components/layout/container';
import React from 'react';
import CategoriesForm from '../categories-form';

const Page = async () => {
  return (
    <Container className='md:max-w-3xl'>
      <CategoriesForm />
    </Container>
  );
};

export default Page;
