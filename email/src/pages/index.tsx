import React from "react";
import { Route, Routes } from "react-router-dom";
const EmailList = React.lazy(() => import("./EmailList"));

const EmailApp: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/email" element={<EmailList />} />
      </Routes>
    </div>
  );
};

export default EmailApp;
