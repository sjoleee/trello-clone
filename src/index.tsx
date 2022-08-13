import React from "react";
import { ThemeProvider } from "styled-components";
import ReactDOM from "react-dom/client";
import App from "./App";
import { defaultTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
