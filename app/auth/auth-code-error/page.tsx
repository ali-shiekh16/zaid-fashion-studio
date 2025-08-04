import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className='h-screen w-full grid place-content-center'>
      <h1 className='text-5xl font-bold'>
        We were unable to verify your account :(
      </h1>
      <Link
        href='/'
        className='text-center text-2xl font-semibold underline mt-5'
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Page;
