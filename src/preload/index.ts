import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
  getFullscreenState: () => ipcRenderer.invoke("get-fullscreen-state"),
  onFullscreenChange: (callback: (isFullscreen: boolean) => void) => {
    ipcRenderer.on("window-fullscreen-change", (_, isFullscreen) => {
      callback(isFullscreen);
    });
  },
  resizeWindow: (width: number) => {
    ipcRenderer.send("resize-window", width);
  },
  updateTrafficLightPosition: (position: { x: number; y: number }) => {
    ipcRenderer.send("update-traffic-light-position", position);
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
