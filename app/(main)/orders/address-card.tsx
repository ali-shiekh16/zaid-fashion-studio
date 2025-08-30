import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Address } from '@/lib/types/address';
import React from 'react';

const AddressCard = ({
  city,
  country,
  postalCode,
  state,
  address1,
}: Address) => {
  return (
    <Card className='max-h-fit'>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <p>{address1}</p>
      </CardHeader>

      <CardContent className='space-y-2'>
        <div className='flex justify-between '>
          <span>Country</span>
          <span>{country}</span>
        </div>
        <div className='flex justify-between '>
          <span>City</span>
          <span>{city}</span>
        </div>
        <div className='flex justify-between '>
          <span>State</span>
          <span>{state}</span>
        </div>
        {postalCode && (
          <div className='flex justify-between '>
            <span>Postal Code</span>
            <span>{postalCode}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
