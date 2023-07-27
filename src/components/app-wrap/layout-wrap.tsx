import React from 'react';
import LayoutRegistry from '@/components/layouts';

function LayoutWrap({ children }: { children: React.ReactElement }) {
  const getAppLayout = LayoutRegistry.default || LayoutRegistry.default;

  return getAppLayout(children);
}

export default LayoutWrap;
