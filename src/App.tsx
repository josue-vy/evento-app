import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const handleScan = (data: string | null) => {
    if (data) {
      setQrCode(data);
      setError(null);
    }
  };

  const handleError = (err: any) => {
    setError("Error al acceder a la cámara. Verifica los permisos.");
    console.error(err);
  };

  const handleStartCamera = () => {
    setIsCameraActive(true);
    setError(null); // Resetear errores al iniciar la cámara
  };

  const handleStopCamera = () => {
    setIsCameraActive(false);
    setQrCode(null); // Limpiar el código detectado
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Escáner de QR</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStartCamera}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Iniciar Cámara
        </button>
        <button
          onClick={handleStopCamera}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Apagar Cámara
        </button>
      </div>
      <div className="w-80 h-80 bg-white border-4 border-gray-300 rounded-lg shadow-md">
        {isCameraActive ? (
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (result?.getText()) {
                handleScan(result.getText());
              } else if (error) {
                handleError(error);
              }
            }}
            containerStyle={{ width: "100%", height: "100%" }}
            videoContainerStyle={{ borderRadius: "0.75rem" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Cámara apagada</p>
          </div>
        )}
      </div>
      {qrCode && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow">
          <p className="font-medium">Código detectado:</p>
          <p className="break-words">{qrCode}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow">
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
