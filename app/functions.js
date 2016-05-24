// for offline testing

// FUNCTIONS = {
//   'finditem'      : {
//                       'name'   : 'FINDITEM(x,y)',
//                       'syntax' : 'FINDITEM(x,y)',
//                       'summary': 'Finds a valid item in a list or time period list by matching a text string or code to the list members. Takes a list as first parameter and name or code text string as second parameter and matches the text string to list item member. You can use FINDITEM to search a list and return a matched list member, if it belongs to the list.',
//                       'params' : ['param 1','param 2'],
//                       'link'   : 'http://google.com'
//                     }
// };

// console.log(FUNCTIONS);

var FUNCTIONS = {};

var spreadsheetID = "1Va4Zj0CAbkSEvtQ3G8PThSv9b76JziP1j7zp2rj5Uq0";

var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
 $.getJSON(url, function(data) {

  // console.log(data);
 
  var entry = data.feed.entry;
 
  $(entry).each(function(){
    var funcObject = {
                      'name'   : this.gsx$function.$t,
                      'syntax' : this.gsx$syntax.$t,
                      'summary': this.gsx$summary.$t,
                      'params' : this.gsx$params.$t.split(','),
                      'link'   : this.gsx$link.$t
                    }
    FUNCTIONS[this.gsx$name.$t] = funcObject;
  });

  console.log(FUNCTIONS);
 
 });