import React from 'react';

import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '../ui/button';
import { Loader2 } from 'lucide-react';

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
  };

const LoadingButton = ({ loading = false, children, ...props }: Props) => {
  return (
    <Button {...props} className='cursor-pointer'>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  );
};

export default LoadingButton;
