import React from 'react';
import Image from 'next/image';
import { Minus, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Cover = () => {
  return (
    <div className='h-screen relative bg-[#ddbfb4]'>
      <div className='w-full h-full absolute inset-0 z-10 hidden md:block'>
        <Image
          width='1920'
          height='2280'
          src='/images/cover.png'
          alt='Girl standing wearing red traditional dress.'
          className='w-full h-full object-contain '
        />
      </div>

      <div className='w-full absolute inset-y-[45%] hidden md:block'>
        <h2 className='uppercase text-[20vw] font-bold text-center text-[#dbcec9]'>
          ELEGANCE
        </h2>
      </div>
      <div className='py-20 px-5 md:p-0 md:grid md:grid-cols-3 w-full h-full '>
        <h2 className='text-4xl md:text-6xl font-medium md:translate-y-1/5 md:ml-10'>
          Timeless Elegance, <br />
          Woven in Tradition
        </h2>
        <div className='my-5 md:my-0'></div>
        <div className='md:translate-y-1/5 md:mr-10 space-y-5'>
          <h2 className='text-lg md:text-3xl font-medium '>
            Timeless essentials for modern minimalist. Designed to simplifiy
            your wardobe - and elevate your everyday.
          </h2>
          <Button size={'lg'}>
            <Link href='/products' className='flex items-center'>
              Explore the Collections{' '}
              <MoveRight className='ml-2 mt-0.5 size-5' />
            </Link>
          </Button>
          <Image
            width='500'
            height='500'
            src='/images/cover.png'
            alt='Girl standing wearing red traditional dress.'
            className='w-full h-full object-cover md:hidden '
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
