'use strict';

var settings = {};

function target_links() {
  if(frames[0].document) {
    $("a", frames[0].document).attr({target: "right-frame"});
  }
  setTimeout(target_links, 2000);
}

function main()
{
  var left = settings.left.width;
  var right = 100 - left;
  var cols = left +'%,' + right + '%';
  document.write('<frameset cols="' + cols + '"><frame id="left-frame" name="left-frame" src="' + document.URL + '" /><frame name="right-frame" src="" /></frameset>');
  $("#left-frame").on("load", target_links);
}

chrome.storage.sync.get('settings', function(data)
{
  settings = data.settings;
  main();
});
