'use server';

import { createClient } from '@/lib/supabase/server-client';

export async function deleteCategory(id: number) {
  const supabase = await createClient();
  const result = await supabase.from('categories').delete().eq('id', id);

  return {
    success: !result.error,
    error: result.error?.message,
    data: result.data,
  };
}
