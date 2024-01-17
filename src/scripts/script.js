const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".knob");
const keysCheck = document.querySelector(".keys-check");

let audio = new Audio("src/audio/a.wav");

let mapedKeys = [];

const playTune = (key) => {
    audio.src = `src/audio/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`)
    clickedKey.classList.add("active")
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};


pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key))
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown",
    (e) => {
        if (mapedKeys.includes(e.key)) {
            playTune(e.key);
        }
    });

handleVolume = (e) => {
    audio.volume = e.target.value;
    console.log(e.target.value);
}

volumeSlider.addEventListener("input", handleVolume)

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"))
}

keysCheck.addEventListener("click", showHideKeys)