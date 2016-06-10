var { ToggleButton } = require("sdk/ui/button/toggle");
var prefService = require("sdk/preferences/service");

var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: "*.anaplan.com",
  contentStyleFile: './app/style.css',
  contentScriptFile: [
    './lib/jquery-1.12.3.min.js',
    './lib/arrive.min.js',
    './lib/lib.js',
    './app/formula.js',
    './app/functions.js',
    './app/tooltip.js'
  ]
});

var button = ToggleButton({
  id: 'anaplanFormulaHelper',
  label: 'Anaplan Formula Helper',
  icon: {
    16: './anaplan.png',
    32: './anaplan.png',
    64: './anaplan.png'
  }
});

// function changeImagePermission(state) {
//   if (state.checked) {
//     button.badge = 'A';
//     button.badgeColor = '#BBAA00';
//   } else {
//     button.badge = 'D';
//     button.badgeColor = '#00AABB';
//   }
// }
