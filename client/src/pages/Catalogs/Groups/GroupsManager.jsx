// Modules
import { SquarePen, ArrowDownUp, Trash, Search, Plus, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../../config.js';



export default function GroupsManager() {

    const navigate = useNavigate();

    // States
    const [groups, setGroups] = useState([]);
    const [search, setSearch] = useState("");

    // mode = "active" → active elements view
    // mode = "trash" → trash elements view
    const [mode, setMode] = useState("active"); 
    

    // Fetch Groups ----------------------------
    const fetchGroups = async () => {
        try {
            const response = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllGroups",
                {},
                { withCredentials: true }
            );
            // Set groups from response
            setGroups(response.data.Groups);

        } catch (error) {
            console.error("Error al cargar los grupos disponibles.");
        }
    };

     // Load Groups from backend ----------------------------
    useEffect(() => {
        fetchGroups();
    }, []);

    // Filter Groups ----------------------------
    const filteredGroups = groups
        .filter(g => mode === "active"
            ? g.LogDelete === null 
            : g.LogDelete !== null
        )
        .filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

    // LogicDelete -----------------------
    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas enviar a papelera este grupo?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/groupLogicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchGroups();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar el grupo.");
        }
    };

    // Restore Group (undo delete) -----------------------
    const handleRestore = async (id) => {
        if (!confirm("¿Restaurar el grupo?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/groupRestore",
                { id },
                { withCredentials: true }
            );

            fetchGroups();
        } catch (err) {
            console.error(err);
            alert("Error al restaurar el grupo.");
        }
    };

    // Physical Delete (delete hard) -----------------------
    const handlePhysicalDelete = async (id) => {
        if (!confirm("Esta acción eliminará el grupo PERMANENTEMENTE. ¿Deseas Continuar?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/groupPhysicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchGroups();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar permanentemente el grupo.");
        }
    };


    // ----- Frontend
    return (
        <>
            {/* Page Title */}
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Gestión de Grupos {mode === "trash" && "(Papelera)"}
                        </h3>
                        <p className="text-slate-500">
                            {mode === "active" 
                                ? "Visualiza y administra los grupos activos" 
                                : "Grupos eliminados lógicamente (Papelera)"}
                        </p>
                    </div>

                    <div className="flex gap-2">

                        {/* Toggle Active / Trash */}
                        <button
                            className="flex items-center gap-2 rounded bg-slate-600 py-2.5 px-4 text-xs font-semibold text-white shadow transition-all hover:bg-slate-700"
                            onClick={() => setMode(mode === "active" ? "trash" : "active")}
                        >
                            {mode === "active" ? "Ver Papelera" : "Ver Activos"}
                        </button>

                        {/* Add Group */}
                        {mode === "active" && (
                            <button
                                className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow transition-all hover:shadow-lg hover:shadow-slate-900/20"
                                onClick={() => navigate("/dashboard/catalogs/groups/CreateGroup")}
                            >
                                <Plus />
                                Añadir Grupo
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex centermx-3 mt-4">
                    <div className="w-full max-w-sm relative">
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition-all"
                            placeholder="Buscar un Grupo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute h-8 w-8 right-1 top-1 flex items-center justify-center">
                            <Search />
                        </span>
                    </div>
                </div>

                <br />
            </div>

            {/* Table */}
            <div className="p-0 overflow-scroll">
                <table className="w-full mt-4 text-left table-auto min-w-max">

                    {/* Header */}
                    <thead>
                        <tr>
                            <th className="p-4 border-y border-slate-200 bg-slate-50">
                                <p className="flex items-center justify-center gap-2 text-sm font-normal text-slate-500">
                                    Nombre
                                    <ArrowDownUp />
                                </p>
                            </th>
                            <th className="p-4 border-y border-slate-200 bg-slate-50"></th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {filteredGroups.length === 0 && (
                            <tr>
                                <td colSpan="2" className="p-4 text-center text-slate-500">
                                    No hay grupos para mostrar
                                </td>
                            </tr>
                        )}

                        {filteredGroups.map((group) => (
                            <tr key={group.id}>
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {group.name}
                                        </p>
                                    </div>
                                </td>

                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center items-center gap-2">

                                        {/* Editar (solo activos) */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => navigate(`/dashboard/Catalogs/groups/edit/${group.id}`)}
                                            >
                                                <SquarePen />
                                            </button>
                                        )}

                                        {/* Enviar a papelera */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleDelete(group.id)}
                                            >
                                                <Trash />
                                            </button>
                                        )}

                                        {/* Restaurar desde papelera */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleRestore(group.id)}
                                            >
                                                <RotateCcw />
                                            </button>
                                        )}

                                        {/* Eliminar físico */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-red-100"
                                                onClick={() => handlePhysicalDelete(group.id)}
                                            >
                                                <Trash />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pager Placeholder */}
            <div className="flex items-center justify-between p-3">
                <p className="text-sm text-slate-500">Page 1 of 1</p>
            </div>
        </>
    );
}
