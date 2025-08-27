'use server';

import { createClient } from '@/lib/supabase/server-client';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(id: number) {
  const supabase = await createClient();
  const result1 = await supabase.from('products').delete().eq('id', id);
  const result2 = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', id);

  if (!result1.error && !result2.error) {
    revalidatePath('/admin/categories');
  }

  return {
    success: !result1.error && !result1.error,
    error: result1.error?.message || result2.error?.message,
    data: undefined,
  };
}
