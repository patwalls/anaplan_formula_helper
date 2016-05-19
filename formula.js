console.log('this formula file loads');


var formulaInput = document.querySelector('.formulaBarText');

var openFunc = function (formula) {
  var closeParenCount = 0;
  for (var i = formula.length - 1; i > -1; i--) {
    if (formula[i] == '(') {
      if (closeParenCount == 0) {
        var start = formula.slice(0,i).search(/(\w+)$/);
        return formula.slice(start,i);
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
        var funcText = openFunc(formulaUpToCursor);
        if (funcText) {
          updateTooltip(funcText);
        }
    }, 0);
  });

var updateTooltip = function (funcText) {
    tooltip.openFunc(FUNCTIONS[funcText]);
};
