import MediaPlayer from '../MediaPlayer';

class AutoPlay {
    constructor() { }
    run(player: MediaPlayer) {
        if (!player.media.muted) {//uso .media pues quite los getters y setters
            player.media.muted = true; // setter asigna un valor virtual, no funcion 
        }
        player.play();
    }
}
export default AutoPlay;