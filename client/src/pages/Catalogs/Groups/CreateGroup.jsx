// Modules
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../../config.js';

export default function CreateGroup() {

    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Function for making new group submition --------------------------
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

            // Validate that this name doesnt exist
            const result = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getGroupBy",
                { name : name },
                { withCredentials: true }
            );
            
            if (result.data.Group.length === 0) {
                // There isnt any group with the desired name

                // Create group
                const res = await axios.post(
                    DOMAIN_URL_SERVER + "/Catalogs/createGroup",
                    { name },
                    { withCredentials: true }
                );

                setSuccess("Grupo creado exitosamente.");

                // Redirect after 1 second
                setTimeout(() => {
                    navigate("/dashboard/Catalogs/groups");
                }, 1200);
            } else{
                // Duplicate detected
                setError("Ya existe un grupo con ese nombre.");
                setLoading(false);
                return;
            }

        } catch (err) {
            console.error(err);
            setError("Error al crear el grupo. Intenta nuevamente.");
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
                        <h3 className="text-lg font-semibold text-slate-800">Crear Nuevo Grupo</h3>
                        <p className="text-slate-500">Añade un Grupo para las Líneas de tu Negocio</p>
                    </div>

                    <button
                        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 
                        transition-all hover:shadow-lg hover:shadow-slate-900/20"
                        type="button"
                        onClick={() => navigate("/dashboard/catalogs/groups")}
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
                        <Plus />
                        {loading ? "Guardando..." : "Crear Grupo"}
                    </button>

                </form>
            </div>
        </>
    );
}
