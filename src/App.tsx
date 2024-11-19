// src/App.tsx

import { useState } from 'react';
import QRScanner from 'react-qr-scanner'; // Importamos la librería para leer códigos QR

function App() {
  // Estados para manejar la cámara y los datos del QR
  const [cameraActive, setCameraActive] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  // Función para manejar el escaneo del QR
  const handleScan = (data: string | null) => {
    if (data) {
      setQrData(data); // Actualizamos el estado con el código QR detectado
    }
  };

  // Función para manejar el error de la cámara
  const handleError = (err: any) => {
    console.error('Error al escanear el QR:', err);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Escáner de Códigos QR</h1>

      {/* Mostrar la cámara solo si está activa */}
      {cameraActive ? (
        <div className="relative w-full max-w-md mb-6">
          <QRScanner
            facingMode="environment" // Utilizamos la cámara trasera (environment)
            delay={300} // La demora en milisegundos entre cada escaneo
            style={{ width: '100%' }} // Hacemos que el escáner ocupe todo el ancho
            onScan={handleScan} // Llamamos a la función handleScan cuando se detecte un QR
            onError={handleError} // Llamamos a la función handleError si ocurre un error
          />
        </div>
      ) : (
        <div className="mb-6 text-lg text-gray-600">
          <p>La cámara está apagada. Haz clic en "Iniciar Cámara" para comenzar.</p>
        </div>
      )}

      {/* Mostrar el código QR detectado si existe */}
      {qrData && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Código QR Detectado:</h2>
          <p className="text-gray-700">{qrData}</p>
        </div>
      )}

      {/* Botones para iniciar y apagar la cámara */}
      <div className="flex space-x-4">
        <button
          onClick={() => setCameraActive(true)} // Iniciar cámara
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Iniciar Cámara
        </button>
        <button
          onClick={() => setCameraActive(false)} // Apagar cámara
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        >
          Apagar Cámara
        </button>
      </div>
    </div>
  );
}

export default App;

