// script.js

document.addEventListener("DOMContentLoaded", () => {
  const welcomeCard = document.getElementById("welcomeCard");
  const mainCard = document.getElementById("mainCard");
  const btnStart = document.getElementById("btnStart");
  const welcomeType = document.getElementById("welcomeType");

  const envelope = document.getElementById("envelope");
  const letterWrapper = document.getElementById("letterWrapper");
  const letterBody = document.getElementById("letterBody");
  const hint = document.getElementById("hint");

  const celebrationLayer = document.getElementById("celebrationLayer");
  const heartsLayer = document.getElementById("floatingHearts");

  const btnSecret = document.getElementById("btnSecret");
  const secretBubble = document.getElementById("secretBubble");

  const btnToast = document.getElementById("btnToast");
  const yearBadge = document.getElementById("yearBadge");
  const yearNumber = document.getElementById("yearNumber");

  if (!welcomeCard || !mainCard) return;

  const body = document.body;
  let isOpen = false;
  let hasCelebratedBig = false;

  // ==============================
  // TYPEWRITER EN BIENVENIDA
  // ==============================
  const typeText = "Pensé que lo primero del año debía ser un mensaje para usted.";
  if (welcomeType) {
    let index = 0;
    const speed = 45;

    const typeWriter = () => {
      if (index <= typeText.length) {
        welcomeType.textContent = typeText.slice(0, index);
        index++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  }

  // ==============================
  // TRANSICIÓN BIENVENIDA → CARTA
  // ==============================
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      welcomeCard.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      welcomeCard.style.opacity = "0";
      welcomeCard.style.transform = "translateY(10px) scale(0.98)";

      setTimeout(() => {
        welcomeCard.style.display = "none";
        mainCard.classList.add("card--visible");
      }, 300);
    });
  }

  // ==============================
  // PARALLAX / 3D SOBRE EN DESKTOP
  // ==============================
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && envelope) {
    const innerEnvelope = envelope.querySelector(".envelope");

    envelope.addEventListener("mousemove", (e) => {
      if (!innerEnvelope || isOpen) return;
      const rect = envelope.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotX = -y * 12;
      const rotY = x * 16;

      innerEnvelope.style.transform =
        `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(0)`;
    });

    envelope.addEventListener("mouseleave", () => {
      if (!innerEnvelope || isOpen) return;
      innerEnvelope.style.transform = "";
    });
  }

  // ==============================
  // FUEGOS ARTIFICIALES + CONFETTI
  // ==============================
  const createFlash = () => {
    if (!celebrationLayer) return;
    const flash = document.createElement("div");
    flash.className = "flash";
    celebrationLayer.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  };

  const createFireworkBurst = (xPercent, yPercent) => {
    if (!celebrationLayer) return;

    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${xPercent}%`;
    firework.style.top = `${yPercent}%`;

    const particleCount = 18;
    const maxDistance = 110;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "firework-particle";

      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = maxDistance * (0.6 + Math.random() * 0.4);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      particle.style.setProperty("--dx", `${dx}px`);
      particle.style.setProperty("--dy", `${dy}px`);
      particle.style.animationDelay = `${Math.random() * 0.15}s`;

      firework.appendChild(particle);
    }

    celebrationLayer.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 1700);
  };

  const launchConfetti = (intensity = 60) => {
    if (!celebrationLayer) return;

    const totalPieces = intensity;
    for (let i = 0; i < totalPieces; i++) {
      const piece = document.createElement("div");

      const colorVariant = 1 + Math.floor(Math.random() * 4);
      piece.className = `confetti-piece confetti-piece--${colorVariant}`;

      const left = Math.random() * 100;
      const delay = Math.random() * 0.9;
      const duration = 2.6 + Math.random() * 1.5;

      piece.style.left = `${left}%`;
      piece.style.animationDelay = `${delay}s`;
      piece.style.animationDuration = `${duration}s`;

      celebrationLayer.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, (delay + duration) * 1000 + 200);
    }
  };

  const launchCelebration = (big = false) => {
    if (!celebrationLayer) return;

    createFlash();
    launchConfetti(big ? 120 : 70);

    const waves = big ? 5 : 3;
    for (let wave = 0; wave < waves; wave++) {
      setTimeout(() => {
        const bursts = big ? 5 : 3;
        for (let i = 0; i < bursts; i++) {
          const x = Math.random() * 100;
          const y = 5 + Math.random() * 75;
          createFireworkBurst(x, y);
        }
      }, wave * 550);
    }
  };

  // ==============================
  // CORAZONES DE FONDO
  // ==============================
  const createHeart = (extra = false) => {
    if (!heartsLayer) return;
    const heart = document.createElement("span");
    heart.className = "heart";
    if (extra) heart.classList.add("heart--extra");
    const size = 10 + Math.random() * 14;
    heart.textContent = "❤";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${size}px`;
    const duration = 6 + Math.random() * 4;
    heart.style.animationDuration = `${duration}s`;
    heartsLayer.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, duration * 1000 + 500);
  };

  const boostHearts = () => {
    if (!heartsLayer) return;
    for (let i = 0; i < 14; i++) {
      setTimeout(() => createHeart(true), i * 120);
    }
  };

  // Corazones suaves constantes
  if (heartsLayer) {
    setInterval(() => createHeart(false), 2600);
  }

  // ==============================
  // CORAZONES SOBRE LA CARTA
  // ==============================
  const launchHearts = () => {
    if (!letterWrapper) return;

    const total = 7;
    for (let i = 0; i < total; i++) {
      const heart = document.createElement("div");
      heart.className = "heart-floating";
      heart.textContent = "❤";

      const left = 15 + Math.random() * 70;
      const delay = Math.random() * 2;

      heart.style.left = `${left}%`;
      heart.style.animationDelay = `${delay}s`;

      letterWrapper.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, (4.2 + delay) * 1000);
    }
  };

  // ==============================
  // ANIMACIÓN DE PÁRRAFOS
  // ==============================
  const animateLetterParagraphs = () => {
  const paragraphs = Array.from(letterBody.querySelectorAll("p"));
  if (!paragraphs.length) return;

  paragraphs.forEach((p, index) => {
    p.classList.remove("show", "letter-highlight");
    setTimeout(() => {
      p.classList.add("show");
    }, 150 * index + 100);
  });

  // Después de que aparezcan todos, resaltamos el último
  const totalTime = 150 * (paragraphs.length - 1) + 600;
  const lastParagraph = paragraphs[paragraphs.length - 1];

  setTimeout(() => {
    if (lastParagraph) {
      lastParagraph.classList.add("letter-highlight");
    }
  }, totalTime);

  
};

  // ==============================
  // ABRIR / CERRAR SOBRE
  // ==============================
  if (!envelope || !letterWrapper || !letterBody) return;

  const toggleEnvelope = () => {
    if (!isOpen) {
      // ABRIR
      isOpen = true;
      body.classList.add("reading-mode");

      const innerEnvelope = envelope.querySelector(".envelope");
      if (innerEnvelope) {
        innerEnvelope.style.transform = "";
      }

      envelope.classList.add("opened");
      letterWrapper.classList.add("visible");
      animateLetterParagraphs();
      launchHearts();
      boostHearts();

      if (hint) {
        hint.textContent = "Tocá de nuevo el sobre para cerrarlo 💫";
      }

      if (!hasCelebratedBig) {
        hasCelebratedBig = true;
        launchCelebration(true);
      } else {
        launchCelebration(false);
      }
    } else {
      // CERRAR
      isOpen = false;
      body.classList.remove("reading-mode");

      envelope.classList.remove("opened");
      letterWrapper.classList.remove("visible");

      if (hint) {
        hint.textContent = "Tocá el sobre para abrir tu carta ✨";
      }
    }
  };

  envelope.addEventListener("click", toggleEnvelope);
  envelope.setAttribute("tabindex", "0");
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleEnvelope();
    }
  });

  // ==============================
  // BOTÓN SECRETO (OPCIONAL)
  // ==============================
  if (btnSecret && secretBubble) {
    btnSecret.addEventListener("click", () => {
      const isVisible = secretBubble.classList.contains("visible");
      if (isVisible) {
        secretBubble.classList.remove("visible");
      } else {
        secretBubble.classList.add("visible");
      }
    });
  }

  // ==============================
  // BRINDIS & AÑO NUEVO
  // ==============================
  if (btnToast && yearBadge && yearNumber) {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    yearNumber.textContent = nextYear;

    btnToast.addEventListener("click", () => {
      yearBadge.classList.add("visible");
      launchCelebration(true);
      launchHearts();
      boostHearts();
    });
  }
});
