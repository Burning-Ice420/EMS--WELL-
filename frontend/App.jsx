import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "../frontend/src/components/dashboard/components/AdminDashboard";
import AdminCalendar from "./src/components/dashboard/AdminCalendar";
import EmployeeCalendar from "./src/components/employee/EmployeeCalendar";
import EmployeeDashboard from "./src/components/employee/EmployeeDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin" component={AdminDashboard} />
        <Route path="/admin/calendar" component={AdminCalendar} />
        <Route exact path="/employee-dashboard" component={EmployeeDashboard} />
        <Route
          path="/employee-dashboard/calendar"
          component={EmployeeCalendar}
        />
        {/* Other routes */}
      </Switch>
    </Router>
  );
}

export default App;
