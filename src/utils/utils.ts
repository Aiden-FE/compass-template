import { getElement, getRenderingRef, forceUpdate } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

export function useComponent<T = unknown>(): T {
  return getRenderingRef();
}

export function useHost(): HTMLStencilElement {
  const component = useComponent();
  return getElement(component);
}

export function useUpdate() {
  const ref = useHost();
  return () => {
    forceUpdate(ref);
  };
}
