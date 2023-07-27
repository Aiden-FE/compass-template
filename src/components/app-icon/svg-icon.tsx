'use client';

import { ComponentProps } from 'react';
import SvgSetting from '@/assets/svgs/setting.svg';

function SvgIcon({ icon }: ComponentProps<any>) {
  switch (icon) {
    case 'setting':
      return <SvgSetting />;
    default:
      return null;
  }
}

export default SvgIcon;
