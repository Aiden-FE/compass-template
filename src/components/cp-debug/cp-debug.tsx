import { Component, Host, h } from '@stencil/core';
import { useState, withHooks } from '@saasquatch/stencil-hooks';
import { useUpdate } from '@/utils';

@Component({
  tag: 'cp-debug',
  shadow: false,
})
export class CpDebug {
  constructor() {
    withHooks(this);
  }

  render() {
    const [count, setCount] = useState(0);
    const update = useUpdate();
    function addCount() {
      setCount(count + 1);
      update();
      console.log('Click count: ', count);
    }

    return (
      <Host>
        <button onClick={() => addCount()} type="button">
          Set num {count}
        </button>
      </Host>
    );
  }

  disconnectedCallback() {}
}
