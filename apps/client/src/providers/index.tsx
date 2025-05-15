import { TooltipProvider } from "@reactive-resume/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";

import { helmetContext } from "../constants/helmet";
import { queryClient } from "../libs/query-client";
import { AuthRefreshProvider } from "./auth-refresh";
import { DialogProvider } from "./dialog";
import { ThemeProvider } from "./theme";
import { Toaster } from "./toaster";

export const Providers = () => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <AuthRefreshProvider>
        <ThemeProvider>
          <TooltipProvider>
            <DialogProvider>
              <Outlet />

              <Toaster />
            </DialogProvider>
          </TooltipProvider>
        </ThemeProvider>
      </AuthRefreshProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
