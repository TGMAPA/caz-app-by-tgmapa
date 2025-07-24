// Modules
import { SquarePen, ArrowDownUp, Trash, Search } from "lucide-react";

// Server Domain
import { DOMAIN_URL_SERVER } from '../../config.js';


export default function RoleManager() {
  return(
      <>
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
            <div className="flex items-center justify-between ">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Employees List</h3>
                    <p className="text-slate-500">Review each person before edit</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                    <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    View All
                    </button>
                    <button
                    className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        strokeWidth="2" className="w-4 h-4">
                        <path
                        d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                        </path>
                    </svg>
                    Add member
                    </button>
                </div>
            </div>
            <br/>
            
            <div className="mx-3">
                <div className="w-full max-w-sm min-w-[200px] relative">
                    <div className="relative">
                        <input
                        className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                        placeholder="Buscar un Artículo"
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

        <br />

        {/* Table */}
        <div className="p-0 overflow-scroll">
            <table className="w-full mt-4 text-left table-auto min-w-max">
                {/* Column Heads */}
                <thead>
                    <tr>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                            Member
                            <ArrowDownUp />
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                            Function
                            <ArrowDownUp />
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                            Status
                            <ArrowDownUp />
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                            Employed
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
                            <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold text-slate-700">
                                John Michael
                                </p>
                                <p
                                className="text-sm text-slate-500">
                                john@creative-tim.com
                                </p>
                            </div>
                            </div>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <div className="flex flex-col">
                            <p className="text-sm font-semibold text-slate-700">
                                Manager
                            </p>
                            <p
                                className="text-sm text-slate-500">
                                Organization
                            </p>
                            </div>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <div className="w-max">
                            <div
                                className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                <span className="">online</span>
                            </div>
                            </div>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="text-sm text-slate-500">
                            23/04/18
                            </p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
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