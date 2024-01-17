const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input[type='checkbox']");

let mapedKeys = [];
let audio = new Audio();  // Create an Audio object without an initial source

const playTune = (key) => {
    +    const audioSrc = `src/Audio/${key}.wav`;

    // Set the source and load the audio
    audio.src = audioSrc;
    audio.load();

    // Ensure the audio is loaded before playing
    audio.addEventListener('loadeddata', () => {
        audio.play();
    });

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
    if (mapedKeys.includes(e.key)) {
        playTune(e.key);
    }
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);
