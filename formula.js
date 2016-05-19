console.log('this formula file loads');


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

var openFunc = function (formula) {
  var closeParenCount = 0;
  for (var i = formula.length - 1; i > -1; i--) {
    if (formula[i] == '(') {
      if (closeParenCount == 0) {
        var start = formula.slice(0,i).search(/(\w+)$/);
        console.log(formula.slice(start,i));
        return i
      } else {
        closeParenCount -= 1
      }
    } else if ( formula[i] == ')') {
      closeParenCount += 1;
    }
  }
}

formulaInput.addEventListener('keyup', function(e)
  {
    setTimeout(function() {
        var fullFormula = e.srcElement.value
        var caretPosition = doGetCaretPosition(formulaInput);
        var formulaUpToCursor = fullFormula.slice(0,caretPosition);
        var func = openFunc(formulaUpToCursor);
        if (func) {
          showTooltip(func);
        }
    }, 0);
  });

var showTooltip = function (formula) {
  var formula = formula;
  console.log(FUNCTIONS);
  var formulaObj = FUNCTIONS[formula];
  console.log(formulaObj);
};

// TODO on load
