const workTitle = document.getElementById("workTime");
const shortTimeTitle = document.getElementById("shortTimeBreak");
const longTimeTitle = document.getElementById("longTimeBreak");
let workTime = localStorage.getItem("workTime") || 25;
let shortTimeBreak = localStorage.getItem("shortTimeBreak") || 5;
let longTimeBreak = localStorage.getItem("longTimeBreak") || 15;
let seconds = "00";
let countdown;

const initInputs = () => {
    const workTimeInput = document.getElementById("work-time-input");
    const shortBreakInput = document.getElementById("short-break-input");
    const longBreakInput = document.getElementById("long-break-input");

    workTimeInput.value = workTime;
    shortBreakInput.value = shortTimeBreak;
    longBreakInput.value = longTimeBreak;

    workTimeInput.addEventListener("change", () => {
        workTime = workTimeInput.value;
        localStorage.setItem("workTime", workTime);
    });
    shortBreakInput.addEventListener("change", () => {
        shortTimeBreak = shortBreakInput.value;
        localStorage.setItem("shortTimeBreak", shortTimeBreak);
    });
    longBreakInput.addEventListener("change", () => {
        longTimeBreak = longBreakInput.value;
        localStorage.setItem("longTimeBreak", longTimeBreak);
    });
}

window.onload = () => {
    document.getElementById("minutes").innerHTML = workTime;
    document.getElementById("seconds").innerHTML = seconds;
    workTitle.classList.add("active");
    initInputs();
}

const startTimer = () => {
    document.getElementById("start").style.display = "none";
    document.getElementById("reset").style.display = "block";
    let seconds = currentSeconds || 59;
    let minutes = currentMinutes || workTime - 1;
    let shortBreakMinutes = shortTimeBreak - 1;
    let longBreakMinutes = longTimeBreak - 1;
    let breakCount = 0;

    const timerFunction = () => {
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
        seconds = seconds - 1;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes === -1) {
                if (breakCount % 2 === 0) {
                    minutes = shortBreakMinutes;
                    breakCount++
                    workTitle.classList.remove("active");
                    shortTimeTitle.classList.add("active");
                } else if (breakCount < 7) {
                    minutes = workTime - 1;
                    breakCount++;
                    shortTimeTitle.classList.remove("active");
                    workTitle.classList.add("active");
                } else {
                    minutes = longBreakMinutes;
                    breakCount = 0;
                    longTimeTitle.classList.add("active");
                    workTitle.classList.remove("active");
                    shortTimeTitle.classList.remove("active");
                }
                seconds = 59;
            }
        }
    }
    countdown = setInterval(timerFunction, 1000);
}

/* Pause timer */

let currentMinutes = 0;
let currentSeconds = 0;

const pauseTimer = () => {
    clearInterval(countdown);
    currentMinutes = parseInt(document.getElementById("minutes").innerHTML);
    currentSeconds = parseInt(document.getElementById("seconds").innerHTML);
    document.getElementById("start").style.display = "block";
}

/* Modal popup */

const popupBg = document.querySelector('.popup__bg');
const popup = document.querySelector('.popup__form');
const openPopupButton = document.querySelector('.popup');
const closePopupButton = document.querySelector('.close-popup');

openPopupButton.addEventListener('click', (e) => {
    e.preventDefault();
    popupBg.classList.add('active');
    popup.classList.add('active');
});

closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});