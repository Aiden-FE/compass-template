import { AvailableLanguages } from '@/config';

export interface PageProps {
  params: { lng?: AvailableLanguages };
}

export interface ComponentProps {
  lang?: AvailableLanguages;
}
