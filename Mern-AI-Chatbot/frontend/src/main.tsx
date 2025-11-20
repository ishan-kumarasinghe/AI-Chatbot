import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.tsx";

const theme = createTheme({ typography: { fontFamily: "Roboto Slab, Serif" } });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {
      (() => {
        const Provider = AuthProvider();
        return (
          <Provider>
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </BrowserRouter>
          </Provider>
        );
      })()
    }
  </StrictMode>
);
