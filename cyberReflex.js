/**
 * GAME 3: CHRONO REFLEX
 * Millisecond precision reflex tester with cyber target matrix and pilot grade classification.
 */

class CyberReflexGame {
  constructor(canvas, onScoreChange, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onScoreChange = onScoreChange;
    this.onGameOver = onGameOver;

    this.running = false;
    this.paused = false;

    this.state = 'idle'; // 'idle', 'waiting', 'ready', 'result', 'finished'
    this.round = 0;
    this.maxRounds = 5;
    this.scores = [];
    this.startTime = 0;
    this.timerId = null;

    this.mouse = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.particles = [];
    this.reticleAngle = 0;

    this.highScore = parseInt(localStorage.getItem('nexus_high_reflex') || '999', 10);

    this.bindEvents();
  }

  bindEvents() {
    this._clickHandler = (e) => {
      if (!this.running) return;
      this.handleAction();
    };

    this._keyHandler = (e) => {
      if (!this.running) return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.handleAction();
      }
    };

    this._mouseMoveHandler = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.mouse.x = (e.clientX - rect.left) * scaleX;
      this.mouse.y = (e.clientY - rect.top) * scaleY;
    };

    this.canvas.addEventListener('click', this._clickHandler);
    window.addEventListener('keydown', this._keyHandler);
    this.canvas.addEventListener('mousemove', this._mouseMoveHandler);
  }

  destroy() {
    this.stop();
    this.canvas.removeEventListener('click', this._clickHandler);
    window.removeEventListener('keydown', this._keyHandler);
    this.canvas.removeEventListener('mousemove', this._mouseMoveHandler);
  }

  start() {
    this.running = true;
    this.paused = false;
    this.round = 0;
    this.scores = [];
    this.particles = [];
    this.state = 'idle';

    this.onScoreChange('---', this.highScore === 999 ? '---' : `${this.highScore}ms`, 'RND 1/5');
    this.startRound();
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
    clearTimeout(this.timerId);
  }

  startRound() {
    this.round++;
    if (this.round > this.maxRounds) {
      this.finishGame();
      return;
    }

    this.state = 'waiting';
    this.onScoreChange('WAIT...', this.highScore === 999 ? '---' : `${this.highScore}ms`, `RND ${this.round}/5`);

    // Random delay between 1.5s and 4.2s
    const delay = Math.random() * 2700 + 1500;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      if (!this.running) return;
      this.state = 'ready';
      this.startTime = performance.now();
      if (window.soundFX) window.soundFX.playBeep(880, 'sine', 0.1, 0.2);
    }, delay);
  }

  handleAction() {
    if (this.state === 'waiting') {
      // Early click penalty
      clearTimeout(this.timerId);
      this.state = 'early';
      if (window.soundFX) window.soundFX.playBeep(180, 'sawtooth', 0.25, 0.2);
      this.createShockwave(this.mouse.x, this.mouse.y, '#ff0055');

      setTimeout(() => {
        if (this.running) this.startRound();
      }, 1400);

    } else if (this.state === 'ready') {
      const elapsed = Math.round(performance.now() - this.startTime);
      this.scores.push(elapsed);
      this.state = 'result';
      this.lastElapsed = elapsed;

      this.createShockwave(this.mouse.x, this.mouse.y, '#00ff88');
      if (window.soundFX) window.soundFX.playScore();

      if (elapsed < this.highScore) {
        this.highScore = elapsed;
        localStorage.setItem('nexus_high_reflex', this.highScore);
      }

      this.onScoreChange(`${elapsed}ms`, `${this.highScore}ms`, `RND ${this.round}/5`);

      setTimeout(() => {
        if (this.running) this.startRound();
      }, 1200);
    }
  }

  createShockwave(x, y, color) {
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: Math.random() * 3 + 1,
        life: 1,
        decay: 0.03,
        color: color
      });
    }
  }

  finishGame() {
    this.running = false;
    const avg = Math.round(this.scores.reduce((a, b) => a + b, 0) / (this.scores.length || 1));
    if (window.soundFX) window.soundFX.playPowerup();

    let rank = 'ROOKIE';
    if (avg < 200) rank = 'CYBER GOD';
    else if (avg < 240) rank = 'CYBER ACE';
    else if (avg < 290) rank = 'APEX PILOT';

    this.onGameOver(`${avg}ms [${rank}]`, `${this.highScore}ms`);
  }

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    this.ctx.fillStyle = '#060a14';
    this.ctx.fillRect(0, 0, w, h);

    // Draw Background Grid Matrix
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }

    // Concentric Target Rings in center
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    for (let r = 80; r <= 220; r += 50) {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // State Visuals
    if (this.state === 'waiting') {
      // Waiting Red/Amber State
      this.ctx.fillStyle = 'rgba(255, 0, 85, 0.06)';
      this.ctx.fillRect(0, 0, w, h);

      this.ctx.fillStyle = '#ff0055';
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#ff0055';
      this.ctx.font = '900 36px Orbitron';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('WAIT FOR GREEN SIGNAL...', cx, cy - 20);

      this.ctx.font = '600 16px Rajdhani';
      this.ctx.fillStyle = '#8899b5';
      this.ctx.shadowBlur = 0;
      this.ctx.fillText('DO NOT CLICK OR PRESS SPACE EARLY', cx, cy + 25);

      // Pulsing center light
      const pulse = (Math.sin(performance.now() / 200) + 1) / 2;
      this.ctx.fillStyle = '#ff0055';
      this.ctx.shadowBlur = 25 * pulse;
      this.ctx.shadowColor = '#ff0055';
      this.ctx.beginPath();
      this.ctx.arc(cx, cy + 70, 15, 0, Math.PI * 2);
      this.ctx.fill();

    } else if (this.state === 'ready') {
      // Electric Green STRIKE NOW State
      this.ctx.fillStyle = 'rgba(0, 255, 136, 0.18)';
      this.ctx.fillRect(0, 0, w, h);

      this.ctx.fillStyle = '#00ff88';
      this.ctx.shadowBlur = 30;
      this.ctx.shadowColor = '#00ff88';
      this.ctx.font = '900 52px Orbitron';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('>>> STRIKE NOW! <<<', cx, cy - 10);

      this.ctx.font = '700 20px Rajdhani';
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowBlur = 0;
      this.ctx.fillText('CLICK ANYWHERE OR PRESS SPACEBAR!', cx, cy + 40);

    } else if (this.state === 'early') {
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.25)';
      this.ctx.fillRect(0, 0, w, h);

      this.ctx.fillStyle = '#ff3344';
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#ff3344';
      this.ctx.font = '900 36px Orbitron';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('TOO EARLY! PROTOCOL FAULT', cx, cy);

    } else if (this.state === 'result') {
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.font = '900 48px Orbitron';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`${this.lastElapsed} MS`, cx, cy - 10);

      this.ctx.font = '700 18px Rajdhani';
      this.ctx.fillStyle = '#00ff88';
      this.ctx.shadowBlur = 0;
      let label = 'LIGHTNING FAST!';
      if (this.lastElapsed > 260) label = 'SOLID REFLEX!';
      this.ctx.fillText(label, cx, cy + 30);
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
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw Reticle over mouse
    this.reticleAngle += 0.02;
    this.ctx.save();
    this.ctx.translate(this.mouse.x, this.mouse.y);
    this.ctx.rotate(this.reticleAngle);
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = '#00f0ff';

    this.ctx.beginPath();
    this.ctx.arc(0, 0, 16, 0, Math.PI * 0.7);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(0, 0, 16, Math.PI, Math.PI * 1.7);
    this.ctx.stroke();

    this.ctx.fillStyle = '#ff0055';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  loop() {
    if (!this.running || this.paused) return;
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

window.CyberReflexGame = CyberReflexGame;
