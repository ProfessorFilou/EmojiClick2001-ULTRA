
let score = 0;
let power = 1;
let emojiChar = "😀";
let doublePowerActive = false;
let doublePowerTimeout = null;

const emoji = document.getElementById("emoji");
const scoreDisplay = document.getElementById("score");
const powerDisplay = document.getElementById("power");
const eventMessage = document.getElementById("event-message");

emoji.addEventListener("click", () => {
  score += power;
  update();
  saveGame();
  triggerRandomEvent();
});

function buyUpgrade(cost, amount) {
  if (score >= cost) {
    score -= cost;
    power += amount;
    update();
    saveGame();
  } else {
    alert("Nicht genug Punkte!");
  }
}

function changeEmoji(newEmoji, cost) {
  if (score >= cost) {
    score -= cost;
    emojiChar = newEmoji;
    emoji.textContent = emojiChar;
    update();
    saveGame();
  } else {
    alert("Nicht genug Punkte für dieses Emoji!");
  }
}

function update() {
  scoreDisplay.textContent = score;
  powerDisplay.textContent = power;
}

function triggerRandomEvent() {
  const chance = Math.random();
  if (chance < 0.03) {
    const bonus = Math.floor(Math.random() * 20) + 10;
    score += bonus;
    eventMessage.textContent = `🎉 Bonus Event! +${bonus} Punkte!`;
    setTimeout(() => eventMessage.textContent = "", 2000);
    saveGame();
  } else if (chance < 0.05) {
    const malus = Math.floor(Math.random() * 10) + 5;
    score = Math.max(0, score - malus);
    eventMessage.textContent = `💀 Unglück! -${malus} Punkte!`;
    setTimeout(() => eventMessage.textContent = "", 2000);
    saveGame();
  } else if (chance < 0.06 && !doublePowerActive) {
    doublePowerActive = true;
    power *= 2;
    eventMessage.textContent = `⚡ DOPPEL POWER für 10 Sekunden!`;
    emoji.classList.add("active-bonus");
    update();
    saveGame();
    doublePowerTimeout = setTimeout(() => {
      power = Math.floor(power / 2);
      doublePowerActive = false;
      emoji.classList.remove("active-bonus");
      eventMessage.textContent = "";
      update();
      saveGame();
    }, 10000);
  }
}

function saveGame() {
  const saveData = {
    score,
    power,
    emojiChar
  };
  localStorage.setItem("emojiclickSave", JSON.stringify(saveData));
}

function loadGame() {
  const save = JSON.parse(localStorage.getItem("emojiclickSave"));
  if (save) {
    score = save.score;
    power = save.power;
    emojiChar = save.emojiChar;
    emoji.textContent = emojiChar;
    update();
  }
}

function resetGame() {
  if (confirm("Willst du dein Spiel wirklich zurücksetzen?")) {
    localStorage.removeItem("emojiclickSave");
    score = 0;
    power = 1;
    emojiChar = "😀";
    emoji.textContent = emojiChar;
    update();
  }
}

loadGame();
