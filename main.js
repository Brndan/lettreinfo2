const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')

// Garder une référence globale de l'objet window pour éviter le garbage collect.
let win

function createWindow() {
  // Créer le browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "static/sud.png",
    //icon: __dirname + "static/sud.png",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Ouvre les DevTools.
  //win.webContents.openDevTools()

  // supprime le menu
  win.removeMenu()

  // Émis lorsque la fenêtre est fermée.
  win.on('closed', () => {
    // Dé-référence l'objet window
    win = null
  })
}

// Cette méthode sera appelée quand Electron aura fini
app.on('ready', createWindow)

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Pour macOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Pour macOS.
  if (win === null) {
    createWindow()
  }
})
