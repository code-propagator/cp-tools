'use strict';

var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var url = require('url');

var createWindow = function createWindow(width, height, pathname) {
  var myWindow = void 0;

  myWindow = new BrowserWindow({
    show: false,
    width: width,
    height: height,
    'web-preferences': {
      'web-security': false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    myWindow.webContents.openDevTools();
  }

  myWindow.on('closed', function () {
    myWindow = null;
  });

  myWindow.webContents.on('did-finish-load', function () {
    if (!myWindow) {
      throw new Error('myWindow is not defined');
    }
    myWindow.show();
    myWindow.focus();
  });

  myWindow.loadURL(url.format({
    pathname: pathname,
    protocol: 'file:',
    slashes: true
  }));

  return myWindow;
};

module.exports.createWindow = createWindow;