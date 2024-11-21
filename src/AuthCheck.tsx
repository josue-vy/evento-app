// AuthCheck.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './index.css';

const AuthCheck: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/backend/login",
        { email, password },
        { withCredentials: true } // Esto envía las cookies con la solicitud
      );

      console.log(response.data);  // Verifica qué respuesta recibes del servidor

      if (response.data.message === 'Inicio de sesión exitoso') {
        // No necesitas guardar nada en localStorage, ya que la cookie maneja la sesión
        onAuthenticated();
        navigate("/qr-scanner");  // Redirige al usuario a la página del escáner de QR
      } else {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error: any) {
      console.error("Error en el login:", error);
      setError('Error al intentar autenticarte. Inténtalo más tarde.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta? <a href="#" className="text-indigo-600 hover:text-indigo-700">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCheck;
