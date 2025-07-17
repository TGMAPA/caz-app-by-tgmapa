// Modules
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';

// Server Domain
import { DOMAIN_URL_SERVER } from '../config.js';

// UI-Components
import Sidebar from "../ui-components/Sidebar.jsx";
import Header from "../ui-components/Header.jsx";
import Footer from "../ui-components/Footer.jsx";

export default function DashboardLayout() {
    const navigate = useNavigate();
    
    // Function for handling User Logout
    const handleLogout = async () => {
        try {
        // Request to server For user Authentication
        const response = await axios.post(
            DOMAIN_URL_SERVER + "/Auth/KillAuthUser", 
            {}, 
            { withCredentials: true }
        )
        navigate("/login");
        } catch (err) {console.log(err)}
    }

    return (
        <>
            <div className="flex h-screen bg-gray-800 text-white">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header onLogout={handleLogout} />
                    <main className="bg-white flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}