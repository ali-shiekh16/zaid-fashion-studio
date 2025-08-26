import { Container } from '@/components/layout/container';
import React from 'react';
import CategoriesForm from '../categories-form';
import { addCategory } from './action-add';

const Page = async () => {
  return (
    <Container className='md:max-w-3xl'>
      <CategoriesForm
        handleAction={addCategory}
        successMessage='Category Added!'
      />
    </Container>
  );
};

export default Page;
