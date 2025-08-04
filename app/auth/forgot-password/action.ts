'use server';

import { createClient } from '@/lib/supabase/server-client';
import z from 'zod';

const schema = z.object({ email: z.email() });
type Data = z.infer<typeof schema>;

export async function sendResetPassEmail(body: Data) {
  const { success, error } = schema.safeParse(body);

  if (!success) return { success, error: error.message, data: undefined };

  const supabase = await createClient();

  const { data, error: err } = await supabase.auth.resetPasswordForEmail(
    body.email
  );

  if (err) return { success: false, error: err.message, data: undefined };

  return { success: true, error: undefined, data };
}
