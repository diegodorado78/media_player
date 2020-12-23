
//funcion constructora para encapsular el metodo play
function MediaPlayer(config) {//objeto de configuracion
    //solucion a video embebido en clase
    this.media = config.el;
    // plugins que llegan a traves del objeto de config
    this.plugins = config.plugins || []; //defino un array que almacene los plugins
    //defino funcion para inicializar plugins
    this._initPlugins();

};
  //funcion para hacer algo con todos los plugins definidos
MediaPlayer.prototype._initPlugins = function () {
    //getter y setters
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media,
        get muted() {
            return this.media.muted;
        },
        set muted(value) {// solo puedo pasar true o false y se asigna
            this.media.muted = value;
        },
    };

 this.plugins.forEach(plugin => {// for each para correr todos los plugins once inicie
     plugin.run(player);
 });
};
  //metodo play 
MediaPlayer.prototype.play = function () {
    this.media.play();
};

MediaPlayer.prototype.pause = function () {
    this.media.pause();
};
MediaPlayer.prototype.mute = function () {
    this.media.muted=true;//no es una funcion,es una propiedad
};
MediaPlayer.prototype.unmute = function () {
    this.media.muted=false;
};
  //metodo  toggle play-pause
MediaPlayer.prototype.togglePlay = function () {
    if (this.media.paused) {
        this.play();
    } else {
        this.pause();
    }
};
//metodo toggle mute / unmute
MediaPlayer.prototype.toggleMute = function () {
    if (this.media.muted) {
        this.unmute();
    } else {
        this.mute();
    }
};

export default MediaPlayer;