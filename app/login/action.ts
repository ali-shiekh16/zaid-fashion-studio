'use server';

import { createClient } from '@/lib/supabase/server-client';
import { LoginData, loginSchema } from './schema';
import { setAuthCookies } from '@/lib/cookies/auth';
import { redirect } from 'next/navigation';

export async function login(body: LoginData) {
  const { success, error: err } = loginSchema.safeParse(body);
  if (!success) return { success, error: err.message, data: undefined };

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(body);
  if (error) return { success: false, error: error.message, data: undefined };

  await setAuthCookies(data.session.access_token, data.session.refresh_token);

  redirect('/');
  return { success: true, error: undefined, data: undefined };
}
