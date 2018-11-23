Encounters = {}

EncountersList = []

class Encounter {
    constructor(name) {
        this.name = name
        EncountersList.push(this)
    }    
}

new Encounter('Rabbit')
new Encounter('Wolf')
