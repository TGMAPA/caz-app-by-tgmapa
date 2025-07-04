// Modules
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../config';


export default function RoleManager() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simular carga de datos
    setRoles([
      { id: 1, name: "Admin", description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.", users: 1, type: "Default" },
      { id: 2, name: "Auditor", description: "Lorem ipsum dolor sit amet.....", users: 1, type: "Default" },
      { id: 3, name: "Viewer", description: "Lorem ipsum dolor sit amet.....", users: 1, type: "Default" },
      { id: 4, name: "Limited User", description: "Lorem ipsum dolor sit amet.....", users: 6, type: "Default" },
      { id: 5, name: "Network Admin", description: "Lorem ipsum dolor sit amet.....", users: 8, type: "Default" },
      { id: 6, name: "Database Admin", description: "Lorem ipsum dolor sit amet.....", users: 3, type: "Default" },
    ]);
  }, []);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-sm text-gray-400 mb-2">Administration</div>
      <h1 className="text-2xl font-semibold mb-6">USER ROLE</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Role management</h2>
        <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
          +
          Add Role
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="text-left px-4 py-2">Role Name</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Associated Users</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-center px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role, index) => (
              <tr key={role.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{role.name}</td>
                <td className="px-4 py-2 text-gray-600 truncate max-w-xs">{role.description}</td>
                <td className="px-4 py-2">{role.users}</td>
                <td className="px-4 py-2 text-gray-500">{role.type}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredRoles.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">No roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}