import React from 'react';
import { StoresProvider } from '@/stores';
import InitClientWrap from '@/components/app-wrap/init-client-wrap';

function AppWrap({ children }: { children: React.ReactNode }) {
  return (
    <StoresProvider>
      <InitClientWrap>{children}</InitClientWrap>
    </StoresProvider>
  );
}

export default AppWrap;
