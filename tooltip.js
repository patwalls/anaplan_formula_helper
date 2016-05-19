function ToolTip () {
	this.element = $('body').after('<tooltip></tooltip>');
	this.func = null;
}

console.log('loading tooltip')

var tooltip = new ToolTip;

ToolTip.prototype.openFunc = function (func) {
	this.func = func;
	console.log(this);
}