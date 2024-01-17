const states = {
    view: {
        showKeys: document.querySelector(".keys-check"),
        volume: document.querySelector(".knob"),
        pianoKeys: document.querySelectorAll(".piano-keys .key"),
    },
    value: {
        volume: 0.5,
        supportKeys: [],
    },
};

const playSound = (key) => {
    const audio = new Audio(`src/audio/${key}.wav`);
    audio.volume = states.value.volume;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

const handleVolumeChange = (e) => {
    states.value.volume = e.currentTarget.value;
};

const showHideKeys = () => {
    states.view.pianoKeys.forEach((key) => {
        key.classList.toggle("hide");
    });
};

states.view.pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playSound(key.dataset.key));
    states.value.supportKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
    if (states.value.supportKeys.includes(e.key)) {
        playSound(e.key);
    }
});

states.view.volume.addEventListener("input", handleVolumeChange);
states.view.showKeys.addEventListener("click", showHideKeys);
