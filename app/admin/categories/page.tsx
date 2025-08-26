import React from 'react';
import { Container } from '@/components/layout/container';
import { getCategories } from '@/lib/data/categories/get-categories';
import columns from './categories-table/columns';
import DataTable from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Page = async () => {
  const { success, data } = await getCategories();

  return (
    <Container>
      {success && (
        <DataTable data={data} columns={columns}>
          <Link href='/admin/categories/add' className='cursor-pointer'>
            <Button className='min-w-12'>
              Add <Plus />
            </Button>
          </Link>
        </DataTable>
      )}
    </Container>
  );
};

export default Page;
