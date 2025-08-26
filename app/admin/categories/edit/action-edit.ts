'use server';

import { createClient } from '@/lib/supabase/server-client';
import schema, { Category } from '../categories-form/schema';

export async function editCategory(body: Category, id?: number) {
  if (!id)
    return { success: false, error: 'Invalid Category', data: undefined };

  const { success, error: err } = schema.safeParse(body);
  if (!success) return { success, error: err.message, data: undefined };

  const supabase = await createClient();
  const result = await supabase.from('categories').update(body).eq('id', id);

  return {
    success: !result.error,
    error: result.error?.message,
    data: result.data,
  };
}
