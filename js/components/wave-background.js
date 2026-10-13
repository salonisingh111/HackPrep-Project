/**
 * High-performance animated wave background canvas with flowing mint/emerald light trails.
 */
export function initWaveBackground(canvasId = "waveCanvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let animationFrameId = null;
  let width = 0;
  let height = 0;
  let scrollY = window.scrollY || 0;
  let targetScrollY = scrollY;
  let scrollTicking = false;
  let time = 0;

  // Wave configurations: organic curves with subtle mint & emerald tones
  const waves = [
    { baseAmplitude: 52, frequency: 0.0014, speed: 0.0035, verticalShift: 0.28, color: "rgba(98, 230, 174, 0.24)", lineWidth: 1.4 },
    { baseAmplitude: 74, frequency: 0.0011, speed: 0.0022, verticalShift: 0.35, color: "rgba(183, 243, 210, 0.18)", lineWidth: 1.2 },
    { baseAmplitude: 44, frequency: 0.0018, speed: 0.0042, verticalShift: 0.42, color: "rgba(98, 230, 174, 0.14)", lineWidth: 1.0 },
    { baseAmplitude: 60, frequency: 0.0009, speed: 0.0018, verticalShift: 0.62, color: "rgba(98, 230, 174, 0.20)", lineWidth: 1.3 },
    { baseAmplitude: 80, frequency: 0.0013, speed: 0.0028, verticalShift: 0.70, color: "rgba(183, 243, 210, 0.12)", lineWidth: 1.1 }
  ];

  // Delicate sparse particle points
  const particles = Array.from({ length: 14 }, (_, i) => ({
    x: Math.random(),
    y: 0.2 + Math.random() * 0.65,
    radius: 1 + Math.random() * 1.5,
    speed: 0.0002 + Math.random() * 0.0003,
    alpha: 0.2 + Math.random() * 0.4
  }));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    if (isReducedMotion) {
      drawFrame();
    }
  }

  function onScroll() {
    targetScrollY = window.scrollY || 0;
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        scrollY += (targetScrollY - scrollY) * 0.15;
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  function drawWave(cfg, scrollOffsetFactor) {
    ctx.beginPath();
    ctx.strokeStyle = cfg.color;
    ctx.lineWidth = cfg.lineWidth;

    const basePosY = (height * cfg.verticalShift) - (scrollY * scrollOffsetFactor);
    const wavePhase = time * cfg.speed;

    ctx.moveTo(0, basePosY);
    const step = 24;
    for (let x = 0; x <= width + step; x += step) {
      const sin1 = Math.sin((x * cfg.frequency) + wavePhase);
      const sin2 = Math.cos((x * cfg.frequency * 0.5) - (wavePhase * 0.7));
      const y = basePosY + (sin1 * cfg.baseAmplitude) + (sin2 * (cfg.baseAmplitude * 0.35));
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawParticles() {
    particles.forEach(p => {
      p.x += p.speed;
      if (p.x > 1.05) p.x = -0.05;
      const px = p.x * width;
      const py = (p.y * height) - (scrollY * 0.08);

      ctx.beginPath();
      ctx.fillStyle = `rgba(98, 230, 174, ${p.alpha})`;
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    // Subtle drift update
    if (!isReducedMotion) {
      time += 1;
    }

    // Draw layered wave curves with progressive scroll parallax response
    waves.forEach((w, idx) => {
      drawWave(w, 0.08 + (idx * 0.03));
    });

    // Draw delicate floating points
    drawParticles();
  }

  function animate() {
    if (document.visibilityState === "visible") {
      drawFrame();
    }
    animationFrameId = window.requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  resize();

  if (!isReducedMotion) {
    animationFrameId = window.requestAnimationFrame(animate);
  }

  return {
    destroy() {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    }
  };
}
