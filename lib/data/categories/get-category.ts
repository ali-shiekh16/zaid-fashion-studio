'use server';

import { createClient } from '@/lib/supabase/server-client';
import { Category } from './types';

export async function getCategory(id: number) {
  const supabase = await createClient();

  const result = await supabase.from('categories').select().eq('id', id);
  const data = result.data as Category[];

  return {
    success: !result.error,
    error: result.error?.message,
    data: data[0],
  };
}
