console.log('this formula file loads');

var formulaInput = document.querySelector('.formulaBarText');

formulaInput.addEventListener('keyup', function(e)
  {
    setTimeout(function() {
        var fullFormula = e.srcElement.value
        var caretPosition = doGetCaretPosition(formulaInput);
        var formulaUpToCursor = fullFormula.slice(0,caretPosition);
        openFunc(formulaUpToCursor);
    }, 0);
  });

var openFunc = function (formula) {
  var closeParenCount = 0;
  for (var i = formula.length - 1; i > -1; i--) {
    if (formula[i] == '(') {
      if (closeParenCount == 0) {
        var startIdxOfLastFunc = formula.slice(0,i).search(/(\w+)$/);
        var funcText = formula.slice(startIdxOfLastFunc,i);
        tooltip.openFunc(FUNCTIONS[funcText]);
        return
      } else {
        closeParenCount -= 1
      }
    } else if (formula[i] == ')') {
      closeParenCount += 1;
    }
  }
  tooltip.clear();
}
