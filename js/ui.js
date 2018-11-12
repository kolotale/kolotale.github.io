UI = {}

UI.UPDATE_MESSAGES = 30
UI.updateMessages = []

UI.RE_A = />([^<]*)<\/a>/g

UI.notify = function(message) {
    mclass = 'neutral'
    if (message[0] == '[') {
        if (message.startsWith('[+]')) {
            mclass = 'positive'
            message = message.substr(3)
        } else if (message.startsWith('[-]')) {
            mclass = 'negative'
            message = message.substr(3)
        }
    }
    
	message = message.replace(this.RE_A, function(match, p1) {
		return ' href="javascript:void(UI.' + p1.toLowerCase() + '())"' + match
	})
	UI.updateMessages.unshift('<div class="update-' + mclass + '">' + message + '</div>')
	if (this.updateMessages.length > UI.UPDATE_MESSAGES) UI.updateMessages.splice(-1, 1)
	document.getElementById('updates-area').innerHTML = this.updateMessages.join('')
}

UI.setVal = function(name, val) {
	document.getElementById('stat-' + name).innerHTML = val
}

UI.restart = function() {
	Game.restart()
}
