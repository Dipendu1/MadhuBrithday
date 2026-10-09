const startBtn = document.getElementById("startBtn");
const surprise = document.getElementById("surprise");
const wishBtn = document.getElementById("wishBtn");
const cake = document.getElementById("cake");
const flame = document.getElementById("flame");
const cakeHint = document.getElementById("cakeHint");
const messageCard = document.getElementById("messageCard");

let candleBlown = false;
let messageOpened = false;

startBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  startBtn.textContent = "Your surprise is ready ✨";

  surprise.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  startBtn.disabled = true;
  startBtn.style.opacity = "0.75";
});

function blowCandle() {
  if (candleBlown) return;

  candleBlown = true;
  flame.style.opacity = "0";
  cakeHint.textContent = "Wish made? Here's a little magic for you. 💜";
  wishBtn.textContent = "Reveal your birthday message 💌";

  launchConfetti();
}

cake.addEventListener("click", blowCandle);

wishBtn.addEventListener("click", () => {
  if (!candleBlown) {
    blowCandle();
    return;
  }

  if (!messageOpened) {
    messageOpened = true;
    messageCard.classList.remove("hidden");
    wishBtn.textContent = "A birthday wish, just for you ✨";

    messageCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    launchConfetti();
  }
});

// Lightweight confetti animation using Canvas.
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame = null;
let running = false;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const colors = ["#ffb4d7", "#c5a3ff", "#ffe49c", "#ffffff"];

  particles = Array.from({ length: 110 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.5,
    size: 3 + Math.random() * 5,
    speed: 2 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 2,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.12,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  if (!running) animateConfetti();
}

function animateConfetti() {
  running = true;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.x += p.drift;
    p.y += p.speed;
    p.rotation += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
    ctx.restore();
  });

  particles = particles.filter((p) => p.y < window.innerHeight + 20);

  if (particles.length > 0) {
    animationFrame = requestAnimationFrame(animateConfetti);
  } else {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    running = false;
  }
}


const birthdaySong = document.getElementById("birthdaySong");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
  if (birthdaySong.paused) {
    try {
      await birthdaySong.play();
      musicBtn.textContent = "⏸ Pause Doraemon Song";
    } catch (error) {
      console.error("Audio playback error:", error);
      musicBtn.textContent = "Song error: " + error.name;
    }
  } else {
    birthdaySong.pause();
    musicBtn.textContent = "▶ Play Doraemon Song 💙";
  }
});