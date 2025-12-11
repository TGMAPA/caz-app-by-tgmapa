// Modules
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Server Domain
import { DOMAIN_URL_SERVER } from "../../../config.js";


export default function EditGroup() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Load group data ------------ 
    const getGroup = async () => {
        try {
            const result = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getGroupBy",
                { id },
                { withCredentials: true }
            );

            if (result.data.Group?.length === 1) {
                setName(result.data.Group[0].name);
            } else {
                setError("No se encontró el grupo.");
            }

        } catch (err) {
            console.error(err);
            setError("Hubo un error al cargar la información del grupo.");
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getGroup();
    }, [id]);

    // Submit updated group -------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("El nombre del grupo es obligatorio.");
            return;
        }

        try {
            setLoading(true);

            // Update group -------------
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/updateGroup",
                { data: { name } , id},
                { withCredentials: true }
            );

            setSuccess("Grupo actualizado exitosamente.");

            setTimeout(() => {
                navigate("/dashboard/Catalogs/groups");
            }, 1200);

        } catch (err) {
            console.error(err);
            setError("Error al actualizar el grupo. Intenta nuevamente.");
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
                        <h3 className="text-lg font-semibold text-slate-800">Editar Grupo</h3>
                        <p className="text-slate-500">Modifica los datos del grupo seleccionado</p>
                    </div>

                    <button
                        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 
                        transition-all hover:shadow-lg hover:shadow-slate-900/20"
                        type="button"
                        onClick={() => navigate("/dashboard/Catalogs/groups")}
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
                            Nombre del Grupo
                        </label>

                        {/* Input */}
                        <input
                            className="bg-white w-full h-11 pl-3 py-2 placeholder:text-slate-400 
                            text-slate-700 text-sm border border-slate-300 rounded 
                            transition duration-300 ease focus:outline-none focus:border-slate-500 
                            hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Ingresa el nombre del grupo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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
