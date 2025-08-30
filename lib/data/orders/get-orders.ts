'use server';

import { createClient } from '@/lib/supabase/server-client';
import { Order } from '@/lib/types/order';

export async function getOrders() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('orders').select(
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
  );

  return {
    success: !error,
    error: error?.message,
    data: data as Order[],
  };
}
