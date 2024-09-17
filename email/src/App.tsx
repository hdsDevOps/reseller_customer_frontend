import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EmailApp from "./pages";
import ReduxProvider from "store/ReduxProvider";
import './index.scss'
const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<h2>Loading.....</h2>}>
        <EmailApp />
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
