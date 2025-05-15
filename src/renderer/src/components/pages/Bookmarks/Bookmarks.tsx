import { useEffect } from "react";

import { setTitlebarTitle } from "@/stores/system/titlebar.store";

const Bookmarks = () => {
  useEffect(() => {
    setTitlebarTitle("Bookmarks");
  }, []);

  return <div className="p-5">Bookmarks</div>;
};

export default Bookmarks;
