'use client';
import React, { useState } from 'react';

import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth/logout';

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: React.ReactNode;
  };

const LogoutButton = ({ children, onClick, ...props }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    router.replace('/login');
  };

  return (
    <Button
      {...props}
      className='cursor-pointer'
      onClick={e => {
        if (onClick) onClick(e);
        handleLogout();
      }}
    >
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  );
};

export default LogoutButton;
