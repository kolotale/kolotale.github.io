Events = {}

Events.PARENTS = ['an old man and an old woman', 'two transgenders', 'two old school gamers', 'two old men', 'a giraffe and a hippopotamus', 'a physisist and a mathematician', 'two space marines', 'a knight and a priest']
Events.PARENT = ['the old man', 'the stronger transgender', 'the strategy gamer', 'the manly man', 'the hippo', 'the theorist', 'the captain', 'the priest']
Events.PARENT2 = ['the old woman', 'the prettier transgender', 'the arcade gamer', 'the feminine man', 'the giraffe', 'the applied science guy', 'the librarian', 'the knight']

Events.K_STORY = ['On and on’ it rolled, and it met a Rabbit coming toward it.',
    '“I’m going to eat you up, Kolobok!” called the Rabbit.',
    '“Don’t do that, Fleet-Feet, let me sing you a song instead,” said Kolobok.',
    '“All right, let’s hear it!”',
    'Here it is! “I was scraped from the flour-box...”',
    '“... And I’ll run away from you, this minute I will!”',
    'And off it rolled and away.',
    'By and by it met a Wolf coming toward it.',
    '“I’m going to eat you up, Little Round Bun!” called the Wolf.',
    '“Don’t do that, Brother Wolf, let me sing you a song instead.”',
    '“All right, let’s hear it!”',
    '“I was scraped from the flour-box...”',
    '“... And I’ll run away from you, this minute I will!”',
    'And away it rolled.',
    'By and by it met a Bear coming toward it.',
    '“I’m going to eat you up, Kolobok!” called the Bear.',
    '“Don’t do that, Brother Bear, I’ll sing you a song instead!”',
    '“All right, let’s hear it!”',
    '“I was scraped from the flour-box...”',
    '“... And I’ll run away from you, this minute I will!”',
    'And away it rolled and away!',
    'By and by it met a Fox coming toward it.',
    '“I’m going to eat you up, Kolobok!” called the Fox.',
    '"“Don’t do that, Sister Fox, I’ll sing you a song instead.”',
    'All right, let’s hear it!',
    '“I was scraped from the flour-box...”',
    '“... And I’ll run away from you, this minute I will!”',
    '“Sing some more, please, don’t stop!” the Fox said. “Hop onto my tongue, I can hear you better.”',
    'Kolobok jumped onto the Fox’s tongue and began to sing.',
    '“I was scraped from the flour-box...”',
    'But before it could go on, the Fox opened her mouth and - snap! - she gobbled it up.']
    
class EventStr {
    constructor(name, followup = null) {
        this.name = name
        this.followup = followup
    }

    fire() {
        UI.notify(this.name)
        return this.followup
    }
}

Events.plagueWater = new EventStr('[-]The water of the nearby river changed into blood. The fish died, the river stink and people got sick when they drunk its water.')

Events.plagueFrogs = new EventStr('[-]The river teemed with frogs. They came up into houses and bedrooms and beds, into offices and into ovens and kneading troughs.')

class EventGetPoor {
    fire() {
        UI.notify('And ' + Events.PARENTS[Player.props.parents] + ' kept getting poorer and poorer till there was nothing left to eat in the house, not even bread.')
        return [new EventSaidParent()]
    }
}

class EventSaidParent {
    fire() {
        UI.notify('After a while ' + Events.PARENT[Player.props.parents] + ' said, “Do bake us a bun, old friend! If you scrape out the flour-box and sweep out the bin, you’ll have enough flour.”')
        return [new EventScrapedParent()]
    }
}

class EventScrapedParent {
    fire() {
        UI.notify('[+]So ' + Events.PARENT2[Player.props.parents] + ' scraped out the flour-box and swept out the bin, she made some dough and she shaped a little round bun out of it. They lit the oven, baked the bun and put it on the window sill to cool. But the bun, who proclaimed itself as “Kolobok”, jumped out of the window and onto the bench outside, and from the bench onto the ground, and away it rolled along the road!')
        return [new EventChain([...Events.K_STORY, new EventEnd()])]
    }    
}

class EventChain {
    constructor(chain) {
        this.chain = chain
        this.msg = chain[0]
        this.chain.splice(0, 1)
        this.index = 0
    }

    fire() {
        UI.notify(this.msg)
        return [(this.chain.length > 1) ? new EventChain(this.chain) : this.chain[0]]
    }
}

class EventEnd {
    fire() {
        Player.weight = 0
        UI.notify('[-] Ouch.')
        return null
    }    
}

Events.init = function() {
    Player.props.parents = Game.getRnd(Events.PARENTS.length)
    UI.notify('Once upon a time there lived ' + Events.PARENTS[Player.props.parents] + ' who were very poor and had nothing at all to their name. <a>Restart</a>?')
    UI.notify('This was a hard year.')
    
    Game.followups = [new EventGetPoor()]
    Game.ambient = [Events.plagueWater, Events.plagueFrogs]
}
