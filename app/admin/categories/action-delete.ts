'use server';

import { createClient } from '@/lib/supabase/server-client';
import { revalidatePath } from 'next/cache';

export async function deleteCategory(id: number) {
  const supabase = await createClient();
  const result = await supabase.from('categories').delete().eq('id', id);

  if (!result.error) {
    revalidatePath('/admin/categories');
  }

  return {
    success: !result.error,
    error: result.error?.message,
    data: result.data,
  };
}
