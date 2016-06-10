#Anaplan Formula Helper

The Anaplan Formula Helper is a Chrome Extension to make writing formulas easier in Anaplan. It is built with JavaScript and jQuery.

# Chrome Extension

Download it [here](https://chrome.google.com/webstore/detail/anaplan-formula-helper/ekjmcfghjgnplkmpmacbjknfbkdgbabc).

# Firefox Add-On
1. Download this [file](http://s000.tinyupload.com/index.php?file_id=00366035109938825125).
2. Click on menu button in top right of Firefox, click on 'Add-ons'
3. Drag that file onto the Add-ons page.

Add and update functions through this (need to request access) [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1Va4Zj0CAbkSEvtQ3G8PThSv9b76JziP1j7zp2rj5Uq0/edit#gid=0).

###Main Functionality:
* View details about an open function while you're writing it.
* Understand what parameter you're currently typing out.
* Ability to close tooltip when you don't need it.
* Easily add and manage functions through a Google Spreadsheet. (see above)

###Coming soon:
* Autocomplete/suggested functions.
* Move helper around on the page.

###Behind the Scenes:
* Uses Regex to find open function.
* Analyzes open formulas using text algorithm.
* Dynamically updates when formula editor changes in the DOM.
* Uses Google Sheets API to get function data as JSON and converts to JS Object.
