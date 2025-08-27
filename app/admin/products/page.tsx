import { Container } from '@/components/layout/container';
import React from 'react';
import ProductsForm from './products-form';
import { addProduct } from './actions/add-product';

const Page = () => {
  return (
    <Container>
      <ProductsForm handleAction={addProduct} successMessage='Product Added!' />
    </Container>
  );
};

export default Page;
