import React, { Suspense } from 'react';
import SidebarCategories from './sidebar-categories';
import { Loader2 } from 'lucide-react';
import PriceSlider from '@/components/price-slider';

const Sidebar = () => {
  return (
    <div>
      <div className='my-5 mr-5'>
        <PriceSlider />
      </div>
      <Suspense fallback={<Loader2 className='animate-spin' />}>
        <SidebarCategories />
      </Suspense>
    </div>
  );
};

export default Sidebar;
