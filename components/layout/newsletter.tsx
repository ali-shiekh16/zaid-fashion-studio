import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Container } from './container';
import { Block } from './Block';

const Newsletter = () => {
  return (
    <Block>
      <Container className='flex flex-col justify-center items-center space-y-5 text-center '>
        <div className='space-y-2'>
          <h2 className='text-2xl font-medium'>Your monthly fashion update!</h2>
        </div>
        <div className='flex items-center justify-center space-x-2 w-full'>
          <Input className='max-w-sm' placeholder='email@domain.com' />{' '}
          <Button>Subscribe</Button>
        </div>
      </Container>
    </Block>
  );
};

export default Newsletter;
