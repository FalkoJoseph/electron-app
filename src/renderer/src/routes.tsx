import Bookmarks from "@/components/pages/Bookmarks/Bookmarks";
import Credits from "@/components/pages/Credits/Credits";
import Home from "@/components/pages/Home/Home";
import NotFound from "@/components/pages/NotFound/NotFound";
import Layout from "@/components/system/Layout/Layout";

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
        element: <Bookmarks />,
        path: "bookmarks",
        title: "bookmarks",
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
