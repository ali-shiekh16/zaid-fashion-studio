'use server';

import { createClient } from '@/lib/supabase/server-client';
import schema, { ProductInput } from '../products-form/schema';
import { Product } from '@/lib/types/product';

export async function addProduct(body: ProductInput) {
  const { success, error: err } = schema.safeParse(body);
  if (!success) return { success, error: err.message, data: undefined };

  const supabase = await createClient();

  const { images, ...productsData } = body;

  const { data, error } = await supabase
    .from('products')
    .insert(productsData)
    .select();
  if (error || !data)
    return {
      success: !error,
      error: error?.message || 'Something went wrong!',
      data: undefined,
    };

  const product = data[0] as Product;

  const imgResult = await supabase
    .from('product_images')
    .insert(
      images.map(img => ({
        product_id: product.id,
        image_url: img,
        is_primary: false,
      }))
    )
    .select();

  return {
    success: !imgResult.error,
    error: imgResult.error?.message,
    data: undefined,
  };
}
