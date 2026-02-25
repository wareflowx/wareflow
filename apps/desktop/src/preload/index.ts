import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ipcRenderer,
      platform: process.platform
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.electron = {
    ipcRenderer,
    platform: process.platform
  }
}
