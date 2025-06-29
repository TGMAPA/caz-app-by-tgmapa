// Modules
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import LoginPage from "./pages/login/loginPage";
import MainScreen from "./pages/MainScreen/MainScreen";

// Listeners
import execListeners from "./listeners/main.listeners";


function App() {
  // Execute Listeners
  execListeners();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/dashboard" element={<MainScreen />} /> 
      </Routes>
    </Router>
  )
}

export default App
