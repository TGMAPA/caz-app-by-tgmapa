// Modules
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Server Domain
import { DOMAIN_URL_SERVER } from "../../../config.js";


export default function EditUnitsOfMeasurement() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState("");
    const [originalName, setoriginalName] = useState("");
    const [abbreviation, setabbreviation] = useState(""); 

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Load UnitsOfMeasurement data ------------ 
    const getUnitsOfMeasurement = async () => {
        try {
            const result = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getUnitOfMeasurementBy",
                { id },
                { withCredentials: true }
            );

            if (result.data.UnitsOfMeasurement?.length === 1) {
                setName(result.data.UnitsOfMeasurement[0].name);
                setoriginalName(result.data.UnitsOfMeasurement[0].name);
                setabbreviation(result.data.UnitsOfMeasurement[0].abbreviation)
            } else {
                setError("No se encontró la Unidad de Medida.");
            }

        } catch (err) {
            console.error(err);
            setError("Hubo un error al cargar la información de la Unidad de Medida.");
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getUnitsOfMeasurement();
    }, [id]);

    // Submit updated UnitsOfMeasurement -------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("El nombre de la Unidad de Medida es obligatorio.");
            return;
        }

        try {
            setLoading(true);

            if (name.trim() !== originalName.trim()){
                // Validate that this name doesnt exist if the data was modified
                const result = await axios.post(
                    DOMAIN_URL_SERVER + "/Catalogs/getUnitOfMeasurementBy",
                    { name : name },
                    { withCredentials: true }
                );
                
                if (result.data.UnitsOfMeasurement.length > 0) {
                    // There isnt any UoM with the desired name
                    setError("Ya existe una Unidad de Medida con ese nombre.");
                    setLoading(false);
                    return 
                }
            }
            
            // Update Unit of measurement -------------
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/updateUnitOfMeasurement",
                { data: { name , abbreviation} , id},
                { withCredentials: true }
            );

            setSuccess("Unidad de Medida actualizado exitosamente.");

            setTimeout(() => {
                navigate("/dashboard/Catalogs/unitsOfMeasurement");
            }, 1200);
            
        } catch (err) {
            console.error(err);
            setError("Error al actualizar la Unidad de Medida. Intenta nuevamente.");
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
                        <h3 className="text-lg font-semibold text-slate-800">Editar Unidad de Medida</h3>
                        <p className="text-slate-500">Modifica los datos de la Unidad de Medida seleccionado</p>
                    </div>

                    <button
                        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 
                        transition-all hover:shadow-lg hover:shadow-slate-900/20"
                        type="button"
                        onClick={() => navigate("/dashboard/Catalogs/unitsOfMeasurement")}
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
                            Nombre de la Unidad de Medida
                        </label>

                        {/* Input */}
                        <input
                            className="bg-white w-full h-11 pl-3 py-2 placeholder:text-slate-400 
                            text-slate-700 text-sm border border-slate-300 rounded 
                            transition duration-300 ease focus:outline-none focus:border-slate-500 
                            hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Ingresa el nombre de la Unidad de Medida"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Input */}
                        <input
                            className="bg-white w-full h-11 pl-3 py-2 placeholder:text-slate-400 
                            text-slate-700 text-sm border border-slate-300 rounded 
                            transition duration-300 ease focus:outline-none focus:border-slate-500 
                            hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Ingresa el nombre de la Unidad de Medida"
                            value={abbreviation}
                            onChange={(e) => setabbreviation(e.target.value)}
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
