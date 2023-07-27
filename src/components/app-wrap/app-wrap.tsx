import React from 'react';
import { StoresProvider } from '@/stores';
import InitClientWrap from '@/components/app-wrap/init-client-wrap';
import LayoutWrap from './layout-wrap';

function AppWrap({ children }: { children: React.ReactNode }) {
  return (
    <StoresProvider>
      <LayoutWrap>
        <InitClientWrap>{children}</InitClientWrap>
      </LayoutWrap>
    </StoresProvider>
  );
}

export default AppWrap;
