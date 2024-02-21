import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

const {resolve} = require('path')

interface WebpackParams {
  config: any;
}

module.exports = {
  webpack({config}: WebpackParams) {
    config.resolve.alias['~'] = resolve(__dirname, 'src')
    return config
  },
}
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})