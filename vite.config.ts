import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cheer-lab/', // ★GitHub Pagesで公開するために、この一行が絶対に必要です！
})
