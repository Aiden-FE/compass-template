import { NextRequest, NextResponse } from 'next/server';
import provideI18nMiddleware from './i18n.middleware';
import authMiddleware from './auth.middleware';

export default async function provideMiddlewares(req: NextRequest) {
  const i18nCallback = provideI18nMiddleware(req);
  if (i18nCallback) {
    return i18nCallback();
  }
  const authCallback = await authMiddleware(req);
  if (authCallback) {
    return authCallback();
  }

  return NextResponse.next();
}
