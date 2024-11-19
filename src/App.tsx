import { useState, useEffect } from "react";
import QRScanner from "react-qr-scanner";

function App() {
  const [cameraActive, setCameraActive] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [constraints, setConstraints] = useState({
    facingMode: { exact: "environment" },
    width: { ideal: 1280 },
    height: { ideal: 720 }
  });

  const handleScan = (data: string | null) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (err: any) => {
    console.error("Error al escanear el QR:", err);
    // Si falla la cámara trasera, intentamos con la frontal
    if (facingMode === "environment") {
      console.log("Intentando con cámara frontal...");
      setFacingMode("user");
      setConstraints({
        facingMode: { exact: "user" },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      });
    }
  };

  const toggleCamera = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    setConstraints({
      facingMode: { exact: nextMode },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    });
    // Reiniciamos la cámara
    setCameraActive(false);
    setTimeout(() => setCameraActive(true), 100);
  };

  useEffect(() => {
    async function checkCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        console.log("Cámaras disponibles:", videoDevices);
        
        // Si no hay cámara trasera disponible, comenzamos con la frontal
        if (videoDevices.length === 1) {
          setFacingMode("user");
          setConstraints({
            facingMode: { exact: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          });
        }
      } catch (error) {
        console.error("Error al enumerar dispositivos:", error);
      }
    }
    
    checkCameras();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Escáner de Códigos QR</h1>

      {cameraActive && (
        <div className="relative w-full max-w-md mb-6">
          <QRScanner
            delay={300}
            style={{ width: "100%" }}
            onScan={handleScan}
            onError={handleError}
            constraints={constraints}
          />
        </div>
      )}

      {!cameraActive && (
        <div className="mb-6 text-lg text-gray-600">
          <p>La cámara está apagada. Haz clic en "Iniciar Cámara" para comenzar.</p>
        </div>
      )}

      {qrData && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Código QR Detectado:</h2>
          <p className="text-gray-700">{qrData}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setCameraActive(true)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Iniciar Cámara
        </button>
        <button
          onClick={() => setCameraActive(false)}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        >
          Apagar Cámara
        </button>
        <button
          onClick={toggleCamera}
          className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Cambiar Cámara ({facingMode === "environment" ? "Trasera" : "Frontal"})
        </button>
      </div>
    </div>
  );
}

export default App;