import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
