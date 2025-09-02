'use server';

import { getAuthCookies } from '@/lib/cookies/auth';
import { createClient } from '@/lib/supabase/server-client';
import { Order } from '@/lib/types/order';

export async function getUserOrders() {
  const supabase = await createClient();

  const { access_token } = await getAuthCookies();

  if (!access_token)
    return { success: false, error: 'Unauthorized', data: undefined };

  const { data: profile } = await supabase.auth.getUser(access_token);

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
    .eq('user_id', profile.user?.id);

  return {
    success: !error,
    error: error?.message,
    data: data as Order[],
  };
}
