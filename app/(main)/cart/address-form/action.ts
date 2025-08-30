'use server';

import { createClient } from '@/lib/supabase/server-client';
import { addressFormSchema, AddressFormValues } from './schema';
import { getAuthCookies } from '@/lib/cookies/auth';
import { CartItem } from '@/lib/stores/cart-store/types';
import { Order, OrderStatus } from '@/lib/types/order';

interface Body {
  ordersAddress: AddressFormValues;
  orderItems: CartItem[];
}

export async function placeOrder(body: Body) {
  const { success, error: err } = addressFormSchema.safeParse(
    body.ordersAddress
  );

  if (!success) return { success, error: err.message, data: undefined };

  const supabase = await createClient();

  let userId = null;
  const { access_token } = await getAuthCookies();
  if (access_token) {
    const auth = await supabase.auth.getUser(access_token);
    userId = auth.data.user?.id;
  }

  const ordersRes = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: OrderStatus.pending,
      total_amount: body.orderItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      ),
    })
    .select();

  if (ordersRes.error || !ordersRes.data)
    return {
      success: !ordersRes.error,
      error: ordersRes?.error?.message || 'Something went wrong!',
      data: undefined,
    };

  const orders = ordersRes?.data as Order[];

  const itemsRes = await supabase.from('order_items').insert(
    body.orderItems.map(i => ({
      order_id: orders[0].id,
      product_id: i.id,
      quantity: i.quantity,
      price: i.price,
    }))
  );

  if (itemsRes.error)
    return {
      success: !ordersRes.error,
      error: itemsRes?.error?.message || 'Something went wrong!',
      data: undefined,
    };

  const {
    isBillingAddress: _,
    postalCode: postal_code,
    ...address
  } = body.ordersAddress;
  const addressRes = await supabase.from('addresses').insert({
    ...address,
    postal_code,
    order_id: orders[0].id,
  });

  if (addressRes.error)
    return {
      success: !addressRes.error,
      error: addressRes?.error?.message || 'Something went wrong!',
      data: undefined,
    };

  return {
    success: true,
    error: undefined,
    data: { trackingId: ordersRes.data[0].tracking_id },
  };
}
