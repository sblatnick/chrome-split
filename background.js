'use strict';

var settings = {
  left: {
    width: 50
  }
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({"settings": settings}, function() {
    console.log('Stored default settings:');
    console.log(settings);
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "jquery-3.5.1.min.js"}, function() {
    chrome.tabs.executeScript(tab.id, {file: "action.js"});
  });
});
