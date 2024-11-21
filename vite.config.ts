import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegura que se pueda acceder desde otros dispositivos
    port: 5173,
    // https: {
    //   key: fs.readFileSync('./private-key.pem'),  // La clave privada
    //   cert: fs.readFileSync('./certificate.pem'), // El certificado SSL
    // },
  },
});
