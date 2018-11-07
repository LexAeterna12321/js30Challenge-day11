// handlers
const video = document.querySelector(".player__video");
const playBtn = document.querySelector(".player__button.toggle");
const skipBtns = [...document.querySelectorAll("[data-skip]")];
const rangeInps = document.querySelectorAll("[type=range]");
const progressBar = document.querySelector(".progress");
const progressBarFill = document.querySelector(".progress__filled");
const fullScreenBtn = document.querySelector(".player__button.full-screen");
const player = document.querySelector(".player");

let flag = false; //used in volume and playSpeed range inputs
let flag2 = false //used in video progress display

// funcs
const playToggle = function () {
    this.paused ? this.play() : this.pause();
}
const playBtnToggle = function () {
    this.paused ? playBtn.textContent = '►' : playBtn.textContent = '❚ ❚'
}
const skip = function () {
    video.currentTime += parseFloat(this.dataset.skip);
}
const handleVolPlaySpeed = function () {
    if (flag) video[this.name] = this.value;
}
// progress Bar funcs
const handleProgressBar = function () {
    const progressValue = (this.currentTime / this.duration) * 100;
    progressBarFill.style.flexBasis = `${progressValue}%`;
}
const updateVidProgress = function (e) {
    const progress = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = progress;
}

const handleFullScreen = function () {
    player.classList.toggle("player-fullscreen");
}
// listeners

// play/pause
video.addEventListener("click", playToggle);
playBtn.addEventListener("click", playToggle.bind(video));
video.addEventListener("pause", playBtnToggle)
video.addEventListener("play", playBtnToggle)
// skip
skipBtns.forEach(btn => btn.addEventListener("click", skip));
// volume/playSpeed
rangeInps.forEach(btn => btn.addEventListener("mousedown", () => flag = true));
rangeInps.forEach(btn => btn.addEventListener("mousemove", handleVolPlaySpeed));
rangeInps.forEach(btn => btn.addEventListener("mouseup", () => flag = false));
// progress Bar
video.addEventListener("timeupdate", handleProgressBar);
progressBar.addEventListener("click", updateVidProgress);
progressBar.addEventListener("mousedown", () => flag2 = true);
// if flag2 is true it will fire updateVidProgress func. (e) needs to be both in callback and nested func
progressBar.addEventListener("mousemove", (e) => flag2 && updateVidProgress(e));
// 
progressBar.addEventListener("mouseup", () => flag2 = false);
progressBar.addEventListener("mouseout", () => flag2 = false);
// full screen
fullScreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("keydown", (e) => {
    if (e.which === 27) {
        player.classList.remove("player-fullscreen")
    }
})