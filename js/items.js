Items = {}

class Item  {
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
                UI.notify(Game.getRndElem([
                    `Kolobok noticed something shiny and precious along his path.`]))
                this.stage = 1
                break
            default:
                UI.notify(Game.getRndElem([
                    `[+]Our hero searched out and found a nice looking ${generalName}.`]))
                Player.props.inventory.push(this)
                this.stage = 0
                return null
        }
        return this
    }
}

Items.glitterStoneRing = new Item('ring', 'glitter-stone ring')
