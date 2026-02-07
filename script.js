const layers = [
  { name: "Titanium Shell", difficulty: "Easy", taps: 10, colors: ["#b7c4d9", "#7b879d", "#2f384c"] },
  { name: "Cobalt Alloy", difficulty: "Easy", taps: 20, colors: ["#c1d2ff", "#6d7dd9", "#2b3350"] },
  { name: "Obsidian Steel", difficulty: "Medium", taps: 40, colors: ["#1e2333", "#515a78", "#111523"] },
  { name: "Molten Bronze", difficulty: "Medium", taps: 80, colors: ["#d99a5c", "#7a3f2d", "#2b1f1a"] },
  { name: "Frosted Mythril", difficulty: "Medium", taps: 160, colors: ["#b6f0ff", "#6e9bb4", "#1a2735"] },
  { name: "Arcane Quartz", difficulty: "Hard", taps: 320, colors: ["#f5d7ff", "#8d6fc9", "#2a1d4d"] },
  { name: "Stormglass", difficulty: "Hard", taps: 640, colors: ["#9cf7ff", "#4a7ab3", "#16263b"] },
  { name: "Dragonbone", difficulty: "Hard", taps: 1280, colors: ["#f0e3d0", "#b08f6a", "#3c2a23"] },
  { name: "Astral Platinum", difficulty: "Extreme", taps: 2560, colors: ["#f1f5ff", "#9aa6c6", "#2c3248"] },
  { name: "Ethereal Prism", difficulty: "Extreme", taps: 5120, colors: ["#d3ffe9", "#6fc7ff", "#2d3c54"] }
];

const egg = document.getElementById("egg");
const eggCore = document.getElementById("eggCore");
const scoreEl = document.getElementById("score");
const layerTitle = document.getElementById("layerTitle");
const layerSub = document.getElementById("layerSub");
const layerCount = document.getElementById("layerCount");
const progressBar = document.getElementById("progressBar");
const difficulty = document.getElementById("difficulty");
const materialsList = document.getElementById("materialsList");

let currentLayer = 0;
let tapsRemaining = layers[currentLayer].taps;
let score = 0;

const tapRewards = [1, 2, 5];

const updateEggStyle = () => {
  const layer = layers[currentLayer];
  const [light, mid, dark] = layer.colors;
  egg.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 50%),
    linear-gradient(160deg, ${light}, ${mid} 45%, ${dark} 100%)`;
};

const updateProgress = () => {
  const layer = layers[currentLayer];
  const tapsDone = layer.taps - tapsRemaining;
  const progress = Math.min((tapsDone / layer.taps) * 100, 100);
  progressBar.style.width = `${progress}%`;
  layerTitle.textContent = `Layer ${currentLayer + 1}: ${layer.name}`;
  layerSub.textContent = `${tapsRemaining} taps to crack`;
  layerCount.textContent = `${currentLayer + 1} / ${layers.length}`;
  difficulty.textContent = layer.difficulty;
};

const renderMaterials = () => {
  materialsList.innerHTML = "";
  layers.forEach((layer, index) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = `Layer ${index + 1}`;
    const material = document.createElement("strong");
    material.textContent = layer.name;
    if (index === currentLayer) {
      material.style.color = "#f7d060";
    }
    item.append(name, material);
    materialsList.append(item);
  });
};

const spawnCoin = (value, x, y) => {
  const coin = document.createElement("div");
  coin.className = "coin-float";
  coin.textContent = `+${value}`;
  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;
  egg.parentElement.appendChild(coin);
  coin.addEventListener("animationend", () => {
    coin.remove();
  });
};

const onTap = (event) => {
  if (currentLayer >= layers.length) {
    return;
  }

  const reward = tapRewards[Math.floor(Math.random() * tapRewards.length)];
  score += reward;
  scoreEl.textContent = score.toLocaleString();

  const rect = egg.getBoundingClientRect();
  const x = event.clientX - rect.left + rect.left + 20;
  const y = event.clientY - rect.top + rect.top + 10;
  spawnCoin(reward, x, y);

  tapsRemaining -= 1;

  if (tapsRemaining <= 0) {
    currentLayer += 1;
    if (currentLayer >= layers.length) {
      layerTitle.textContent = "Core Unlocked: Magic Dragon Heart";
      layerSub.textContent = "Tap the glowing core for endless rewards";
      layerCount.textContent = "Core";
      difficulty.textContent = "Mythic";
      progressBar.style.width = "100%";
      eggCore.style.opacity = "1";
      egg.style.boxShadow = "0 0 60px rgba(120, 255, 255, 0.7)";
      renderMaterials();
      return;
    }
    tapsRemaining = layers[currentLayer].taps;
    updateEggStyle();
  }

  updateProgress();
  renderMaterials();
};

egg.addEventListener("click", onTap);

document.querySelector(".ad-button").addEventListener("click", () => {
  alert("Ad loading... (demo)");
});

updateEggStyle();
updateProgress();
renderMaterials();
