'use client';

import { CommonComponentProps } from '@/interfaces';
import { ReactNode } from 'react';
import { SvgIcon } from '@/components/app-icon';
import { useClientTranslation } from '@/i18n';

type IAppEmptyProps = CommonComponentProps<{
  text?: string;
  icon?: ReactNode;
  iconSize?: string;
  layout?: 'center';
}>;

function AppEmpty({ icon, iconSize, text, layout, lang }: IAppEmptyProps) {
  const { t } = useClientTranslation(lang);
  return (
    <div className={`cp-empty-${layout || 'default'} text-center`}>
      <div className="pt-12">
        <div
          className="leading-none"
          style={{
            fontSize: iconSize || '68px',
          }}
        >
          {icon || <SvgIcon icon="empty" />}
        </div>
        <p className="m-0 text-xs text-slate-400">{text || t('No data')}</p>
      </div>
    </div>
  );
}

export default AppEmpty;
