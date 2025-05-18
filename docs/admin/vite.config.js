import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // Use current folder (admin) as root
  plugins: [react()],
});
