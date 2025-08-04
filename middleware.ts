import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookies } from './lib/cookies/auth';

const publicRoutes = [/^\/login$/, /^\/signup$/, /^\/auth(\/.*)/];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = matchAny(path, publicRoutes);
  const { access_token: token } = await getAuthCookies();

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/', req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|.*\\.(?:png|jpg|jpeg|svg|js|css|ico|woff2?|ttf)).*)'],
};

function matchAny(path: string, patterns: RegExp[]) {
  return patterns.some(regex => regex.test(path));
}
