// Modules
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Component imports
import LoginPage from "./pages/login/loginPage";
import MainScreen from "./pages/MainScreen/MainScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/dashboard" element={<MainScreen />} /> 
      </Routes>
    </Router>
  )
}

export default App
