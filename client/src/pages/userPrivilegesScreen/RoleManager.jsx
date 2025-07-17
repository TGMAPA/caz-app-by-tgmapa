// Modules
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../config.js';


const mockPositions = [
  {
    id: 1,
    name: "admin",
    description: "Rol con acceso completo a todo el sistema",
    users: ["Miguel", "Alyson"],
    privileges: [
      {
        id: 1,
        name: "Crear Usuario",
        category: "Administración",
        endpoints: ["/api/UserData/createUser"]
      },
      {
        id: 2,
        name: "Eliminar Usuario",
        category: "Administración",
        endpoints: ["/api/UserData/deleteUser"]
      },
      {
        id: 3,
        name: "Ver Reportes",
        category: "Reportes",
        endpoints: ["/api/Reports/view"]
      }
    ]
  }
];

export default function AdminRolesPage() {
  const [positions, setPositions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setPositions(mockPositions);
  }, []);

  const filteredPositions = positions.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPosition = () => {
    const name = prompt("Nombre de la nueva posición:");
    if (!name) return;
    const newPosition = { id: Date.now(), name, description: "", users: [], privileges: [] };
    setPositions([...positions, newPosition]);
  };

  const handleDeletePosition = (id) => {
    if (confirm("¿Eliminar esta posición?")) {
      setPositions(positions.filter((p) => p.id !== id));
    }
  };

  const handleDeletePrivilege = (privilegeId) => {
    const updatedPrivileges = selectedPosition.privileges.filter(p => p.id !== privilegeId);
    const updated = { ...selectedPosition, privileges: updatedPrivileges };
    setSelectedPosition(updated);
    setPositions(positions.map(p => p.id === updated.id ? updated : p));
  };

  const handleAddPrivilege = () => {
    const name = prompt("Nombre del nuevo privilegio:");
    const category = prompt("Categoría del privilegio:");
    const endpoint = prompt("Endpoint asociado:");
    if (!name || !category || !endpoint) return;
    const newPriv = {
      id: Date.now(),
      name,
      category,
      endpoints: [endpoint]
    };
    const updated = {
      ...selectedPosition,
      privileges: [...selectedPosition.privileges, newPriv]
    };
    setSelectedPosition(updated);
    setPositions(positions.map(p => p.id === updated.id ? updated : p));
  };

  const groupPrivilegesByCategory = (privileges) => {
    return privileges.reduce((acc, priv) => {
      acc[priv.category] = acc[priv.category] || [];
      acc[priv.category].push(priv);
      return acc;
    }, {});
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <div className="text-2xl font-bold">Materiales Pérez S.A. de C.V.</div>
      </header>

      {/* Main Section - Login Form */}
      <div className="p-8 max-w-6xl mx-auto">
      
        <div className="text-sm text-gray-400 mb-2">Administración</div>
        <h1 className="text-2xl font-semibold mb-6">ROLES DE USUARIO</h1>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Gestión de Roles</h2>
          <button onClick={handleAddPosition} className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
            <Plus size={16} className="mr-1" /> Añadir Rol
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar rol..."
            className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="text-left px-4 py-2">Nombre</th>
                <th className="text-left px-4 py-2">Descripción</th>
                <th className="text-left px-4 py-2">Usuarios</th>
                <th className="text-left px-4 py-2">Privilegios</th>
                <th className="text-center px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map((position) => (
                <tr key={position.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{position.name}</td>
                  <td className="px-4 py-2 text-gray-600 truncate max-w-xs">{position.description}</td>
                  <td className="px-4 py-2">{position.users.length}</td>
                  <td className="px-4 py-2">{position.privileges.length}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => { setSelectedPosition(position); setDialogOpen(true); }}>Editar</button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeletePosition(position.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filteredPositions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">No se encontraron roles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {dialogOpen && selectedPosition && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20">
            <div className="bg-white max-w-3xl w-full rounded-xl p-6 relative">
              <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={() => setDialogOpen(false)}>
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">Privilegios de "{selectedPosition.name}"</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Usuarios asignados:</h3>
                  <ul className="text-sm text-gray-700 pl-4 list-disc">
                    {selectedPosition.users.map((u, idx) => <li key={idx}>{u}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Privilegios:</h3>
                  <button
                    onClick={handleAddPrivilege}
                    className="mb-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    + Agregar Privilegio
                  </button>
                  {Object.entries(groupPrivilegesByCategory(selectedPosition.privileges)).map(([cat, privs]) => (
                    <div key={cat} className="mb-4">
                      <h4 className="text-md font-bold text-gray-800">{cat}</h4>
                      <div className="grid gap-2 mt-1">
                        {privs.map(priv => (
                          <div key={priv.id} className="border rounded-xl p-3 bg-gray-100">
                            <div className="flex justify-between">
                              <span className="font-semibold">{priv.name}</span>
                              <button onClick={() => handleDeletePrivilege(priv.id)} className="text-red-600 hover:text-red-800">
                                <X size={16} />
                              </button>
                            </div>
                            <ul className="text-sm text-gray-700 list-disc pl-4 mt-1">
                              {priv.endpoints.map((ep, idx) => <li key={idx}>{ep}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
   
  );
}