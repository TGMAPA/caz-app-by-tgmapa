// Modules
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Component imports
import LoginPage from "./pages/login/loginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  )
}

export default App
