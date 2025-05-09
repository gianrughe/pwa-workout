
let timer;
let isRunning = false;
let originalSeconds = 75;


function startTimer(i) {
  let timerKey = "timer" + i;
  let weightPrefix = "weight" + i;
  let recoveryInput = document.getElementById("recoveryTime" + i);
  let countdown = document.getElementById("countdown" + i);
  let container = document.getElementById("timer-container" + i);
  let startBtn = document.getElementById("btn" + i);
  let recoveryText = document.getElementById("recoveryText" + i);

  if (!window.timers) window.timers = {};
  if (window.timers[timerKey]) {
    clearInterval(window.timers[timerKey]);
    countdown.innerText = recoveryInput.value;
    container.style.borderColor = "green";
    recoveryInput.style.backgroundColor = "green";
    startBtn.textContent = "Start Recupero";
    startBtn.style.backgroundColor = "green";
    window.timers[timerKey] = null;
    return;
  }

  let seconds = parseInt(recoveryInput.value, 10);
  recoveryText.innerText = "Recupero " + seconds + " secondi";
  countdown.innerText = seconds;
  container.style.borderColor = "red";
  recoveryInput.style.backgroundColor = "red";
  startBtn.textContent = "Stop Recupero";
  startBtn.style.backgroundColor = "red";

  window.timers[timerKey] = setInterval(() => {
    seconds--;
    countdown.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(window.timers[timerKey]);
      countdown.innerText = recoveryInput.value;
      container.style.borderColor = "green";
      recoveryInput.style.backgroundColor = "green";
      startBtn.textContent = "Start Recupero";
      startBtn.style.backgroundColor = "green";
      playAlert();
      window.timers[timerKey] = null;
    }
  }, 1000);
}
 {
  const recoveryInput = document.getElementById("recoveryTime");
  const countdown = document.getElementById("countdown");
  const container = document.getElementById("timer-container");
  const startBtn = document.querySelector("button");

  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    countdown.innerText = originalSeconds;
    container.style.borderColor = "green";
    recoveryInput.style.backgroundColor = "green";
    startBtn.textContent = "Start Recupero";
    startBtn.style.backgroundColor = "green";
    return;
  }

  originalSeconds = parseInt(recoveryInput.value, 10);
  let seconds = originalSeconds;

  document.getElementById("recoveryText").innerText = "Recupero " + seconds + " secondi";
  countdown.innerText = seconds;
  container.style.borderColor = "red";
  recoveryInput.style.backgroundColor = "red";
  startBtn.textContent = "Stop Recupero";
  startBtn.style.backgroundColor = "red";
  isRunning = true;

  timer = setInterval(() => {
    seconds--;
    countdown.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      isRunning = false;
      countdown.innerText = originalSeconds;
      container.style.borderColor = "green";
      recoveryInput.style.backgroundColor = "green";
      startBtn.textContent = "Start Recupero";
      startBtn.style.backgroundColor = "green";
      playAlert();
    }
  }, 1000);
}

function playAlert() {
  const audio = new Audio("beep.mp3");
  audio.play();
  if (window.navigator.vibrate) {
    window.navigator.vibrate(500);
  }
}

window.onload = () => {
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById("weight" + i);
    const saved = localStorage.getItem("weight" + i);
    if (saved) input.value = saved;
    input.addEventListener("input", () => {
      localStorage.setItem("weight" + i, input.value);
    });
  }

  const recoveryInput = document.getElementById("recoveryTime");
  const recoveryText = document.getElementById("recoveryText");
  const countdown = document.getElementById("countdown");

  const val = parseInt(recoveryInput.value, 10);
  recoveryText.innerText = "Recupero " + val + " secondi";
  countdown.innerText = val;
  recoveryInput.style.backgroundColor = "green";
  document.getElementById("timer-container").style.borderColor = "green";

  recoveryInput.addEventListener("input", () => {
    const newVal = parseInt(recoveryInput.value, 10);
    if (!isNaN(newVal)) {
      recoveryText.innerText = "Recupero " + newVal + " secondi";
      countdown.innerText = newVal;
      originalSeconds = newVal;
    }
  });

  const startBtn = document.querySelector("button");
  startBtn.style.backgroundColor = "green";
};
