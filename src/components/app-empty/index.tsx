import { CommonComponentProps } from '@/interfaces';
import { ReactNode } from 'react';
import SvgIcon from '@/components/app-icon/svg-icon';

type IAppEmptyProps = CommonComponentProps<{
  text?: string;
  icon?: ReactNode;
  iconSize?: string;
  layout?: 'center';
}>;

function AppEmpty({ icon, iconSize, text, layout }: IAppEmptyProps) {
  return (
    <div className={`vwb-empty-${layout || 'default'} text-center`}>
      <div className="pt-12">
        <div
          className="leading-none"
          style={{
            fontSize: iconSize || '68px',
          }}
        >
          {icon || <SvgIcon icon="empty" />}
        </div>
        <p className="m-0 text-xs text-slate-400">{text || 'noData'}</p>
      </div>
    </div>
  );
}

export default AppEmpty;
