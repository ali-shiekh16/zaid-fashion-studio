import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server-client';
import { Address } from '@/lib/types/address';
import { Order } from '@/lib/types/order';
import { OrderItem as Item } from '@/lib/types/order-items';
import React from 'react';
import OrderItem from '../order-item';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout/container';
import OrderSummary from '../order-summary';
import AddressCard from '../address-card';

interface Props {
  params: Promise<{ id: number }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*, addresses(*)')
    .eq('tracking_id', id);

  if (error || !data) return <h2 className='text-3xl'>Not Found</h2>;

  const order = data[0] as Order & { addresses: Address[] };

  const { data: items, error: itemsErr } = await supabase
    .from('order_items')
    .select(
      `
				id,
				order_id,
				quantity,
				price,
				products (
					id,
					name,
					description,
					product_images (
						id,
						image_url
					)
				)
			`
    )
    .eq('order_id', order.id);

  if (itemsErr || !items)
    return <h2 className='text-3xl'>{itemsErr.message}</h2>;

  const orderItems = items as unknown as Item[];

  const subtotal = orderItems.reduce((a, b) => a + b.price * b.quantity, 0);

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

      <div className='md:grid md:grid-cols-4 space-y-5 md:gap-x-5'>
        <Card className='max-h-fit md:col-span-3'>
          <CardHeader>
            <CardTitle>Ordered Items</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2 divide-muted divide-y'>
            {orderItems?.length &&
              orderItems.map(({ id, products: p, price, quantity }) => (
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
  );
};

export default Page;
