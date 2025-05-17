// docs/admin/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './admin', // This ensures Vite builds from the right folder
  plugins: [react()],
});
