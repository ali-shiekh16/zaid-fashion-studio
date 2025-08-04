// lib/auth/cookies.ts
import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = 'zfs-access-token';
const REFRESH_TOKEN_KEY = 'zfs-refresh-token';

export async function setAuthCookies(
  access_token: string,
  refresh_token: string
) {
  const { set } = await cookies();

  set(ACCESS_TOKEN_KEY, access_token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  });

  set(REFRESH_TOKEN_KEY, refresh_token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
  });
}

export async function getAuthCookies() {
  const { get } = await cookies();

  return {
    access_token: get(ACCESS_TOKEN_KEY)?.value ?? null,
    refresh_token: get(REFRESH_TOKEN_KEY)?.value ?? null,
  };
}

export async function clearAuthCookies() {
  const { set } = await cookies();

  set(ACCESS_TOKEN_KEY, '', {
    path: '/',
    maxAge: -1,
  });

  set(REFRESH_TOKEN_KEY, '', {
    path: '/',
    maxAge: -1,
  });
}
