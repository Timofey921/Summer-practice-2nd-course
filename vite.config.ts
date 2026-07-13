import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { authApiPlugin } from './server/authApiPlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), authApiPlugin()],
})
