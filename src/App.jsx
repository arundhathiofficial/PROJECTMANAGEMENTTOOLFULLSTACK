import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Help from "./components/Help";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Timesheet from "./components/Timesheet";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Feedback from "./components/Feedback";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/feedback" element={<Feedback/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
