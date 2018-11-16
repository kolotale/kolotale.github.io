Sound = {}

Sound.state = 0

Sound.controlSound = function() {
    Sound.state = (Sound.state + 1) % 3
    UI.showSoundState()
}

