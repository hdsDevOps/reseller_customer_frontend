import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import AuthApp from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./auth.css";

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<h2>Loading.....</h2>}>
       <AuthApp/>
      </Suspense>
    </>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  rootElement
);
