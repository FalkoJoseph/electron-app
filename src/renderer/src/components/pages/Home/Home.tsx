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
      <h1>Welcome</h1>
      <Button variant="primary" onClick={() => navigate("/bookmarks")}>
        Bookmarks
      </Button>
    </div>
  );
};

export default Home;
