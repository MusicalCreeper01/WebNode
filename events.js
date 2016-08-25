// const electron = require('electron')
// Module to control application life.
// const app = electron.app

exports.events = function(app) {

    /*
        Emitted when the application has finished basic startup.

        On Windows and Linux, the will-finish-launching event is the same as
        the ready event; on macOS, this event represents the applicationWillFinishLaunching
        notification of NSApplication. You would usually set up listeners for the open-file
        and open-url events here, and start the crash reporter and auto updater.
    */
    app.on('will-finish-launching', function(){
        //TODO: Auto updater: http://electron.atom.io/docs/all/#apprelaunchoptions
        //http://electron.atom.io/docs/all/#autoupdater


        /* macOS
        Emitted when the user wants to open a file with the application.
        The open-file event is usually emitted when the application is
        already open and the OS wants to reuse the application to open
        the file. open-file is also emitted when a file is dropped onto
        the dock and the application is not yet running. Make sure to listen
        for the open-file event very early in your application startup to
        handle this case (even before the ready event is emitted).

        You should call event.preventDefault() if you want to handle this event.

        On Windows, you have to parse process.argv (in the main process) to get the filepath.
        */
        app.on('open-file', function(){
            e.preventDefault();

        });

        //TODO: Parent and child windows for downloads http://electron.atom.io/docs/all/#parent-and-child-windows

        /* macOS
        Emitted when the user wants to open a URL with the application.
        The URL scheme must be registered to be opened by your application.

        You should call event.preventDefault() if you want to handle this event.
        */
        app.on('open-url', function(e){
            e.preventDefault();

        });
    });

    /*
        Emitted before the application starts closing its windows.

        Calling event.preventDefault() will prevent the default behaviour, which is terminating the application.
    */
    app.on('before-quit', function(){

    });
    /*
        Emitted when all windows have been closed and the application will quit.
        Calling event.preventDefault() will prevent the default behaviour, which is terminating the application.
    */
    app.on('will-quit', function(){

    });
    /*
        Emitted when the application is quitting.
    */
    app.on('quit', function(){

    });
    /*macOS
        Emitted when the application is activated, which usually
        happens when the user clicks on the application’s dock icon.
    */
    app.on('activate', function(){

    });

    /*
        Emitted when a browserWindow gets blurred.
    */
    app.on('browser-window-blur', function(event, window){

    });
    /*
        Emitted when a browserWindow gets focused.
    */
    app.on('browser-window-focus', function(){

    });
    /*
        Emitted when failed to verify the certificate for url, to trust the
        certificate you should prevent the default behavior with
        event.preventDefault() and call callback(true).
    */
    app.on('certificate-error', function(event, webcontents, url, error, certificate, callback){

    });

    app.on('gpu-process-crashed', function(){

    });
    /* macOS and Windows

    */
    app.on('accessibility-support-changed', function(event, accessibilitySupportEnabled ){

    });
}
