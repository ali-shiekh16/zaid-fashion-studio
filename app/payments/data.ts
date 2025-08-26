import { Payment } from './columns';

export async function getData(): Promise<Payment[]> {
  // Mock data for table
  return [
    {
      id: 'pmt_1001',
      amount: 120,
      status: 'pending',
      email: 'alice@example.com',
    },
    {
      id: 'pmt_1002',
      amount: 250,
      status: 'success',
      email: 'bob@example.com',
    },
    {
      id: 'pmt_1003',
      amount: 75,
      status: 'failed',
      email: 'charlie@example.com',
    },
    {
      id: 'pmt_1004',
      amount: 180,
      status: 'processing',
      email: 'diana@example.com',
    },
    {
      id: 'pmt_1005',
      amount: 300,
      status: 'success',
      email: 'edward@example.com',
    },
    {
      id: 'pmt_1006',
      amount: 95,
      status: 'pending',
      email: 'fiona@example.com',
    },
    {
      id: 'pmt_1007',
      amount: 220,
      status: 'processing',
      email: 'george@example.com',
    },
    {
      id: 'pmt_1008',
      amount: 150,
      status: 'success',
      email: 'hannah@example.com',
    },
    {
      id: 'pmt_1009',
      amount: 410,
      status: 'failed',
      email: 'ivan@example.com',
    },
    {
      id: 'pmt_1010',
      amount: 135,
      status: 'success',
      email: 'julia@example.com',
    },
  ];
}
