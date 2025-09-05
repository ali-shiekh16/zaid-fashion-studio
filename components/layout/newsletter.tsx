import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Container } from './container';
import { Block } from './Block';

const Newsletter = () => {
  return (
    <Block>
      <Container className='md:grid md:grid-cols-2 items-baseline-last md:gap-x-5 space-y-5 md:space-y-0'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-medium'>Subscribe to Our Newsletter</h2>
          <p className='max-w-xl'>
            Subscribe to our newsletter and never miss out on the latest fashion
            trends, exclusive offers, and new arrivals.
          </p>
        </div>
        <div className='flex space-x-2'>
          <Input className='max-w-md' placeholder='email@domain.com' />{' '}
          <Button>Subscribe</Button>
        </div>
      </Container>
    </Block>
  );
};

export default Newsletter;
