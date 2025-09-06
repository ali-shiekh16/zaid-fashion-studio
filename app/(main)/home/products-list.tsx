import ProductCard from '@/components/app/product-card';
import { getProducts } from '@/lib/data/products/get-products';
import React from 'react';

const ProductsList = async () => {
  const { success, data: products } = await getProducts();

  if (!success || !products?.length) return null;

  return (
    <div className='flex flex-wrap gap-5'>
      {products.slice(0, 4).map(p => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
};

export default ProductsList;
