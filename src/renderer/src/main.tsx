import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createHashRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import routes from "./routes";

import { useApp } from "@/App";

const queryClient = new QueryClient();
const router = createHashRouter(routes);

const App = () => {
  useApp();
  return null;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
