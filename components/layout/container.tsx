import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'my-6 px-4',
        'sm:px-6 md:px-8 lg:px-12 xl:px-20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
