import { Container } from '@/components/layout/container';
import React from 'react';
import CategoriesForm from '../../categories-form';
import { editCategory } from '../action-edit';
import { getCategory } from '@/lib/data/categories/get-category';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const { data, success } = await getCategory(+id);
  const { name, description } = data;

  return (
    <Container className='md:max-w-3xl'>
      {success ? (
        <CategoriesForm
          id={+id}
          redirectPath='/admin/categories'
          handleAction={editCategory}
          successMessage='Category Updated!'
          defaultValues={{
            name: name || '',
            description: description || '',
          }}
        />
      ) : (
        <p className='text-danger'>Something went wrong!</p>
      )}
    </Container>
  );
};

export default Page;
