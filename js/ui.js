UI = {}

UI.UPDATE_MESSAGES = 20
UI.updateMessages = []

UI.RE_A = />([^<]*)<\/a>/g

UI.notify = function(message) {
	message = message.replace(this.RE_A, function(match, p1) {
		return ' href="javascript:void(UI.' + p1.toLowerCase() + '())"' + match
	})
	UI.updateMessages.unshift(message)
	if (this.updateMessages.length > UI.UPDATE_MESSAGES) UI.updateMessages.splice(-1, 1)
	document.getElementById('updates-area').innerHTML = this.updateMessages.join('')
}

UI.notifyPositive = function(message) {
	this.notify('<div class="update-positive">' + message + '</div>')
}

UI.notifyNeutral = function(message) {
	this.notify('<div class="update-neutral">' + message + '</div>')
}

UI.notifyNegative = function(message, type) {
	this.notify('<div class="update-negative">' + message + '</div>')
}

UI.setVal = function(name, val) {
	document.getElementById('stat-' + name).innerHTML = val
}

UI.restart = function() {
	Game.restart()
}