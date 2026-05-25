const stage = document.querySelector("#gameStage");
const overlay = document.querySelector("#overlay");
const overlayStart = document.querySelector("#overlayStart");
const rocket = document.querySelector("#rocket");
const planet = document.querySelector("#planet");
const planetLabel = document.querySelector("#planetLabel");
const spaceBuddy = document.querySelector("#spaceBuddy");
const buddyBubble = document.querySelector("#buddyBubble");
const startGameButton = document.querySelector("#startGame");
const pauseButton = document.querySelector("#pauseButton");
const nextButton = document.querySelector("#nextButton");
const soundToggle = document.querySelector("#soundToggle");
const levelLabel = document.querySelector("#levelLabel");
const scoreLabel = document.querySelector("#scoreLabel");
const shieldLabel = document.querySelector("#shieldLabel");
const badgeLabel = document.querySelector("#badgeLabel");
const missionName = document.querySelector("#missionName");
const missionGoal = document.querySelector("#missionGoal");
const gameTitle = document.querySelector("#gameTitle");
const aiMessage = document.querySelector("#aiMessage");
const scienceFact = document.querySelector("#scienceFact");
const aiMeterFill = document.querySelector("#aiMeterFill");

const missionStops = [
  {
    name: "Moon Base",
    planet: "moon",
    planetName: "Moon",
    cardTitle: "Moon Neighbor Card",
    fact: "Moon fact: The Moon is Earth's closest space neighbor.",
    aiIdea: "AI idea: I learn from examples. Tap a meteor to show me danger.",
    funFact: "Tiny mission: compare the Moon with Earth. Which one looks smaller from here?",
    visual: [
      { label: "Moon", planet: "moon", size: "small" },
      { label: "Earth", planet: "earth", size: "large" },
    ],
    visualHint: "Look: the Moon is much smaller than Earth.",
    collectText: "Collected: Moon Neighbor",
  },
  {
    name: "Earth View",
    planet: "earth",
    planetName: "Earth",
    cardTitle: "Blue Planet Card",
    fact: "Earth fact: Earth looks blue from space because oceans cover most of it.",
    aiIdea: "AI idea: More examples help me recognize the same kind of object.",
    funFact: "Earth explorer note: clouds move, oceans shine, and cities glow at night.",
    visual: [{ label: "Earth", planet: "earth", size: "large" }],
    visualHint: "Blue oceans are the easiest clue.",
    collectText: "Collected: Blue Planet",
  },
  {
    name: "Mars Route",
    planet: "mars",
    planetName: "Mars",
    cardTitle: "Red Dust Card",
    fact: "Mars fact: Mars is called the Red Planet because of rusty dust.",
    aiIdea: "AI idea: I compare new rocks with the meteor examples you tapped.",
    funFact: "Mars explorer note: Mars has giant dusty storms. Watch the sky like a space scientist.",
    visual: [
      { label: "Mars", planet: "mars", size: "medium" },
      { label: "Earth", planet: "earth", size: "large" },
    ],
    visualHint: "Mars is smaller than Earth and looks dusty red.",
    collectText: "Collected: Red Dust",
  },
  {
    name: "Jupiter Watch",
    planet: "jupiter",
    planetName: "Jupiter",
    cardTitle: "Giant Planet Card",
    fact: "Jupiter fact: Jupiter is the biggest planet in our solar system.",
    aiIdea: "AI idea: AI classification means sorting things into groups.",
    funFact: "Jupiter explorer note: the Great Red Spot is a huge storm bigger than Earth.",
    visual: [
      { label: "Earth", planet: "earth", size: "small" },
      { label: "Jupiter", planet: "jupiter", size: "giant" },
    ],
    visualHint: "Jupiter is a giant compared with Earth.",
    collectText: "Collected: Giant Planet",
  },
  {
    name: "Saturn Rings",
    planet: "saturn",
    planetName: "Saturn",
    cardTitle: "Ring World Card",
    fact: "Saturn fact: Saturn has bright rings made of ice and rock.",
    aiIdea: "AI idea: AI can help, but people still guide the mission.",
    funFact: "Saturn explorer note: its rings are thin, bright lanes of icy pieces.",
    collectText: "Collected: Ring World",
  },
  {
    name: "Venus Glow",
    planet: "venus",
    planetName: "Venus",
    cardTitle: "Cloudy Venus Card",
    fact: "Venus fact: Venus is wrapped in thick, bright clouds.",
    aiIdea: "AI idea: Sensors need clear data. Clouds can hide details from cameras.",
    funFact: "Venus explorer note: bright clouds make Venus shine like a morning star.",
    collectText: "Collected: Cloudy Venus",
  },
  {
    name: "Mercury Dash",
    planet: "mercury",
    planetName: "Mercury",
    cardTitle: "Fast Mercury Card",
    fact: "Mercury fact: Mercury is the closest planet to the Sun.",
    aiIdea: "AI idea: Fast objects need quick decisions and simple rules.",
    funFact: "Mercury explorer note: it races around the Sun faster than any other planet.",
    collectText: "Collected: Fast Mercury",
  },
  {
    name: "Uranus Tilt",
    planet: "uranus",
    planetName: "Uranus",
    cardTitle: "Sideways Planet Card",
    fact: "Uranus fact: Uranus spins almost on its side.",
    aiIdea: "AI idea: Strange examples help AI avoid guessing too soon.",
    funFact: "Uranus explorer note: imagine a planet rolling around the Sun like a ball.",
    collectText: "Collected: Sideways Planet",
  },
  {
    name: "Neptune Winds",
    planet: "neptune",
    planetName: "Neptune",
    cardTitle: "Windy Neptune Card",
    fact: "Neptune fact: Neptune has very strong winds.",
    aiIdea: "AI idea: AI can spot patterns in weather pictures over time.",
    funFact: "Neptune explorer note: far away, cold, blue, and windy.",
    collectText: "Collected: Windy Neptune",
  },
  {
    name: "Sun Beacon",
    planet: "sun-world",
    planetName: "Sun",
    cardTitle: "Sun Energy Card",
    fact: "Sun fact: The Sun is a star that gives Earth light and warmth.",
    aiIdea: "AI idea: Solar panels use sunlight. AI can help aim and save energy.",
    funFact: "Sun explorer note: never look directly at the real Sun. Use safe tools.",
    collectText: "Collected: Sun Energy",
  },
  {
    name: "Deep Space",
    planet: "deep-space",
    planetName: "Deep Space",
    cardTitle: "Far Stars Card",
    fact: "Space fact: Stars are suns that are very far away.",
    aiIdea: "AI idea: Good examples and human choices make AI safer.",
    funFact: "Deep space note: stars have colors. Blue stars are hotter than red stars.",
    collectText: "Collected: Far Stars",
  },
  {
    name: "Comet Trail",
    planet: "comet",
    planetName: "Comet",
    cardTitle: "Comet Tail Card",
    fact: "Comet fact: Comets can grow glowing tails when they travel near the Sun.",
    aiIdea: "AI idea: Shape and motion together help AI tell objects apart.",
    funFact: "Comet explorer note: a comet tail points away from the Sun.",
    collectText: "Collected: Comet Tail",
  },
];

const challengeTypes = [
  {
    key: "rescue",
    title: "Meteor Rescue",
    prompt: "Clear the danger rocks before they reach the rocket.",
  },
  {
    key: "fuel",
    title: "Star Fuel Run",
    prompt: "Collect glowing stars. Star fuel makes the rocket flame bigger.",
  },
  {
    key: "swarm",
    title: "Meteor Shower",
    prompt: "More meteors can appear together. Look left and right.",
  },
  {
    key: "scanner",
    title: "AI Scanner Test",
    prompt: "Tap meteors to give the AI better examples, then grab bonus stars.",
  },
  {
    key: "planet",
    title: "Planet Scan",
    prompt: "Clear space around the planet and learn a quick space clue.",
  },
  {
    key: "collector",
    title: "Star Collector",
    prompt: "Grab more stars while the AI keeps watch for meteors.",
  },
  {
    key: "orbit",
    title: "Orbit Dodge",
    prompt: "Meteors come in busy lanes. Clear them before they cross orbit.",
  },
  {
    key: "memory",
    title: "Space Memory",
    prompt: "Remember the space clue, then collect the card after rescue.",
  },
];

const levels = Array.from({ length: 30 }, (_, index) => {
  const stop = missionStops[index % missionStops.length];
  const levelNumber = index + 1;
  const challenge = challengeTypes[index % challengeTypes.length];
  const simultaneous = Math.min(3 + Math.floor(index / 3) + (challenge.key === "swarm" || challenge.key === "orbit" ? 1 : 0), 10);
  const target = 5 + Math.floor(index / 2) + (challenge.key === "swarm" || challenge.key === "orbit" ? 2 : 0);
  const speed = Math.max(4400, 14200 - index * 270 - (challenge.key === "swarm" || challenge.key === "orbit" ? 420 : 0));
  const spawn = Math.max(620, 2600 - index * 48 - (challenge.key === "swarm" || challenge.key === "orbit" ? 180 : 0));
  const starTarget = challenge.key === "fuel" || challenge.key === "collector"
    ? 5 + Math.floor(index / 6)
    : 3 + Math.floor(index / 10);
  const maxStars = challenge.key === "fuel" || challenge.key === "collector" ? 4 : 3;
  const starWord = starTarget === 1 ? "star" : "stars";

  return {
    ...stop,
    challenge,
    name: `${challenge.title} ${levelNumber}`,
    goal: `${challenge.prompt} Clear ${target} meteors. Collect ${starTarget} ${starWord} for bigger flame.`,
    target,
    shields: Math.max(3, 6 - Math.floor(index / 8)),
    speed,
    spawn,
    simultaneous,
    starTarget,
    maxStars,
    starEvery: Math.max(700, 1550 - index * 18),
    adAfter: false,
  };
});

let levelIndex = 0;
let cleared = 0;
let shields = 5;
let running = false;
let paused = false;
let spawnTimer = 0;
let soundOn = true;
let laneCursor = 0;
let collisionFrame = 0;
let starBadges = 0;
let levelStars = 0;
let flamePower = 1;
let tapCombo = 0;
let launchTimer = 0;
let starTimer = 0;
let audioContext = null;
let buddyTipIndex = 0;

const buddyTips = [
  "Tap big glowing rocks!",
  "Grab stars for flame!",
  "Look left and right!",
  "Touch the planet!",
  "Great space focus!",
];

const meteorLanes = [
  { edge: "right", x: [0.78, 0.94], y: [-0.08, 0.16], aimX: [-34, 36], aimY: [-18, 46] },
  { edge: "left", x: [0.06, 0.22], y: [-0.08, 0.17], aimX: [-36, 34], aimY: [-18, 48] },
  { edge: "top-right", x: [0.66, 0.92], y: [-0.12, 0.06], aimX: [-42, 20], aimY: [-12, 56] },
  { edge: "top-left", x: [0.08, 0.34], y: [-0.12, 0.06], aimX: [-20, 42], aimY: [-12, 56] },
  { edge: "right-low", x: [0.82, 0.98], y: [0.12, 0.26], aimX: [-46, 20], aimY: [-8, 38] },
  { edge: "left-low", x: [0.02, 0.18], y: [0.12, 0.26], aimX: [-20, 46], aimY: [-8, 38] },
];

function speak(text) {
  if (!soundOn || !("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function getAudioContext() {
  if (!soundOn || (!window.AudioContext && !window.webkitAudioContext)) {
    return null;
  }

  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtor();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, duration = 0.16, type = "sine", gainValue = 0.08, delay = 0) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
}

function playSound(name) {
  if (!soundOn) {
    return;
  }

  if (name === "launch") {
    playTone(140, 0.34, "sawtooth", 0.055);
    playTone(220, 0.28, "triangle", 0.045, 0.12);
  } else if (name === "meteor") {
    playTone(520, 0.11, "square", 0.045);
    playTone(760, 0.12, "triangle", 0.04, 0.06);
  } else if (name === "star") {
    playTone(660, 0.11, "sine", 0.05);
    playTone(980, 0.14, "sine", 0.045, 0.08);
  } else if (name === "planet") {
    playTone(360, 0.16, "triangle", 0.05);
    playTone(540, 0.18, "sine", 0.045, 0.12);
  } else if (name === "success") {
    playTone(520, 0.12, "sine", 0.055);
    playTone(720, 0.12, "sine", 0.055, 0.1);
    playTone(960, 0.18, "triangle", 0.055, 0.22);
  } else if (name === "bump") {
    playTone(120, 0.18, "sawtooth", 0.055);
  }
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

function currentLevel() {
  return levels[levelIndex];
}

function activeMeteorCount() {
  return stage.querySelectorAll(".meteor:not(.pop):not(.hit)").length;
}

function activeStarCount() {
  return stage.querySelectorAll(".fuel-star:not(.collected)").length;
}

function updateFlamePower() {
  const levelBoost = Math.min(0.95, levelStars * 0.22);
  const missionBoost = Math.min(0.65, starBadges * 0.03);
  flamePower = Number((1 + levelBoost + missionBoost).toFixed(2));
  rocket.style.setProperty("--flame-boost", flamePower);
  rocket.classList.toggle("boosted", flamePower > 1.12);
}

function queueMeteorFill(delay = 30) {
  if (!running || paused) {
    return;
  }

  const level = currentLevel();
  const remaining = Math.max(0, level.target - cleared);
  const wanted = Math.min(level.simultaneous, remaining);
  const missing = Math.max(0, wanted - activeMeteorCount());

  for (let index = 0; index < missing; index += 1) {
    window.setTimeout(spawnMeteor, delay + index * 105);
  }
}

function queueStarFill(delay = 400) {
  if (!running || paused) {
    return;
  }

  const level = currentLevel();
  if (levelStars >= level.starTarget) {
    return;
  }

  const remaining = Math.max(0, level.starTarget - levelStars);
  const missing = Math.max(0, Math.min(level.maxStars, remaining) - activeStarCount());
  for (let index = 0; index < missing; index += 1) {
    window.setTimeout(spawnFuelStar, delay + index * 140);
  }
}

function setOverlay(title, text, type = "", action = "none", buttonText = "") {
  overlay.className = `overlay ${type}`.trim();
  overlay.dataset.action = action;
  overlay.innerHTML = `
    <div class="overlay-card">
      <p class="eyebrow">${type === "ad" ? "Mission Rest Stop" : "Space Adventure"}</p>
      <strong>${title}</strong>
      <p>${text}</p>
      ${buttonText ? `<button id="dynamicOverlayButton" type="button">${buttonText}</button>` : ""}
    </div>
  `;

  const dynamicButton = document.querySelector("#dynamicOverlayButton");
  if (dynamicButton) {
    dynamicButton.addEventListener("click", handleOverlayAction);
  }
}

function setQuizOverlay(level) {
  const options = level.quiz.options
    .map((option, index) => `<button class="quiz-option" type="button" data-answer="${index}">${option}</button>`)
    .join("");

  overlay.className = "overlay quiz";
  overlay.dataset.action = "quiz";
  overlay.innerHTML = `
    <div class="overlay-card quiz-card">
      <p class="eyebrow">Space Quiz</p>
      <strong>${level.planetName} Check</strong>
      <p>${level.quiz.question}</p>
      <div class="quiz-options">${options}</div>
      <p id="quizFeedback" class="quiz-feedback" aria-live="polite"></p>
    </div>
  `;

  overlay.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => answerQuiz(button));
  });
}

function renderCardVisual(level) {
  const visualItems = level.visual || [{ label: level.planetName, planet: level.planet, size: "large" }];
  const orbs = visualItems
    .map((item) => `
      <span class="card-orb-wrap">
        <span class="card-orb ${item.planet} ${item.size}" aria-hidden="true"></span>
        <span>${item.label}</span>
      </span>
    `)
    .join("");

  return `
    <span class="card-visual">${orbs}</span>
    <span class="card-hint">${level.visualHint || "Look closely at the space object before the next level."}</span>
  `;
}

function setKnowledgeCardOverlay(level) {
  const isFinal = levelIndex === levels.length - 1;
  overlay.className = "overlay knowledge";
  overlay.dataset.action = "collect-card";
  overlay.innerHTML = `
    <button class="knowledge-card" type="button" aria-label="Collect knowledge card">
      <span class="eyebrow">Collect Knowledge Card</span>
      <strong>${level.cardTitle}</strong>
      <span class="card-planet">${level.planetName}</span>
      ${renderCardVisual(level)}
      <span class="card-fact">${level.funFact}</span>
      <span class="card-ai">${level.aiIdea}</span>
      <span class="card-stars">Star fuel ${levelStars}/${level.starTarget} - ${isFinal ? "Finish mission" : "Tap card for next level"}</span>
    </button>
  `;

  overlay.querySelector(".knowledge-card").addEventListener("click", collectKnowledgeCard);
  showRewardBurst();
}

function hideOverlay() {
  overlay.classList.add("hidden");
  overlay.dataset.action = "none";
}

function updateStatus() {
  const level = currentLevel();
  levelLabel.textContent = `${levelIndex + 1} / ${levels.length}`;
  scoreLabel.textContent = `${cleared} / ${level.target}`;
  shieldLabel.textContent = shields;
  badgeLabel.textContent = `${starBadges} (${levelStars}/${level.starTarget})`;
  missionName.textContent = level.name;
  missionGoal.textContent = level.goal;
  gameTitle.textContent = level.challenge.title;
  aiMeterFill.style.width = `${Math.min(100, Math.round((cleared / level.target) * 100))}%`;
  updateFlamePower();
}

function clearMeteors() {
  stage.querySelectorAll(".meteor, .fuel-star, .float-label, .explosion, .reward-burst").forEach((item) => item.remove());
}

function setBuddyTip(text) {
  if (buddyBubble) {
    buddyBubble.textContent = text;
  }
}

function cycleBuddyTip() {
  setBuddyTip(buddyTips[buddyTipIndex % buddyTips.length]);
  buddyTipIndex += 1;
}

function updateLesson(mode = "level") {
  const level = currentLevel();
  const meter = Math.min(100, Math.round((cleared / level.target) * 100));
  const messages = {
    level: `${level.challenge.prompt} AI task: find the dangerous moving rock shapes.`,
    meteor: `Good example. AI confidence is ${meter}%. The scanner learns the meteor shape.`,
    combo: `Combo training. You gave the AI ${tapCombo} examples without a miss.`,
    star: `Star fuel collected. Flame power x${flamePower.toFixed(1)}. Bigger flame means more mission energy.`,
    hit: "Shield bump. New plan: tap the closest meteor first, then collect stars.",
    ready: "Great training set. The AI can guide the rocket to the next space stop.",
  };
  const factLead = level.challenge.key === "fuel"
    ? "Fuel clue"
    : level.challenge.key === "swarm"
      ? "Look-around clue"
      : level.challenge.key === "scanner"
        ? "AI clue"
        : level.challenge.key === "collector"
          ? "Treasure clue"
          : level.challenge.key === "orbit"
            ? "Orbit clue"
            : level.challenge.key === "memory"
              ? "Memory clue"
              : "Space clue";
  const miniTask = level.challenge.key === "fuel"
    ? "Mini task: collect a star and watch the flame grow."
    : level.challenge.key === "swarm"
      ? "Mini task: say left or right before you tap."
      : level.challenge.key === "scanner"
        ? "Mini task: find what all meteors have in common."
        : level.challenge.key === "planet"
          ? "Mini task: look at the planet before the next meteor arrives."
          : level.challenge.key === "collector"
            ? "Mini task: collect two stars in a row."
            : level.challenge.key === "orbit"
              ? "Mini task: tap the meteor closest to the rocket first."
              : level.challenge.key === "memory"
                ? "Mini task: remember one new space word from this card."
                : "Mini task: protect the rocket, then explain what changed.";

  aiMessage.textContent = messages[mode] || messages.level;
  scienceFact.textContent = `${factLead}: ${level.funFact} ${miniTask}`;
}

function stopCollisionLoop() {
  if (collisionFrame) {
    window.cancelAnimationFrame(collisionFrame);
    collisionFrame = 0;
  }
}

function rectanglesOverlap(first, second, padding = 0) {
  return !(
    first.right < second.left + padding ||
    first.left > second.right - padding ||
    first.bottom < second.top + padding ||
    first.top > second.bottom - padding
  );
}

function getMeteorTrajectory(lane, hitSize) {
  const stageBox = stage.getBoundingClientRect();
  const rocketBox = rocket.getBoundingClientRect();
  const rocketCenterX = rocketBox.left - stageBox.left + rocketBox.width / 2;
  const rocketCenterY = rocketBox.top - stageBox.top + rocketBox.height / 2;
  const startX = randomFloat(lane.x[0], lane.x[1]) * stageBox.width;
  const startY = randomFloat(lane.y[0], lane.y[1]) * stageBox.height;
  const targetX = rocketCenterX + randomBetween(lane.aimX[0], lane.aimX[1]);
  const targetY = rocketCenterY + randomBetween(lane.aimY[0], lane.aimY[1]);
  const travelX = Math.round(targetX - startX);
  const travelY = Math.round(targetY - startY);
  const midX = Math.round(travelX * 0.5 + randomBetween(-58, 58));
  const midY = Math.round(travelY * 0.48 + randomBetween(-26, 34));

  return {
    side: travelX < 0 ? "right" : "left",
    left: Math.round(startX - hitSize / 2),
    top: Math.round(startY - hitSize / 2),
    travelX,
    travelY,
    midX,
    midY,
  };
}

function watchCollisions() {
  if (!running || paused) {
    collisionFrame = window.requestAnimationFrame(watchCollisions);
    return;
  }

  const rocketBox = rocket.getBoundingClientRect();
  stage.querySelectorAll(".meteor").forEach((meteor) => {
    if (meteor.classList.contains("pop") || meteor.classList.contains("hit")) {
      return;
    }

    if (rectanglesOverlap(meteor.getBoundingClientRect(), rocketBox, 34)) {
      meteorHit(meteor);
    }
  });

  collisionFrame = window.requestAnimationFrame(watchCollisions);
}

function setScene() {
  const level = currentLevel();
  stage.classList.remove("phase-launch", "phase-sky", "phase-orbit", "phase-space", "phase-deep");
  const phase = levelIndex === 0 ? "phase-launch" : levelIndex === 1 ? "phase-sky" : levelIndex === 2 ? "phase-orbit" : levelIndex < 5 ? "phase-space" : "phase-deep";
  stage.classList.add(phase);
  rocket.classList.toggle("space", levelIndex > 0);
  planet.className = `planet ${level.planet} visible`;
  planetLabel.textContent = level.planetName;
  stage.dataset.challenge = level.challenge.key;
}

function startLevel() {
  const level = currentLevel();
  running = true;
  paused = false;
  stage.classList.add("running");
  stage.classList.add("launching");
  stage.classList.remove("impact");
  rocket.classList.remove("hit");
  cleared = 0;
  levelStars = 0;
  tapCombo = 0;
  shields = level.shields;
  pauseButton.textContent = "Pause";
  clearMeteors();
  laneCursor = 0;
  setScene();
  updateStatus();
  updateLesson("level");
  hideOverlay();
  window.clearInterval(spawnTimer);
  window.clearTimeout(launchTimer);
  window.clearInterval(starTimer);
  stopCollisionLoop();
  spawnTimer = window.setInterval(() => queueMeteorFill(0), level.spawn);
  starTimer = window.setInterval(queueStarFill, level.starEvery);
  setBuddyTip(levelIndex === 0 ? "Let's launch!" : "New stop!");
  playSound("launch");
  launchTimer = window.setTimeout(() => {
    stage.classList.remove("launching");
    queueMeteorFill(180);
    queueStarFill(420);
  }, 3300);
  collisionFrame = window.requestAnimationFrame(watchCollisions);
  speak(level.goal);
}

function startMission() {
  levelIndex = 0;
  starBadges = 0;
  levelStars = 0;
  flamePower = 1;
  updateFlamePower();
  startLevel();
}

function spawnMeteor() {
  if (!running || paused) {
    return;
  }
  const level = currentLevel();
  if (activeMeteorCount() >= level.simultaneous) {
    return;
  }

  const meteor = document.createElement("button");
  const size = randomBetween(22, 56);
  const hitSize = Math.max(96, size * 2.4);
  const lane = meteorLanes[laneCursor % meteorLanes.length];
  laneCursor += 1;
  const trajectory = getMeteorTrajectory(lane, hitSize);
  meteor.type = "button";
  meteor.className = `meteor scan from-${trajectory.side}`;
  meteor.setAttribute("aria-label", "Clear meteor");
  meteor.style.setProperty("--size", `${size}px`);
  meteor.style.setProperty("--hit-size", `${hitSize}px`);
  meteor.style.setProperty("--speed", `${level.speed}ms`);
  meteor.style.setProperty("--travel-x", `${trajectory.travelX}px`);
  meteor.style.setProperty("--travel-y", `${trajectory.travelY}px`);
  meteor.style.setProperty("--mid-x", `${trajectory.midX}px`);
  meteor.style.setProperty("--mid-y", `${trajectory.midY}px`);
  meteor.style.left = `${trajectory.left}px`;
  meteor.style.top = `${trajectory.top}px`;
  const meteorFlip = trajectory.side === "right" ? "" : "translate(360 0) scale(-1 1)";

  meteor.innerHTML = `
    <svg class="meteor-svg" viewBox="0 0 360 210" aria-hidden="true">
      <defs>
        <radialGradient id="meteorRock" cx="34%" cy="26%">
          <stop offset="0" stop-color="#a48cbb" />
          <stop offset="0.22" stop-color="#5f4a78" />
          <stop offset="0.62" stop-color="#29213c" />
          <stop offset="1" stop-color="#0d0b18" />
        </radialGradient>
        <linearGradient id="meteorFlameHot" x1="1" x2="0">
          <stop offset="0" stop-color="#ff4b1f" />
          <stop offset="0.34" stop-color="#ff8a1f" />
          <stop offset="0.7" stop-color="#ffd33d" />
          <stop offset="1" stop-color="#fff6ad" />
        </radialGradient>
        <filter id="meteorGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="${meteorFlip}">
        <g class="meteor-tail" filter="url(#meteorGlow)">
          <path d="M352 26 C302 42 256 68 202 98 C256 86 308 94 354 132 C326 94 326 58 352 26Z" fill="#5a247f" opacity="0.2" />
          <path d="M330 38 C284 54 238 78 190 107 C244 96 288 105 327 139 C305 106 306 68 330 38Z" fill="#c12d4a" opacity="0.46" />
          <path d="M308 44 C264 62 220 84 176 112 C224 105 264 113 299 143 C281 112 282 76 308 44Z" fill="#ff4a20" opacity="0.82" />
          <path d="M282 56 C246 72 210 92 172 116 C211 112 244 121 271 144 C260 117 262 84 282 56Z" fill="#ff981f" opacity="0.96" />
          <path d="M244 75 C219 88 194 102 168 118 C195 117 217 124 234 140 C229 119 231 94 244 75Z" fill="#ffe15c" opacity="0.92" />
          <path d="M208 91 C193 99 178 109 164 120 C180 119 192 124 202 134 C200 118 201 104 208 91Z" fill="#fff4ac" opacity="0.76" />
          <path d="M302 50 C272 69 238 88 199 108" fill="none" stroke="#ffb02e" stroke-width="6" stroke-linecap="round" opacity="0.62" />
          <path d="M336 46 C300 68 264 91 224 116" fill="none" stroke="#ff6b1c" stroke-width="5" stroke-linecap="round" opacity="0.44" />
          <path d="M266 96 C235 106 203 114 170 121" fill="none" stroke="#fff2a3" stroke-width="4" stroke-linecap="round" opacity="0.54" />
        </g>
        <g class="meteor-rock" filter="url(#meteorGlow)">
          <circle cx="92" cy="110" r="76" fill="#ff8a1f" opacity="0.2" />
          <circle cx="92" cy="110" r="67" fill="url(#meteorRock)" stroke="#7b4a62" stroke-width="4" />
          <path d="M145 78 C158 98 158 126 144 146" fill="none" stroke="#ff8a1f" stroke-width="6" stroke-linecap="round" opacity="0.58" />
          <path d="M35 96 C49 59 88 42 127 55 C90 54 59 72 44 106 C39 104 36 101 35 96Z" fill="#c2a1df" opacity="0.28" />
          <circle cx="63" cy="83" r="16" fill="#171225" stroke="#5b456f" stroke-width="5" />
          <circle cx="112" cy="74" r="12" fill="#171225" stroke="#5b456f" stroke-width="4" />
          <circle cx="122" cy="126" r="20" fill="#171225" stroke="#5b456f" stroke-width="5" />
          <circle cx="66" cy="137" r="12" fill="#171225" stroke="#5b456f" stroke-width="4" />
          <circle cx="40" cy="115" r="7" fill="#4d3b61" opacity="0.78" />
          <circle cx="101" cy="104" r="7" fill="#4d3b61" opacity="0.78" />
          <path d="M52 61 C39 69 31 81 28 96" fill="none" stroke="#ffd24f" stroke-width="5" stroke-linecap="round" opacity="0.68" />
          <path d="M144 111 C143 137 127 158 103 169" fill="none" stroke="#0a0711" stroke-width="5" stroke-linecap="round" opacity="0.32" />
        </g>
      </g>
    </svg>
  `;
  meteor.addEventListener("pointerdown", () => clearMeteor(meteor));
  meteor.addEventListener("click", () => clearMeteor(meteor));
  meteor.addEventListener("animationend", () => meteorMissed(meteor));
  stage.append(meteor);

  window.setTimeout(() => meteor.classList.remove("scan"), 900);
}

function meteorMissed(meteor) {
  if (!meteor.classList.contains("pop") && !meteor.classList.contains("hit")) {
    meteor.remove();
    queueMeteorFill(120);
  }
}

function spawnFuelStar() {
  if (!running || paused) {
    return;
  }

  const level = currentLevel();
  if (levelStars >= level.starTarget || activeStarCount() >= level.maxStars) {
    return;
  }

  const star = document.createElement("button");
  const stageBox = stage.getBoundingClientRect();
  const cardSafeX = 320;
  const maxLeft = Math.max(cardSafeX, stageBox.width - 130);
  const left = randomBetween(Math.min(cardSafeX, maxLeft - 40), maxLeft);
  const top = randomBetween(92, Math.max(140, Math.floor(stageBox.height * 0.58)));

  star.type = "button";
  star.className = "fuel-star";
  star.setAttribute("aria-label", "Collect star fuel");
  star.style.left = `${left}px`;
  star.style.top = `${top}px`;
  star.innerHTML = `
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 8 L74 42 L111 43 L82 66 L93 103 L60 82 L27 103 L38 66 L9 43 L46 42 Z" />
      <circle cx="48" cy="52" r="5" />
      <circle cx="72" cy="52" r="5" />
      <path d="M45 70 Q60 82 75 70" />
    </svg>
  `;
  star.addEventListener("pointerdown", () => collectFuelStar(star));
  star.addEventListener("click", () => collectFuelStar(star));
  stage.append(star);

  window.setTimeout(() => {
    if (!star.classList.contains("collected")) {
      star.remove();
      queueStarFill(420);
    }
  }, Math.max(3200, level.speed * 0.52));
}

function collectFuelStar(star) {
  if (!running || paused || star.classList.contains("collected")) {
    return;
  }

  const starBox = star.getBoundingClientRect();
  const stageBox = stage.getBoundingClientRect();
  star.classList.add("collected");
  levelStars += 1;
  starBadges += 1;
  updateStatus();
  updateLesson("star");
  setBuddyTip("Sparkly fuel!");
  playSound("star");
  showFloatLabel("Flame fuel +1", starBox.left - stageBox.left, starBox.top - stageBox.top);
  window.setTimeout(() => star.remove(), 420);
  queueStarFill(levelStars >= currentLevel().starTarget ? 0 : 260);
}

function showFloatLabel(text, x, y) {
  const label = document.createElement("div");
  label.className = "float-label";
  label.textContent = text;
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  stage.append(label);
  window.setTimeout(() => label.remove(), 900);
}

function showExplosion(x, y) {
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  explosion.style.left = `${x}px`;
  explosion.style.top = `${y}px`;
  explosion.innerHTML = `
    <span class="blast-core"></span>
    <span class="blast-ring"></span>
    <span class="blast-piece piece-a"></span>
    <span class="blast-piece piece-b"></span>
    <span class="blast-piece piece-c"></span>
    <span class="blast-piece piece-d"></span>
  `;
  stage.append(explosion);
  window.setTimeout(() => explosion.remove(), 720);
}

function showRewardBurst() {
  const burst = document.createElement("div");
  const colors = ["#ffe56d", "#48f0ff", "#ff75c8", "#61f28f", "#ffffff"];
  burst.className = "reward-burst";

  for (let index = 0; index < 28; index += 1) {
    const piece = document.createElement("span");
    const isStar = index % 3 === 0;
    piece.className = isStar ? "reward-star" : "reward-confetti";
    piece.style.setProperty("--x", `${randomBetween(28, 72)}%`);
    piece.style.setProperty("--y", `${randomBetween(30, 62)}%`);
    piece.style.setProperty("--dx", `${randomBetween(-260, 260)}px`);
    piece.style.setProperty("--dy", `${randomBetween(-210, 170)}px`);
    piece.style.setProperty("--rot", `${randomBetween(-240, 240)}deg`);
    piece.style.setProperty("--color", colors[index % colors.length]);
    piece.style.animationDelay = `${index * 0.025}s`;
    burst.append(piece);
  }

  stage.append(burst);
  window.setTimeout(() => burst.remove(), 1600);
}

function clearMeteor(meteor) {
  const level = currentLevel();
  if (!running || paused || meteor.classList.contains("pop") || cleared >= level.target) {
    return;
  }

  const meteorBox = meteor.getBoundingClientRect();
  const stageBox = stage.getBoundingClientRect();
  showFloatLabel("AI learned +1", meteorBox.left - stageBox.left, meteorBox.top - stageBox.top);
  playSound("meteor");
  setBuddyTip(tapCombo % 3 === 2 ? "Combo!" : "Nice tap!");

  meteor.classList.add("pop");
  cleared = Math.min(level.target, cleared + 1);
  tapCombo += 1;
  if (tapCombo > 0 && tapCombo % 3 === 0) {
    starBadges += 1;
    showFloatLabel("Star badge +1", meteorBox.left - stageBox.left, meteorBox.top - stageBox.top + 34);
  }
  updateStatus();
  updateLesson(cleared >= level.target ? "ready" : tapCombo % 3 === 0 ? "combo" : "meteor");

  window.setTimeout(() => meteor.remove(), 430);

  if (cleared >= level.target) {
    window.setTimeout(completeLevel, 820);
  } else {
    queueMeteorFill(150);
  }
}

function meteorHit(meteor) {
  if (!running || paused || meteor.classList.contains("pop")) {
    meteor.remove();
    return;
  }

  if (meteor.classList.contains("hit")) {
    return;
  }

  const meteorBox = meteor.getBoundingClientRect();
  const rocketBox = rocket.getBoundingClientRect();
  const stageBox = stage.getBoundingClientRect();
  const blastX = (Math.max(meteorBox.left, rocketBox.left) + Math.min(meteorBox.right, rocketBox.right)) / 2 - stageBox.left;
  const blastY = (Math.max(meteorBox.top, rocketBox.top) + Math.min(meteorBox.bottom, rocketBox.bottom)) / 2 - stageBox.top;

  meteor.classList.add("hit");
  stage.classList.add("impact");
  rocket.classList.add("hit");
  playSound("bump");
  setBuddyTip("Shield saved us!");
  showExplosion(blastX, blastY);
  window.setTimeout(() => {
    stage.classList.remove("impact");
    rocket.classList.remove("hit");
  }, 520);
  window.setTimeout(() => meteor.remove(), 220);
  shields -= 1;
  tapCombo = 0;
  updateStatus();
  updateLesson("hit");

  if (shields <= 0) {
    failLevel();
  } else {
    queueMeteorFill(180);
  }
}

function completeLevel() {
  if (!running) {
    return;
  }

  running = false;
  window.clearInterval(spawnTimer);
  window.clearInterval(starTimer);
  window.clearTimeout(launchTimer);
  stopCollisionLoop();
  stage.classList.remove("running", "launching");
  clearMeteors();

  setKnowledgeCardOverlay(currentLevel());
  setBuddyTip("Card time!");
  playSound("success");
  speak(levelIndex === levels.length - 1 ? "Mission complete!" : "Knowledge card ready!");
}

function failLevel() {
  running = false;
  window.clearInterval(spawnTimer);
  window.clearInterval(starTimer);
  window.clearTimeout(launchTimer);
  stopCollisionLoop();
  stage.classList.remove("running", "launching");
  clearMeteors();
  setOverlay(
    "Try Again",
    "The rocket shields need help. Tap meteors early to teach the AI faster.",
    "",
    "start",
    "Retry Level",
  );
  speak("Try again. Tap meteors early.");
}

function nextLevel() {
  if (running) {
    return;
  }

  if (levelIndex < levels.length - 1) {
    levelIndex += 1;
    startLevel();
    return;
  }

  startMission();
}

function collectKnowledgeCard() {
  if (overlay.dataset.action !== "collect-card") {
    return;
  }

  const level = currentLevel();
  starBadges += 3;
  updateStatus();
  overlay.dataset.action = "none";
  overlay.querySelector(".knowledge-card")?.classList.add("collected");
  showFloatLabel(level.collectText, 360, 120);
  playSound("success");

  window.setTimeout(() => {
    if (levelIndex === levels.length - 1) {
      setOverlay(
        "Mission Complete!",
        `You collected ${starBadges} stars and 30 knowledge cards. The AI scanner is fully trained.`,
        "",
        "restart",
        "Play Again",
      );
      return;
    }

    nextLevel();
  }, 900);
}

function finishLevelAfterQuiz() {
  collectKnowledgeCard();
}

function answerQuiz(button) {
  if (button.disabled) {
    return;
  }

  const level = currentLevel();
  const feedback = document.querySelector("#quizFeedback");
  const isCorrect = Number(button.dataset.answer) === level.quiz.answer;
  overlay.querySelectorAll(".quiz-option").forEach((option) => {
    option.disabled = true;
    option.classList.toggle("correct", Number(option.dataset.answer) === level.quiz.answer);
  });

  if (isCorrect) {
    starBadges += 2;
    shields += 1;
    levelStars += 1;
    feedback.textContent = `${level.quiz.explain} Bonus: +2 stars and +1 shield.`;
  } else {
    feedback.textContent = `${level.quiz.explain} Try the next question after the next rescue.`;
  }
  updateStatus();

  const continueButton = document.createElement("button");
  continueButton.id = "dynamicOverlayButton";
  continueButton.type = "button";
  continueButton.textContent = levelIndex === levels.length - 1 ? "See Mission Score" : "Continue";
  continueButton.addEventListener("click", finishLevelAfterQuiz);
  overlay.querySelector(".quiz-card").append(continueButton);
}

function togglePause() {
  if (!running) {
    startLevel();
    return;
  }

  paused = !paused;
  pauseButton.textContent = paused ? "Resume" : "Pause";

  if (paused) {
    setOverlay("Paused", "Press Resume when you are ready.", "", "none");
  } else {
    hideOverlay();
  }
}

function toggleSound() {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "Sound On" : "Sound Off";
  soundToggle.setAttribute("aria-pressed", String(soundOn));
  if (!soundOn && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (soundOn) {
    playSound("star");
  }
}

function touchPlanet() {
  const level = currentLevel();
  showFloatLabel(`${level.planetName} says hi!`, 0.7 * stage.clientWidth, 0.36 * stage.clientHeight);
  setBuddyTip("Planet hello!");
  playSound("planet");
}

function handleOverlayAction() {
  const action = overlay.dataset.action;
  if (action === "start") {
    startLevel();
  } else if (action === "next") {
    nextLevel();
  } else if (action === "restart") {
    startMission();
  } else if (action === "collect-card") {
    collectKnowledgeCard();
  }
}

startGameButton.addEventListener("click", startMission);
if (overlayStart) {
  overlayStart.addEventListener("click", startMission);
}
overlay.addEventListener("click", (event) => {
  if (event.target.closest(".knowledge-card")) {
    collectKnowledgeCard();
    return;
  }

  if (event.target.classList.contains("quiz-option")) {
    answerQuiz(event.target);
    return;
  }

  if (event.target === overlay) {
    handleOverlayAction();
  }
});
pauseButton.addEventListener("click", togglePause);
nextButton.addEventListener("click", nextLevel);
soundToggle.addEventListener("click", toggleSound);
planet.addEventListener("pointerdown", touchPlanet);
planetLabel.addEventListener("pointerdown", touchPlanet);
if (spaceBuddy) {
  spaceBuddy.addEventListener("click", () => {
    cycleBuddyTip();
    playSound("planet");
  });
}

updateStatus();
setScene();
