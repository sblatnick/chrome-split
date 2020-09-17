'use strict';

var settings = {};

function main()
{
  console.log(document.body);
}

chrome.storage.sync.get('settings', function(data)
{
  settings = data;
  main();
});


