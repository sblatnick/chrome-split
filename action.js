'use strict';

var settings = {};

function main()
{
  console.log(document);
  console.log($);
}

chrome.storage.sync.get('settings', function(data)
{
  settings = data;
  main();
});


/*
   <frameset cols = "25%,75%">
      <frame name="left" src="" />
      <frame name="right" src="" />
   </frameset>
*/