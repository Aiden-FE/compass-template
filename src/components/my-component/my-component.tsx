import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';
import { translate } from '@/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <div class="container">
        Hello, World! I&apos;m
        {this.getText()}
        <div>
          {translate('test.hello', { timestamp: Date.now().toString() })}
          {translate('test.demo')}
        </div>
      </div>
    );
  }
}
