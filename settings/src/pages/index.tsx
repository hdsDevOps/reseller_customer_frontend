import React from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "./Settings";
import MyStaff from "./MyStaff";

const DomainApp: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-staff" element={<MyStaff />} />

      </Routes>
    </div>
  );
};

export default DomainApp;