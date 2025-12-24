// Modules
import { Plus, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from "../../../config.js";

export default function CreateArticle() {

    const navigate = useNavigate();

    // -------- Form State --------
    const [keyID, setKeyID] = useState("");
    const [name, setName] = useState("");
    const [lineID, setLineID] = useState("");
    const [measurementUnit, setMeasurementUnit] = useState("");
    const [cost, setCost] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [discontinued, setDiscontinued] = useState(1);

    // Catalogs
    const [lines, setLines] = useState([]);
    const [units, setUnits] = useState([]);

    // UI
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // -------- Load Lines --------
    const fetchLines = async () => {
        try {
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllLines",
                {},
                { withCredentials: true }
            );

            setLines(res.data.Lines.filter(l => l.LogDelete === null));
        } catch (err) {
            console.error("Error cargando líneas", err);
        }
    };

    // -------- Load Units --------
    const fetchUnits = async () => {
        try {
            const res = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllUnitsOfMeasurement",
                {},
                { withCredentials: true }
            );

            setUnits(res.data.UnitsOfMeasurements.filter(u => u.LogDelete === null));
        } catch (err) {
            console.error("Error cargando unidades", err);
        }
    };

    useEffect(() => {
        fetchLines();
        fetchUnits();
    }, []);

    // -------- Submit --------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!keyID || !name || !lineID || !measurementUnit || !cost || !sellingPrice) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/createArticle",
                {
                    keyID,
                    name,
                    lineID,
                    measurementUnit,
                    cost,
                    sellingPrice,
                    discontinued
                },
                { withCredentials: true }
            );

            setSuccess("Artículo creado exitosamente.");

            setTimeout(() => {
                navigate("/dashboard/catalogs/articles");
            }, 1200);

        } catch (err) {
            console.error(err);
            setError("Error al crear el artículo. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                {/* Page Header */}
                <div className="mx-4 relative  mt-4  text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                                Crear Nuevo Artículo
                            </h3>
                            <p className="text-slate-500">
                                Añade un Artículo al inventario
                            </p>
                        </div>

                        <button
                            className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 
                            transition-all hover:shadow-lg hover:shadow-slate-900/20"
                            type="button"
                            onClick={() => navigate("/dashboard/catalogs/articles")}
                        >
                            <ArrowLeft />
                            Regresar
                        </button>
                    </div>
                    <br />
                </div>

                {/* Form */}
                <div className="mt-8 bg-white shadow-sm border border-slate-200 rounded-xl p-6 pb-20">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Key */}
                        <label className="text-sm font-semibold text-slate-700">Clave</label>
                        <input
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={keyID}
                            onChange={(e) => setKeyID(e.target.value)}
                        />

                        {/* Name */}
                        <label className="text-sm font-semibold text-slate-700">Nombre</label>
                        <input
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Line */}
                        <label className="text-sm font-semibold text-slate-700">Línea</label>
                        <select
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={lineID}
                            onChange={(e) => setLineID(e.target.value)}
                        >
                            <option value="">Selecciona una línea</option>
                            {lines.map(line => (
                                <option key={line.id} value={line.id}>
                                    {line.name}
                                </option>
                            ))}
                        </select>

                        {/* Unit */}
                        <label className="text-sm font-semibold text-slate-700">
                            Unidad de Medida
                        </label>
                        <select
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={measurementUnit}
                            onChange={(e) => setMeasurementUnit(e.target.value)}
                        >
                            <option value="">Selecciona una unidad</option>
                            {units.map(unit => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.name}
                                </option>
                            ))}
                        </select>

                        {/* Cost */}
                        <label className="text-sm font-semibold text-slate-700">Costo</label>
                        <input
                            type="number"
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />

                        {/* Selling Price */}
                        <label className="text-sm font-semibold text-slate-700">
                            Precio de Venta
                        </label>
                        <input
                            type="number"
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(e.target.value)}
                        />

                        {/* State */}
                        <label className="text-sm font-semibold text-slate-700">Estado</label>
                        <select
                            className="bg-white w-full h-11 pl-3 border border-slate-300 rounded shadow-sm"
                            value={discontinued}
                            onChange={(e) => setDiscontinued(Number(e.target.value))}
                        >
                            <option value={1}>Activo</option>
                            <option value={0}>Descontinuado</option>
                        </select>

                        {/* Messages */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}

                        {/* Submit */}
                        <button
                            className="flex items-center justify-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-sm font-semibold text-white shadow-md 
                            transition-all hover:shadow-lg disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            <Plus />
                            {loading ? "Guardando..." : "Crear Artículo"}
                        </button>

                    </form>
                </div>
        </>
    );
}
