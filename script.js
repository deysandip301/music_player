const audio = document.getElementById("audio");
const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-bar");
const currTimeDisplay = document.querySelector(".curr-time");
const totalTimeDisplay = document.querySelector(".total-time");
const songImg = document.querySelector(".song-img");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
console.log(songArtist);
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const forwardButton = document.getElementById("forward");
const backwardButton = document.getElementById("backward");
// console.log(shuffleButton);

let currentTime = 0;
let duration = 0;

let isplaying = false;
let isShuffle = false;
let isRepeat = false;

const allsongs = [
    {
        song_audio: "./assets/songs/golden-hour.mp3",
        song_img: "./assets/poster/golden-hour.jpg",
        song_name: "Golden Hour",
        song_artist : "JVKE",
    },

    {
        song_audio : "./assets/songs/It's-okay.mp3",
        song_img : "./assets/poster/It's-okay.jpg",
        song_name : "It's Okay",
        song_artist : "Nightbirde",
    },

    {
        song_audio : "./assets/songs/Levitating.mp3",
        song_img : "./assets/poster/Levitating.jpg",
        song_name : "Levitating",
        song_artist : "Dua Lipa",
    },

    {
        song_audio : "./assets/songs/love-story.mp3",
        song_img : "./assets/poster/love-story.jpg",
        song_name : "Love Story",
        song_artist : "Taylor Swift",
    },

    {
        song_audio : "./assets/songs/montero.mp3",
        song_img : "./assets/poster/montero.jpg",
        song_name : "Montero",
        song_artist : "Lil Nas X",
    },

    {
        song_audio : "./assets/songs/positions.mp3",
        song_img : "./assets/poster/positions.jpg",
        song_name : "Positions",
        song_artist : "Ariana Grande",
    },
]

const playMusic = () => {
    isplaying = true;
    audio.play();
    console.log("Playing");
    playPause.classList.replace("fa-play-circle", "fa-pause-circle");
    playPause.setAttribute("title", "Pause");
}

const pauseMusic = () => {
    isplaying = false;
    audio.pause();
    playPause.classList.replace("fa-pause-circle", "fa-play-circle");
    playPause.setAttribute("title", "Play");
}

playPause.addEventListener("click", () => {
    isplaying ? pauseMusic() : playMusic();
});





const toggleShuffle = () => {
    isShuffle = !isShuffle;
    // console.log(isShuffle);
    // console.log(isRepeat);
    // Implement shuffle logic as needed
    shuffleButton.classList.toggle("active", isShuffle);

}

const toggleRepeat = () => {
    isRepeat = !isRepeat;
    // Implement repeat logic as needed
    if (isRepeat) {
        audio.loop = true;
    }
    repeatButton.classList.toggle("active", isRepeat);
}




// ...

audio.addEventListener('loadedmetadata', () => {
    if (!isNaN(audio.duration)) {
        totalTimeDisplay.textContent = formatTime(audio.duration);
    }
});

audio.addEventListener('timeupdate', () => {
    currentTime = audio.currentTime;
    duration = audio.duration;


    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currTimeDisplay.textContent = formatTime(currentTime);

    if (duration - currentTime <= 1) {
        console.log(isRepeat);
        console.log(isShuffle);
        // Play next song
        if(isRepeat) {
            loadSong(allsongs[songIndex]);
            pauseMusic();
            progress.style.width = '0%'; // Reset progress bar
            return;
        }
        else if (isShuffle) {
            songIndex = Math.floor(Math.random() * allsongs.length);
            loadSong(allsongs[songIndex]);
            pauseMusic();
            progress.style.width = '0%'; // Reset progress bar
            return;
        }
        else {
            nextSong();
            pauseMusic();
        }
    }
});



const updateProgress = (event) => {
    duration = audio.duration;

    if (duration && duration !== Infinity) {
        const progressContainerWidth = progressContainer.clientWidth;
        const progressPercent = (event.offsetX / progressContainerWidth) * duration;
        audio.currentTime = progressPercent;
    }
}

progressContainer.addEventListener("click", updateProgress);

// Function to format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const loadSong = (song) => {
    songName.textContent = song.song_name;
    songArtist.textContent = song.song_artist;
    audio.src = song.song_audio;
    songImg.src = song.song_img;
    console.log(songArtist);
}

let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % allsongs.length;
    loadSong(allsongs[songIndex]);
    playMusic();
    progress.style.width = '0%'; // Reset progress bar
}

const prevSong = () => {
    songIndex = (songIndex - 1 + allsongs.length) % allsongs.length;
    loadSong(allsongs[songIndex]);
    playMusic();
}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

shuffleButton.addEventListener("click", toggleShuffle);

repeatButton.addEventListener("click", toggleRepeat);

