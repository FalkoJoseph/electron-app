import { Layout } from "@/uikit/components/Layout";

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
        title: "home",
      },
      // Add your routes here
      {
        element: <SplitView />,
        path: "split-view",
        title: "split-view",
      },
      {
        element: <Credits />,
        path: "credits",
        title: "credits",
      },
    ],
    element: <Layout />,
    path: "/",
  },
  { element: <NotFound />, path: "*" },
];

export default routes;
