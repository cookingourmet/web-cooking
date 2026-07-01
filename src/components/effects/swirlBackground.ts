const TAU = Math.PI * 2;

const PARTICLE_PROP_COUNT = 9;
const RANGE_Y = 100;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const BASE_SPEED = 0.1;
const RANGE_SPEED = 2;
const BASE_RADIUS = 1;
const RANGE_RADIUS = 4;
const NOISE_STEPS = 8;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;

type CanvasPair = {
  a: HTMLCanvasElement;
  b: HTMLCanvasElement;
};

type ContextPair = {
  a: CanvasRenderingContext2D;
  b: CanvasRenderingContext2D;
};

let swirlCleanup: (() => void) | null = null;

function rand(max: number) {
  return Math.random() * max;
}

function randRange(range: number) {
  return range - Math.random() * range * 2;
}

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function fadeInOut(life: number, ttl: number) {
  const half = ttl * 0.5;

  if (life < half) {
    return life / half;
  }

  return Math.max(0, (ttl - life) / half);
}

function smoothStep(t: number) {
  return t * t * (3 - 2 * t);
}

function hash3D(x: number, y: number, z: number) {
  const value =
    Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;

  return value - Math.floor(value);
}

class SimplexNoiseLite {
  noise3D(x: number, y: number, z: number) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const z0 = Math.floor(z);

    const xf = x - x0;
    const yf = y - y0;
    const zf = z - z0;

    const u = smoothStep(xf);
    const v = smoothStep(yf);
    const w = smoothStep(zf);

    const n000 = hash3D(x0, y0, z0);
    const n100 = hash3D(x0 + 1, y0, z0);
    const n010 = hash3D(x0, y0 + 1, z0);
    const n110 = hash3D(x0 + 1, y0 + 1, z0);
    const n001 = hash3D(x0, y0, z0 + 1);
    const n101 = hash3D(x0 + 1, y0, z0 + 1);
    const n011 = hash3D(x0, y0 + 1, z0 + 1);
    const n111 = hash3D(x0 + 1, y0 + 1, z0 + 1);

    const x00 = lerp(n000, n100, u);
    const x10 = lerp(n010, n110, u);
    const x01 = lerp(n001, n101, u);
    const x11 = lerp(n011, n111, u);

    const y00 = lerp(x00, x10, v);
    const y01 = lerp(x01, x11, v);

    return lerp(y00, y01, w) * 2 - 1;
  }
}

function pickParticleColor() {
  const colors = [
    "rgba(255,255,255,",
    "rgba(255,250,224,",
    "rgba(255,232,168,",
    "rgba(255,211,92,",
    "rgba(245,181,43,",
    "rgba(201,143,32,",
  ];

  return Math.floor(rand(colors.length));
}

function getParticleColor(index: number) {
  const colors = [
    "rgba(255,255,255,",
    "rgba(255,250,224,",
    "rgba(255,232,168,",
    "rgba(255,211,92,",
    "rgba(245,181,43,",
    "rgba(201,143,32,",
  ];

  return colors[index] ?? colors[0];
}

export function initSpecializationSwirlBackground(
  canvasId = "specializationSwirlCanvas"
) {
  swirlCleanup?.();
  swirlCleanup = null;

  const screenCanvas = document.getElementById(
    canvasId
  ) as HTMLCanvasElement | null;

  if (!screenCanvas) return;

  const heroElement = screenCanvas.closest<HTMLElement>(".specialization-hero");

  if (!heroElement) return;

  const safeHero = heroElement;
  const bufferCanvas = document.createElement("canvas");

  const bufferContext = bufferCanvas.getContext("2d", {
    alpha: true,
  });

  const screenContext = screenCanvas.getContext("2d", {
    alpha: true,
  });

  if (!bufferContext || !screenContext) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const canvas: CanvasPair = {
    a: bufferCanvas,
    b: screenCanvas,
  };

  const ctx: ContextPair = {
    a: bufferContext,
    b: screenContext,
  };

  let width = 1;
  let height = 1;
  let dpr = 1;
  let center: [number, number] = [0, 0];
  let tick = 0;
  let animationFrame = 0;
  let isRunning = !reduceMotion.matches;
  let simplex = new SimplexNoiseLite();
  let particleCount = 700;
  let particlePropsLength = particleCount * PARTICLE_PROP_COUNT;
  let particleProps = new Float32Array(particlePropsLength);

  function getParticleCount() {
    if (width <= 640) return 280;
    if (width <= 980) return 420;
    if (width <= 1280) return 560;

    return 700;
  }

  function initParticles() {
    tick = 0;
    simplex = new SimplexNoiseLite();
    particleCount = getParticleCount();
    particlePropsLength = particleCount * PARTICLE_PROP_COUNT;
    particleProps = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += PARTICLE_PROP_COUNT) {
      initParticle(i);
    }
  }

  function initParticle(i: number) {
    const x = rand(width);

    const y =
      center[1] +
      randRange(Math.min(RANGE_Y, Math.max(56, height * 0.16)));

    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = BASE_TTL + rand(RANGE_TTL);
    const speed = BASE_SPEED + rand(RANGE_SPEED);
    const radius = BASE_RADIUS + rand(RANGE_RADIUS);
    const colorIndex = pickParticleColor();

    particleProps.set(
      [x, y, vx, vy, life, ttl, speed, radius, colorIndex],
      i
    );
  }

  function checkBounds(x: number, y: number) {
    return x > width || x < 0 || y > height || y < 0;
  }

  function drawParticle(
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    colorIndex: number
  ) {
    const fade = fadeInOut(life, ttl);
    const color = getParticleColor(Math.round(colorIndex));

    ctx.a.save();
    ctx.a.lineCap = "round";
    ctx.a.lineWidth = radius;
    ctx.a.strokeStyle = `${color}${fade * 0.68})`;
    ctx.a.beginPath();
    ctx.a.moveTo(x, y);
    ctx.a.lineTo(x2, y2);
    ctx.a.stroke();
    ctx.a.closePath();
    ctx.a.restore();
  }

  function updateParticle(i: number) {
    const i2 = i + 1;
    const i3 = i + 2;
    const i4 = i + 3;
    const i5 = i + 4;
    const i6 = i + 5;
    const i7 = i + 6;
    const i8 = i + 7;
    const i9 = i + 8;

    const x = particleProps[i];
    const y = particleProps[i2];

    const n =
      simplex.noise3D(x * X_OFF, y * Y_OFF, tick * Z_OFF) *
      NOISE_STEPS *
      TAU;

    const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
    const vy = lerp(particleProps[i4], Math.sin(n), 0.5);

    const life = particleProps[i5];
    const ttl = particleProps[i6];
    const speed = particleProps[i7];
    const radius = particleProps[i8];
    const colorIndex = particleProps[i9];

    const x2 = x + vx * speed;
    const y2 = y + vy * speed;

    drawParticle(x, y, x2, y2, life, ttl, radius, colorIndex);

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life + 1;

    if (checkBounds(x, y) || life > ttl) {
      initParticle(i);
    }
  }

  function drawParticles() {
    for (let i = 0; i < particlePropsLength; i += PARTICLE_PROP_COUNT) {
      updateParticle(i);
    }
  }

  function renderGlow() {
    ctx.b.save();
    ctx.b.filter = "blur(8px) brightness(190%) saturate(125%)";
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0, width, height);
    ctx.b.restore();

    ctx.b.save();
    ctx.b.filter = "blur(4px) brightness(180%) saturate(118%)";
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0, width, height);
    ctx.b.restore();
  }

  function renderToScreen() {
    ctx.b.save();
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0, width, height);
    ctx.b.restore();
  }

  function resize() {
    const rect = safeHero.getBoundingClientRect();

    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.a.width = Math.floor(width * dpr);
    canvas.a.height = Math.floor(height * dpr);

    canvas.b.width = Math.floor(width * dpr);
    canvas.b.height = Math.floor(height * dpr);
    canvas.b.style.width = `${width}px`;
    canvas.b.style.height = `${height}px`;

    ctx.a.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.b.setTransform(dpr, 0, 0, dpr, 0, 0);

    center = [width * 0.5, height * 0.5];

    initParticles();
  }

  function draw() {
    if (!isRunning) return;

    tick++;

    ctx.a.clearRect(0, 0, width, height);
    ctx.b.clearRect(0, 0, width, height);

    drawParticles();
    renderGlow();
    renderToScreen();

    animationFrame = window.requestAnimationFrame(draw);
  }

  function startAnimation() {
    if (reduceMotion.matches) return;

    isRunning = true;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function stopAnimation() {
    isRunning = false;
    window.cancelAnimationFrame(animationFrame);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopAnimation();
      return;
    }

    startAnimation();
  }

  function handleReduceMotionChange() {
    if (reduceMotion.matches) {
      stopAnimation();
      ctx.a.clearRect(0, 0, width, height);
      ctx.b.clearRect(0, 0, width, height);
      return;
    }

    startAnimation();
  }

  resize();
  startAnimation();

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  if ("addEventListener" in reduceMotion) {
    reduceMotion.addEventListener("change", handleReduceMotionChange);
  }

  swirlCleanup = () => {
    stopAnimation();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", handleVisibilityChange);

    if ("removeEventListener" in reduceMotion) {
      reduceMotion.removeEventListener("change", handleReduceMotionChange);
    }
  };
}

export function destroySpecializationSwirlBackground() {
  swirlCleanup?.();
  swirlCleanup = null;
}