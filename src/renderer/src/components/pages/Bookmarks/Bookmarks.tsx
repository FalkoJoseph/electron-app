import { useEffect } from "react";

import useAppStore from "@/stores/app.store";
import { setTitlebarTitle } from "@/stores/system/titlebar.store";

const Bookmarks = () => {
  const appName = useAppStore((state) => state.name);

  useEffect(() => {
    setTitlebarTitle(appName);
  }, [appName]);

  return <div className="p-5">Bookmarks</div>;
};

export default Bookmarks;
