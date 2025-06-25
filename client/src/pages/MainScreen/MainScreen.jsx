


export default function MainScreen(){
    return (
        <div className="min-h-screen flex flex-col font-sans">
          {/* Header */}
          <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
            <div className="text-2xl font-bold">Materiales Pérez S.A. de C.V.</div>
          </header>
    
          {/* Main Section - Login Form */}
          <main  className="flex flex-1 items-center justify-center p-8 bg-no-repeat bg-cover bg-center">
            <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-xl">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Pagina principal</h1>
                <p className="text-gray-600 text-center">ESTA ES LA PAGINA PRINCIPAL</p>
                
            </div>
          </main>
    
        </div>
      );
}