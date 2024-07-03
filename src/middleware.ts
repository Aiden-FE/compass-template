import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { Languages } from '@/config';
import provideMiddlewares from './middlewares';

acceptLanguage.languages(Languages);

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.svg$).*)'],
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  return provideMiddlewares(req);
}
