// Modules
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../config';

// Assets
import loginBackgroundImage from "../../assets/loginBackgroundImage.jpg"; // Background image


export default function LoginPage(){
  // Page variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to auth User with db
  const handleLogin = async () => {   
    // Fields Validation
    if (!username || !password) {
      setError("Por favor ingresa un usuario y contraseña.");
      return;
    }

    setError(""); // Clean Errors

    try {
      // Request to server For user Auth
      const response = await axios.post(
        DOMAIN_URL_SERVER + "/Auth/authUser", 
        {
          username: username,
          password: password
        }, 
        { withCredentials: true }
      );

      setError("") // Clean error label
  
      // ----------- Redirect By User Position:
      navigate("/dashboard");

    } catch (error) {
      setError("Contraseña incorrecta. Intenta nuevamente.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <div className="text-2xl font-bold">Materiales Pérez S.A. de C.V.</div>
      </header>

      {/* Main Section - Login Form */}
      <main style={{ backgroundImage: `url(${loginBackgroundImage})` }} className="flex flex-1 items-center justify-center p-8 bg-no-repeat bg-cover bg-center">
        <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Inicio de Sesión</h1>
            <p className="text-gray-600 text-center">Accede para continuar al portal</p>
            
            {/* Inputs */}
            <input
            type="text"
            placeholder="Usuario"
            className="w-full border rounded px-3 py-2"
            id="email" 
            name="email"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            id="password" 
            name="password" 
            type="password" 
            autoComplete="current-password" 
            required
            placeholder="Contraseña"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
            />

            
            <div className="flex items-center justify-between">
                {/* Remember Me botton */}
                <div className="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                        Recordarme
                    </label>
                </div>

                {/* Forgot Pwd Botton */}
                <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        ¿Olvidaste tu contrsaeña?
                    </a>
                </div>
            </div>
          
          {/* Submit Botton */}
          <button onClick={handleLogin} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Ingresar
          </button>

          {/* Error Label - When Error exists*/}
          {error && (  
                      <div className="flex items-start gap-2 bg-red-50 border-l-4 border-red-600 text-red-700 p-3 rounded-md shadow-sm animate-fade-in">
                        <span className="text-sm font-medium">{error}</span>
                      </div>
                    )
          }
          
        </div>
      </main>
      

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        © 2025 Materiales Pérez S.A. de C.V. Todos los derechos reservados.
      </footer>
    </div>
  );
}
