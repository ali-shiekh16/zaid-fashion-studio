import React from 'react';
import CategoriesForm from './categories-form';
import { Container } from '@/components/layout/container';
import { getCategories } from '@/lib/data/categories/get-categories';
import columns from './categories-table/columns';
import DataTable from '@/components/ui/data-table';

const Page = async () => {
  const { success, data } = await getCategories();

  return (
    <Container>
      {success && <DataTable data={data} columns={columns} />}
      {/* <CategoriesForm /> */}
    </Container>
  );
};

export default Page;
