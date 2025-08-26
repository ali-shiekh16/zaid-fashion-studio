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
import { deleteCategory } from '../action-delete';
import { toast } from 'sonner';
import { useState } from 'react';
import Link from 'next/link';

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.getValue('id') as number;
      const [loading, setLoading] = useState(false);

      const handleDelete = async () => {
        setLoading(true);
        const { success, error } = await deleteCategory(id);

        if (success) toast.success('Category Deleted!');
        else toast.error(error || 'Category could not be deleted!');

        setLoading(false);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <MoreHorizontal className='h-4 w-4' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/categories/edit/${id}`}> Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
