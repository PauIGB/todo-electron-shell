//@ts-check
import { app, BrowserWindow } from 'electron'
import path from 'node:path'

const createWindow = () => {
  const win = new BrowserWindow({
    height: 800,
    width: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // for MacOS when app is running but without opened windows
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
