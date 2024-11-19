// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom';  // Usamos 'react-dom' en lugar de 'react-dom/client'

import App from './App';
import './index.css';

// React 17 usa 'ReactDOM.render' en lugar de 'ReactDOM.createRoot'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
