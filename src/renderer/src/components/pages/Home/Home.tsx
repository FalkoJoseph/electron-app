import { useEffect } from "react";
import { useNavigate } from "react-router";

import { setTitlebarTitle } from "@/stores/titlebar.store";

import Button from "@/components/system/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTitlebarTitle("Welcome");
  }, []);

  return (
    <div className="p-5">
      <p>Electron App for macOS</p>

      <Button variant="primary" onClick={() => navigate("/bookmarks")}>
        Bookmarks
      </Button>

      <div className="w-100 h-200"></div>
    </div>
  );
};

export default Home;
