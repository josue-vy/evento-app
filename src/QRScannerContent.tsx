import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QRScannerContent: React.FC = () => {
  const navigate = useNavigate();
  const [, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [userRegisteredMessage, setUserRegisteredMessage] = useState<string | null>(null);

  // Flag para verificar si el componente está montado
  const isMounted = useRef(true);

  // Limpiar al desmontar el componente
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleScan = async (data: string | null) => {
    if (data) {
      setQrCode(data);
      setError(null);
      setIsCameraActive(false);
      setUserRegisteredMessage("Procesando QR...");
      setTimeout(() => setUserRegisteredMessage(null), 5000);
      await validateQRCode(data); // Llamada al backend para validar el código QR
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

  const validateQRCode = async (qrCode: string) => {
    if (!qrCode.trim()) {
      setError("El código QR está vacío o es inválido.");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-evento-epis-2.onrender.com/backend/validar-qr",
        // "http://localhost:3000/backend/validar-qr",
        { qrCodigo: qrCode },
        { withCredentials: true }
      );

      if (isMounted.current) {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setUserRegisteredMessage(response.data.message || "QR validado exitosamente.");
          setTimeout(() => {
            setIsCameraActive(false);
            navigate("/");
          }, 2000);
        }
      }
    } catch (error: any) {
      if (isMounted.current) {
        if (error.response) {
          const serverMessage = error.response.data?.message || "Error inesperado en el servidor.";
          setError(`Servidor: ${serverMessage}`);
        } else if (error.request) {
          setError("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
          setError("Error al enviar la solicitud. Intenta nuevamente.");
        }
      }
      console.error("Error de Axios:", error);
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

export default QRScannerContent;
