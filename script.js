var app = require('electron').app;
var ElectronData = require('electron-data');

var http = require('http');
var url = require('url')

$(".url").keyup(function (e) {
    if (e.keyCode == 13) {
        var u = $(".url").val();
        if(u.indexOf('://')<=-1)
        u = "http://" + u;

        const webview = document.getElementById('webview')
        webview.loadURL(u);
    }
});

var showingTabs = false;
$('.tabs-button').click(function(){
    toggle_tabs();
});

$('#webview-preview').click(function(){
    toggle_tabs();
});

function toggle_tabs(){
    var webviewJ = $('#webview');
    var webview = document.getElementById('webview');

    var shrunkTabHeight = $('body').height()/5;//120;
    var shrunkTabWidth = $('body').width()/4;//200;

    var bottom = 20;
    var right = 20;
    var top = ($('body').height()-shrunkTabHeight)-bottom;
    var left = ($('body').width()-shrunkTabWidth)-right;

    if(!showingTabs){
        showingTabs = true;

        webview.capturePage(function(image){
            webviewJ.hide();
            $('#webview-preview').attr('src', image.toDataURL());
            $('#webview-preview').css({
                position: 'absolute',
                height: $('body').height() - 68,
                width: $('body').width(),
                right: 0,
                bottom: 0
            });
            $('#webview-preview').show();
            $('#webview-preview').animate({
                bottom: bottom,
                right: right,
                width: shrunkTabWidth,
                height: shrunkTabHeight
            }, 2000, 'swing', function(){});
        })
    }else{
        showingTabs = false;
        $('#webview-preview').animate({
            bottom: 0,
            right: 0,
            width: $('body').width(),
            height: $('body').height()-68
        }, 2000, 'swing', function(){
            webviewJ.show();
            setTimeout(()=>{
                $('#webview-preview').hide();
            }, 1)
        });
    }
}

function checkWebview(){
    var webview = document.getElementById('webview');
    console.log(webview.getWebContents().webContents);
    if(webview.getWebContents() == "" || webview.getWebContents() == undefined){
        console.log('webview empty');
        $("webview").css({
            width:0,
            height:0
        });
    }else{
        console.log('webview has content');
        $("webview").css({
            width:'auto',
            height:'auto'
        });
    }
}

$("webview").on('load-commit', function(){
    console.log('load-commit');
});

$("webview").on('did-finish-load', function(){
    console.log('did-finish-load');
});

$("webview").on('did-fail-load', function(){
    console.log('did-fail-load');
});

$("webview").on('did-frame-finish-load', function(){
    console.log('did-frame-finish-load');
});

$("webview").on('did-start-loading', function(){
    console.log('did-start-loading');
});

$("webview").on('did-stop-loading', function(){
    console.log('did-stop-loading');
});

$("webview").on('did-get-response-details', function(){
    console.log('did-get-response-details');
});

$("webview").on('did-get-redirect-request', function(){
    console.log('did-get-redirect-request');
});

$("webview").on('dom-ready', function(){
    console.log('dom-ready');
    checkWebview();

});
/* ired when page title is set during navigation. explicitSet is false when title is synthesized from file url. */
$("webview").on('page-title-updated', function(title, explicitSet){
    console.log('‘page-title-updated');
    var t = document.getElementById('webview').getTitle()
    remote.getGlobal('mainWindow').setTitle("WebNode - " + t);
});

$("webview").on('page-favicon-updated', function(){
    console.log('page-favicon-updated');
});

$("webview").on('enter-html-full-screen', function(){
    console.log('enter-html-full-screen');
    remote.getGlobal('mainWindow').setFullScreen(true);
});

$("webview").on('leave-html-full-screen', function(){
    console.log('leave-html-full-screen');
    remote.getGlobal('mainWindow').setFullScreen(false);
});

$("webview").on('console-message', function(level, message, line, sourceid){
    console.log('console-message');
});
//http://electron.atom.io/docs/api/web-view-tag/#event-found-in-page
$("webview").on('found-in-page', function(result){
    console.log('found-in-page');
});

$("webview").on('new-window', function(){
    console.log('new-window');
});

$("webview").on('will-navigate', function(){
    console.log('will-navigate');
});

$("webview").on('did-navigate', function(url){
    console.log('did-navigate');
});

$("webview").on('did-navigate-in-page', function(isMainFrame, url){
    console.log('did-navigate-in-page');
});

$("webview").on('close', function(){
    console.log('close');
});

$("webview").on('ipc-message', function(channel, args){
    console.log('ipc-message');
});

$("webview").on('crashed', function(){
    console.log('crashed');
});

$("webview").on('gpu-crashed', function(){
    console.log('gpu-crashed');
});

$("webview").on('plugin-crashed', function(name, version){
    console.log('plugin-crashed');
});

$("webview").on('destroyed', function(){
    console.log('destroyed');
});

$("webview").on('media-started-playing', function(){
    console.log('media-started-playing');
});

$("webview").on('media-paused', function(){
    console.log('media-paused');
});
//http://electron.atom.io/docs/api/web-view-tag/#event-did-change-theme-color
$("webview").on('did-change-theme-color', function(themeColor){
    console.log('did-change-theme-color');
});
//http://electron.atom.io/docs/api/web-view-tag/#event-did-change-theme-color
$("webview").on('update-target-url', function(url){
    console.log('update-target-url');
});

$("webview").on('devtools-opened', function(){
    console.log('devtools-opened');
});

$("webview").on('devtools-closed', function(){
    console.log('devtools-closed');
});

$("webview").on('devtools-focused', function(){
    console.log('devtools-focused');
});
const remote = require('electron').remote;


$(document).ready(function(){
    remote.getGlobal('events').on('fullscreen', function(fullscreened){
        if(fullscreened){
            $('.tabs-button').css({
                left: 'auto',
                top: '140px',
                right: 0,
                bottom: 'auto',
                'border-radius': '15px 0px 0px 15px'
            });
        }else{
            $('.tabs-button').css({
                left: 'auto',
                top: 'auto',
                right: '40px',
                bottom: 0,
                'border-radius': '15px 15px 0px 0px'
            });
        }
    });

    $('#app-close').click(function(){
        var window = remote.getCurrentWindow();
        window.close();
    });
    $('#app-max').click(function(){
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });
    $('#app-min').click(function(){
        var window = remote.getCurrentWindow();
        window.minimize();
    });
});
