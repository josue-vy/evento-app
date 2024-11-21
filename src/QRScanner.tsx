import React, { useState } from "react";
import AuthCheck from "./AuthCheck";
import QRScannerContent from "./QRScannerContent";

const QRScanner: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true); // Cuando el usuario esté autenticado
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Escáner de QR</h1>

      <AuthCheck onAuthenticated={handleAuthenticated} />

      {isAuthenticated && <QRScannerContent />}
    </div>
  );
};

export default QRScanner;
