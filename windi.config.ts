import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  attributify: {
    prefix: 'wd:'
  },
  /**
   * @example
   * { 'test': 'flex items-center', }
   * use: <input class="*test"/>
   */
  alias: {}
})
