// Konfigurasi canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Ular dan makanan
let snake = [{ x: 160, y: 160 }];
let food = { x: 0, y: 0 };
let direction = { x: gridSize, y: 0 };
let score = 0;
let gameInterval;

// Fungsi untuk menggambar
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Gambar background grid
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gambar makanan
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Gambar ular dengan efek glow
  ctx.fillStyle = "lime";
  snake.forEach((segment, index) => {
    ctx.shadowColor = "lime";
    ctx.shadowBlur = 10;
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    ctx.shadowBlur = 0; // Reset shadow
  });

  // Update skor
  document.getElementById("score").innerText = "Score: " + score;
}

// Fungsi untuk memperbarui posisi ular
function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Periksa apakah ular menabrak dinding atau dirinya sendiri
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    checkCollision(head)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Periksa apakah ular makan makanan
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop(); // Hapus ekor
  }

  draw();
}

// Fungsi untuk mengecek tabrakan ular dengan dirinya sendiri
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Fungsi untuk menempatkan makanan secara acak
function spawnFood() {
  const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food = { x, y };
}

// Fungsi untuk mereset game
function restartGame() {
  snake = [{ x: 160, y: 160 }];
  direction = { x: gridSize, y: 0 };
  score = 0;
  spawnFood();
  document.getElementById("gameOver").style.display = "none";
  gameInterval = setInterval(update, 100); // Restart game loop
}

// Fungsi game over
function gameOver() {
  clearInterval(gameInterval);
  document.getElementById("gameOver").style.display = "block";
}

// Fungsi untuk menangani input keyboard
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -gridSize };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: gridSize };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -gridSize, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    direction = { x: gridSize, y: 0 };
  }
});

// Mulai game pertama kali
spawnFood();
gameInterval = setInterval(update, 100); // Update setiap 100 ms
