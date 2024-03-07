"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

export function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}
