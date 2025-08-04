'use server';

import { clearAuthCookies } from '../cookies/auth';

export async function logout() {
  await clearAuthCookies();
}
