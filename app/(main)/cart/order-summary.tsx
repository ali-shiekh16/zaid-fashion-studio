import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { formatCurrency } from '@/lib/app-utils';
import React from 'react';

interface Props {
  delivery: number;
  tax: number;
  gross: number;
}

const OrderSummary = ({ delivery, tax, gross }: Props) => {
  const total = gross + tax + delivery;
  return (
    <Accordion type='single' collapsible defaultValue='order-summary'>
      <AccordionItem value='order-summary'>
        <Card className='max-h-fit'>
          <CardHeader>
            <AccordionTrigger className='m-0 p-0 cursor-pointer'>
              <CardTitle>Order Summary</CardTitle>
            </AccordionTrigger>
          </CardHeader>

          <AccordionContent className='m-0 p-0'>
            <CardContent className='space-y-2'>
              <div className='flex justify-between '>
                <span>Discount</span>
                <span>PKR {formatCurrency(0)}</span>
              </div>

              <div className='flex justify-between'>
                <span>Delivery</span>
                <span>PKR {formatCurrency(delivery)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax</span>
                <span>PKR {formatCurrency(tax)}</span>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between items-baseline-last'>
              <span>Total</span>
              <span className='text-lg font-semibold'>
                PKR {formatCurrency(total)}
              </span>
            </CardFooter>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderSummary;
