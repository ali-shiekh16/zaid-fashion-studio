'use server';

import { createClient } from '@/lib/supabase/server-client';
import { ProductRes } from './type';

export async function getProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('products').select(`
			id,		
			name,
			description,
			price,
			stock,
			category:categories(
				id, 
				name
			),
			images:product_images(
				image_url
			)
		`);

  if (error) return { success: false, error: error.message, data: undefined };

  const products = data as unknown as ProductRes[];
  const transformed = products.map(p => ({
    ...p,
    images: p.images.map(i => i.image_url),
  }));

  return {
    success: true,
    error: undefined,
    data: transformed,
  };
}
