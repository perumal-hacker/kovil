import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { TemplePage } from "./Templepage";
import { Temple } from "./components/Events/Temple";
import { DashboardLanding } from "./components/DashboardLanding";
import { TaxForm } from "./components/TaxForm";
import DataPage from "./components/DataPage";
import SideNavBar from "./components/SideNavBar";
import EmployeeDetails from "./components/EmployeeDetails";
import StockRegister from "./components/StockRegister";
import CostLayout from "./components/cost/CostLayout";
import Notes from "./components/notes/Notes";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      {/* Initial Main Page */}
      <Route path="/" element={<TemplePage />} />

      {/* Temple Section */}
      <Route path="/poojas" element={<Temple />} />

      {/* Dashboard Section */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute
            element={
              <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                {/* Main Content Area */}
                <div style={{ display: "flex", flex: 1, backgroundColor: "white" }}>
                  {/* Sidebar */}
                  <SideNavBar />

                  {/* Page Content */}
                  <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                    <Routes>
                      <Route path="" element={<Navigate to="/dashboard/home" />} />
                      <Route path="/home" element={<DashboardLanding />} />
                      <Route path="/tax-form" element={<TaxForm />} />
                      <Route path="/data" element={<DataPage />} />
                      <Route path="/stock" element={<StockRegister />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/cost" element={<CostLayout />} />
                      <Route path="/employee" element={<EmployeeDetails />} />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        }
      />

      {/* Other Routes */}
      <Route path="/notes" element={<Notes />} />
      <Route path="/stock-register" element={<StockRegister />} />
      <Route path="/tax-form" element={<TaxForm />} />
      <Route path="/cost-layout" element={<CostLayout />} />
    </Routes>
  );
};

export default App;
