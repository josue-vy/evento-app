import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthCheck from "./AuthCheck";
import QRScannerContent from "./QRScannerContent";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthCheck onAuthenticated={() => {}} />} />
        <Route path="/qr-scanner" element={<QRScannerContent />} />
      </Routes>
    </Router>
  );
};

export default App;
