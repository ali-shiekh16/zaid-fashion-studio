import React, { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Order } from '@/lib/types/order';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AddressCard from '../../orders/address-card';
import OrderItem from '../../orders/order-item';
import OrderSummary from '../../orders/order-summary';

interface Props {
  children: ReactNode;
  order: Order;
}

const OrderSheet = ({ children, order }: Props) => {
  const subtotal = order.order_items.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Order ID: {order.tracking_id}</SheetTitle>
          <SheetDescription className='flex space-x-5'>
            <p>
              Order date:
              <span className='font-medium'>
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </p>
            <Badge className='uppercase'>{order.status}</Badge>
          </SheetDescription>
        </SheetHeader>

        <Container>
          <div className='md:grid md:grid-cols-4 space-y-5 md:gap-x-5'>
            <Card className='max-h-fit md:col-span-3'>
              <CardHeader>
                <CardTitle>Ordered Items</CardTitle>
              </CardHeader>

              <CardContent className='space-y-2 divide-muted divide-y'>
                {order.order_items.length &&
                  order.order_items.map(
                    ({ id, products: p, price, quantity }) => (
                      <OrderItem
                        key={id}
                        title={p.name}
                        description={p.description}
                        price={price}
                        quantity={quantity}
                        imageUrl={p.product_images[0].image_url}
                      />
                    )
                  )}
              </CardContent>
            </Card>

            <div className='space-y-5'>
              <OrderSummary
                discount={25}
                delivery={499}
                tax={499}
                subtotal={subtotal}
                total={order.total_amount}
              />
              <AddressCard {...order.addresses[0]} />
            </div>
          </div>
        </Container>
      </SheetContent>
    </Sheet>
  );
};

export default OrderSheet;
