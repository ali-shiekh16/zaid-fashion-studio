import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Block({ className, children, ...props }: Props) {
  return (
    <div className={cn('py-10', className)} {...props}>
      {children}
    </div>
  );
}
