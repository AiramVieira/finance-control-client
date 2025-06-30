import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

import { config } from 'dotenv';
import { defineConfig } from 'vite';

config();
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
  define: {
    'process.env': process.env
  }
});


