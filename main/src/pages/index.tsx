import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DomainApp from "domains/DomainApp";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Setting = React.lazy(() => import("./Setting"));

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/setting", element: <Setting /> },
  // { path: "/domain/*", element: <DomainApp /> },
];

const MainApp: React.FC = () => (
  <div className="main-wrapper">
    <Navbar />
    <div className="content-body">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <DomainApp />
    </div>
    <Footer />
  </div>
);

export default MainApp;
