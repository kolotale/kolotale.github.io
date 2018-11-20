Sound = {}

Sound.state = 0

Sound.controlSound = function() {
    Sound.state = (Sound.state + 1) % 3
    var elem = document.getElementById('audio')
    if (Sound.state == 1) {
        //elem.src = 'http://66.90.93.122/ost/battlefield-2-sandbox-mod-ost/nekijvoasq/Rollercoaster.mp3'
        elem.src = 'http://66.90.93.122/ost/need-for-speed-most-wanted/mtmwxozr/01-%3D-nine%20thou%20%28superstars%20remix%29.mp3'
        elem.play()
    } else if (Sound.state == 0) {
        elem.pause()
    }
    UI.showSoundState()
}

