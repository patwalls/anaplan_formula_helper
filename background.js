// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "jquery-1.12.3.min.js" }, function() {
    chrome.tabs.executeScript(null, {file: 'formula.js'});
  });
});
