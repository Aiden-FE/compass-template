import { NextResponse } from 'next/server';
import { AvailableLanguages } from '@/config';

export interface PageProps {
  params: { lng: AvailableLanguages };
}

export interface AppComponentProps {
  lng?: AvailableLanguages;
}

export type MiddlewareCallback = (() => NextResponse<unknown>) | undefined;
