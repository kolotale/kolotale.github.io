EncounterList = []

class Monster {
    constructor(generalName, name) {
        this.generalName = generalName
        this.name = name
        EncounterList.push(this)
    }
    
    init() {
        this.stage = 0
    }

    fire() {
        var generalName = this.generalName
        var name = this.name

        switch (this.stage) {
            case 0:
                if (Player.props.inventory.indexOf(Items.glitterStoneRing) >= 0) {
                    UI.notify(`All of a sudden the glitter-stone ring rang. “The monster alarm,” thought Kolobok. “Not now.”`)
                    UI.notify(`A ${generalName} was coming.`)
                } else {            
                    UI.notify(Game.getRndElem([
                        `On and on’ it rolled, and it met a ${generalName} coming toward it.`,
                        `By and by it met a ${generalName} coming toward it.`]))
                }
                this.stage = 1
                break
            case 1:
                UI.notify(Game.getRndElem([
                    `“I’m going to eat you up, Kolobok!” called the ${generalName}.`,
                    `“I’m going to eat you up, Little Round Bun!” called the ${generalName}.`]))
                this.stage = 2
                break
            case 2:
                UI.notify(Game.getRndElem([
                    `“Don’t do that, ${name}, let me sing you a song instead.”`,
                    `“Please, don’t do that, ${name}, let me sing you a song instead.”`]))
                this.stage = 3
                break
            case 3:
                UI.notify(Game.getRndElem([
                    `“All right, let’s hear it!”`]))
                this.stage = 4
                break
            case 4:
                UI.notify(Game.getRndElem([`“I was scraped from the flour-box<br/>And swept from the bin<br/>And baked in the oven<br/>And cooled on the sill.<br/>I ran away from Grandpa,<br/>I ran away from Grandma,<br/>And I'll run away from you, this minute I will!”`]))
                this.stage = 5
                break
            default:
                UI.notify(Game.getRndElem([
                    `And away it rolled and away!`,
                    `And off it rolled and away.`]))
                this.stage = 0
                return null
        }
        return this
    }
}

new Monster('Rabbit', 'Fleet-Feet')
new Monster('Wolf', 'Brother Wolf')
new Monster('Bear', 'Brother Bear')
