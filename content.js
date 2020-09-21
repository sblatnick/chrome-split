'use strict';

try {
  console.log("content.js:", parent);
}
catch(err) {
  console.log("Reset frame name");
  window.name = "right-frame";
}
