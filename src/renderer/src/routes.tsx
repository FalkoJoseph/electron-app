import { Layout } from "@/uikit";

import Credits from "@/components/pages/Credits/Credits";
import Home from "@/components/pages/Home/Home";
import NotFound from "@/components/pages/NotFound/NotFound";
import SplitView from "@/components/pages/SplitView/SplitView";

const routes = [
  {
    children: [
      {
        element: <Home />,
        path: "",
      },
      // Add your routes here
      {
        element: <SplitView />,
        path: "split-view",
      },
      {
        element: <Credits />,
        path: "credits",
      },
    ],
    element: <Layout />,
    path: "/",
  },
  { element: <NotFound />, path: "*" },
];

export default routes;
