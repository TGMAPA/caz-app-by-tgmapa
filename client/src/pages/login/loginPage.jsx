import loginBackgroundImage from "../../assets/loginBackgroundImage.jpg";

export default function LoginPage(){
    return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <div className="text-2xl font-bold">ConstruPlus</div>
      </header>

      {/* Main Section - Login Form */}
      <main style={{ backgroundImage: `url(${loginBackgroundImage})` }} className="flex flex-1 items-center justify-center p-8 bg-no-repeat bg-cover bg-center">
        <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Inicio de Sesión</h1>
          <p className="text-gray-600 text-center">Accede para continuar a tu portal de clientes</p>
          <input
            type="text"
            placeholder="Usuario"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded px-3 py-2"
          />
          <button className="bg-blue-600 text-white rounded-full w-full py-3 hover:bg-blue-700">
            Ingresar
          </button>
        </div>
        
      </main>

      

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        © 2024 ConstruPlus. Todos los derechos reservados.
      </footer>
    </div>
  );
}
