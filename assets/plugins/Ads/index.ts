import MediaPlayer from "../../MediaPlayer";
import Ads,{Ad} from './Ads'//importo la interfaz ad

class AdsPlugin {
    private ads: Ads;
    private player: MediaPlayer;
    private media: HTMLMediaElement;
    private currentAd: Ad;
    private adsContainer: HTMLElement;

    constructor() {//no hay constructor publico por singleton
        this.ads = Ads.getInstance()
        this.adsContainer = document.createElement('div');
        //bind para solucionar e lhis de abajo
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    }
    run(player: MediaPlayer) {//al llamar a run ya esta creado el div entonces agrego el ad
        this.player = player;
        this.player.container.appendChild(this.adsContainer)//agraga el div para los ads
        this.media = this.player.media;
        //timeupdate es un evento del htmlmedia
        this.media.addEventListener('timeupdate', this.handleTimeUpdate);
    }
    private handleTimeUpdate() {
        //al llamar este metodo el this cambia por el evento por eso bind
        const currentTime = Math.floor(this.media.currentTime);
        if (currentTime % 30 === 0) {// cada que haya un multiplo de 30 se caraga otro add
            this.renderAd();
        }
    }

    private renderAd() {
        if (this.currentAd) {//si hay un add para la ejecucion
            return; // y no regresa otro
        }
        const ad = this.ads.getAd()
        this.currentAd = ad
        //agrego el contenido del add
        this.adsContainer.innerHTML = `
        <div class="ads">
        <a class="ads__link"href="${this.currentAd.url}"target="_blank">
          <imgclass="ads__img"src="${this.currentAd.imageUrl}" />
          <divclass="ads__info">
            <h5class="ads__title">${this.currentAd.title}</h5>
            <pclass="ads__body">${this.currentAd.body}</p>
          </div>
        </a>
      </div>
        `;
        //agrego un set time para cambiar el add
        setTimeout(()=> {
            this.currentAd = null;
            this.adsContainer.innerHTML = ``// vacio para desaparecer el add
        },10000) //cada 10 seg se cambia el ad
    }
}
export default AdsPlugin;