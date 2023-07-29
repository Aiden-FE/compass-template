import { AvailableLanguages } from '@/i18n';
import type { ReactNode } from 'react';

export type CommonComponentProps<P = {}> = {
  lang?: AvailableLanguages | undefined;
} & P;

export type CommonPageProps<P = {}> = {
  params: { lng?: AvailableLanguages };
  children?: ReactNode;
} & P;
