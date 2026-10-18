/**
 * NEXUS AUDIO SYNTHESIZER
 * Web Audio API synthesizer for 100% offline, zero-dependency sound effects.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('nexus_sfx_muted') === 'true';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio not supported:", e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('nexus_sfx_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playBeep(freq = 440, type = 'sine', duration = 0.08, vol = 0.1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback fail silently
    }
  }

  playLaser() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  playExplosion() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      // Noise burst for explosion
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playScore() {
    this.playBeep(659.25, 'triangle', 0.08, 0.15); // E5
    setTimeout(() => {
      this.playBeep(880, 'triangle', 0.12, 0.15); // A5
    }, 80);
  }

  playPowerup() {
    const notes = [330, 440, 550, 660, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBeep(freq, 'square', 0.08, 0.08);
      }, idx * 50);
    });
  }

  playGameOver() {
    const notes = [440, 392, 349, 311, 220];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBeep(freq, 'sawtooth', 0.18, 0.15);
      }, idx * 120);
    });
  }

  playClick() {
    this.playBeep(900, 'sine', 0.03, 0.05);
  }
}

// Global Sound Instance
window.soundFX = new SoundEngine();
