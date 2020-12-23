class AutoPause {
    constructor() {
        this.threshold = 0.25;
        this.handleIntersection = this.handleIntersection.bind(this);//asignamos el contexto siempre a la instancia del objeto
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);//asignamos el contexto siempre a la instancia del objeto

    }
    run(player) {
        this.player = player; // necesito guardar el player en una instancia de la clase para poder llamar player.play
        const observer = new IntersectionObserver(this.handleIntersection, //observar cambios en un elemento
            { // objeto de config
                threshold: this.threshold// porcentaje de  pantalla en observacion para que ocurra la accion
            });
    observer.observe(this.player.media); // al run el observer se pone a ver el media
    //visibility change=> evento par aver el esta de visibilizacion del video
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }
     //metodo que realiza los cambios si es observado o no
    handleIntersection(entries) { // al  inter-observer llamar a handle inter pedira una lista de entries con los objetos que observa
        const entry = entries[0]; // es el unico  entry por eso es el primero de la lista
        const isVisible = entry.intersectionRatio >= this.threshold;//vemos la intersccion que lleva para poder poner ponerlo en play o pause
        if (isVisible) {
            this.player.play();// puedo llamar estos metodos cuando el observer  vea un cambio
        } else {
            this.player.pause();
        }
    } 
    //metodo que reacciona al cambio de tab
    handleVisibilityChange() {
        const isVisible = document.visibilityState === "visible";
        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause();

        }
        
    }


}

export default AutoPause;