import { Container } from '@/components/layout/container';
import columns from './orders-table/columns';
import DataTable from '@/components/ui/data-table';
import React from 'react';
import { getUserOrders } from '@/lib/data/orders/get-user-orders';

const Page = async () => {
  const { success, data } = await getUserOrders();

  if (!success || !data)
    return (
      <Container>
        <p className='text-center'>No orders found.</p>
      </Container>
    );

  return (
    <Container>
      <DataTable data={data} columns={columns} />
    </Container>
  );
};

export default Page;
