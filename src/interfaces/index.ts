import { AvailableLanguages } from '@/config';

export interface PageProps {
  params: { lng: AvailableLanguages };
}

export interface AppComponentProps {
  lng?: AvailableLanguages;
}
