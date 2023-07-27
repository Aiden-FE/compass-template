import { ReactElement, ReactNode } from 'react';
import TestLayout from '@/components/layouts/test-layout';
import DefaultLayout from './default-layout';

const LayoutRegistry: { [key: string]: (page: ReactElement) => ReactNode } = {
  default: DefaultLayout,
  test: TestLayout,
};

export default LayoutRegistry;
