/**
 * GAME 1: CYBER STRIKE (Space & Asteroid Shooter)
 */

class SpaceShooterGame {
  constructor(canvas, onScoreChange, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onScoreChange = onScoreChange;
    this.onGameOver = onGameOver;

    this.running = false;
    this.paused = false;
    this.score = 0;
    this.multiplier = 1;
    this.lives = 3;
    this.highScore = parseInt(localStorage.getItem('nexus_high_shooter') || '0', 10);

    this.keys = {};
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.stars = [];

    this.lastShotTime = 0;
    this.shootCooldown = 180; // ms
    this.spawnTimer = 0;
    this.spawnInterval = 70; // frames

    this.ship = {
      x: this.canvas.width / 2,
      y: this.canvas.height - 70,
      width: 32,
      height: 38,
      speed: 6,
      invulnerable: 0
    };

    this.initStars();
    this.bindEvents();
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? '#00f0ff' : '#ffffff'
      });
    }
  }

  bindEvents() {
    this._keyDownHandler = (e) => {
      if (!this.running) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code) || ['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }
      this.keys[e.code] = true;
    };

    this._keyUpHandler = (e) => {
      this.keys[e.code] = false;
    };

    window.addEventListener('keydown', this._keyDownHandler);
    window.addEventListener('keyup', this._keyUpHandler);
  }

  destroy() {
    this.stop();
    window.removeEventListener('keydown', this._keyDownHandler);
    window.removeEventListener('keyup', this._keyUpHandler);
  }

  start() {
    this.score = 0;
    this.multiplier = 1;
    this.lives = 3;
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.ship.x = this.canvas.width / 2;
    this.ship.y = this.canvas.height - 70;
    this.ship.invulnerable = 60;

    this.running = true;
    this.paused = false;
    this.onScoreChange(this.score, this.highScore, this.multiplier);

    this.loop();
  }

  pause() {
    this.paused = !this.paused;
    if (!this.paused && this.running) {
      this.loop();
    }
  }

  stop() {
    this.running = false;
    this.paused = false;
  }

  shoot() {
    const now = Date.now();
    if (now - this.lastShotTime < this.shootCooldown) return;
    this.lastShotTime = now;

    // Dual laser shot
    this.bullets.push({
      x: this.ship.x - 10,
      y: this.ship.y - 15,
      vx: 0,
      vy: -11,
      width: 3,
      height: 14
    });
    this.bullets.push({
      x: this.ship.x + 10,
      y: this.ship.y - 15,
      vx: 0,
      vy: -11,
      width: 3,
      height: 14
    });

    if (window.soundFX) window.soundFX.playLaser();
  }

  spawnEnemy() {
    const types = ['asteroid', 'asteroid', 'drone'];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * (this.canvas.width - 60) + 30;

    if (type === 'asteroid') {
      const radius = Math.random() * 14 + 14;
      this.enemies.push({
        type: 'asteroid',
        x: x,
        y: -30,
        radius: radius,
        speed: Math.random() * 2 + 1.5,
        hp: radius > 22 ? 2 : 1,
        color: '#ff9900',
        angle: 0,
        spin: (Math.random() - 0.5) * 0.05
      });
    } else {
      this.enemies.push({
        type: 'drone',
        x: x,
        y: -30,
        width: 26,
        height: 26,
        speed: Math.random() * 2.5 + 2,
        hp: 1,
        color: '#ff0055',
        angle: 0
      });
    }
  }

  createExplosion(x, y, color = '#00f0ff', count = 16) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        color: color
      });
    }
  }

  update() {
    // Update Stars Background
    this.stars.forEach(star => {
      star.y += star.speed;
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
    });

    // Ship Input Movement
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) this.ship.x -= this.ship.speed;
    if (this.keys['ArrowRight'] || this.keys['KeyD']) this.ship.x += this.ship.speed;
    if (this.keys['ArrowUp'] || this.keys['KeyW']) this.ship.y -= this.ship.speed;
    if (this.keys['ArrowDown'] || this.keys['KeyS']) this.ship.y += this.ship.speed;

    // Boundaries
    const margin = 20;
    this.ship.x = Math.max(margin, Math.min(this.canvas.width - margin, this.ship.x));
    this.ship.y = Math.max(margin, Math.min(this.canvas.height - margin, this.ship.y));

    // Shooting
    if (this.keys['Space']) {
      this.shoot();
    }

    if (this.ship.invulnerable > 0) {
      this.ship.invulnerable--;
    }

    // Engine thruster sparks
    if (Math.random() > 0.3) {
      this.particles.push({
        x: this.ship.x + (Math.random() - 0.5) * 8,
        y: this.ship.y + 18,
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 2 + 1,
        life: 1,
        decay: 0.08,
        color: '#00f0ff'
      });
    }

    // Bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.y += b.vy;
      if (b.y < -20) {
        this.bullets.splice(i, 1);
      }
    }

    // Spawn Enemies
    this.spawnTimer++;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnEnemy();
      // Increase difficulty slightly
      if (this.spawnInterval > 35) this.spawnInterval -= 0.2;
    }

    // Update Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.y += enemy.speed;
      if (enemy.type === 'asteroid') enemy.angle += enemy.spin;

      // Enemy leaves screen
      if (enemy.y > this.canvas.height + 40) {
        this.enemies.splice(i, 1);
        this.multiplier = 1;
        this.onScoreChange(this.score, this.highScore, this.multiplier);
        continue;
      }

      // Check collision with bullets
      let hit = false;
      for (let j = this.bullets.length - 1; j >= 0; j--) {
        const b = this.bullets[j];
        const dist = Math.hypot(b.x - enemy.x, b.y - enemy.y);
        const radius = enemy.radius || 16;

        if (dist < radius + 8) {
          this.bullets.splice(j, 1);
          enemy.hp--;

          if (enemy.hp <= 0) {
            this.createExplosion(enemy.x, enemy.y, enemy.color, 18);
            if (window.soundFX) window.soundFX.playExplosion();

            const pts = (enemy.type === 'asteroid' ? 50 : 100) * this.multiplier;
            this.score += pts;
            this.multiplier = Math.min(5, this.multiplier + 0.1);
            if (this.score > this.highScore) {
              this.highScore = this.score;
              localStorage.setItem('nexus_high_shooter', this.highScore);
            }
            this.onScoreChange(this.score, this.highScore, this.multiplier.toFixed(1));

            this.enemies.splice(i, 1);
            hit = true;
            break;
          } else {
            this.createExplosion(b.x, b.y, '#ffffff', 4);
          }
        }
      }

      if (hit) continue;

      // Check collision with ship
      if (this.ship.invulnerable === 0) {
        const distToShip = Math.hypot(this.ship.x - enemy.x, this.ship.y - enemy.y);
        const enemyRadius = enemy.radius || 14;

        if (distToShip < enemyRadius + 16) {
          this.createExplosion(this.ship.x, this.ship.y, '#ff0055', 25);
          if (window.soundFX) window.soundFX.playExplosion();

          this.enemies.splice(i, 1);
          this.lives--;
          this.multiplier = 1;
          this.ship.invulnerable = 90;
          this.onScoreChange(this.score, this.highScore, this.multiplier);

          if (this.lives <= 0) {
            this.gameOver();
            return;
          }
        }
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.fillStyle = '#03050a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Stars
    this.stars.forEach(star => {
      this.ctx.fillStyle = star.color;
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Draw Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Bullets
    this.bullets.forEach(b => {
      this.ctx.save();
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.fillRect(b.x - b.width / 2, b.y, b.width, b.height);
      this.ctx.restore();
    });

    // Draw Enemies
    this.enemies.forEach(enemy => {
      this.ctx.save();
      this.ctx.translate(enemy.x, enemy.y);
      if (enemy.type === 'asteroid') {
        this.ctx.rotate(enemy.angle);
        this.ctx.strokeStyle = '#ff9900';
        this.ctx.fillStyle = 'rgba(255, 153, 0, 0.15)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ff9900';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        const r = enemy.radius;
        this.ctx.arc(0, 0, r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      } else {
        // Drone
        this.ctx.fillStyle = '#ff0055';
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = '#ff0055';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 14);
        this.ctx.lineTo(-14, -14);
        this.ctx.lineTo(0, -6);
        this.ctx.lineTo(14, -14);
        this.ctx.closePath();
        this.ctx.fill();
      }
      this.ctx.restore();
    });

    // Draw Ship
    if (this.ship.invulnerable % 8 < 4) {
      this.ctx.save();
      this.ctx.translate(this.ship.x, this.ship.y);

      // Ship body neon polygon
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.fillStyle = '#0a1020';
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      this.ctx.moveTo(0, -20); // nose
      this.ctx.lineTo(16, 16);  // right wing
      this.ctx.lineTo(0, 8);    // engine center
      this.ctx.lineTo(-16, 16); // left wing
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Cockpit glow
      this.ctx.fillStyle = '#ff0055';
      this.ctx.beginPath();
      this.ctx.arc(0, -2, 3, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }

    // HUD Shields in canvas
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.font = '12px Orbitron';
    this.ctx.fillText(`SHIELDS: `, 20, 30);
    for (let i = 0; i < 3; i++) {
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.fillStyle = i < this.lives ? '#00f0ff' : 'transparent';
      this.ctx.beginPath();
      this.ctx.arc(95 + i * 16, 26, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  gameOver() {
    this.running = false;
    if (window.soundFX) window.soundFX.playGameOver();
    this.onGameOver(this.score, this.highScore);
  }

  loop() {
    if (!this.running || this.paused) return;
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

window.SpaceShooterGame = SpaceShooterGame;
