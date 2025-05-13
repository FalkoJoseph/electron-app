import BaseLayout from "@/components/layouts/BaseLayout";

import Bookmarks from "@/components/pages/Bookmarks/Bookmarks";
import Home from "@/components/pages/Home/Home";
import NotFound from "@/components/pages/NotFound/NotFound";

const routes = [
  {
    children: [
      {
        element: <Home />,
        path: "",
      },
      // Add your routes here
      {
        element: <Bookmarks />,
        path: "bookmarks",
      },
    ],
    element: <BaseLayout />,
    path: "/",
  },
  { element: <NotFound />, path: "*" },
];

export default routes;
