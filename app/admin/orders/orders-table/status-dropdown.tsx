'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderStatus } from '@/lib/types/order';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { updateStatus } from '../actions/update-status';
import { toast } from 'sonner';

interface Props {
  defaultStatus?: OrderStatus;
  id: number;
}

export function StatusDropdown({ defaultStatus, id }: Props) {
  const [status, setStatus] = React.useState<OrderStatus | undefined>(
    defaultStatus
  );

  const handleChange = async (v: OrderStatus) => {
    setStatus(v);

    const { error, success } = await updateStatus(v, id);
    if (!success) {
      setStatus(defaultStatus);
      toast.error(error || 'Status was not updated. try again', {
        richColors: true,
      });
    } else {
      toast.success('order updated!');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {status ? (
            <Badge className='uppercase'>{status}</Badge>
          ) : (
            <span className='flex items-center '>
              Select Status <ChevronDown className='ml-1' />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(OrderStatus).map(v => (
          <DropdownMenuCheckboxItem
            key={v}
            checked={status === v} // highlight the active one
            onCheckedChange={() => handleChange(v)} // update state
          >
            <Badge className='uppercase'>{v}</Badge>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
