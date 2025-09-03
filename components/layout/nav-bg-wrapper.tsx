'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Navbar from './navbar';

const NavBgWrapper = () => {
  const pathname = usePathname();

  if (pathname === '/') return <Navbar className='bg-[#ddbfb4]' />;

  return <Navbar />;
};

export default NavBgWrapper;
