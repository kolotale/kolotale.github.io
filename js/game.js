Game = {}

Game.SLOW_TIME_MS = 1000
Game.FAST_TIME_MS = 4

function updateGame() {	
	ms = Game.SLOW_TIME_MS
	
	if (Game.active) {
		Game.update()
	}
	
	if (Game.active) {
		if (!Game.generate()) ms = Game.FAST_TIME_MS
	}
	
	setTimeout(updateGame, ms)
}

Game.getRnd = function(n) {
	return Math.floor(n * Math.random())
}

Game.getRndElem = function(a) {
	return a[Game.getRnd(a.length)]
}

Game.getAndDelRndElem = function(a) {
    if (a.length == 0) return null
    var index = Game.getRnd(a.length)
    var res = a[index]
    a.splice(index, 1)
	return res
}

Game.fireRndEvent = function(a) {
    var res = Game.getAndDelRndElem(a)

    if (!res) return null
    res = res.fire()
    if (res) a.push(...res)
    return 0
}

Game.getValue = function(name, initVal) {
    if (!(name in Player.props)) Player.props[name] = initVal
    return Player.props[name]
}

Game.generate = function() {
	if (Math.random() < 0.1) return 0
    
    if (Math.random() < 0.5) Game.fireRndEvent(Game.ambient)
    Game.fireRndEvent(Game.followups)
	return 1
}

Game.restart = function() {
    Game.followups = []
    Game.ambient = []
    Player.init()
    Events.init()
	this.active = true
}

Game.init = function() {
    Game.score = 0
    
	Game.restart()
    updateGame()
}

Game.update = function() {
    Player.update()

    if (Player.weight <= 0) {
        UI.notify('[-]And our hero is no more. This is how the tale ends. <a>Restart</a>?')
        if (Game.score < Player.age) {
            UI.notify('[+]Broke the lifespan record of ' + (Game.score * Player.AGE_FACTOR).toFixed(2) + ' days.')
            Game.score = Player.age
        }
		this.active = false
    }
}

