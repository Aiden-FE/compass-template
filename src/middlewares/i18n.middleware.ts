import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { AvailableLanguages, Languages } from '@/config';
import { MiddlewareCallback } from '@/interfaces';

const cookieName = 'i18next';

export default function provideI18nMiddleware(req: NextRequest): MiddlewareCallback {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return undefined;
  }
  let lng;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = AvailableLanguages.ZH;

  // Redirect if lng in path is not supported
  if (
    !Languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return () => NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = Languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return () => response;
  }

  return undefined;
}
