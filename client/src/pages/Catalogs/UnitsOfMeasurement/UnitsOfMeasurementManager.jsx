// Modules
import { SquarePen, ArrowDownUp, Trash, Search, Plus } from "lucide-react";


export default function UnitsOfMeasurmentManager() {
    // Main title in page
    const titlename = "Unidad de Medida"

    return( 
        <>  
            {/* Page Title */}
            <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                <div className="flex items-center justify-between ">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Lista de Categoría: {titlename} </h3>
                        <p className="text-slate-500">Visualiza la Lista de la Categoría de {titlename} para los Artículos de tu Negocio</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <button
                            className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <Plus />
                            Añadir {titlename}
                        </button>
                    </div>
                </div>
                <br/>
                
                {/* Search Bar */}
                <div className="flex centermx-3">
                    <div className="w-full max-w-sm  relative">
                        <div className="relative">
                            <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder= {"Buscar " + titlename}
                            />
                            <button
                                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button"
                                >
                                <Search />
                            </button>
                        </div>
                    </div>
                </div>
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
                                    Abreviación
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

                    {/* Table Body */}
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-slate-200">
                                <div className="flex items-center gap-3 justify-center h-full">
                                    <div className="flex flex-col text-center">
                                        <p className="text-sm font-semibold text-slate-700">
                                            Tonelada
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm text-slate-500 text-center">
                                    ton
                                </p>
                            </td>
                            

                            <td className="p-4 border-b border-slate-200 ">
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                            <SquarePen />
                                        </span>
                                    </button>
                                    <button
                                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                            <Trash />
                                        </span>
                                    </button>
                                </div>
                            </td>

                        </tr>
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