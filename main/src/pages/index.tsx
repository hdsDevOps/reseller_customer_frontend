import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import DomainApp from "domains/DomainApp";

const Dashboard = React.lazy(() => import("./Dashboard"));

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  // { path: "/domain/*", element: <DomainApp /> },
];

const MainApp: React.FC = () => (
  <div className="main-wrapper">
    <Header />
    <div className="content-body">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <DomainApp />
    </div>
    <Navbar />
  </div>
);

export default MainApp;
