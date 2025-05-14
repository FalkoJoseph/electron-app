import { ElectronAPI } from "@electron-toolkit/preload";

interface IElectronAPI extends ElectronAPI {
  // ... existing code ...
}

interface IAPI {
  getFullscreenState: () => Promise<boolean>;
  updateTrafficLightPosition: (position: { x: number; y: number }) => void;
  onFullscreenChange: (callback: (isFullscreen: boolean) => void) => void;
}

declare global {
  interface Window {
    api: IAPI;
    electron: IElectronAPI;
  }
}
