import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // lg = 1024px
  const [configOpen, setConfigOpen] = useState(false); // Configuration Submenu
  const [catalogsOpen, setcatalogsOpen] = useState(false); // Catalogs Submenu

  // Listen changes in window´s size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function for setting any sidebar option to an active state
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      isActive ? "bg-gray-700 font-semibold" : ""
    }`;

  return (
    <>
      {/* Sidebar´s burger button only visible if it´s Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-2 z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Abrir menú</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${
          isMobile ? "w-48" : "w-64"
        } bg-gray-800 p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0`}
      >
        <br />
        <br />
        <h2 className="text-xl font-bold text-white mb-6">Dashboard</h2>

        <ul className="space-y-2 font-medium text-white">
          <nav className="space-y-2">

            {/* Dashboard home page */}
            <li>
              <NavLink to="/dashboard" className={linkClasses}>
                Inicio
              </NavLink>
            </li>
            
            {/* Articles with submenu */}
            <li>
              <button
                onClick={() => setcatalogsOpen(!catalogsOpen)}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 flex justify-between items-center"
              >
                Catálogos
                <span className="ml-2">
                  {catalogsOpen ? "▾" : "▸"}
                </span>
              </button>

              {catalogsOpen && (
                <ul className="pl-4 mt-1 space-y-1 text-sm">
                  {/* Groups home */}
                  <li> 
                    <NavLink to="/dashboard/catalogs/groups" className={linkClasses}>
                      Grupos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/catalogs/lines" className={linkClasses}>
                      Líneas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/catalogs/articles" className={linkClasses}>
                      Atrículos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/catalogs/unitsOfMeasurement" className={linkClasses}>
                      Unidades de Medida
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/dashboard/users" className={linkClasses}>
                Usuarios del Sistema
              </NavLink>
            </li>

            {/* Configuration with submenuú */}
            <li>
              <button
                onClick={() => setConfigOpen(!configOpen)}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 flex justify-between items-center"
              >
                Configuración
                <span className="ml-2">
                  {configOpen ? "▾" : "▸"}
                </span>
              </button>

              {configOpen && (
                <ul className="pl-4 mt-1 space-y-1 text-sm">
                  <li>
                    <NavLink to="/dashboard/settings/profile" className={linkClasses}>
                      Perfil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/settings/system" className={linkClasses}>
                      Ajustes del sistema
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </nav>
        </ul>
      </div>

      {/* Close sidebar menu in mobile */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0  bg-opacity-50 z-30"
        />
      )}
    </>
  );
}
