import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { ChildDataProvider } from "./context/ChildContext";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ChildDataProvider>
          <App />
        </ChildDataProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
