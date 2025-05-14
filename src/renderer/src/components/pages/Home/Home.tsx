import { useEffect } from "react";
import { useNavigate } from "react-router";

import { setTitlebarTitle } from "@/stores/system/titlebar.store";

import Button from "@/components/system/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTitlebarTitle(<p className="text-system font-bold">Electron App</p>);
  }, []);

  return (
    <div className="flex flex-col p-5 gap-2">
      <div>
        <Button variant="primary" onClick={() => navigate("/bookmarks")}>
          Show bookmarks
        </Button>
      </div>
      <div>
        <Button variant="default">Chat</Button>
      </div>
      <div className="w-100 h-200"></div>
    </div>
  );
};

export default Home;
