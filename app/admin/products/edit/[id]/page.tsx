import { Container } from '@/components/layout/container';
import React from 'react';
import { getCategory } from '@/lib/data/categories/get-category';
import { editProduct } from '../../actions/edit-products';
import ProductsForm from '../../products-form';
import { getProduct } from '@/lib/data/products/get-product';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const { data, success } = await getProduct(+id);

  if (!success || !data)
    <Container className='md:max-w-3xl'>
      <p className='text-center text-4xl font-semibold my-10'>Not Found.</p>
    </Container>;

  return (
    <Container>
      {success && data ? (
        <ProductsForm
          id={+id}
          handleAction={editProduct}
          redirectPath='/admin/products'
          successMessage='Products Updated!'
          defaultValues={{
            name: data.name,
            description: data.description,
            price: String(data.price),
            category_id: String(data.category.id),
            stock: String(data.stock),
            images: data.images,
          }}
        />
      ) : (
        <p className='text-danger'>Something went wrong!</p>
      )}
    </Container>
  );
};

export default Page;
