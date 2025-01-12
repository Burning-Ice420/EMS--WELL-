import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "../frontend/src/components/dashboard/components/AdminDashboard";ca
import EmployeeDashboard from "./src/components/employee/EmployeeDashboard";
import Google from "./src/pages/Googlepa";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin/calendar" element={<Google />} />
      </Routes>
    </Router>
  );
}

export default App;
