// Modules
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../config';


export default function MainScreen(){
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      // Request to server For user Authentication
      const response = await axios.post(
        DOMAIN_URL_SERVER + "/Auth/KillAuthUser", 
        {}, 
        { withCredentials: true }
      )
      navigate("/login");
    } catch (err) {}
  }

  const createUser = async () => {
    const response = await axios.post(
      DOMAIN_URL_SERVER + "/UserData/createUser", 
      {
        "name": "Jose Manuel Pérez",
        "position": "Cargador",
        "phoneNum": "72324937072",
        "personalEmail": "joseperez@gmail.com",
        "address": "Camino Viejo a Cacalomacan #307"
      }, 
      { withCredentials: true }
    )
    console.log("Usuario creado exitosamente");
    

  } 

  return (
      <div className="min-h-screen flex flex-col font-sans">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
          <div className="text-2xl font-bold">Materiales Pérez S.A. de C.V.</div>
        </header>
  
        {/* Main Section - Login Form */}
        <main  className="flex flex-1 items-center justify-center p-8 bg-no-repeat bg-cover bg-center">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-xl">
              <h1 className="text-2xl font-bold text-gray-800 text-center">Pagina principal</h1>
              <p className="text-gray-600 text-center">ESTA ES LA PAGINA PRINCIPAL</p>

              {/* Submit Botton */}
              <button onClick={LogOut} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cerrar Sesión
              </button>

              {/* TEST Botton */}
              <button onClick={createUser} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Crear Usuario
              </button>

          </div>
        </main>
  
      </div>
    );
}