const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input[type='checkbox']");

let mapedKeys = [];
let activeAudioObjects = {};

const _playTune = (key) => {
    const audioSrc = `src/Audio/${key}.wav`;

    // Create a new Audio object for each note
    const audio = new Audio();
    audio.src = audioSrc;
    audio.volume = volumeSlider.value;

    activeAudioObjects[key] = audio;

    // Play the notes
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 300);
};

pianoKeys.forEach((key) => {
    key.addEventListener("click", (event) => {
        _playTune(event.target.dataset.key);
    });
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
    if (mapedKeys.includes(e.key)) {
        _playTune(e.key);
    }
});

const handleVolume = (e) => {
    // Update the volume of all active notes
    Object.values(activeAudioObjects).forEach((audio) => {
        audio.volume = e.target.value;
    });
};

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);
