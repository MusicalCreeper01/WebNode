const electron = require('electron')
// Module to control application life.
const app = electron.app
console.log(electron.app)
// require('./events')(app);
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Import events module
var events = require('events');
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
global.events = eventEmitter;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tabWindow;

function createWindow () {
    //TODO: http://electron.atom.io/docs/all/#systempreferences

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#2d2d2d',
        minWidth: 100,
        minHeight: 100,
        frame: false,
        titleBarStyle: 'hidden', // http://electron.atom.io/docs/api/frameless-window/#alternatives-on-macos
        darkTheme: true,
        title: "WebNode Browser",
        icon: 'img/icon.ico'
    })

    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
        // Set the save path, making Electron not to prompt a save dialog.
        // item.setSavePath('/tmp/save.pdf')

        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully')
            } else {
                console.log(`Download failed: ${state}`)
            }
        })
    })

    //http://electron.atom.io/docs/all/#showing-window-gracefully
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('resize', function(){
        if(mainWindow.isFullScreen())
            eventEmitter.emit('fullscreen', true);
        else
            eventEmitter.emit('fullscreen', false);
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools({mode: 'detach'});

    //win.setSheetOffset(offsetY[, offsetX]
    //http://electron.atom.io/docs/api/browser-window/#winsetsheetoffsetoffsety-offsetx-macos
    global.mainWindow = mainWindow;

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        if(tabWindow != undefined && tabWindow != null)
            tabWindow.close();
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
