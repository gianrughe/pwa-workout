
let timer;

function startTimer() {
  clearInterval(timer);
  let seconds = parseInt(document.getElementById("recoveryTime").value, 10);
  document.getElementById("countdown").innerText = seconds;
  document.getElementById("timer-container").style.borderColor = "red";

  timer = setInterval(() => {
    seconds--;
    document.getElementById("countdown").innerText = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      document.getElementById("timer-container").style.borderColor = "green";
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
};
