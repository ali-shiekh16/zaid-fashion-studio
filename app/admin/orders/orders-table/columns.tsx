'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { Category } from '@/lib/data/categories/types';
import { toast } from 'sonner';
import { useState } from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/lib/types/order';
import { formatCurrency } from '@/lib/app-utils';
import { Badge } from '@/components/ui/badge';
import { StatusDropdown } from './status-dropdown';

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
  },

  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order date' />
    ),

    cell: ({ cell }) => {
      const timestamp = cell.getValue() as string;
      return <span>{new Date(timestamp).toLocaleDateString()}</span>;
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ cell, row }) => (
      <StatusDropdown
        defaultStatus={cell.getValue<OrderStatus>()}
        id={+row.original.id}
      />
    ),
  },

  {
    accessorKey: 'tracking_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tracking ID' />
    ),
  },
  {
    id: 'actions',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => {
      const id = row.getValue('tracking_id') as number;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/orders/${id}`}>view</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'total_amount',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-right block'
        column={column}
        title='Total Amount'
      />
    ),

    cell: ({ cell }) => {
      const amount = cell.getValue() as number;
      return (
        <strong className='font-medium text-right  block'>
          PKR {formatCurrency(amount)}
        </strong>
      );
    },
  },
];

export default columns;
