import ProductCard from '@/components/app/product-card';
import { Container } from '@/components/layout/container';
import { getProducts } from '@/lib/data/products/get-products';
import React from 'react';
import Sidebar from './sidebar';
import { ProductsPagination } from './products-pagination';

const Page = async () => {
  const { success, data: products } = await getProducts();

  if (!success || !products?.length)
    return (
      <Container>
        <h2 className='text-3xl font-medium text-center'>No Product Found.</h2>
      </Container>
    );

  return (
    <Container className='md:grid md:grid-cols-4'>
      <Sidebar />
      <div className=' md:col-span-3'>
        <div className='flex flex-wrap gap-5'>
          {products.map(p => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
        <div className='mt-15'>
          <ProductsPagination />
        </div>
      </div>
    </Container>
  );
};

export default Page;
