'use server';

import { clearAuthCookies } from '../cookies/auth';
import { createClient } from '../supabase/server-client';

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) return { error: error.message, success: false };

  await clearAuthCookies();

  return { error: undefined, success: true };
}
