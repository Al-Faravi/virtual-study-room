// ========== TIMER ==========
let timeLeft = 25 * 60;
let timer;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timer);
        alert("Time's up!");
      }
    }, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateTimer();
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;

updateTimer();

// ========== SOUNDS ==========
const sounds = {
  rain: new Audio("assets/sounds/rain.mp3"),
  coffee: new Audio("assets/sounds/coffee.mp3"),
  lofi: new Audio("assets/sounds/lofi.mp3"),
};

Object.values(sounds).forEach(sound => sound.loop = true);

function toggleSound(type) {
  const sound = sounds[type];
  if (sound.paused) {
    sound.play();
  } else {
    sound.pause();
  }
}

// ========== NOTES ==========
const openNotes = document.getElementById("open-notes");
const notesPopup = document.getElementById("notes-popup");
const closeNotes = document.getElementById("close-notes");
const saveNotes = document.getElementById("save-notes");
const notesArea = document.getElementById("notes-area");

openNotes.onclick = () => {
  notesPopup.classList.remove("hidden");
  notesArea.value = localStorage.getItem("studyNotes") || "";
};

saveNotes.onclick = () => {
  localStorage.setItem("studyNotes", notesArea.value);
  alert("Notes saved!");
};

closeNotes.onclick = () => {
  notesPopup.classList.add("hidden");
};

// ========== QUOTES ==========
const quoteText = document.getElementById("quote-text");

const quotes = [
  "Success doesn't come to you. You go to it.",
  "Push yourself, because no one else is going to do it for you.",
  "Do something today that your future self will thank you for.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The secret to getting ahead is getting started."
];

function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = `"${quotes[index]}"`;
}

showRandomQuote();

let goalMinutes = 0;
let totalStudySeconds = 0;

document.getElementById("set-goal").onclick = () => {
  goalMinutes = parseInt(document.getElementById("goal-minutes").value);
  totalStudySeconds = 0;
  updateProgress();
};

// Update every second of timer
function startTimer() {
  if (!isRunning) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        totalStudySeconds++;
        updateTimer();
        updateProgress();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Time's up!");
        checkAchievement();
      }
    }, 1000);
    isRunning = true;
  }
}

function updateProgress() {
  if (goalMinutes > 0) {
    let percent = Math.min(100, Math.floor((totalStudySeconds / (goalMinutes * 60)) * 100));
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").textContent = `Progress: ${percent}%`;
  }
}
function checkAchievement() {
  if (goalMinutes > 0 && (totalStudySeconds / 60) >= goalMinutes) {
    showAchievement();
  }
}

function showAchievement() {
  const confetti = document.createElement("div");
  confetti.innerHTML = "🎉 You reached your daily goal! 🎉";
  confetti.style.position = "fixed";
  confetti.style.top = "40%";
  confetti.style.left = "50%";
  confetti.style.transform = "translate(-50%, -50%)";
  confetti.style.background = "#fff";
  confetti.style.padding = "20px";
  confetti.style.borderRadius = "12px";
  confetti.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  confetti.style.zIndex = 9999;
  confetti.style.fontSize = "1.5rem";
  document.body.appendChild(confetti);
  setTimeout(() => document.body.removeChild(confetti), 5000);
}
document.getElementById("export-notes").onclick = () => {
  const blob = new Blob([notesArea.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "My_Study_Notes.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
};
