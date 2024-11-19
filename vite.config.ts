import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegura que se pueda acceder desde otros dispositivos
    port: 5173,        // O el puerto que desees
    // Ya no necesitas la configuración de HTTPS
    // https: {
    //   key: fs.readFileSync('./private-key.pem'),  // La clave privada
    //   cert: fs.readFileSync('./certificate.pem'), // El certificado SSL
    // },
  },
});
