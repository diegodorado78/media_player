function AutoPlay() {}
AutoPlay.prototype.run = function (player) {
    if (!player.muted) {
        player.muted=true;// setter asigna un valor virtual, no funcion 
    }
    player.play();
};
export default AutoPlay;