'use server';

import { createClient } from '@/lib/supabase/server-client';
import { schema } from './schema';

export async function resetPassword(body: { password: string }) {
  const { success, error } = schema.safeParse(body);
  if (!success) return { success, error: error.message, data: undefined };

  const supabase = await createClient();

  const { error: err } = await supabase.auth.updateUser({
    password: body.password,
  });

  if (err)
    return { success: false, data: undefined, error: 'Something went wrong' };

  return { success: true, data: undefined, error: undefined };
}
