console.log("Welcome to Spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let musicBar = document.getElementById('musicBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs= [
    {songName: "Change My Clothes", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Best Friend", filePath: "songs/2.mp3", coverPath: "covers/2.png"},
    {songName: "First Of The Year", filePath: "songs/3.mp3", coverPath: "covers/3.png"},
    {songName: "Is There Someone Else?", filePath: "songs/4.mp3", coverPath: "covers/4.png"},
    {songName: "This Is What Winter Feels Like", filePath: "songs/5.mp3", coverPath: "covers/5.png"},
    {songName: "Picture In My Mind", filePath: "songs/6.mp3", coverPath: "covers/6.png"},
    {songName: "Let Me Down Slowly", filePath: "songs/7.mp3", coverPath: "covers/7.png"},
    {songName: "End Of Beginning", filePath: "songs/8.mp3", coverPath: "covers/8.png"},
    {songName: "I Can't Stop The Loneliness", filePath: "songs/9.mp3", coverPath: "covers/9.png"},
    {songName: "Moment", filePath: "songs/10.mp3", coverPath: "covers/10.png"}
]

songItems.forEach((element, i)=> {
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})
//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = '1';
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = '0';
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    musicBar.value = progress;
})  

musicBar.addEventListener('change', ()=>{
    audioElement.currentTime = musicBar.value * audioElement.duration / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        gif.style.opacity = '1';
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
        gif.style.opacity = '1';
    }
    else{
        songIndex += 1;
        gif.style.opacity = '1';
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 9;
        gif.style.opacity = '1';
    }
    else{
        songIndex -= 1;
        gif.style.opacity = '1';
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//detect keypress for spacebar

document.addEventListener("keypress", function(e){
    keyboardSpaceBar(e.key);
})


function keyboardSpaceBar(key){
    switch (key) {
        case " ":
            if(audioElement.paused || audioElement.currentTime<=0){
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = '1';
            }
            else{
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = '0';
            }
            break;
    
        default:
            break;
    }
}