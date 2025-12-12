// Modules
import { SquarePen, ArrowDownUp, Trash, Search, Plus, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../../config.js';



export default function LinesManager() {

    const navigate = useNavigate();

    // States
    const [lines, setLines] = useState([]);
    const [search, setSearch] = useState("");

    // mode = "active" → active elements view
    // mode = "trash" → trash elements view
    const [mode, setMode] = useState("active"); 

    // Filters
    const [filterName, setFilterName] = useState("");
    const [filterGroup, setFilterGroup] = useState("");

     // Fetch Lines ----------------------------
    const fetchLines = async () => {
        try {
            const response = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllLines",
                {},
                { withCredentials: true }
            );
            // Set Lines from response
            setLines(response.data.Lines);

        } catch (error) {
            console.error("Error al cargar las líneas disponibles.");
        }
    };

     // Load Lines from backend ----------------------------
    useEffect(() => {
        fetchLines();
    }, []);

    // Unique Values --------------------------
    const uniqueNames = [...new Set(lines.map(l => l.name))];
    const uniqueGroups = [...new Set(lines.map(l => l.groupName))];
    
    // Filter Lines ----------------------------
    const filteredLines = lines
        // Active or Trash view
        .filter(line => mode === "active"
            ? line.LogDelete === null 
            : line.LogDelete !== null
        )
        // Search
        .filter(line =>
            line.name.toLowerCase().includes(search.toLowerCase())
        )
        // Filter by Name
        .filter(line =>
            filterName ? line.name === filterName : true
        )
        // Filter by Group
        .filter(line =>
            filterGroup ? line.groupName === filterGroup : true
        );

    // LogicDelete -----------------------
    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas enviar a papelera esta línea?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/lineLogicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchLines();
        } catch (err) {
            alert("Error al eliminar la línea.");
        }
    };

    // Restore Line (undo delete) -----------------------
    const handleRestore = async (id) => {
        if (!confirm("¿Restaurar la línea?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/lineRestore",
                { id },
                { withCredentials: true }
            );

            fetchLines();
        } catch (err) {
            alert("Error al restaurar la línea.");
        }
    };

    // Physical Delete (delete hard) -----------------------
    const handlePhysicalDelete = async (id) => {
        if (!confirm("Esta acción eliminará la línea PERMANENTEMENTE. ¿Deseas Continuar?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/linePhysicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchLines();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar permanentemente la línea.");
        }
    };



    // ----- Frontend
    return( 
        <>  
            {/* Page Title */}
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                                Gestión de Líneas {mode === "trash" && "(Papelera)"}
                            </h3>
                            <p className="text-slate-500">
                                {mode === "active" 
                                    ? "Visualiza y administra las líneas activas" 
                                    : "Papelera de Líneas eliminadas"}
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

                            {/* Add Line */}
                            {mode === "active" && (
                                <button
                                    className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow transition-all hover:shadow-lg hover:shadow-slate-900/20"
                                    onClick={() => navigate("/dashboard/catalogs/lines/CreateLine")}
                                >
                                    <Plus />
                                    Añadir Línea
                                </button>
                            )}
                        </div>
                    </div>
                
                {/* Search + Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-3 mt-4">

                    {/* Search Bar */}
                    <div className="w-full relative">
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition-all"
                            placeholder="Buscar una Línea"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute h-8 w-8 right-1 top-1 flex items-center justify-center">
                            <Search />
                        </span>
                    </div>

                    {/* Filter Name */}
                    <select
                        className="bg-white w-full h-10 px-3 text-sm border border-slate-200 rounded shadow-sm"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    >
                        <option value="">Filtrar por nombre</option>
                        {uniqueNames.map((name, i) => (
                            <option key={i} value={name}>{name}</option>
                        ))}
                    </select>

                    {/* Filter Group */}
                    <select
                        className="bg-white w-full h-10 px-3 text-sm border border-slate-200 rounded shadow-sm"
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                    >
                        <option value="">Filtrar por grupo</option>
                        {uniqueGroups.map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </select>

                </div>

                <br />
            </div>


            {/* Table */}
            <div className="p-0 overflow-scroll">
                <table className="w-full mt-4 text-left table-auto min-w-max">
                    {/* Column Heads */}
                    <thead>
                        <tr>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                Nombre
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                Grupo
                                <ArrowDownUp />
                                </p>
                            </th>

                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                </p>
                            </th>
                        </tr>
                    </thead>

                   {/* Body */}
                    <tbody>
                        {filteredLines.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-slate-500">
                                    No hay líneas para mostrar
                                </td>
                            </tr>
                        )}
                        {/* Show elements in table */}
                        {filteredLines.map((line) => (
                            <tr key={line.id}>
                                {/* Line Name */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {line.name}
                                        </p>
                                    </div>
                                </td>

                                {/* Line Group */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {line.groupName}
                                            {line.groupDeleted && (
                                                <span className="text-red-500 text-xs font-normal">  (Grupo Descontinuado / Eliminado)</span>
                                            )}
                                        </p>
                                    </div>
                                </td>

                                {/* Actions over element */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center items-center gap-2">

                                        {/* Edit active elements */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => navigate(`/dashboard/Catalogs/lines/edit/${line.id}`)}
                                            >
                                                <SquarePen />
                                            </button>
                                        )}

                                        {/* Move to trah can */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleDelete(line.id)}
                                            >
                                                <Trash />
                                            </button>
                                        )}

                                        {/* Restore from trash can */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleRestore(line.id)}
                                            >
                                                <RotateCcw />
                                            </button>
                                        )}

                                        {/* Hard delete */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-red-100"
                                                onClick={() => handlePhysicalDelete(line.id)}
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
            
            {/* Table Pager */}
            <div className="flex items-center justify-between p-3">
                <p className="block text-sm text-slate-500">
                Page 1 of 10
                </p>
                <div className="flex gap-1">
                <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    Previous
                </button>
                <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    Next
                </button>
                </div>
            </div>
        
        </>
    );
}