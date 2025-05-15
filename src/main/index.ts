import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { join } from "path";

import icon from "../../resources/icon.png?asset";
import { WINDOW_DIMENSIONS } from "../shared/constants";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    height: WINDOW_DIMENSIONS.height,
    minHeight: WINDOW_DIMENSIONS.minHeight,
    minWidth: WINDOW_DIMENSIONS.minWidth,
    show: false,
    titleBarStyle: "hidden",
    vibrancy: "sidebar",
    width: WINDOW_DIMENSIONS.width,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // Handle fullscreen changes
  mainWindow.on("enter-full-screen", () => {
    mainWindow.webContents.send("window-fullscreen-change", true);
  });

  mainWindow.on("leave-full-screen", () => {
    mainWindow.webContents.send("window-fullscreen-change", false);
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    // In production, we need to use hash-based routing
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"), {
      hash: "/",
    });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

  // Handle traffic light position updates
  ipcMain.on("update-traffic-light-position", (_, position) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      window.setWindowButtonPosition(position);
    });
  });

  // Handle get fullscreen state request
  ipcMain.handle("get-fullscreen-state", () => {
    const windows = BrowserWindow.getAllWindows();
    return windows[0]?.isFullScreen() ?? false;
  });

  // Handle window resize request
  ipcMain.on("resize-window", (_, width: number) => {
    const windows = BrowserWindow.getAllWindows();
    const window = windows[0];
    if (window) {
      const [, currentHeight] = window.getSize();
      window.setSize(width, currentHeight);
    }
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
