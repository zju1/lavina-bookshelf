import "@fontsource-variable/geologica";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../lib/styles/appTheme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.config";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { ConfirmProvider } from "material-ui-confirm";

export function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConfirmProvider
            defaultOptions={{
              dialogProps: {
                className: "confirmDialog",
              },
            }}
          >
            <RouterProvider router={routes} />
          </ConfirmProvider>
          <Toaster theme="light" richColors position="top-center" />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
