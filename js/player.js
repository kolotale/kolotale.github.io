Player = {}

Player.AGE_FACTOR = 0.01

Player.init = function() {
	this.age = 0
	this.mood = 'Cheerful'
    this.weight = 3 + Math.random() * 2
    this.props = {}
    this.props.inventory = []
}

Player.update = function() {
	this.age += 1

	UI.setVal('age', (this.age * Player.AGE_FACTOR).toFixed(2) + '&nbsp;days')
	UI.setVal('mood', this.mood)
    UI.setVal('weight', this.weight.toFixed(2) + '&nbsp;kg')
}
