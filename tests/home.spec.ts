import {mount} from "@vue/test-utils";
import AppComponent from '~/app.vue'

test('test home', () => {
  const wrapper = mount(AppComponent)
  expect(wrapper.text()).toContain('Example')
})
