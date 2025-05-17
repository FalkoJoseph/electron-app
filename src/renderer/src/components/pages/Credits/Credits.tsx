import { useEffect } from "react";

import { setTitlebarTitle } from "@/stores/system/titlebar.store";

const Credits = () => {
  useEffect(() => {
    setTitlebarTitle("Credits");
  }, []);

  return (
    <div className="p-5">
      <ul className="list-disc list-inside space-y-1">
        <li>
          <a href="https://electronjs.org" rel="noreferrer" target="_blank">
            Electron
          </a>
        </li>
        <li>
          <a href="https://react.dev" rel="noreferrer" target="_blank">
            React
          </a>
        </li>
        <li>
          <a href="https://tailwindcss.com" rel="noreferrer" target="_blank">
            Tailwind
          </a>
        </li>
        <li>
          <a href="https://remixicon.com" rel="noreferrer" target="_blank">
            Remix Icon
          </a>
        </li>
        <li>
          <a href="https://dndkit.com" rel="noreferrer" target="_blank">
            DnD Kit
          </a>
        </li>
        <li>
          <a href="https://ui.shadcn.com" rel="noreferrer" target="_blank">
            Shadcn
          </a>
        </li>
        <li>
          <a href="https://motion.dev" rel="noreferrer" target="_blank">
            Motion
          </a>
        </li>
        <li>
          <a
            href="https://zustand-demo.pmnd.rs/"
            rel="noreferrer"
            target="_blank"
          >
            Zustand
          </a>
        </li>
        <li>
          <a
            href="https://react-query.tanstack.com"
            rel="noreferrer"
            target="_blank"
          >
            React Query
          </a>
        </li>
        <li>
          <a href="https://reactrouter.com" rel="noreferrer" target="_blank">
            React Router
          </a>
        </li>
        <li>
          <a href="https://typescriptlang.org" rel="noreferrer" target="_blank">
            TypeScript
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Credits;
