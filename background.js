'use strict';

var settings = {
  left: {
    width: 50
  }
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({"settings": settings}, function() {
    console.log('Stored default settings:', settings);
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "jquery-3.5.1.min.js"}, function() {
    chrome.tabs.executeScript(tab.id, {file: "action.js"});
  });
});

chrome.webRequest.onHeadersReceived.addListener(
  info => {
    const headers = info.responseHeaders;
    //console.log(headers);
    for (let i=headers.length-1; i>=0; --i) {
      let header = headers[i].name.toLowerCase();
      //console.log("Header: {" + header + ": " + headers[i].value + "}");
      if(header === "x-frame-options" || header === "frame-options") {
        console.log("Removed: " + header);
        headers.splice(i, 1);
      }
      if(header === "content-security-policy") {
        let old = headers[i].value;
        let edited = "frame-ancestors https:" //FIXME: https hardcoded
        console.log("Edited: " + old + " -> " + edited);
        headers[i].value = edited;
        //headers[i].value = headers[i].value.replace("frame-src", "frame-src https:");
      }
    }
    return {responseHeaders: headers};
  },
  {
    urls: ["<all_urls>"],
    types: ["sub_frame", "main_frame"]
  },
  ["blocking", "responseHeaders", "extraHeaders"]
);
