console.log('loading tooltip');
$('body').after('<tooltip></tooltip>');

var tooltip = new ToolTip();

function ToolTip () {
	this.element = $('tooltip');
	this.formulaElement = null;
	this.func = null;
	this.param = null;
	this.open = true;
	this.top = 0;
	this.left = 0;
}

ToolTip.prototype.openFunc = function (func, param) {
	this.func = func;
	this.param = param;
	this.clear();
	if (this.open) {
		this.tooltipOptions();
		this.showFormula();
	}
};

ToolTip.prototype.clear = function () {
	this.element.empty();
};

ToolTip.prototype.hide = function () {
	this.open = false;
	this.clear();
};

ToolTip.prototype.tooltipPositioning = function () {
	var rect = this.formulaElement.getBoundingClientRect();
	if (this.formulaElement.className == "formulaEditorText") {
		this.top = rect.top;
		this.left = (rect.right + 4);
	} else {
		this.top = (rect.top + 27);
		this.left = (rect.left - 1);
	}

	$('tooltip').css({
		'top': this.top,
		'left': this.left
	});
};

ToolTip.prototype.completeFormula = function() {
	$(this.formulaElement).css('color', 'black');
};

ToolTip.prototype.incompleteFormula = function() {
	$(this.formulaElement).css('color', 'gray');
};

ToolTip.prototype.tooltipOptions = function () {
	var tooltipDiv = $('<div class=tooltip-container><span class=helper-hide-button>x</span></div>');
	this.element.append(tooltipDiv);
	var closeButton = $('span.helper-hide-button');

	var tooltip = this;
	closeButton.on('click', function () {
		tooltip.hide();
	});
	this.tooltipPositioning();
};

ToolTip.prototype.showFormula = function () {
	/*jshint multistr: true */
	var tooltipDiv = $('div.tooltip-container');
	tooltipDiv.append('<ul class=list>\
		<li class=head>' + this.func.name + '</li>\
		<li class=title>Syntax</li><li>' + this.func.syntax + '</li>\
		<li class=title>Description</li><li>' + this.func.summary + '</li>\
		<li class=title>Parameters</li>\
	<ul>');
	for (var i = 0; i < this.func.params.length; i++) {
		var param = $('<li><span>▶ </span>' + this.func.params[i] + '</li>');
		if (i != this.param) {
			param.addClass('not-current-param');
		}

		$('ul.list').append(param);

	}
	$('ul.list').append('<li class=link><a href=' + this.func.link + '>See more details about ' + this.func.name + '.</a></li>');
};
