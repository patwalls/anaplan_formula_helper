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
		<li class=head>' + this.func.name + '</li>\
		<li class=title>Syntax</li><li>' + this.func.syntax + '</li>\
		<li class=title>Description</li><li>' + this.func.summary + '</li>\
		<li class=title>Parameters</li>\
	<ul>')
	for (var i = 0; i < this.func.params.length; i++) {
		var param = $('<li><span>▶ </span>' + this.func.params[i] + '</li>');
		(i != this.param) ? param.addClass('not-current-param') : null ;

		$('ul.list').append(param)
		
	}
	$('ul.list').append('<li class=link><a href=' + this.func.link + '>See more details about ' + this.func.name + '.</a></li>');
}