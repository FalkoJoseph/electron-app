import { useEffect } from "react";

import { setTitlebarTitle } from "@/stores/system/titlebar.store";

const Bookmarks = () => {
  useEffect(() => {
    setTitlebarTitle("");
  }, []);

  return <div className="p-5">Split pane view</div>;
};

export default Bookmarks;
