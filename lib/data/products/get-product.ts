'use server';

import { createClient } from '@/lib/supabase/server-client';

interface Res {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  stock: number;
  images: { image_url: string }[];
}

export async function getProduct(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select(
      `
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
		`
    )
    .eq('id', id);

  if (error) return { success: false, error: error.message, data: undefined };

  const product = data[0] as unknown as Res;
  if (!product) return { success: false, error: 'Not Found', data: undefined };

  const transformed = {
    ...product,
    images: product.images.map(i => i.image_url),
  };

  return {
    success: true,
    error: undefined,
    data: transformed,
  };
}
