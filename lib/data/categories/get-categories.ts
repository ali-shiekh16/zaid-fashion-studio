'use server';

import { createClient } from '@/lib/supabase/server-client';
import { Category } from './types';

export async function getCategories() {
  const supabase = await createClient();
  const result = await supabase.from('categories').select();

  return {
    success: !result.error,
    error: result.error?.message,
    data: result.data as Category[],
  };
}
