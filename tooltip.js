console.log('loading tooltip')
$('body').after('<tooltip></tooltip>');

var tooltip = new ToolTip;

function ToolTip () {
	this.element = $('tooltip');
	this.func = null;
	this.param = null;
}

ToolTip.prototype.openFunc = function (func, param) {
	this.func = func;
	this.param = param;
	this.clear();
	this.showFormula();
	console.log(this);
}

ToolTip.prototype.clear = function () {
	this.element.empty();
}

ToolTip.prototype.showFormula = function () {
	this.element.append('<ul class=list>\
		<li class=title>Syntax: </li><li>' + this.func.syntax + '</li>\
		<li class=title>Example: </li><li>' + this.func.example + '</li>\
		<li class=title>Summary: </li><li>' + this.func.summary + '</li>\
	<ul>')
	for (var i = 0; i < this.func.params.length; i++) {
		var paramTitle = $('<li class=title>' + this.func.params[i][0] + '</li>');
		(i == this.param) ? paramTitle.addClass('current-param') : null ;

		var paramDetails = '<li>' + this.func.params[i][1] + '</li>';

		$('ul.list').append(paramTitle).append(paramDetails);
	}
}