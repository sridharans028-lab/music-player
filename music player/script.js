const songs = [
{
    title: "Kalyani",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg"
},
{
    title: "Amsham",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg"
},
{
    title: "Kulashtree",
    src: "music/song3.mp3",
    cover: "images/cover3.jpg"
}
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const playBtn = document.getElementById("playBtn");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const reels = document.querySelectorAll(".reel");
const led = document.getElementById("led");

let index = 0;

loadSong(index);

function loadSong(i){

    title.textContent = songs[i].title;

    audio.src = songs[i].src;

    cover.src = songs[i].cover;

}

function startAnimation(){

    reels.forEach(reel => reel.classList.add("spin"));

    led.classList.add("active");

    cover.style.animation = "spin 12s linear infinite";

}

function stopAnimation(){

    reels.forEach(reel => reel.classList.remove("spin"));

    led.classList.remove("active");

    cover.style.animation = "none";

}

function playPause(){

    if(audio.paused){

        audio.play();

        playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

        startAnimation();

    }else{

        audio.pause();

        playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

        stopAnimation();

    }

}

function nextSong(){

    index++;

    if(index>=songs.length){

        index=0;

    }

    loadSong(index);

    audio.play();

    playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    startAnimation();

}

function prevSong(){

    index--;

    if(index<0){

        index=songs.length-1;

    }

    loadSong(index);

    audio.play();

    playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    startAnimation();

}

audio.addEventListener("loadedmetadata",()=>{

    progress.max = audio.duration;

    duration.textContent = format(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

    progress.value = audio.currentTime;

    current.textContent = format(audio.currentTime);

});

progress.addEventListener("input",()=>{

    audio.currentTime = progress.value;

});

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

audio.addEventListener("ended",()=>{

    nextSong();

});

function format(time){

    if(isNaN(time)) return "0:00";

    let min = Math.floor(time/60);

    let sec = Math.floor(time%60);

    if(sec<10){

        sec="0"+sec;

    }

    return min+":"+sec;

}

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        playPause();

    }

    if(e.code==="ArrowRight"){

        nextSong();

    }

    if(e.code==="ArrowLeft"){

        prevSong();

    }

});