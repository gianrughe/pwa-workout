
function startTimer(id) {
  const recoveryInput = document.getElementById("recoveryTime" + id);
  const countdown = document.getElementById("countdown" + id);
  const recoveryText = document.getElementById("recoveryText" + id);
  const startBtn = document.getElementById("startBtn" + id);
  const container = countdown.closest(".exercise-block");

  if (startBtn.dataset.running === "true") {
    clearInterval(startBtn.timer);
    countdown.innerText = recoveryInput.value;
    container.style.borderColor = "green";
    recoveryInput.style.backgroundColor = "green";
    startBtn.textContent = "Start Recupero";
    startBtn.style.backgroundColor = "green";
    startBtn.dataset.running = "false";
    return;
  }

  let seconds = parseInt(recoveryInput.value, 10);
  const original = seconds;

  recoveryText.innerText = "Recupero " + seconds + " secondi";
  countdown.innerText = seconds;
  container.style.borderColor = "red";
  recoveryInput.style.backgroundColor = "red";
  startBtn.textContent = "Stop Recupero";
  startBtn.style.backgroundColor = "red";
  startBtn.dataset.running = "true";

  startBtn.timer = setInterval(() => {
    seconds--;
    countdown.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(startBtn.timer);
      countdown.innerText = original;
      container.style.borderColor = "green";
      recoveryInput.style.backgroundColor = "green";
      startBtn.textContent = "Start Recupero";
      startBtn.style.backgroundColor = "green";
      startBtn.dataset.running = "false";
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
  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 4; j++) {
      const input = document.getElementById("weight" + i + "_" + j);
      const saved = localStorage.getItem("weight" + i + "_" + j);
      if (saved) input.value = saved;
      input.addEventListener("input", () => {
        localStorage.setItem("weight" + i + "_" + j, input.value);
      });
    }
  }
};
