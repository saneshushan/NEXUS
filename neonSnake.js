/**
 * GAME 2: NEON SNAKE 2088
 * Cyberpunk grid snake with particle energy food and high-contrast neon graphics.
 */

class NeonSnakeGame {
  constructor(canvas, onScoreChange, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onScoreChange = onScoreChange;
    this.onGameOver = onGameOver;

    this.gridSize = 20;
    this.cols = Math.floor(this.canvas.width / this.gridSize);
    this.rows = Math.floor(this.canvas.height / this.gridSize);

    this.running = false;
    this.paused = false;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('nexus_high_snake') || '0', 10);

    this.snake = [];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.food = { x: 0, y: 0 };
    this.particles = [];

    this.speed = 100; // ms per tick
    this.lastTick = 0;

    this.bindEvents();
  }

  bindEvents() {
    this._keyHandler = (e) => {
      if (!this.running) return;
      const key = e.code;
      if (['ArrowUp', 'KeyW'].includes(key) && this.dir.y === 0) {
        this.nextDir = { x: 0, y: -1 };
        e.preventDefault();
      } else if (['ArrowDown', 'KeyS'].includes(key) && this.dir.y === 0) {
        this.nextDir = { x: 0, y: 1 };
        e.preventDefault();
      } else if (['ArrowLeft', 'KeyA'].includes(key) && this.dir.x === 0) {
        this.nextDir = { x: -1, y: 0 };
        e.preventDefault();
      } else if (['ArrowRight', 'KeyD'].includes(key) && this.dir.x === 0) {
        this.nextDir = { x: 1, y: 0 };
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', this._keyHandler);
  }

  destroy() {
    this.stop();
    window.removeEventListener('keydown', this._keyHandler);
  }

  start() {
    this.score = 0;
    this.speed = 95;
    this.particles = [];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };

    const startX = Math.floor(this.cols / 4);
    const startY = Math.floor(this.rows / 2);
    this.snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ];

    this.spawnFood();
    this.running = true;
    this.paused = false;
    this.lastTick = performance.now();
    this.onScoreChange(this.score, this.highScore, 'x1.0');

    this.loop(performance.now());
  }

  spawnFood() {
    let valid = false;
    while (!valid) {
      this.food = {
        x: Math.floor(Math.random() * (this.cols - 2)) + 1,
        y: Math.floor(Math.random() * (this.rows - 2)) + 1
      };
      valid = !this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y);
    }
  }

  createFoodBurst(x, y) {
    const px = x * this.gridSize + this.gridSize / 2;
    const py = y * this.gridSize + this.gridSize / 2;
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 4 + 1;
      this.particles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: Math.random() * 3 + 1,
        life: 1,
        decay: 0.04,
        color: '#ff0055'
      });
    }
  }

  pause() {
    this.paused = !this.paused;
    if (!this.paused && this.running) {
      this.lastTick = performance.now();
      this.loop(performance.now());
    }
  }

  stop() {
    this.running = false;
    this.paused = false;
  }

  update() {
    this.dir = this.nextDir;
    const head = {
      x: this.snake[0].x + this.dir.x,
      y: this.snake[0].y + this.dir.y
    };

    // Wall collision
    if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
      this.gameOver();
      return;
    }

    // Self collision
    for (let i = 0; i < this.snake.length; i++) {
      if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
        this.gameOver();
        return;
      }
    }

    this.snake.unshift(head);

    // Food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 100;
      this.createFoodBurst(this.food.x, this.food.y);
      if (window.soundFX) window.soundFX.playScore();

      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('nexus_high_snake', this.highScore);
      }

      // Slightly increase speed
      if (this.speed > 50) this.speed -= 1.5;

      const mult = (1 + this.score / 1000).toFixed(1);
      this.onScoreChange(this.score, this.highScore, `x${mult}`);
      this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  draw() {
    this.ctx.fillStyle = '#040711';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle neon grid
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    // Draw Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw Food (Pulsing glowing cyber orb)
    const foodPx = this.food.x * this.gridSize + this.gridSize / 2;
    const foodPy = this.food.y * this.gridSize + this.gridSize / 2;
    const pulse = (Math.sin(performance.now() / 150) + 1) / 2;

    this.ctx.save();
    this.ctx.shadowBlur = 14 + pulse * 6;
    this.ctx.shadowColor = '#ff0055';
    this.ctx.fillStyle = '#ff0055';
    this.ctx.beginPath();
    this.ctx.arc(foodPx, foodPy, this.gridSize / 2 - 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.restore();

    // Draw Snake
    this.snake.forEach((seg, idx) => {
      const px = seg.x * this.gridSize;
      const py = seg.y * this.gridSize;

      this.ctx.save();
      if (idx === 0) {
        // Snake Head
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.shadowBlur = 16;
        this.ctx.shadowColor = '#00f0ff';
        this.ctx.fillRect(px + 1, py + 1, this.gridSize - 2, this.gridSize - 2);

        // Head Eyes
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(px + 4, py + 4, 3, 3);
        this.ctx.fillRect(px + this.gridSize - 7, py + 4, 3, 3);
      } else {
        // Snake Body gradient
        const ratio = idx / this.snake.length;
        this.ctx.fillStyle = `rgba(0, 240, 255, ${0.9 - ratio * 0.5})`;
        this.ctx.strokeStyle = '#00f0ff';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(px + 2, py + 2, this.gridSize - 4, this.gridSize - 4);
        this.ctx.strokeRect(px + 2, py + 2, this.gridSize - 4, this.gridSize - 4);
      }
      this.ctx.restore();
    });
  }

  gameOver() {
    this.running = false;
    if (window.soundFX) window.soundFX.playGameOver();
    this.onGameOver(this.score, this.highScore);
  }

  loop(timestamp) {
    if (!this.running || this.paused) return;

    if (timestamp - this.lastTick >= this.speed) {
      this.update();
      this.lastTick = timestamp;
    }

    this.draw();
    requestAnimationFrame((t) => this.loop(t));
  }
}

window.NeonSnakeGame = NeonSnakeGame;
