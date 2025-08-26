'use server';

import { createClient } from '@/lib/supabase/server-client';
import schema, { Category } from './schema';

export async function addCategory(body: Category) {
  const { success, error: err } = schema.safeParse(body);
  if (!success) return { success, error: err.message, data: undefined };

  const supabase = await createClient();
  const result = await supabase.from('categories').insert(body);

  return {
    success: !result.error,
    error: result.error?.message,
    data: result.data,
  };
}
