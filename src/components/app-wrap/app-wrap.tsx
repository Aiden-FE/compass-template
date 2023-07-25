import React from "react";
import {StoresProvider} from "@/stores";
import LayoutWrap from "./layout-wrap";
import InitClientWrap from "@/components/app-wrap/init-client-wrap";

function AppWrap({ children }: { children: React.ReactNode }) {
  return (
    <StoresProvider>
      <LayoutWrap>
        <InitClientWrap>
          {children}
        </InitClientWrap>
      </LayoutWrap>
    </StoresProvider>
  );
}

export default AppWrap;
