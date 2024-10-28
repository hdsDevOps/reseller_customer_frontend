// src/index.tsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppSelector } from "store/hooks";
import "auth/AuthCss";
import "./index.css";

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<h2>Loading.....</h2>}>
      {token ? <MainApp /> : <AuthApp />}
    </Suspense>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <UserAuth>
          <App />
        </UserAuth>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  rootElement
);
