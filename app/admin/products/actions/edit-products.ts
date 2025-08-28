'use server';

import { createClient } from '@/lib/supabase/server-client';
import schema, { ProductInput } from '../products-form/schema';

export async function editProduct(body: ProductInput, id?: number) {
  if (!id)
    return { success: false, error: 'Invalid Category', data: undefined };

  const { success, error: err } = schema.safeParse(body);
  if (!success) return { success, error: err.message, data: undefined };

  const { images, ...data } = body;
  const supabase = await createClient();
  const { error: err1 } = await supabase
    .from('products')
    .update(data)
    .eq('id', id);

  const { error: err2 } = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', id);

  const { error: err3 } = await supabase
    .from('product_images')
    .insert(
      images.map(img => ({
        product_id: id,
        image_url: img,
        is_primary: false,
      }))
    )
    .select();

  return {
    success: !err1 && !err2 && !err3,
    error: err1?.message || err2?.message || err3?.message,
    data: undefined,
  };
}
