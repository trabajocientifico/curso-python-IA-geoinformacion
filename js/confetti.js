/* ============================================
   Confetti & Particles Engine
   Lightweight, zero-dependency celebration effects
   ============================================ */

const Confetti = {
  canvas: null,
  ctx: null,
  particles: [],
  animationId: null,
  isRunning: false,

  init() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  // Launch confetti with configurable options
  launch(options = {}) {
    const defaults = {
      particleCount: 60,
      spread: 70,
      startY: 0.5,
      colors: ['#00d4ff', '#7b2ff7', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'],
      duration: 2500,
      gravity: 0.6,
      drift: 0,
      shapes: ['square', 'circle'],
      scalar: 1,
    };

    const config = { ...defaults, ...options };
    this.createParticles(config);

    if (!this.isRunning) {
      this.isRunning = true;
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.display = 'block';
      this.animate();
    }

    // Auto-stop after duration
    setTimeout(() => {
      if (this.particles.length === 0) {
        this.stop();
      }
    }, config.duration + 1000);
  },

  createParticles(config) {
    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height * config.startY;

    for (let i = 0; i < config.particleCount; i++) {
      const angle = (Math.random() * config.spread - config.spread / 2) * (Math.PI / 180);
      const velocity = 8 + Math.random() * 8;
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      const shape = config.shapes[Math.floor(Math.random() * config.shapes.length)];
      const size = (4 + Math.random() * 6) * config.scalar;

      this.particles.push({
        x: centerX + (Math.random() - 0.5) * 200,
        y: startY,
        vx: Math.sin(angle) * velocity + (Math.random() - 0.5) * 4 + config.drift,
        vy: -(Math.cos(angle) * velocity) - Math.random() * 4,
        color,
        shape,
        size,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: config.gravity,
        opacity: 1,
        decay: 0.015 + Math.random() * 0.01,
        wobble: Math.random() * 10,
        wobbleSpeed: 0.05 + Math.random() * 0.1,
        wobbleOffset: Math.random() * Math.PI * 2,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.02 + Math.random() * 0.05,
      });
    }
  },

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update physics
      p.vy += p.gravity * 0.3;
      p.x += p.vx * 0.6;
      p.y += p.vy * 0.6;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;
      p.tiltAngle += p.tiltSpeed;

      // Wobble
      p.x += Math.sin(p.wobbleOffset) * p.wobble * 0.05;
      p.wobbleOffset += p.wobbleSpeed;

      // Remove dead particles
      if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      // Draw
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      // 3D tilt effect
      const scaleX = Math.cos(p.tiltAngle);

      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * Math.abs(scaleX), p.size, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'square') {
        this.ctx.fillRect(
          -p.size * Math.abs(scaleX),
          -p.size,
          p.size * 2 * Math.abs(scaleX),
          p.size * 2
        );
      } else if (p.shape === 'strip') {
        this.ctx.fillRect(
          -p.size * 0.5 * Math.abs(scaleX),
          -p.size * 1.5,
          p.size * Math.abs(scaleX),
          p.size * 3
        );
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.stop();
    }
  },

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (this.canvas) {
      this.canvas.style.display = 'none';
    }
  },

  // --- Preset effects ---

  // Subtle celebration for lesson completion
  lessonComplete() {
    this.launch({
      particleCount: 35,
      colors: ['#00d4ff', '#7b2ff7', '#4f46e5'],
      duration: 1800,
      gravity: 0.5,
      scalar: 0.8,
      shapes: ['square', 'circle'],
      startY: 0.3,
    });
  },

  // Intense celebration for quiz pass
  quizPass() {
    this.launch({
      particleCount: 80,
      colors: ['#22c55e', '#00d4ff', '#7b2ff7', '#f59e0b', '#ec4899'],
      duration: 3000,
      gravity: 0.4,
      scalar: 1.1,
      shapes: ['square', 'circle', 'strip'],
      spread: 90,
      startY: 0.4,
    });
  },

  // Epic celebration for course completion
  courseComplete() {
    // Wave 1
    this.launch({
      particleCount: 100,
      colors: ['#00d4ff', '#7b2ff7', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'],
      duration: 4000,
      gravity: 0.3,
      scalar: 1.2,
      shapes: ['square', 'circle', 'strip'],
      spread: 120,
      startY: 0.5,
    });
    // Wave 2 delayed
    setTimeout(() => {
      this.launch({
        particleCount: 60,
        colors: ['#00d4ff', '#7b2ff7', '#ffd700'],
        duration: 3000,
        gravity: 0.4,
        scalar: 1,
        spread: 80,
        startY: 0.3,
      });
    }, 800);
    // Wave 3
    setTimeout(() => {
      this.launch({
        particleCount: 40,
        colors: ['#22c55e', '#00d4ff', '#ffd700'],
        duration: 2500,
        gravity: 0.5,
        spread: 60,
        startY: 0.6,
      });
    }, 1500);
  },

  // Module complete — medium celebration
  moduleComplete() {
    this.launch({
      particleCount: 55,
      colors: ['#22c55e', '#00d4ff', '#7b2ff7'],
      duration: 2200,
      gravity: 0.45,
      scalar: 1,
      shapes: ['square', 'circle', 'strip'],
      spread: 80,
      startY: 0.35,
    });
  },

  // Level up — golden celebration
  levelUp() {
    this.launch({
      particleCount: 70,
      colors: ['#ffd700', '#ffaa00', '#00d4ff', '#7b2ff7', '#fff'],
      duration: 2800,
      gravity: 0.35,
      scalar: 1.1,
      shapes: ['square', 'circle', 'strip'],
      spread: 100,
      startY: 0.4,
    });
  },

  // Achievement unlock — subtle purple/gold
  achievementUnlock() {
    this.launch({
      particleCount: 30,
      colors: ['#7b2ff7', '#ffd700', '#a855f7', '#c084fc'],
      duration: 1600,
      gravity: 0.5,
      scalar: 0.7,
      shapes: ['square', 'circle'],
      spread: 60,
      startY: 0.25,
    });
  },
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Confetti.init();
});
