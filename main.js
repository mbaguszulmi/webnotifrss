// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    Notification
} = require('electron')
const path = require('path')
const open = require('open')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScnpmript object is garbage collected.
let mainWindow

function createWindow() {
    const {screen} = require('electron')
    let mainScreen = screen.getPrimaryDisplay()
    let dimensions = mainScreen.size
    // console.log(localStorage)
    
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
        thickFrame: false,
        resizable: false
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // mainWindow.setPosition(dimensions.width-370, 10, true)

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        open(url)
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => setTimeout(createWindow, 1000))

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.