import React from "react";
import LayoutRegistry from "@/components/layouts";

function LayoutWrap({ children }: { children: React.ReactNode }) {
  const getAppLayout = LayoutRegistry[children?.layout || 'default'] || LayoutRegistry.default;
  
  return getAppLayout(children);
}

export default LayoutWrap;
