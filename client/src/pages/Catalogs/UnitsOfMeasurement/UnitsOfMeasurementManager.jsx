// Modules
import { SquarePen, ArrowDownUp, Trash, Search, Plus, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../../config.js';



export default function UnitsOfMeasurementManager() {

    const navigate = useNavigate();

    // States
    const [UnitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
    const [search, setSearch] = useState("");

    // mode = "active" → active elements view
    // mode = "trash" → trash elements view
    const [mode, setMode] = useState("active"); 
    

    // Fetch UnitsOfMeasurement ----------------------------
    const fetchUnitsOfMeasurement = async () => {
        try {
            const response = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllUnitsOfMeasurement",
                {},
                { withCredentials: true }
            );
            // Set UnitsOfMeasurement from response
            setUnitsOfMeasurement(response.data.UnitsOfMeasurements);

        } catch (error) {
            console.error("Error al cargar las Unidades de Medida disponibles.");
        }
    };

     // Load UnitsOfMeasurement from backend ----------------------------
    useEffect(() => {
        fetchUnitsOfMeasurement();
    }, []);

    // Filter UnitsOfMeasurement ----------------------------
    const filteredUnitsOfMeasurement = UnitsOfMeasurement
        .filter(UoM => mode === "active"
            ? UoM.LogDelete === null 
            : UoM.LogDelete !== null
        )
        .filter(UoM => UoM.name.toLowerCase().includes(search.toLowerCase()));

    // LogicDelete -----------------------
    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas enviar a papelera esta Unidad de Medida?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/unitOfMeasurementLogicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchUnitsOfMeasurement();
        } catch (err) {
            alert("Error al eliminar la Unidad de Medida.");
        }
    };

    // Restore UnitOfMeasurement (undo delete) -----------------------
    const handleRestore = async (id) => {
        if (!confirm("¿Restaurar la Unidad de Medida?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/unitOfMeasurementRestore",
                { id },
                { withCredentials: true }
            );

            fetchUnitsOfMeasurement();
        } catch (err) {
            alert("Error al restaurar la Unidad de Medida.");
        }
    };

    // Physical Delete (delete hard) -----------------------
    const handlePhysicalDelete = async (id) => {
        if (!confirm("Esta acción eliminará la Unidad de Medida PERMANENTEMENTE. ¿Deseas Continuar?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/unitOfMeasurementPhysicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchUnitsOfMeasurement();
        } catch (err) {
            alert("Error al eliminar permanentemente la Unidad de Medida.");
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
                            Gestión de Unidades de Medida {mode === "trash" && "(Papelera)"}
                        </h3>
                        <p className="text-slate-500">
                            {mode === "active" 
                                ? "Visualiza y administra las Unidades de Medida activos" 
                                : "Papelera de Unidades de Medida eliminados"}
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

                        {/* Add UnitOfMeasurement */}
                        {mode === "active" && (
                            <button
                                className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow transition-all hover:shadow-lg hover:shadow-slate-900/20"
                                onClick={() => navigate("/dashboard/catalogs/unitsOfMeasurement/CreateUnitsOfMeasurement")}
                            >
                                <Plus />
                                Añadir Unidad de Medida
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex centermx-3 mt-4">
                    <div className="w-full max-w-sm relative">
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition-all"
                            placeholder="Buscar una Unidad de Medida"
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
                            <th className="p-4 border-y border-slate-200 bg-slate-50">
                                <p className="flex items-center justify-center gap-2 text-sm font-normal text-slate-500">
                                    Abreviación
                                    <ArrowDownUp />
                                </p>
                            </th>
                            <th className="p-4 border-y border-slate-200 bg-slate-50"></th>
                        </tr>
                        
                    </thead>
                    

                    {/* Body */}
                    <tbody>
                        {filteredUnitsOfMeasurement.length === 0 && (
                            <tr>
                                <td colSpan="2" className="p-4 text-center text-slate-500">
                                    No hay Unidades de Medida para mostrar
                                </td>
                            </tr>
                        )}

                        {filteredUnitsOfMeasurement.map((UoM) => (
                            <tr key={UoM.id}>
                                {/* UoM's name */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {UoM.name}
                                        </p>
                                    </div>
                                </td>

                                {/* UoM's abbreviation */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {UoM.abbreviation}
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
                                                onClick={() => navigate(`/dashboard/Catalogs/unitsOfMeasurement/edit/${UoM.id}`)}
                                            >
                                                <SquarePen />
                                            </button>
                                        )}

                                        {/* Move to trah can */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleDelete(UoM.id)}
                                            >
                                                <Trash />
                                            </button>
                                        )}

                                        {/* Restore from trash can */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleRestore(UoM.id)}
                                            >
                                                <RotateCcw />
                                            </button>
                                        )}

                                        {/* Hard delete */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-red-100"
                                                onClick={() => handlePhysicalDelete(UoM.id)}
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