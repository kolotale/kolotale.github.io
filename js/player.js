Player = {}

Player.AGE_STEP = 1.0 / 3600

Player.init = function() {
	this.age = 0
	this.mood = 'Cheerful'
    this.weight = 3 + Math.random() * 2
    this.props = {}
    Events.init()
}

Player.update = function() {
	this.age += this.AGE_STEP

	UI.setVal('age', this.age.toFixed(2) + '&nbsp;days')
	UI.setVal('mood', this.mood)
    UI.setVal('weight', this.weight.toFixed(2) + '&nbsp;kg')
}
