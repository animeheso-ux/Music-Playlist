var container = document.getElementsByClassName("container");
var box = document.getElementsByClassName("box");

var MusicButton = document.getElementById("PlayButton");
var ShuffleButton = document.getElementById("Shuffle");
var MusicText = document.getElementById("CurrentText");
var MusicDisc = document.getElementById("Disc");

var TextArea = document.getElementById("SongSelector");
var SubmitButton = document.getElementById("SubmitButton");


var audio = null;
var MusicPosition = 0;
var isplaying = false;


var SongDict = {

}


async function LoadSongs() {
    const response = await fetch("http://127.0.0.1:5000/get_songs");
    SongDict = await response.json();

    console.log(SongDict); // data is guaranteed here


    for (let key of Object.keys(SongDict)) {
    var newbox = document.createElement("div");
    newbox.className = "box";
    newbox.textContent = key + ":" + SongDict[key]["Name"];
    container[0].appendChild(newbox);
}
}

LoadSongs();






function ShuffleObject() {

    //document.querySelectorAll(".box").forEach(box => box.remove());



}




function HighlightBox() {
    for (let i = 0; i < box.length;i++) {
        if (i == MusicPosition) {
            box[i].classList.add("active");
        }else {
            if (box[i].classList.contains("active")) {
                box[i].classList.remove("active");
            }
        }
    }
}


function PlayListHandler(status) {
        MusicDisc.classList.remove("Anim");
        MusicText.textContent = status;
        isplaying = false;
        if (MusicPosition >= Object.keys(SongDict).length - 1) {
            MusicPosition = 0 
        } else {
            MusicPosition += 1
        }


        audio.pause()
        HighlightBox()
        PlaySong(MusicPosition)
}


function PlaySong(Input) {
        if (isplaying == false) {
        isplaying = true;
        console.log(SongDict[Input]["SongID"]);
        audio = new Audio(SongDict[Input]["SongID"]);
        MusicText.textContent = "Currently Playing :" + " " + SongDict[Input]["Name"];
        audio.play()
        MusicDisc.classList.add("Anim");

        audio.onended = function() {
              PlayListHandler("Currently Playing : None");
        }


    } else {

        PlayListHandler("Paused!");
    }
    HighlightBox()
}


ShuffleButton.onclick = function() {
    if (isplaying == true) {
        return
    }

    ShuffleObject();
      
}


SubmitButton.onclick = function() {
    if (isNaN(TextArea.value)) {
        console.warn("invalid!");
        
        return 
    }

    if (!Number(TextArea.value in SongDict)) {
        return
    }



    MusicPosition = Number(TextArea.value)


    PlaySong(MusicPosition)

}




MusicButton.onclick = function() {
    PlaySong(MusicPosition)

}



