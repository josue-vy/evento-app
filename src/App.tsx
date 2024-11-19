import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Escáner de QR</h1>
      <div className="w-80 h-80 bg-white border-4 border-gray-300 rounded-lg shadow-md">
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