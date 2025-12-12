// Modules
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Server Domain
import { DOMAIN_URL_SERVER } from "../../../config.js";


export default function EditLine() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState("");
    const [groupID, setGroupID] = useState("");
    const [groups, setGroups] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Load groups --------------------
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

    // Load line data ------------ 
    const getLine = async () => {
        try {
            const result = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getLineBy",
                { id },
                { withCredentials: true }
            );

            if (result.data.Line?.length === 1) {
                const line = result.data.Line[0];
                setName(line.name);
                setGroupID(line.groupID);
            } else {
                setError("No se encontró la línea.");
            }

        } catch (err) {
            console.error(err);
            setError("Hubo un error al cargar la información de la línea.");
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchGroups();
        getLine();
    }, [id]);

    // Submit updated line -------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("El nombre de la línea es obligatorio.");
            return;
        }

        if (!groupID) {
            setError("Debes seleccionar un Grupo asociado.");
            return;
        }

        try {
            setLoading(true);
            
            // Search for lines with the same name
            const result = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getLineBy",
                { name },
                { withCredentials: true }
            );

            const existingLines = result.data.Line || [];

            // Search if theres any other duplicate inside the asociated group
            const duplicated = existingLines.some(
                (line) => line.groupID === Number(groupID) && line.id !== Number(id)
            );

            if (duplicated) {
                setError("Ya existe una línea con este nombre dentro de este grupo.");
                setLoading(false);
                return;
            }

            // Update line  -------------
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/updateLine",
                { data: { name, groupID } , id},
                { withCredentials: true }
            );

            setSuccess("Línea actualizada exitosamente.");

            setTimeout(() => {
                navigate("/dashboard/Catalogs/lines");
            }, 1200);

        } catch (err) {
            console.error(err);
            setError("Error al actualizar la línea. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // ---------- FRONTEND ----------
    return (
        <>
            {/* Page Header */}
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Editar Línea</h3>
                        <p className="text-slate-500">Modifica los datos de la línea seleccionada</p>
                    </div>

                    <button
                        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 
                        transition-all hover:shadow-lg hover:shadow-slate-900/20"
                        type="button"
                        onClick={() => navigate("/dashboard/Catalogs/lines")}
                    >
                        <ArrowLeft />
                        Regresar
                    </button>
                </div>

                <br />
            </div>

            {/* Loading State */}
            {loadingData ? (
                <div className="mx-4 mt-6 text-slate-600">Cargando información...</div>
            ) : (
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
                            <Save />
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
