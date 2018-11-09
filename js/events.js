Events = {}
Followups = []

Events.rnd = function(n) {
	return Math.floor(n * Math.random())
}

Events.arnd = function(a) {
	return a[Events.rnd(a.length)]
}

Events.getValue = function(name, initVal) {
    if (!(name in Player.props)) Player.props[name] = initVal
    return Player.props[name]
}

Starters = [
	function() {
		if (Player.hormone < 70) return 0
		if (Math.random() < 0.3) {
			UI.notifyNeutral('Aimed to show your friends how you jump out of a moving train.')
		} else {
			UI.notifyNegative('Aimed to show your friends how you jump out of a moving train.')
			Player.health -= 10
		}
		return 1
	},
	
	function() {
		var msg = ['Started paying attention to other teens.', 'Visited a school party and danced.', 'Bed.']
		if (Player.age < 10 || Player.age > 15) return 0
		UI.notifyPositive(msg[Player.adolescenceStage])
		Player.hormone += 30
		if (Player.adolescenceStage < msg.length - 1) Player.adolescenceStage++
		return 1
	},
	
	function() {
        if (Events.isSuspended('granny', 10)) return 0
		
		if (Player.age > Events.rnd(500)) {
			will = Player.props.granny * 10
			UI.notifyNegative('Your loving granny Toriel left the world. Got $' + will + ' as her will.')
			Player.savings += will
			Player.props.granny = 0
			return 1
		} else {
			UI.notifyPositive('Your loving granny Toriel sent you $' + Player.props.granny + '.')
			Player.savings += Player.props.granny
			Player.props.granny += 10
		}
		return 1
	},
	
	function() {
        if (Events.isSuspended('extortion', 1)) return 0

		if (Player.age > 18 || Player.age < 6) return 0
		
		Player.props.extortion++

		if (Math.random() < 0.5 || Player.props.extortion < 3 || Player.age < 12) {
			UI.notifyNegative('Squall and Seifer stopped you and demanded your pocket money. You submitted.')
			Player.savings = Player.savings * 0.99 - 10
			if (Player.savings < 0) Player.savings = 0
			return 1
		}
		
		Player.props.extortion = 0
		Player.savings *= 0.99
		UI.notifyNegative(Events.arnd(['Squall attempted to extort money from you and you killed him with a lead pipe. Hiding the body costed you.', 'You bribed Selphie into killing Seifer. This costed you.', 'Squall was killed in a school gunfight.']))
		return 1
	},
    
	function() {
        if (Math.random() > 0.1 / (Player.age + 1)) return 0 // replace with 0.1
        
        if (Events.isSuspended('medulloblastoma', 1)) return 0
        
        UI.notifyPositive('Entered a state of almost constant happiness. Felt nearly saint.')
        Player.props.medulloblastoma = 0
        Player.props.medulloblastomaStage = 0
        
        Followups.push(function() {
            switch (Player.props.medulloblastomaStage++) {
                case 0:
                    UI.notifyNegative('Morning headaches started.')
                    Player.health -= 10
                    break
                case 1:
                    UI.notifyNegative('Began losing a balance.')
                    Player.health -= 10
                    break
                case 2:
                    UI.notifyNegative('Started vomiting repeatedly.')
                    Player.health -= 10
                    break
                case 3:
                    UI.notifyNegative('Began stumbling.')
                    Player.health -= 10
                    break
                case 4:
                    UI.notifyNegative('Fallen for the first time.')
                    Player.health -= 10
                    break
                case 5:
                    UI.notifyNegative('Felt motor weakness.')
                    Player.health -= 10
                    break
                case 6:
                    UI.notifyNegative('Got vision and hearing disorders.')
                    Player.health -= 10
                    break
                case 7:
                    UI.notifyNegative('Felt nausea.')
                    Player.health -= 10
                    break
                case 8:
                    UI.notifyNegative('Lost facial sensory.')
                    Player.health -= 10
                    break
                default:
                    UI.notifyNegative('Felt really bad.')
                    Player.health -= 100
                    return 0
            }            
            return 1
        })
		return 1
	},    
]

Events.parentDecline = function() {
    var v = Events.getValue('plagues', [])
    
    plagues = ['The water of the nearby river changed into blood. The fish dies, the river stinks and people get sick when they drink its water.']
    
    var pn = Events.rnd(plagues.length)
    
    if (!v[pn]) {
        UI.notifyNegative(plagues[pn])
        v[pn] = 1
        return 0
    }

    UI.notifyNeutral('And ' + Events.PARENTS[Player.props.parents] + ' kept getting poorer and poorer till there was nothing left to eat in the house, not even bread.')
    return 1
}

Events.PARENTS = ['an old man and an old woman', 'two transgenders', 'two old school gamers', 'two old men', 'a giraffe and a hippopotamus']

Events.init = function() {
    Player.props.parents = Events.rnd(Events.PARENTS.length)
    UI.notifyNeutral('Once upon a time there lived ' + Events.PARENTS[Player.props.parents] + ' who were very poor and had nothing at all to their name. <a>Restart</a>?')
    UI.notifyNeutral('This was a hard year.')
    
    Followups = [Events.parentDecline]
}

Events.generate = function() {
	if (Math.random() < 0.1) return 0
   
    
	if (Followups.length) {
        var index = Events.rnd(Followups.length)
		if (!Followups[index]()) Followups.splice(index, 1)
		return 1
	}
	if (Math.random() < 0.99) return 0

	return this.arnd(Starters)()
}
