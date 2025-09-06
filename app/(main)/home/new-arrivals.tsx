import { Block } from '@/components/layout/Block';
import { Container } from '@/components/layout/container';
import React, { Suspense } from 'react';
import ProductsList from './products-list';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const NewArrivals = () => {
  return (
    <Block>
      <Container>
        <h2 className='text-center text-2xl md:text-3xl font-semibold mb-14'>
          Shop Now
        </h2>
        <Suspense
          fallback={
            <div className='md:grid md:grid-cols-4 md:gap-x-4 space-y-4 md:space-y-0'>
              <Skeleton className='w-full h-96' />
              <Skeleton className='w-full h-96' />
              <Skeleton className='w-full h-96' />
              <Skeleton className='w-full h-96' />
            </div>
          }
        >
          <ProductsList />
        </Suspense>
      </Container>
    </Block>
  );
};

export default NewArrivals;
