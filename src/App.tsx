import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const QRScanner: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [userRegisteredMessage, setUserRegisteredMessage] = useState<string | null>(null);

  const handleScan = async (data: string | null) => {
    if (data) {
      setQrCode(data);
      setError(null);
      setIsCameraActive(false);
      setUserRegisteredMessage("Usuario registrado correctamente con el código QR");
      setTimeout(() => setUserRegisteredMessage(null), 5000);
      await saveQRCode(data);
    }
  };

  const handleError = (err: any) => {
    const errorMessage = "Error al acceder a la cámara. Verifica los permisos.";
    setError(errorMessage);
    console.error(err);
  };

  const handleStartCamera = () => {
    setIsCameraActive(true);
    setError(null);
    setUserRegisteredMessage(null);
  };

  const handleStopCamera = () => {
    setIsCameraActive(false);
    setQrCode(null);
    setUserRegisteredMessage(null);
  };

  const saveQRCode = async (qrCode: string) => {
    try {
      const response = await axios.post("https://backend-evento-epis.onrender.com/backend/post-qr", {
        codigoQR: qrCode,
        fecha: new Date().toISOString()
      });
      console.log("QR guardado correctamente", response.data);
    } catch (error) {
      const errorMessage = "Error al guardar el código QR en la base de datos.";
      setError(errorMessage);
      console.error(errorMessage, error);
    }
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
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {userRegisteredMessage && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow">
          <p className="font-medium">{userRegisteredMessage}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
