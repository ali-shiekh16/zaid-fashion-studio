import React from 'react';

import LogoutButton from '@/components/app/logout-button';

const Page = () => {
  return (
    <div className='h-screen grid place-content-center'>
      <LogoutButton>Logout</LogoutButton>
    </div>
  );
};

export default Page;
