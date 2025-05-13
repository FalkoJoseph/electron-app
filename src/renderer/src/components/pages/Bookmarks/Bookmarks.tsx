import { useEffect } from "react";
import { useNavigate } from "react-router";

import { setTitlebarTitle } from "@/stores/titlebar.store";

import Button from "@/components/system/Button/Button";

const Bookmarks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTitlebarTitle("Bookmarks");
  }, []);

  return (
    <div className="p-5">
      <h1>Bookmarks</h1>
      <Button variant="primary" onClick={() => navigate("/")}>
        Home
      </Button>
    </div>
  );
};

export default Bookmarks;
