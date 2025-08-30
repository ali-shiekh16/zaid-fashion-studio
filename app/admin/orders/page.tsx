import { Container } from '@/components/layout/container';
import { getOrders } from '@/lib/data/orders/get-orders';
import columns from './orders-table/columns';
import DataTable from '@/components/ui/data-table';
import React from 'react';

const Page = async () => {
  const { success, data } = await getOrders();

  return (
    <Container>
      {success && <DataTable data={data} columns={columns} />}
    </Container>
  );
};

export default Page;
