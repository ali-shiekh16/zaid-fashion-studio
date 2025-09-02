'use server';

import { createClient } from '@/lib/supabase/server-client';
import { OrderStatus } from '@/lib/types/order';

export async function updateStatus(status: OrderStatus, id: number) {
  if (!id) return { success: false, error: 'Invalid Id', data: undefined };

  const supabase = await createClient();
  const result = await supabase
    .from('orders')
    .update({
      status,
    })
    .eq('id', id);

  return {
    success: !result.error,
    error: result.error?.message,
    data: result.data,
  };
}
