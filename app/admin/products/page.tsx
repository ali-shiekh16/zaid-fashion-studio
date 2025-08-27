import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { getProducts } from '@/lib/data/products/get-products';
import { Plus } from 'lucide-react';
import columns from './products-table/columns';
import DataTable from '@/components/ui/data-table';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  const { data: products, success } = await getProducts();

  return (
    <Container>
      {success && products && (
        <DataTable data={products} columns={columns}>
          <Link href='/admin/products/add' className='cursor-pointer'>
            <Button className='min-w-12 cursor-pointer'>
              Add <Plus />
            </Button>
          </Link>
        </DataTable>
      )}
    </Container>
  );
};

export default Page;
