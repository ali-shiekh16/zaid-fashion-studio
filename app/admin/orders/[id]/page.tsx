import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Container } from '@/components/layout/container';
import { getOrder } from '@/lib/data/orders/get-order';
import AddressCard from '@/app/(main)/orders/address-card';
import OrderItem from '@/app/(main)/orders/order-item';
import OrderSummary from '@/app/(main)/orders/order-summary';
import React from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const { data: order, success } = await getOrder(id);

  if (!success || !order)
    return (
      <Container>
        <h2 className='text-center text-2xl font-medium'>Order Not Found</h2>
      </Container>
    );

  const subtotal = order.order_items.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <Container>
      <div className='mb-5 space-y-2'>
        <h2 className='text-2xl md:text-3xl font-medium'>Order ID: {id}</h2>
        <div className='flex space-x-5'>
          <p>
            Order date:{' '}
            <span className='font-medium'>
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </p>
          <Badge className='uppercase'>{order.status}</Badge>
        </div>
      </div>

      <div className='space-y-5'>
        <Card className='max-h-fit md:col-span-3'>
          <CardHeader>
            <CardTitle>Ordered Items</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2 divide-muted divide-y'>
            {order.order_items.length &&
              order.order_items.map(({ id, products: p, price, quantity }) => (
                <OrderItem
                  key={id}
                  title={p.name}
                  description={p.description}
                  price={price}
                  quantity={quantity}
                  imageUrl={p.product_images[0].image_url}
                />
              ))}
          </CardContent>
        </Card>

        <div className='space-y-5 md:grid md:grid-cols-2 md:gap-x-5'>
          <OrderSummary
            discount={25}
            delivery={499}
            tax={499}
            subtotal={subtotal}
            total={order.total_amount}
          />
          <AddressCard {...order.addresses[0]} showEmail showPhone />
        </div>
      </div>
    </Container>
  );
};

export default Page;
