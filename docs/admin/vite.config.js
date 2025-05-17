// docs/admin/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',           // Current folder as root
  plugins: [react()],
});
