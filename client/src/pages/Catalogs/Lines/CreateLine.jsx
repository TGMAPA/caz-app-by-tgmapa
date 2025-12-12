// Modules
import { ArrowLeft, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../../config.js';


export default function CreateLine() {

    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState("");
    const [groupID, setGroupID] = useState(""); 
    const [groups, setGroups] = useState([]);   

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Load Groups from backend --------------------------
    const fetchGroups = async () => {
        try {
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllGroups",
                {},
                { withCredentials: true }
            );

            setGroups(res.data.Groups.filter(g => g.LogDelete === null));
        } catch (err) {
            console.error("Error cargando grupos", err);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    // Function for making new line submition --------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("El nombre de la Línea es obligatorio.");
            return;
        }

        if (!groupID) {
            setError("Debes seleccionar un Grupo asociado.");
            return;
        }

        try {
            setLoading(true);

            // Search all lines with the same name
            const result = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getLineBy",
                { name: name },
                { withCredentials: true }
            );

            const existingLines = result.data.Line || [];

            // Verify if this line already exists inside the same selected group
            const duplicatedInGroup = existingLines.some(
                (line) => line.groupID === Number(groupID)
            );

            if (duplicatedInGroup) {
                setError("Ya existe una línea con este nombre dentro del grupo seleccionado.");
                setLoading(false);
                return;
            }

            // If there's not any duplicated lines, create line
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/createLine",
                { name, groupID },
                { withCredentials: true }
            );

            setSuccess("Línea creada exitosamente.");

            // Redirect after 1 second
            setTimeout(() => {
                navigate("/dashboard/Catalogs/lines");
            }, 1200);

        } catch (err) {
            console.error(err);
            setError("Error al crear la línea. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* Page Header */}
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Crear Nueva Línea</h3>
                        <p className="text-slate-500">Añade una Línea asociada a un Grupo Existente en tu Negocio</p>
                    </div>

                    <button
                        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 
                        transition-all hover:shadow-lg hover:shadow-slate-900/20"
                        type="button"
                        onClick={() => navigate("/dashboard/catalogs/lines")}
                    >
                        <ArrowLeft />
                        Regresar
                    </button>
                </div>

                <br />
            </div>

            {/* Form */}
            <div className="mx-4 mt-6 bg-white shadow-sm border border-slate-200 rounded-xl p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Label */}
                    <label className="text-sm font-semibold text-slate-700">
                        Nombre de la Línea
                    </label>

                    {/* Input */}
                    <input
                        className="bg-white w-full h-11 pl-3 py-2 placeholder:text-slate-400 
                        text-slate-700 text-sm border border-slate-300 rounded 
                        transition duration-300 ease focus:outline-none focus:border-slate-500 
                        hover:border-slate-400 shadow-sm focus:shadow-md"
                        placeholder="Ingresa el nombre de la línea"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Label */}
                    <label className="text-sm font-semibold text-slate-700">
                        Grupo Asociado
                    </label>

                    {/* Input */}
                   <select
                        className="bg-white w-full h-11 pl-3 pr-3 py-2 text-slate-700 text-sm border border-slate-300 rounded 
                        transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-400 
                        shadow-sm focus:shadow-md"
                        value={groupID}
                        onChange={(e) => setGroupID(e.target.value)}
                    >
                        <option value="">Selecciona un grupo</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* Success Message */}
                    {success && (
                        <p className="text-green-600 text-sm">{success}</p>
                    )}

                    {/* Submit button */}
                    <button
                        className="flex items-center justify-center gap-2 rounded bg-slate-800 
                        py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-slate-900/10 
                        transition-all hover:shadow-lg hover:shadow-slate-900/20 
                        disabled:pointer-events-none disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        <Plus />
                        {loading ? "Guardando..." : "Crear Línea"}
                    </button>

                </form>
            </div>
        </>
    );
}
