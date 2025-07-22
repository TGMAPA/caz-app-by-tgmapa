export default function Header({ onLogout }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700 shadow-md gap-4 overflow-hidden">
      
      {/* Contenedor flexible que se colapsa si hay poco espacio */}
      <div className="flex-1 min-w-0 flex justify-center">
        <h1 className="text-2xl font-semibold text-white tracking-wide whitespace-nowrap overflow-hidden text-ellipsis hidden sm:block">
          Materiales Pérez S.A. de C.V.
        </h1>
      </div>

      {/* Botones alineados a la derecha */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <button className="text-sm text-gray-300 hover:text-white transition">
          Perfil
        </button>

        <button
          onClick={onLogout}
          className="relative inline-flex items-center justify-center px-4 py-2 bg-gray-800 text-sm text-gray-200 font-medium rounded-lg hover:bg-gray-700 hover:text-white transition duration-200 shadow-sm border border-gray-600"
        >
          <span className="z-10">Cerrar sesión</span>
          <span className="absolute inset-0 rounded-lg bg-gradient-to-tr from-red-500/20 to-red-700/10 blur-sm opacity-0 hover:opacity-100 transition duration-300"></span>
        </button>
      </div>
    </header>
  );
}
