console.log('waiting for formula editor elements to arrive');

// $(document).arrive(".formulaBarText", function() {
//   console.log('bar arrived');
//   var formulaElement = document.querySelector('.formulaBarText');
//   tooltip.formulaElement = formulaElement;
//   tooltip.tooltipPositioning();
//   setEventListener(formulaElement);
// });
//
// $(document).arrive(".formulaEditorText", function(e) {
//   console.log('editor arrived');
//   var formulaElement = document.querySelector('.formulaEditorText');
//   tooltip.formulaElement = formulaElement;
//   tooltip.tooltipPositioning();
//   setEventListener(formulaElement);
// });

var setEventListener = function (formulaElement) {
  formulaElement.addEventListener('keyup', function(e) {
    setTimeout(function() {
        var fullFormula = e.srcElement.value.toLowerCase();
        var caretPosition = doGetCaretPosition(formulaElement);
        var formulaUpToCursor = fullFormula.slice(0,caretPosition);

        openFunc(formulaUpToCursor);
        incompleteFormula(fullFormula);
    }, 0);
  });
};

var openFunc = function (formula) {
  var closeParenCount = 0;
  for (var i = formula.length - 1; i > -1; i--) {
    if (formula[i] == '(') {
      if (closeParenCount === 0) {
        var startIdxOfLastFunc = formula.slice(0,i).search(/(\w+)$/);
        var funcText = formula.slice(startIdxOfLastFunc,i);
        var commas = countCommas(formula.slice(startIdxOfLastFunc, formula.length));
        tooltip.openFunc(FUNCTIONS[funcText],commas);
        return;
      } else {
        closeParenCount -= 1;
      }
    } else if (formula[i] == ')') {
      closeParenCount += 1;
    }
  }
  tooltip.clear();
};

var incompleteFormula = function (fullFormula) {
  if (isIncomplete(fullFormula)) {
    tooltip.incompleteFormula();
  } else {
    tooltip.completeFormula();
  }
};

// private

var isIncomplete = function (formula) {
  return (formula.countChar('(') > 0 && formula.countChar('(') != formula.countChar(')')) ||
    (formula.countChar('[') > 0 && formula.countChar('[') != formula.countChar(']'));
};

var countCommas = function(text) {
  return text.split(',').length - 1;
};

String.prototype.countChar = function (char) {
  return this.split(char).length - 1;
};

// - NOTE: uncomment last 4 lines to easily build with test in local environment
// - use file in root directory 'formula_bar_test.html'
// - make sure to comment out both document.arrive functions at the top of this file
var formulaElement = document.querySelector('.formulaBarText');
tooltip.formulaElement = formulaElement;
tooltip.tooltipPositioning();
setEventListener(formulaElement);
