import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative, so the build works on Vercel, on
// GitHub Pages under /<repo>/, or opened from any folder.
export default defineConfig({
  base: './',
  plugins: [react()],
});
