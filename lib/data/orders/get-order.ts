'use server';

import { createClient } from '@/lib/supabase/server-client';
import { Order } from '@/lib/types/order';

export async function getOrder(trackingId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('orders')
    .select(
      `*, 
        addresses(*), 
          order_items (
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
    )))`
    )
    .eq('tracking_id', trackingId);

  if (error || !data)
    return {
      success: false,
      error: error?.message,
      data: undefined,
    };

  return {
    success: true,
    error: undefined,
    data: data[0] as Order,
  };
}
