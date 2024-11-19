// src/App.tsx

import { useState, useEffect } from "react";
import QRScanner from "react-qr-scanner"; // Importamos la librería para leer códigos QR

function App() {
  // Estados para manejar la cámara y los datos del QR
  const [cameraActive, setCameraActive] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  // Función para manejar el escaneo del QR
  const handleScan = (data: string | null) => {
    if (data) {
      setQrData(data); // Actualizamos el estado con el código QR detectado
    }
  };

  // Función para manejar el error de la cámara
  const handleError = (err: any) => {
    console.error("Error al escanear el QR:", err);
  };

  // Función para alternar entre la cámara frontal y trasera
  const toggleCamera = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    console.log("Cambiando a cámara:", nextMode);
  };

  // Verificar cámaras disponibles (se ejecuta al iniciar la app)
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      console.log("Cámaras disponibles:", videoDevices);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Escáner de Códigos QR</h1>

      {/* Mostrar la cámara solo si está activa */}
      {cameraActive ? (
        <div className="relative w-full max-w-md mb-6">
          <QRScanner
            facingMode={facingMode} // Usamos el estado para cambiar entre las cámaras
            delay={300} // La demora en milisegundos entre cada escaneo
            style={{ width: "100%" }} // Hacemos que el escáner ocupe todo el ancho
            videoConstraints={{
              facingMode: facingMode, // Especificamos directamente el modo
            }}
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

      {/* Botones para iniciar, apagar la cámara y alternar entre cámaras */}
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
        <button
          onClick={toggleCamera} // Alternar entre cámara frontal y trasera
          className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Cambiar Cámara
        </button>
      </div>
    </div>
  );
}

export default App;
