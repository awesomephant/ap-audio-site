const gra = function(min, max) {
  return Math.random() * (max - min) + min;
};

const gri = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function playAudio(audioEl) {
  try {
    await audioEl.play();
  } catch (err) {
  }
}

let allAudioElements, tracks;

const initPlayer = function(element) {
  console.log("Initializing player");
  let playBtn = element.querySelector(".play-btn");
  playBtn.addEventListener("click", function() {
    console.log("click");
    let audioEl = this.parentNode.querySelector("audio");
    let nowPlayingEls = document.querySelectorAll('.now-playing')
    if (audioEl.paused){
        for (let a = 0; a < allAudioElements.length; a++){
          allAudioElements[a].pause();
        }
        for (let b = 0; b < tracks.length; b++){
          let inner = tracks[b].querySelector('.track-inner')
          inner.classList.remove('is-playing');
        }
        playAudio(audioEl);
        for (let i = 0; i < nowPlayingEls.length; i++){
            nowPlayingEls[i].innerHTML = 'Now playing: ' + this.parentNode.getAttribute('data-title') + ' by ' + this.parentNode.getAttribute('data-artist')
        }
    } else {
        audioEl.pause();
    }
    this.parentNode.classList.toggle("is-playing");
    audioEl.play();
  });
};
const initPlayers = function() {
  console.log("Initializing players...");
  tracks = document.querySelectorAll(".tracks-item");
  let tracks_l = tracks.length;
  allAudioElements = document.querySelectorAll('audio')
  for (let i = 0; i < tracks_l; i++) {
    let track = tracks[i];
    initPlayer(track);
  }
};

const setTransforms = function() {
  console.log("Setting transforms..");
  let r = window.innerWidth * 0.35;
  let ry = window.innerHeight * 0.45;
  let letters = document.querySelectorAll(".tracks-item");
  let n_letters = letters.length;
  for (let i = 0; i < n_letters; i++) {
    let n = (360 / n_letters) * i;
    let rotateY = n * -1;
    let translateX = Math.sin((n / 360) * 2 * Math.PI + Math.PI) * -r + 0;
    let translateY = Math.cos((n / 360) * 2 * Math.PI) * ry - 0;
    //translateZ = 0;
    //translateX = 0;
    rotateY = 0;
    let inner = letters[i].querySelector(".track-inner");
    inner.style.animationDuration =
      gra(3600, 5900) + "ms, " + gra(1200, 2000) + "ms";
    inner.style.animationDelay =
      gra(-500, 400) + "ms, " + gra(500, 1500) + "ms";
    letters[i].style.transform =
      "translateX(calc(" +
      translateX +
      "px - 50%)) translateY(calc(" +
      translateY +
      "px - 50%)) rotateZ(" +
      rotateY +
      "deg)";
  }
};

document.addEventListener("DOMContentLoaded", function() {
  initPlayers();
});

let last_known_scroll_position = 0;
let ticking = false;

let topSection = document.querySelector(".top");

function handleScroll(scroll_pos) {
  topSection.style.filter = "blur(" + scroll_pos / 30 + "px)";
}

window.addEventListener("scroll", function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      handleScroll(last_known_scroll_position);
      ticking = false;
    });
    ticking = true;
  }
});

if(window.matchMedia("(min-width: 45rem)").matches){ 
  window.addEventListener("resize", setTransforms);
  setTransforms();
}
