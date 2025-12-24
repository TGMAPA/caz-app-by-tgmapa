// Modules
import { SquarePen, ArrowDownUp, Trash, Search, Plus, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../../config.js';



export default function ArticlesManager() {

    const navigate = useNavigate();

    // States
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");

    // mode = "active" → active elements view
    // mode = "trash" → trash elements view
    const [mode, setMode] = useState("active"); 

    // Filters
    const [filterName, setFilterName] = useState("");
    const [filterMeasurementUnit, setfilterMeasurementUnit] = useState("");
    const [filterLine, setFilterLine] = useState("");
    const [filterState, setFilterState] = useState("");
    const [filterGroup, setFilterGroup] = useState("");

     // Fetch Articles ----------------------------
    const fetchArticles = async () => {
        try {
            const response = await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/getAllArticles",
                {},
                { withCredentials: true }
            );
            // Set Articles from response
            setArticles(response.data.Articles);

        } catch (error) {
            console.error("Error al cargar los artículos disponibles.");
        }
    };

     // Load Articles from backend ----------------------------
    useEffect(() => {
        fetchArticles();
    }, []);

    // Unique Values --------------------------
    const uniqueNames = [...new Set(articles.map(art => art.name))];
    const uniqueMeasurementUnit = [...new Set(articles.map(art => art.unitName))];
    const uniqueLines = [...new Set(articles.map(art => art.lineName))];
    const uniqueGroups = [...new Set(articles.map(art => art.groupName))];

    const stateMap = {
        0: "Descontinuado",
        1: "Activo"
    };

    const uniqueStates = [
        ...new Set(articles.map(art => stateMap[art.discontinued]))
    ];
    
    // Filter Articles ----------------------------
    const filteredArticles = articles
        // Active or Trash view
        .filter(article => mode === "active"
            ? article.LogDelete === null 
            : article.LogDelete !== null
        )
        // Search
        .filter(article =>
            article.name.toLowerCase().includes(search.toLowerCase())
        )
        // Filter by Name
        .filter(article =>
            filterName ? article.name === filterName : true
        )
        // Filter by uniqueMeasurementUnit
        .filter(article =>
            filterMeasurementUnit ? article.unitName === filterMeasurementUnit : true
        )
        // Filter by Line
        .filter(article =>
            filterLine ? article.lineName === filterLine : true
        )
        // Filter by Group
        .filter(article =>
            filterGroup ? article.groupName === filterGroup : true
        )
        // Filter by State
        .filter(article =>
            filterState ? stateMap[article.discontinued] === filterState : true
        );

    // LogicDelete -----------------------
    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas enviar a papelera este Artículo?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/articleLogicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchArticles();
        } catch (err) {
            alert("Error al eliminar el Artículo.");
        }
    };

    // Restore Article (undo delete) -----------------------
    const handleRestore = async (id) => {
        if (!confirm("¿Restaurar el Artículo?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/articleRestore",
                { id },
                { withCredentials: true }
            );

            fetchArticles();
        } catch (err) {
            alert("Error al restaurar el Artículo.");
        }
    };

    // Physical Delete (delete hard) -----------------------
    const handlePhysicalDelete = async (id) => {
        if (!confirm("Esta acción eliminará el Artículo PERMANENTEMENTE. ¿Deseas Continuar?")) return;

        try {
            await axios.post(
                DOMAIN_URL_SERVER + "/Catalogs/articlePhysicalDelete",
                { id },
                { withCredentials: true }
            );

            fetchArticles();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar permanentemente el Artículo.");
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
                                Gestión de Artículos {mode === "trash" && "(Papelera)"}
                            </h3>
                            <p className="text-slate-500">
                                {mode === "active" 
                                    ? "Visualiza y administra las Artículos activos" 
                                    : "Papelera de Artículos eliminados"}
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

                            {/* Add Article */}
                            {mode === "active" && (
                                <button
                                    className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow transition-all hover:shadow-lg hover:shadow-slate-900/20"
                                    onClick={() => navigate("/dashboard/catalogs/articles/CreateArticle")}
                                >
                                    <Plus />
                                    Añadir Artículo
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
                            placeholder="Buscar un Artículo"
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
                        <option value="">Filtrar por Nombre</option>
                        {uniqueNames.map((name, i) => (
                            <option key={i} value={name}>{name}</option>
                        ))}
                    </select>

                    {/* Filter UNitOfMeasurement */}
                    <select
                        className="bg-white w-full h-10 px-3 text-sm border border-slate-200 rounded shadow-sm"
                        value={filterMeasurementUnit}
                        onChange={(e) => setfilterMeasurementUnit(e.target.value)}
                    >
                        <option value="">Filtrar por Unidad de Medida</option>
                        {uniqueMeasurementUnit.map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </select>

                    {/* Filter Line */}
                    <select
                        className="bg-white w-full h-10 px-3 text-sm border border-slate-200 rounded shadow-sm"
                        value={filterGroup}
                        onChange={(e) => setFilterLine(e.target.value)}
                    >
                        <option value="">Filtrar por Línea</option>
                        {uniqueLines.map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </select>

                    {/* Filter Group */}
                    <select
                        className="bg-white w-full h-10 px-3 text-sm border border-slate-200 rounded shadow-sm"
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                    >
                        <option value="">Filtrar por Grupo</option>
                        {uniqueGroups.map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </select>

                    {/* Filter State */}
                    <select
                        className="bg-white w-full h-10 px-3 text-sm border border-slate-200 rounded shadow-sm"
                        value={filterState}
                        onChange={(e) => setFilterState(e.target.value)}
                    >
                        <option value="">Filtrar por Estado</option>
                        {uniqueStates.map((g, i) => (
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
                                Clave
                                <ArrowDownUp />
                                </p>
                            </th>
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
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Unidad de Medida
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                Línea
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Grupo
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Costo
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Precio de Venta
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Fecha de Creación
                                <ArrowDownUp />
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="justify-center h-full flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Estado
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
                        {filteredArticles.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-slate-500">
                                    No hay Artículos para mostrar
                                </td>
                            </tr>
                        )}
                        {/* Show elements in table */}
                        {filteredArticles.map((article) => (
                            <tr key={article.id}>
                                {/* article Business Key */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.keyID}
                                        </p>
                                    </div>
                                </td>

                                {/* article Name */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.name}
                                        </p>
                                    </div>
                                </td>


                                {/* Article Unit of Measurement */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.unitName}
                                            {article.unitDeleted && (
                                                <span className="text-red-500 text-xs font-normal">  (Unidad de Medida Descontinuada / Eliminada)</span>
                                            )}
                                        </p>
                                    </div>
                                </td>

                                {/* Article Line */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.lineName}
                                            {article.lineDeleted && (
                                                <span className="text-red-500 text-xs font-normal">  (Grupo Descontinuado / Eliminado)</span>
                                            )}
                                        </p>
                                    </div>
                                </td>

                                {/* Article Group */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.groupName}
                                            {article.groupDeleted && (
                                                <span className="text-red-500 text-xs font-normal">  (Grupo Descontinuado / Eliminado)</span>
                                            )}
                                        </p>
                                    </div>
                                </td>

                                {/* Article Cost */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.cost}
                                        </p>
                                    </div>
                                </td>

                                {/* Article Selling price */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {article.sellingPrice}
                                        </p>
                                    </div>
                                </td>

                                {/* Article Creation date */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </td>

                                {/* Article State */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center">
                                        <div className="inline-block">
                                            {article.discontinued == 1 ? (
                                                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                    <span>Activo</span>
                                                </div>
                                            ) : (
                                                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
                                                    <span>Descontinuado</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Actions over element */}
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex justify-center items-center gap-2">

                                        {/* Edit active elements */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => navigate(`/dashboard/Catalogs/article/edit/${article.id}`)}
                                            >
                                                <SquarePen />
                                            </button>
                                        )}

                                        {/* Move to trah can */}
                                        {mode === "active" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                <Trash />
                                            </button>
                                        )}

                                        {/* Restore from trash can */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-slate-900/10"
                                                onClick={() => handleRestore(article.id)}
                                            >
                                                <RotateCcw />
                                            </button>
                                        )}

                                        {/* Hard delete */}
                                        {mode === "trash" && (
                                            <button
                                                className="relative h-10 w-10 rounded-lg hover:bg-red-100"
                                                onClick={() => handlePhysicalDelete(article.id)}
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