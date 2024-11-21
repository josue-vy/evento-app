// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthCheck from "./AuthCheck";
import QRScannerContent from "./QRScannerContent";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthCheck onAuthenticated={() => {}} />} />
      <Route path="/qr-scanner" element={<QRScannerContent />} />
    </Routes>
  );
};

export default App;
