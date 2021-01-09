
//funcion constructora para encapsular el metodo play
class MediaPlayer {
    media: HTMLMediaElement; // tipo media del doc html
    plugins: Array<any>;
    container: HTMLElement;
    constructor(config) {
        //solucion a video embebido en clase
        this.media = config.el;
        // plugins que llegan a traves del objeto de config
        this.plugins = config.plugins || []; //defino un array que almacene los plugins
        //inicio el player para crear contenedor que albergue los ads
        this.initPlayer();
        //defino funcion para inicializar plugins
        this.initPlugins();
    }
    initPlayer() {//con este metodo creo un div que encapsule el video

        this.container = document.createElement('div');
        this.container.style.position='relative'//posicion del contenedor debe ser relativa y del ad absoluta
        //agrego un elemento al nodo y llamo el metodo para poner primero el cont antes del video
        this.media.parentNode.insertBefore(this.container, this.media)
        this.container.appendChild(this.media)// inserto el video al cont
    }
    //funcion para hacer algo con todos los plugins definidos
     private initPlugins() {// _initplugins es un metodo privado por el _ cuando no hay keyboard private
        // //getter y setters
        // const player = {
        //     play: () => this.play(),
        //     pause: () => this.pause(),
        //     media: this.media,
        //     get muted() {
        //         return this.media.muted;
        //     },
        //     set muted(value) {
        //         this.media.muted = value;
        //     },
        // };
        this.plugins.forEach(plugin => {
            plugin.run(this);// CAMBIO PLAYER POR THIS
        });
    }
    //metodo play 
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    mute() {
        this.media.muted = true; //no es una funcion,es una propiedad
    }
    unmute() {
        this.media.muted = false;
    }
    //metodo  toggle play-pause
    togglePlay() {
        if (this.media.paused) {
            this.play();
        } else {
            this.pause();
        }
    }
    //metodo toggle mute / unmute
    toggleMute() {
        if (this.media.muted) {
            this.unmute();
        } else {
            this.mute();
        }
    }
};


export default MediaPlayer;


/*
version en js con protipos y funcion constructora
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
*/