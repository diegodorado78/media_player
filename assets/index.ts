import MediaPlayer from './MediaPlayer.ts';
import AutoPlay from './plugins/AutoPlay.ts';
import AutoPause from './plugins/AutoPause.ts';

//mdn html media element para ver props, metodos de los medios
const video:HTMLMediaElement = document.querySelector("video");
const btn_play:HTMLElement = document.querySelector("#btn_play");
const btn_mute:HTMLElement  = document.querySelector("#btn_mute");


//instancio un objeto para llamar luego los metodos
const player = new MediaPlayer({
    el: video,
    plugins: [
        new AutoPlay(),
        new AutoPause(),
    ],
});//obliga a pasar un objeto de config y plugins
btn_play.onclick = () => player.togglePlay();
btn_mute.onclick = ()=> player.toggleMute();
/*visibility change=> evento par aver el esta de visibilizacion del video
document.addEventListener("visibilitychange", () => {
    console.log(document.visibilityState);
});
*/

//button.onclick= ()=>video.play();//play es un metodo del api de medios del html
// service workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log(error.message);
    });
}