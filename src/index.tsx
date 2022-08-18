import React from "react";
import { ThemeProvider } from "styled-components";
import ReactDOM from "react-dom/client";
import App from "./App";
import { defaultTheme } from "./theme";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./GlobalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
