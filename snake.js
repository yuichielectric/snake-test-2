// ゲームの設定
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gridSize = 10;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

// スネークの初期位置と速度
let snake = [{ x: 5, y: 5 }];
let dx = 1;
let dy = 0;

// 食べ物の初期位置
let food = { x: 10, y: 10 };

// 壁の座標
const walls = [];
for (let x = 0; x < width; x++) {
  walls.push({ x: x, y: 0 });
  walls.push({ x: x, y: height - 1 });
}
for (let y = 0; y < height; y++) {
  walls.push({ x: 0, y: y });
  walls.push({ x: width - 1, y: y });
}

// ゲームのメインループ
function main() {
  // スネークを移動する
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // スネークが食べ物を食べた場合
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * width);
    food.y = Math.floor(Math.random() * height);
  } else {
    snake.pop();
  }

  // スネークが壁にぶつかった場合
  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
    clearInterval(intervalId);
    alert("ゲームオーバー");
  }

  // スネークが自分自身にぶつかった場合
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(intervalId);
      alert("ゲームオーバー");
    }
  }

  // ゲームを描画する
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "gray";
  walls.forEach((wall) => {
    ctx.fillRect(wall.x * gridSize, wall.y * gridSize, gridSize, gridSize);
  });
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// キーボードの入力を受け取る
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      dx = -1;
      dy = 0;
      break;
    case "ArrowRight":
      dx = 1;
      dy = 0;
      break;
    case "ArrowUp":
      dx = 0;
      dy = -1;
      break;
    case "ArrowDown":
      dx = 0;
      dy = 1;
      break;
  }
});

// ゲームを開始する
const intervalId = setInterval(main, 100);