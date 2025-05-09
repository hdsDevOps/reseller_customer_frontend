import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Header from "../components/Header";

import DomainApp from "domains/DomainApp";
import PaymentApp from "payments/PaymentApp";
import HistoryApp from "billinghistory/HistoryApp";
import SettingsApp from "settings/SettingsApp";
import EmailApp from "email/EmailApp";

import HdsProfile from "../components/HdsProfile";     
import PlanCard from "./PlanCards";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getProfileDataThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import Footer from "../components/Footer";
import Dashboard from "./Dashboard";
import ChooseYourPlan from "../components/planFlow/ChooseYourPlan";
import BusinessInfo from "../components/planFlow/BusinessInfo";
import Subscribe from "../components/planFlow/Subscribe";
import ChooseDomain from "../components/planFlow/ChooseDomain";
import DomainList from "../components/planFlow/DomainList";
import SelectedDomainDetails from "../components/planFlow/SelectedDomainDetails";
import HowToSignInToDomain from "../components/planFlow/HowToSignInToDomain";
import TrialSummary from "../components/planFlow/TrialSummary";
import GeminiSummary from "../components/planFlow/GeminiSummary";
import AdminHeader from "../components/AdminHeader";
import LadningPage from "./LadningPage";
import LandingApp from "./LandingApp";

const Navbar = lazy(() => import("../components/Navbar"));
const Header = lazy(() => import("../components/Header"));

// const DomainApp = lazy(() => import("domains/DomainApp"));
// const PaymentApp = lazy(() => import("payments/PaymentApp"));
// const HistoryApp = lazy(() => import("billinghistory/HistoryApp"));
// const SettingsApp = lazy(() => import("settings/SettingsApp"));
// const EmailApp = lazy(() => import("email/EmailApp"));

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/upgrade-plan/*", element: <PlanCard /> },
  { path: "/profile", element: <HdsProfile /> },
  { path: "/choose-your-plan", element: <ChooseYourPlan /> },
  { path: "/business-information", element: <BusinessInfo /> },
  { path: "/subscribe-plan", element: <Subscribe /> },
  { path: "/choose-your-domain", element: <ChooseDomain /> },
  { path: "/choose-from-list", element: <DomainList /> },
  { path: "/selected-domain-details", element: <SelectedDomainDetails /> },
  { path: "/how-you-will-sign-in-to-domain", element: <HowToSignInToDomain /> },
  { path: "/free-trial-page", element: <TrialSummary /> },
  { path: "/gemini-summary", element: <GeminiSummary /> },
];

const MainApp: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useAppSelector(state => state.auth);

  return (
  <div className="main-wrapper">
    {
      location.pathname === "/home-page" || location.pathname === "/ai-page"
      ? (
        <React.Fragment>
          <LandingApp />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {
            isAdmin && (<AdminHeader />)
          }
          <Header />
          <div className={`content-body relative min-h-screen pl-[5.2rem] lg:pl-[17rem] ${isAdmin ? "pt-[150px]" : "pt-[80px]"} pr-[0.8rem] pb-4`}>
            <ToastContainer />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
            <LandingApp />

            <DomainApp />
            <SettingsApp/>
            <PaymentApp />
            <HistoryApp />
            <EmailApp />

            <div className="absolute bottom-0 left-0 right-0 w-full">
              <Footer />
            </div>
          </div>
          <Navbar />
        </React.Fragment>
      )
    }
  </div>
  )

};

export default MainApp;
