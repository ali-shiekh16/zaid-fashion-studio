'use client';

import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase/client';
import { Category } from './types';
import { CATEGORY_KEY } from '../fetch-keys';

async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabaseClient.from('categories').select('*');
  if (error) throw new Error(error.message);
  return data ?? [];
}

export function useCategories() {
  return useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: fetchCategories,
  });
}
