import { Outlet } from "react-router";

import Titlebar from "@/components/system/Titlebar/Titlebar";

export const BaseLayout = () => {
  return (
    <>
      <Titlebar />

      <div className="h-screen">
        <div className="w-[200px] absolute left-0 top-0 h-full z-10 bg-red-500">
          sidebar left
        </div>
        <Outlet />
        <div className="w-[200px] absolute right-0 top-0 h-full z-10">
          sidebar right
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
