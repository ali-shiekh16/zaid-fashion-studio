'use server';

import { createClient } from '@/lib/supabase/server-client';
import { SignupData, signupSchema } from './schema';

export async function signup(body: SignupData) {
  const { success, error } = signupSchema.safeParse(body);

  if (!success) return { success, error: error.message, data: undefined };

  const supabase = await createClient();

  const { data, error: supError } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (error)
    return {
      success: false,
      error: supError?.message || 'Something went wrong',
      data,
    };

  return { success: true, error: undefined, data: undefined };
}
