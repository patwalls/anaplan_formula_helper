var formulaInput = document.querySelector('.formulaBarText');

var tooltip = $('body').after('<tooltip></tooltip>');

$('tooltip').css({
  "position": "absolute",
  "top": "127px",
  "left": "90px",
  "border": '1px solid gray',
  "background-color": "white",
  "font-size": "100%",
  "font": "sans-serif"
});

formulaInput.addEventListener('keydown', function()
  {
    setTimeout(function() {
        var caretPosition = doGetCaretPosition(formulaInput);
        var textInputUpToCursor = formulaInput.value.slice(0,caretPosition);
        if (openFormula(textInputUpToCursor)) {
          var allForms = allFormulas(textInputUpToCursor);
          var lastFormula = findLastFormula(allForms);
          var innerFormula = findInnerFormula(lastFormula);
          this.param = identifyParam(lastFormula,innerFormula,caretPosition);
          showTooltip(lastFormula,this.param);
        } else {
          var lastWord = findLastWord(textInputUpToCursor);
          var formulaSearchArray = findMatchingFormulas(lastWord);
          showFormulas(formulaSearchArray);
          formulaMenu();
        }
    }, 0);
  });

var formulaMenu = function() {
  var formulaInput = document.querySelector('.formulaBarText');
  var li = $('tooltip > li');
  var liSelected;

  formulaInput.addEventListener('keydown', function(e) {
      if(e.which === 40){
        console.log('what a time to be alive!!!');
          if(liSelected){
              liSelected.removeClass('selected');
              next = liSelected.next();
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.eq(0).addClass('selected');
              }
          }else{
              console.log('this part is working');
              liSelected = li.eq(0).addClass('selected');
              $('li.selected').css({
                "background-color": "gray"
              });
          }
      }else if(e.which === 38){
          if(liSelected){
              liSelected.removeClass('selected');
              next = liSelected.prev();
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.last().addClass('selected');
              }
          }else{
              liSelected = li.last().addClass('selected');
          }
      }
  });

};

var showFormulas = function (formulas) {
  var fList = $('tooltip').html($('ul.formulaList'));
  $.each(formulas, function(i)

  {
      var li = $('<li/>')
          .addClass('ui-menu-item')
          .attr('role', 'menuitem')
          .appendTo(fList);
      var aaa = $('<a/>')
          .addClass('ui-all')
          .text(formulas[i])
          .appendTo(li);
  });
};

$(document).ready(function() {
  $('tooltip').on('click', 'li', function(){
      var formula = $(this).text() + '()';
      var caretPosition = doGetCaretPosition(formulaInput);
      var textInputUpToCursor = formulaInput.value.slice(0,caretPosition);
      var textInputAfterCursor = formulaInput.value.slice(caretPosition,formulaInput.value.length);
      var lastWord = findLastWord(textInputUpToCursor);
      var textInputUpToCursorWithoutFormula = textInputUpToCursor.slice(0,(caretPosition - lastWord.length));
      changeFormulaInput(textInputUpToCursorWithoutFormula, formula, textInputAfterCursor);
      setCaretPosition(textInputUpToCursorWithoutFormula.length + formula.length - 1);
  });
  var li = $('li');
  var liSelected;

});

var changeFormulaInput = function(before, formula, after) {
  formulaInput.value = before + formula + after;
};

var findLastWord = function (textInput) {
  var words = textInput.split(" ");
  return words[words.length - 1];
};

var findMatchingFormulas = function (str) {
  var formulas = [];
  var strLower = str.toLowerCase();

  for (var key in FUNCTIONS) {
    if (strLower === key.slice(0,str.length)) {
      formulas.push(key);
    }
  }
  return formulas;
};

var findInnerFormula = function (lastFormula) {
  var startofInner = lastFormula[1] + lastFormula[0].length + 1;
  var endOfInner = findEndOfInner(startofInner);
  var innerFormula = formulaInput.value.slice(startofInner,endOfInner);
  this.innerStart = startofInner;
  this.innerEnd = endOfInner;
  return innerFormula;
};

var openFormula = function (text) {
  var openCount = 0;
  for (var i = 0; i < text.length; i++) {
    if (text[i] === '(') {
      openCount += 1;
    } else if (text[i] === ')') {
      openCount -= 1;
    }
  }
  return openCount > 0;
};

var showNothing = function () {
  $('tooltip').html('');
};

var showTooltip = function (formula,param) {
  var formula = formula[0];
  var formulaObj = FUNCTIONS[formula];
  var params = FUNCTIONS[formula].params;


  var pList = $('tooltip').html($('ul.paramList'));

  var li = $('<li/>')
      .addClass('syntax')
      .html('<description>' + formulaObj.syntax + '</description>')
      .appendTo(pList)
      .css({"background-color": "#ccc"});

  var li = $('<li/>')
      .addClass('example')
      .html('<span>Example</span><br><description>' + formulaObj.example + '</description>')
      .appendTo(pList)

  var li = $('<li/>')
      .addClass('summary')
      .html('<span>Summary</span><br><description>' + formulaObj.summary + '</description>')
      .appendTo(pList)

  $.each(params, function(i)


  {
    if (i === param - 1) {
      var li = $('<li/>')
          .addClass('currentParam')
          .html('<span>Param ' + (i + 1) + '</span><br><description>' + params[i][1] + '</description>')
          .appendTo(pList)
          .css({"color": "red"});
    } else {
      var li = $('<li/>')
          .addClass('ui-param')
          .html('<span>Param ' + (i + 1) + '</span><br><description>' + params[i][1] + '</description>')
          .appendTo(pList);
      }
  });
  applyCSS();
};

var applyCSS = function () {
  $('tooltip').css({
    "padding": '5px',
    "font-family": 'Helvetica',
    "font-size": '.8em',
    "width": '50%',
    'border': '1px solid rgba(0,0,0,0.2)',
    '-webkit-box-shadow': '0 2px 4px rgba(0,0,0,0.2)'
  });

  $('tooltip > li').css({
    "list-style-type": 'none',
    "margin-bottom": '10px'
  });
  $('tooltip > li > span').css({
    "color": "gray",
    "font-size": '1em'
  });
};

var identifyParam = function (formula,inner,caretPosition) {
  formula = formula[0];
  numArgsInFormula = FUNCTIONS[formula].params.length;
  slicedInner = inner.slice(0,caretPosition - this.innerStart);
  param = slicedInner.split(",").length;
  return param;
};

var findEndOfInner = function (startOfInner) {
  var closedParenCounter = 1;
  var text = formulaInput.value;
  for (var i = startOfInner; i < formulaInput.value.length; i++) {
    if (text[i] === '(') {
      closedParenCounter += 1;
    } else if (text[i] === ')') {
      closedParenCounter -= 1;
    }
    if (closedParenCounter === 0) {
      return i;
    }
  }
  return formulaInput.value.length;
};

var allFormulas = function (text) {
  var formulas = [];
  var max = 0;
  var textLower = text.toLowerCase();

  for (var key in FUNCTIONS) {
    var index = textLower.indexOf(key);
    if (index >= 0) {
      formulas.push([key,index]);
    }
  }
  return formulas;
};

var findLastFormula = function (formulas) {
  max = ['',0];
  for (var i = 0; i < formulas.length; i++) {
    if (formulas[i][1] >= max[1]) {
      max[0] = formulas[i][0];
      max[1] = formulas[i][1];
    }
  }
  return max;
};


function doGetCaretPosition (oField) {
  // Initialize
  var iCaretPos = 0;
  // IE Support
  if (document.selection) {
    // Set focus on the element
    oField.focus();
    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();
    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);
    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }
  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;
  // Return results
  return iCaretPos;
}

function setCaretPosition(caretPos) {
    var elem = document.querySelector('.formulaBarText');

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}


FUNCTIONS = {
  'finditem'      : {
                      'syntax' : 'FINDITEM(x,y)',
                      'example': 'FINDITEM(x,y)',
                      'summary': 'Finds a valid item in a list or time period list by matching a text string or code to the list members. Takes a list as first parameter and name or code text string as second parameter and matches the text string to list item member. You can use FINDITEM to search a list and return a matched list member, if it belongs to the list.',
                      'params' : [['x','name of a list or a time period list' ],['y','text formatted line item']]
                    },
  'left'          : {
                      'syntax' : 'LEFT(text, number_of_characters)',
                      'example': 'LEFT("Text", 3)',
                      'summary': 'Extract substring from a string starting at the leftmost character.',
                      'params' : [['text','text'],['number_of_characters','number_of_characters']]
                    },
  'firstnonzero'  : ['blah','blah'],
  'firstnonblank' : ['blah','blah'],
  'fv'            : ['blah','blah']
};


// TODO on load
