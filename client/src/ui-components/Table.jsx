export default function Table(){
    return(
        <div className="min-h-screen flex flex-col font-sans">
            <div className="p-8 max-w-6xl mx-auto ">
            
                

                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                    <tr>
                        <th className="text-left px-4 py-2">Nombre</th>
                        <th className="text-left px-4 py-2">Descripción</th>
                        <th className="text-left px-4 py-2">Usuarios</th>
                        <th className="text-left px-4 py-2">Privilegios</th>
                        <th className="text-center px-4 py-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {}
                    {/*filteredPositions.length === 0 && (
                        <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-400">No se encontraron roles</td>
                        </tr>
                    )*/}
                    </tbody>
                </table>
                </div>

                
            </div>
        </div>
    );
}