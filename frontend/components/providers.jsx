"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
