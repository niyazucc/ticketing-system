import React from "react";
import Navbar from "./Navbar"; // Sidebar component

const DashboardLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="col py-3">
          {children} {/* Dashboard content will go here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
