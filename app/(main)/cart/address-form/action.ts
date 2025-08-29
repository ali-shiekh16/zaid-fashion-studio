'use server';

import { createClient } from '@/lib/supabase/server-client';
import { addressFormSchema, AddressFormValues } from './schema';
import { getAuthCookies } from '@/lib/cookies/auth';

export async function addAddress(body: AddressFormValues) {
  const { success, error: err } = addressFormSchema.safeParse(body);
  if (!success) return { success, error: err.message, data: undefined };

  const supabase = await createClient();

  const { access_token } = await getAuthCookies();
  if (!access_token) return { success, error: 'Unauthorized', data: undefined };

  const { error } = await supabase.auth.getClaims(access_token);
  if (!error) return { success, error: 'Unauthorized', data: undefined };

  // const result = await supabase.from('categories').insert(body);

  // return {
  //   success: !result.error,
  //   error: result.error?.message,
  //   data: result.data,
  // };

  return {
    success: true,
    error: undefined,
    data: undefined,
  };
}
