import type { Meta, StoryObj } from '@storybook/vue3';
import Example from './demo-example.vue';

const meta = {
  title: '其他/示例/Example',
  component: Example,
  tags: ['autodocs'],
} satisfies Meta<typeof Example>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
