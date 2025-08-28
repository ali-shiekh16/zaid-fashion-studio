import ProductCard from '@/components/app/product-card';
import { Container } from '@/components/layout/container';
import { getProducts } from '@/lib/data/products/get-products';
import React from 'react';

const Page = async () => {
  const { success, data: products } = await getProducts();

  return (
    <Container className='flex flex-wrap gap-5'>
      {success && products?.length ? (
        products.map(p => (
          <ProductCard
            key={p.id}
            title={p.name}
            price={p.price}
            imageUrl={p.images[0]}
          />
        ))
      ) : (
        <h1 className='text-3xl text-center'>No Products Found</h1>
      )}
    </Container>
  );
};

export default Page;
