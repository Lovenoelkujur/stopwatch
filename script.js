const playButton = document.getElementById("play");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementById("min");
const second = document.getElementById("sec");
const centiSecond = document.getElementById("msec");
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false;
let secCount = 0;
let min;
let sec;
let centiSec;
let centiCount = 0;
let minCount = 0;
let lapItem = 0;
let isReset = false;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if(!isPlay && !isReset){
        playButton.innerHTML = "Pause";
        bg.classList.add("animation-bg");
        min = setInterval(() => {
            minute.innerHTML = `${++minCount} :`;
        }, 60*1000);
        sec = setInterval(() => {
            if(secCount === 60){
                secCount = 0;
            }
            second.innerHTML = `&nbsp;${++secCount} :&nbsp;`;
        }, 1000);
        centiSec = setInterval(() => {
            if(centiCount === 100){
                centiCount = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCount}`;
        }, 10);
        isPlay = true;
        isReset = true;
    }
    else{
        playButton.innerHTML = "Play";
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}

const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    second.innerHTML = "&nbsp;0 :";
    centiSecond.innerHTML = "&nbsp;0";
    minute.innerHTML = "0 :";
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `#${++lapItem}`
    timeStamp.innerHTML = `${minCount} : ${secCount} : ${centiCount}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");

}

const clearAll = () => {
    laps.innerHTML = "";
    laps.append(clearButton);
    clearButton.classList.add("hidden");
}


playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);