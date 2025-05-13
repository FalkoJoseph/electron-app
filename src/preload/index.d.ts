import { ElectronAPI } from "@electron-toolkit/preload";

interface IElectronAPI extends ElectronAPI {
  // ... existing code ...
}

interface IAPI {
  updateTrafficLightPosition: (position: { x: number; y: number }) => void;
}

declare global {
  interface Window {
    api: IAPI;
    electron: IElectronAPI;
  }
}
