const heatmap = document.querySelector(".heatmap");

for (let i = 0; i < 365; i++) {
  const day = document.createElement("div");
  day.classList.add("day");
  const intensidade = Math.floor(Math.random() * 5);
  day.classList.add("level-" + intensidade);
  heatmap.appendChild(day);
}