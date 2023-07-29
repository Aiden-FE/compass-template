'use client';

import SvgSetting from '@/assets/svgs/setting.svg';
import SvgEmpty from '@/assets/svgs/empty.svg';
import { CommonComponentProps } from '@/interfaces';

function SvgIcon(params: CommonComponentProps<{ icon: string }>) {
  // eslint-disable-next-line react/destructuring-assignment
  switch (params.icon) {
    case 'setting':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <SvgSetting {...params} />;
    case 'empty':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <SvgEmpty {...params} />;
    default:
      return null;
  }
}

export default SvgIcon;
