// Modules
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Listeners
import execListeners from "./listeners/main.listeners";


// ==================================================================
// =====================       Site's Pages     =====================
// ==================================================================

// ===================== Site's General Pages   =====================
import LoginPage from "./pages/login/loginPage";
import TestScreen from "./pages/testScreen/TestScreen";

// ===================== Main dashboard layout  =====================
import DashboardLayout from "./layouts/DashboardLayout"; 
import DashboardHome from "./pages/DashboardHome/DashboardHome";

// ===================== User Auth Sys - Pages  =====================
import RoleManager from "./pages/UserAdminPage/RoleManager";

// ===================== Business Logic - Pages =====================
// -- Catalogs --
// Groups
import GroupsManager from "./pages/Catalogs/Groups/GroupsManager";
import CreateGroup from "./pages/Catalogs/Groups/CreateGroup";
import EditGroup from "./pages/Catalogs/Groups/EditGroup";

// Lines
import LinesManager from "./pages/Catalogs/Lines/LinesManager";
import CreateLine from "./pages/Catalogs/Lines/CreateLine";
import EditLine from "./pages/Catalogs/Lines/EditLine";

// Articles
import ArticleManager from "./pages/Catalogs/Articles/ArticleManager";

// Units of Measurement
import UnitsOfMeasurementManager from "./pages/Catalogs/UnitsOfMeasurement/UnitsOfMeasurementManager";



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


          {/* Groups */}
          <Route path="catalogs/groups" element={<GroupsManager />} /> 
          {/* Create Groups */}
          <Route path="catalogs/groups/CreateGroup" element={<CreateGroup />} /> 
          <Route path="catalogs/groups/edit/:id" element={<EditGroup />} />


          {/* Lines */}
          <Route path="catalogs/lines" element={<LinesManager />} /> 
          {/* Create Lines */}
          <Route path="catalogs/lines/CreateLine" element={<CreateLine />} /> 
          <Route path="catalogs/lines/edit/:id" element={<EditLine />} />


          {/* Units Of Measurement */}
          <Route path="catalogs/unitsOfMeasurement" element={<UnitsOfMeasurementManager />} /> 


          {/* Articles */}
          <Route path="catalogs/articles" element={<ArticleManager />} /> 


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
