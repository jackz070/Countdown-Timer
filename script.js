let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(" [data-time]");
const sound = document.querySelector("audio");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      sound.play();
      endTime.textContent = "Time's up!";
      document.title = "Time's up!";
      setTimeout(() => {
        endTime.textContent = "What it's gonna be?";
        document.title = "Countdown Timer";
      }, 15000);
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!isNaN(this.minutes.value) || !this.minutes.value > 0) {
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
  }
});

function resetTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = "00:00";
  endTime.textContent = "What it's gonna be?";
  document.title = "Countdown Timer";
}
