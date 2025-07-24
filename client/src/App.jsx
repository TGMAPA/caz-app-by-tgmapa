// Modules
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages imports
import LoginPage from "./pages/login/loginPage";

// Main dashboard layout
import DashboardLayout from "./layouts/DashboardLayout"; 
import DashboardHome from "./pages/DashboardHome/DashboardHome";
import RoleManager from "./pages/UserAdminPage/RoleManager";
import TestScreen from "./pages/testScreen/TestScreen";
import ArticleManager from "./pages/Articles/ArticleManager";

// Listeners
import execListeners from "./listeners/main.listeners";



function App() {
  // Execute Listeners
  execListeners();

  return (
    <Router>
      <Routes>
        
        {/* Root Page */}
        <Route path="/" element={<LoginPage />} /> 

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} /> 
        
        {/* Main Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}> 
          {/* Home Page index for dashboard */}
          <Route index element={<DashboardHome />} />

          {/* Articulos */}
          <Route path="articles" element={<ArticleManager />} /> 

          {/* Users Administration */}
          <Route path="users" element={<RoleManager />} /> 

          {/* Test Screen */}
          <Route path="testScreen" element={<TestScreen />} /> 
        </Route>

      </Routes>
    </Router>
  )
}

export default App
