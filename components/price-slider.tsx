'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function PriceSlider() {
  const min_price = 0;
  const max_price = 100_000;
  const [value, setValue] = useState([min_price, max_price]);

  const formatPrice = (price: number) => {
    return price === max_price
      ? `PKR ${price.toLocaleString()}+`
      : `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className='*:not-first:mt-3'>
      <Label className=''>
        From {formatPrice(value[0])} to {formatPrice(value[1])}
      </Label>
      <div className='flex items-center gap-4'>
        <Slider
          value={value}
          onValueChange={setValue}
          min={min_price}
          max={max_price}
          aria-label='Price range slider'
        />
        <Button variant='outline'>Go</Button>
      </div>
    </div>
  );
}
