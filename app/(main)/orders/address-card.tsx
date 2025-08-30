import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Address } from '@/lib/types/address';
import Link from 'next/link';
import React from 'react';

interface Props extends Address {
  showEmail?: boolean;
  showPhone?: boolean;
}

const AddressCard = ({
  city,
  country,
  postalCode,
  state,
  address1,
  email,
  phone,
  showEmail = false,
  showPhone = false,
}: Props) => {
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

        {email && (
          <div className='flex justify-between '>
            <span>Email</span>
            <Link className='underline' href={`mailto:${email}`}>
              {email}
            </Link>
          </div>
        )}
        {phone && (
          <div className='flex justify-between '>
            <span>Phone</span>
            <Link className='underline' href={`tel:${phone}`}>
              {phone}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
