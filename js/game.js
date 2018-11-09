Game = {}

Game.SLOW_TIME_MS = 100
Game.FAST_TIME_MS = 4

function updateGame() {	
	ms = Game.SLOW_TIME_MS
	
	if (Game.active) {
		Game.update()
	}
	
	if (Game.active) {
		if (!Events.generate()) ms = Game.FAST_TIME_MS
	}
	
	setTimeout(updateGame, ms)
}

Game.restart = function() {
    Player.init()
	this.active = true
}

Game.init = function() {
    this.score = null
	this.restart()
    updateGame()
}

Game.update = function() {
    Player.update()

    if (Player.weight <= 0) {
        UI.notifyNegative('And our hero is no more. This is how the tale ends. <a>Restart</a>?')
		this.active = false
    }
}

Game.init()
