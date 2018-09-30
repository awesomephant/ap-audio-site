const initPlayer = function (element) {
    console.log('Initializing player')
    let playBtn = element.querySelector('#play-btn')
    playBtn.addEventListener('click', function () {
        this.parentNode.classList.toggle('is-playing')
    })
}
const initPlayers = function(){
  console.log('Initializing players...')
  let tracks = document.querySelectorAll('.tracks-item');
  let tracks_l = tracks.length;
  for (let i = 0; i < tracks_l; i++) {
      let track = tracks[i];
      initPlayer(track);
  }
}

document.addEventListener('DOMContentLoaded', function () {
    initPlayers();
})
