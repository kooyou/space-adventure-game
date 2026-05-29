const maxDepth = 5000;
const scrollRange = 5600;
const storageKey = "deep-sea-kids-progress";

const zones = [
  { id: "sunlight", name: "Sunlight Zone", minDepth: 0, maxDepth: 100, top: "#6ed6ff", bottom: "#1fa9d6", description: "Bright water, sea grass, and coral make this a friendly place to begin." },
  { id: "blue", name: "Blue Zone", minDepth: 100, maxDepth: 300, top: "#1fa9d6", bottom: "#1671aa", description: "The light softens, the water turns deeper blue, and sounds travel far." },
  { id: "twilight", name: "Twilight Zone", minDepth: 300, maxDepth: 1000, top: "#1671aa", bottom: "#123a70", description: "It feels like evening here. Some animals make their own gentle glow." },
  { id: "midnight", name: "Midnight Zone", minDepth: 1000, maxDepth: 3000, top: "#123a70", bottom: "#06162f", description: "Almost no sunlight reaches this deep, so your sub light matters." },
  { id: "abyss", name: "Seafloor Wonders", minDepth: 3000, maxDepth: 5000, top: "#06162f", bottom: "#020714", description: "Life still thrives near warm vents and quiet seafloor habitats." }
];

const creatures = [
  { id: "clownfish", name: "Clownfish", depth: 8, x: 30, y: 48, size: 74, color: "#ff8b2f", className: "fish", shortFact: "I like living near sea anemones. They feel like a tiny safe home.", fullFact: "Clownfish often live with sea anemones. The anemone helps protect the fish, and the clownfish helps keep the anemone clean.", ability: "Anemone partnership", food: "Tiny plankton", question: "What would it feel like to live in a home that helps protect you?", tags: ["shallow", "not glowing"] },
  { id: "turtle", name: "Sea Turtle", depth: 25, x: 70, y: 58, size: 96, color: "#48b86f", className: "turtle", shortFact: "I can travel very far and still remember the way home.", fullFact: "Many sea turtles travel long distances. Adults may return near the beach where they hatched to lay eggs.", ability: "Long journeys", food: "Sea grass, jellyfish, and small animals", question: "How would you remember the way home across the ocean?", tags: ["shallow", "not fish"] },
  { id: "jellyfish", name: "Jellyfish", depth: 60, x: 47, y: 42, size: 82, color: "#b9f2ff", className: "jelly glow", shortFact: "My body is like a clear umbrella, and some of my cousins glow.", fullFact: "A jellyfish body is mostly water. Many drift through the ocean, and some species can make a soft light.", ability: "Clear body", food: "Plankton and tiny fish", question: "How could a clear body help in the ocean?", tags: ["glows", "not fish", "shallow"] },
  { id: "octopus", name: "Octopus", depth: 90, x: 18, y: 62, size: 86, color: "#d85d8f", className: "octopus", shortFact: "I can change color and use ink to protect myself.", fullFact: "Octopuses are clever animals. They can change body color and release ink to confuse predators.", ability: "Color change and ink", food: "Crabs, fish, and shellfish", question: "If you could change color, what color would you choose?", tags: ["not fish", "color change", "shallow"] },
  { id: "dolphin", name: "Dolphin", depth: 120, x: 62, y: 46, size: 108, color: "#86d6f7", className: "fish", shortFact: "I use sound to greet my friends.", fullFact: "Dolphins make sounds to communicate and use echoes to understand what is around them.", ability: "Sound communication", food: "Small fish and squid", question: "If sound could help you see, what might you hear?", tags: ["not fish", "sound", "blue zone"] },
  { id: "shark", name: "Shark", depth: 220, x: 78, y: 58, size: 118, color: "#7892a8", className: "fish", shortFact: "My nose is very sensitive and can notice smells from far away.", fullFact: "Sharks have strong senses and play an important predator role in ocean ecosystems.", ability: "Powerful senses", food: "Fish and other sea animals", question: "Why are predators important for a healthy ocean?", tags: ["fish", "predator", "blue zone"] },
  { id: "lanternfish", name: "Lanternfish", depth: 450, x: 34, y: 42, size: 72, color: "#63f0ca", className: "fish glow", shortFact: "Tiny lights on my body shine like stars in the sea.", fullFact: "Lanternfish have light-producing organs. Many swim upward at night and return to deeper water during the day.", ability: "Body lights", food: "Tiny shrimp and zooplankton", question: "What could glowing help with in the dark?", tags: ["glows", "fish", "twilight"] },
  { id: "barreleye", name: "Barreleye Fish", depth: 700, x: 68, y: 52, size: 78, color: "#8cf3e7", className: "fish glow", shortFact: "My head is partly transparent, and my eyes can look upward.", fullFact: "Barreleye fish have a transparent head that helps their eyes spot shadows and prey above them.", ability: "Transparent head", food: "Small animals", question: "Why might looking upward matter in deep water?", tags: ["glows", "fish", "twilight"] },
  { id: "anglerfish", name: "Anglerfish", depth: 1200, x: 25, y: 48, size: 104, color: "#5b4d83", className: "fish glow", shortFact: "A tiny light on my head helps attract prey in the dark.", fullFact: "Anglerfish live in very deep, dark water. The glowing lure on the head can draw smaller fish closer.", ability: "Bioluminescent lure", food: "Small fish and shrimp", question: "How would you find food in a very dark place?", tags: ["glows", "fish", "deep sea", "predator"] },
  { id: "sperm-whale", name: "Sperm Whale", depth: 900, x: 76, y: 42, size: 138, color: "#6f8da6", className: "fish", shortFact: "I am a champion diver and search deep water for squid.", fullFact: "Sperm whales can dive very deep to find food. They make powerful sounds and return to the surface to breathe air.", ability: "Deep diving and echolocation", food: "Squid and fish", question: "How can an air-breathing whale dive so deep?", tags: ["not fish", "sound", "deep diver"] },
  { id: "giant-squid", name: "Giant Squid", depth: 1800, x: 72, y: 56, size: 126, color: "#b86bd8", className: "octopus", shortFact: "I have very long arms and live far below the surface.", fullFact: "Giant squid live in deep water. Their eyes are huge, and scientists once had a hard time filming them in the wild.", ability: "Long arms", food: "Fish and other squid", question: "How could big eyes help in dark water?", tags: ["not fish", "deep sea", "midnight"] },
  { id: "isopod", name: "Giant Isopod", depth: 2500, x: 36, y: 62, size: 86, color: "#b7c7d8", className: "isopod", shortFact: "I look like an armored deep-sea cleanup helper.", fullFact: "Giant isopods live in cold deep water. Their hard shells look like armor, and they eat food that falls to the seafloor.", ability: "Energy saving", food: "Food scraps on the seafloor", question: "Why do deep-sea animals need to save energy?", tags: ["not fish", "deep sea", "cleanup"] },
  { id: "deep-shrimp", name: "Deep-Sea Shrimp", depth: 3200, x: 58, y: 50, size: 68, color: "#ff7f73", className: "shrimp glow", shortFact: "I am small, but I can find food in the dark deep sea.", fullFact: "Some deep-sea shrimp live near the seafloor and around hydrothermal vents. They are part of the deep-sea food web.", ability: "Dark-water adaptation", food: "Tiny particles and microbes", question: "Why are small animals important in deep water?", tags: ["not fish", "deep sea", "hydrothermal vent"] },
  { id: "yeti-crab", name: "Yeti Crab", depth: 3600, x: 24, y: 58, size: 86, color: "#f2ead4", className: "crab", shortFact: "My fuzzy claws help me live near hot vents.", fullFact: "Yeti crabs live near deep-sea hydrothermal vents. Their fuzzy limbs may grow bacteria that help them get food.", ability: "Bacteria partnership", food: "Bacteria and tiny particles", question: "Why might an animal team up with bacteria?", tags: ["not fish", "deep sea", "hydrothermal vent"] },
  { id: "tubeworm", name: "Tube Worm", depth: 4200, x: 48, y: 66, size: 104, color: "#ff4c58", className: "tubeworm", shortFact: "I live near hot vents and do not need sunlight to survive.", fullFact: "Tube worms live around hydrothermal vents. There is no sunlight there, but special bacteria help them get energy.", ability: "Chemical energy", food: "Energy from bacteria", question: "If there were no sunlight, what else could life use?", tags: ["not fish", "deep sea", "hydrothermal vent"] },
  { id: "probe", name: "Research Probe", depth: 4700, x: 78, y: 46, size: 86, color: "#ffd34d", className: "ventlife glow", shortFact: "I am a scientist's eyes where humans cannot easily go.", fullFact: "Deep-sea probes carry cameras, lights, and tools to help scientists observe seafloor life and landscapes.", ability: "Observe and record", food: "Electric power", question: "If you designed a probe, what tool would you add?", tags: ["science", "deep sea", "probe"] }
];

const missions = [
  { id: "glow-2", title: "Find 2 glowing animals", type: "tag", target: "glows", requiredCount: 2, reward: "Glowing Jelly Sticker" },
  { id: "deep-1", title: "Discover 1 animal below 1000 m", type: "depth", target: 1000, requiredCount: 1, reward: "Deep Diver Badge" },
  { id: "count-5", title: "Discover 5 new friends", type: "count", target: 5, requiredCount: 5, reward: "Explorer Sticker" }
];

const paintJobs = [
  { id: "sun", name: "Sunbeam Yellow", top: "#ffd34d", bottom: "#f59b1a", need: 0 },
  { id: "coral", name: "Coral Pink", top: "#ff91b5", bottom: "#e64b86", need: 3 },
  { id: "ocean", name: "Ocean Blue", top: "#8df4ff", bottom: "#1776d2", need: 6, chapter: "blue-team" },
  { id: "mint", name: "Seaweed Green", top: "#7ff0b6", bottom: "#21a779", need: 8 },
  { id: "glow", name: "Glow Blue", top: "#7fe8ff", bottom: "#1a68d8", need: 9, chapter: "twilight-team" },
  { id: "abyss", name: "Abyss Violet", top: "#b792ff", bottom: "#5930a8", need: 14 }
];

const chapters = [
  { id: "sunlight-friends", name: "Sunlight Crew", badge: "Sunlight Badge", creatureIds: ["jellyfish", "turtle", "octopus"], completeTitle: "Sub Training Complete!", completeText: "You learned sonar scanning, careful piloting, and the searchlight. You earned the Sunlight Badge and can explore deeper water." },
  { id: "blue-team", name: "Blue Zone Crew", badge: "Blue Zone Badge", creatureIds: ["dolphin", "shark", "lanternfish"], paintReward: "ocean", completeTitle: "Blue Zone Complete!", completeText: "You met sound-using dolphins, sharp-sensed sharks, and glowing lanternfish. You earned the Blue Zone Badge and unlocked Ocean Blue paint." },
  { id: "twilight-team", name: "Twilight Crew", badge: "Twilight Badge", creatureIds: ["barreleye", "sperm-whale", "anglerfish"], paintReward: "glow", completeTitle: "Twilight Zone Complete!", completeText: "You observed the barreleye fish, the deep-diving sperm whale, and the anglerfish with its tiny light. You earned the Twilight Badge and unlocked Glow Blue paint." }
];

const firstChapter = chapters[0];

const state = {
  depth: 0,
  lightOn: false,
  discovered: new Set(),
  scanned: new Set(),
  completed: new Set(),
  stickers: new Set(),
  badges: new Set(),
  paint: "sun",
  guideDone: false,
  guideStep: "dive"
};

const pilot = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  tilt: 0,
  active: false,
  dragging: false,
  dragStartX: 0,
  dragStartY: 0,
  startX: 0,
  startY: 0,
  keys: new Set(),
  energy: 100,
  sonarReadyAt: 0,
  lastFrameAt: 0
};

const elements = {
  app: document.querySelector(".app"),
  ocean: document.getElementById("ocean"),
  creatureLayer: document.getElementById("creatureLayer"),
  depthValue: document.getElementById("depthValue"),
  v2DepthValue: document.getElementById("v2DepthValue"),
  v2ChapterLabel: document.getElementById("v2ChapterLabel"),
  v2GoalName: document.getElementById("v2GoalName"),
  v2GoalHint: document.getElementById("v2GoalHint"),
  energyMeter: document.getElementById("energyMeter"),
  energyText: document.getElementById("energyText"),
  v2ScanButton: document.getElementById("v2ScanButton"),
  v2DiveButton: document.getElementById("v2DiveButton"),
  zoneName: document.getElementById("zoneName"),
  zoneDescription: document.getElementById("zoneDescription"),
  submarine: document.getElementById("submarine"),
  factPanel: document.getElementById("factPanel"),
  encounterPanel: document.getElementById("encounterPanel"),
  collectionPanel: document.getElementById("collectionPanel"),
  missionPanel: document.getElementById("missionPanel"),
  paintPanel: document.getElementById("paintPanel"),
  labPanel: document.getElementById("labPanel"),
  rewardPanel: document.getElementById("rewardPanel"),
  guideCard: document.getElementById("guideCard"),
  guideStep: document.getElementById("guideStep"),
  guideTitle: document.getElementById("guideTitle"),
  guideText: document.getElementById("guideText"),
  toast: document.getElementById("toast"),
  captainText: document.getElementById("captainText"),
  journeyProgress: document.getElementById("journeyProgress"),
  sonarRing: document.getElementById("sonarRing"),
  targetArrow: document.getElementById("targetArrow"),
  pilotPrompt: document.getElementById("pilotPrompt"),
  pilotPromptText: document.getElementById("pilotPromptText"),
  pilotActionButton: document.getElementById("pilotActionButton"),
  nextName: document.getElementById("nextName"),
  nextDistance: document.getElementById("nextDistance"),
  nextButton: document.getElementById("nextButton"),
  scanButton: document.getElementById("scanButton"),
  miniMissionList: document.getElementById("miniMissionList"),
  chapterLabel: document.getElementById("chapterLabel"),
  chapterTitle: document.getElementById("chapterTitle"),
  chapterProgress: document.getElementById("chapterProgress"),
  stickerShelf: document.getElementById("stickerShelf"),
  diveButton: document.getElementById("diveButton"),
  riseButton: document.getElementById("riseButton"),
  bookCount: document.getElementById("bookCount"),
  missionCount: document.getElementById("missionCount"),
  paintName: document.getElementById("paintName"),
  collectionButton: document.getElementById("collectionButton"),
  missionButton: document.getElementById("missionButton"),
  labButton: document.getElementById("labButton"),
  paintButton: document.getElementById("paintButton"),
  resetGuideButton: document.getElementById("resetGuideButton"),
  lightButton: document.getElementById("lightButton")
};

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    state.discovered = new Set(saved.discovered || []);
    state.scanned = new Set(saved.scanned || []);
    state.completed = new Set(saved.completed || []);
    state.stickers = new Set(saved.stickers || []);
    state.badges = new Set(saved.badges || []);
    state.paint = saved.paint || "sun";
    state.guideDone = Boolean(saved.guideDone) || (saved.discovered || []).length > 0;
    state.guideStep = saved.guideStep || "dive";
    state.lightOn = Boolean(saved.lightOn);
  } catch {
    state.discovered = new Set();
    state.completed = new Set();
  }
}

function saveProgress() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      discovered: [...state.discovered],
      scanned: [...state.scanned],
      completed: [...state.completed],
      stickers: [...state.stickers],
      badges: [...state.badges],
      paint: state.paint,
      guideDone: state.guideDone,
      guideStep: state.guideStep,
      lightOn: state.lightOn
    })
  );
}

function getCurrentZone(depth) {
  return zones.find((zone) => depth >= zone.minDepth && depth <= zone.maxDepth) || zones[zones.length - 1];
}

function interpolateColor(hexA, hexB, amount) {
  const a = hexA.match(/\w\w/g).map((value) => parseInt(value, 16));
  const b = hexB.match(/\w\w/g).map((value) => parseInt(value, 16));
  const mixed = a.map((channel, index) => Math.round(channel + (b[index] - channel) * amount));
  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
}

function renderCreatures() {
  elements.creatureLayer.innerHTML = creatures
    .map(
      (creature) => `
        <button
          class="creature ${creature.className} ${state.discovered.has(creature.id) ? "discovered" : ""} ${state.scanned.has(creature.id) || state.discovered.has(creature.id) ? "" : "unscanned"}"
          id="creature-${creature.id}"
          type="button"
          style="--x:${creature.x}%; --y:${creature.y}%; --size:${creature.size}px; --color:${creature.color}; --visible:0;"
          aria-label="${state.scanned.has(creature.id) || state.discovered.has(creature.id) ? `Discovered ${creature.name}` : "Mystery signal"}"
        >
          ${getCreatureArt(creature, "scene")}
          <span class="name">${state.scanned.has(creature.id) || state.discovered.has(creature.id) ? creature.name : "Mystery signal"}</span>
        </button>
      `
    )
    .join("");

  creatures.forEach((creature) => {
    document.getElementById(`creature-${creature.id}`).addEventListener("click", () => discoverCreature(creature.id));
  });
}

function updateScene() {
  const scrollY = Math.min(window.scrollY, scrollRange);
  state.depth = Math.round((scrollY / scrollRange) * maxDepth);
  const zone = getCurrentZone(state.depth);
  const zoneProgress = (state.depth - zone.minDepth) / Math.max(zone.maxDepth - zone.minDepth, 1);
  const depthProgress = state.depth / maxDepth;

  elements.depthValue.textContent = `${state.depth} m`;
  elements.v2DepthValue.textContent = `${state.depth} m`;
  elements.zoneName.textContent = zone.name;
  elements.zoneDescription.textContent = zone.description;
  elements.captainText.textContent = getCaptainText(state.depth);
  elements.journeyProgress.style.setProperty("--depth-progress", depthProgress.toFixed(3));
  elements.bookCount.textContent = `${state.discovered.size}/${creatures.length}`;
  elements.missionCount.textContent = `${state.completed.size}/${missions.length}`;
  renderChapterProgress();
  updateExperienceMode();
  renderNextTarget();
  renderMiniMissions();
  renderStickerShelf();
  applyPaint();
  updateGuide();

  const topColor = interpolateColor(zone.top, zone.bottom, Math.max(0, Math.min(zoneProgress, 1)) * 0.38);
  elements.ocean.style.background = `
    radial-gradient(circle at 18% 8%, rgba(255, 255, 210, ${0.36 * (1 - depthProgress)}), transparent 22rem),
    linear-gradient(180deg, ${topColor} 0%, ${zone.bottom} 100%)
  `;
  elements.ocean.style.setProperty("--depth-progress", depthProgress.toFixed(3));
  elements.ocean.style.setProperty("--surface-light", String(Math.max(0, 1 - depthProgress * 2.6)));
  elements.ocean.style.setProperty("--sunbeam", String(Math.max(0, 1 - depthProgress * 2.9)));
  elements.ocean.style.setProperty("--bubble-opacity", String(Math.max(0.08, 0.62 - depthProgress * 0.42)));
  elements.ocean.style.setProperty("--seafloor", String(Math.max(0, (state.depth - 3200) / 900)));
  elements.ocean.style.setProperty("--sub-light", state.lightOn ? "1" : "0");
  updateAbilityUi();
  updateV2Background(depthProgress);

  const target = getNextCreature();
  creatures.forEach((creature) => updateCreatureVisibility(creature));
  creatures.forEach((creature) => {
    const node = document.getElementById(`creature-${creature.id}`);
    node.classList.toggle("target", target && target.id === creature.id && !state.discovered.has(creature.id));
    node.classList.toggle("in-range", target && target.id === creature.id && isPilotNearCreature(creature));
  });
  updatePilotFeedback();
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function updateV2Background(depthProgress) {
  const shallow = clamp01(1 - depthProgress * 2.4);
  const blue = clamp01(1 - Math.abs(depthProgress - 0.18) / 0.22);
  const twilight = clamp01(1 - Math.abs(depthProgress - 0.48) / 0.28);
  const abyssal = clamp01((depthProgress - 0.58) / 0.32);
  const reef = clamp01(1 - depthProgress * 3.2);

  elements.ocean.style.setProperty("--bg-shallow", shallow.toFixed(2));
  elements.ocean.style.setProperty("--bg-blue", blue.toFixed(2));
  elements.ocean.style.setProperty("--bg-twilight", twilight.toFixed(2));
  elements.ocean.style.setProperty("--bg-abyssal", abyssal.toFixed(2));
  elements.ocean.style.setProperty("--reef-opacity", reef.toFixed(2));
}

function getNextCreature() {
  if (!state.guideDone) {
    return creatures.find((creature) => creature.id === "jellyfish");
  }

  const chapterNext = getNextChapterCreature();
  if (chapterNext) {
    return chapterNext;
  }

  const undiscovered = creatures
    .filter((creature) => !state.discovered.has(creature.id))
    .sort((a, b) => Math.abs(a.depth - state.depth) - Math.abs(b.depth - state.depth));
  return undiscovered[0] || creatures[creatures.length - 1];
}

function getCurrentChapter() {
  return chapters.find((chapter) => !state.badges.has(chapter.id)) || null;
}

function getChapterProgress(chapter = getCurrentChapter()) {
  if (!chapter) {
    return {
      found: [],
      total: 0,
      complete: false
    };
  }
  const found = chapter.creatureIds.filter((id) => state.discovered.has(id));
  return {
    found,
    total: chapter.creatureIds.length,
    complete: found.length >= chapter.creatureIds.length
  };
}

function getNextChapterCreature() {
  const chapter = getCurrentChapter();
  if (!chapter) return null;
  const nextId = chapter.creatureIds.find((id) => !state.discovered.has(id));
  return nextId ? creatures.find((creature) => creature.id === nextId) : null;
}

function getCreatureChapter(creature) {
  if (!creature) return null;
  return chapters.find((chapter) => chapter.creatureIds.includes(creature.id)) || null;
}

function getChapterStepLabel(chapter, creature) {
  if (!chapter || !creature) return "Next discovery";
  const step = chapter.creatureIds.indexOf(creature.id) + 1;
  return `${step}/${chapter.creatureIds.length} ${chapter.name}`;
}

function getChapterLesson(creature) {
  if (!creature) return null;
  const chapter = getCreatureChapter(creature);
  if (!chapter || state.badges.has(chapter.id)) return null;
  const lessons = {
    jellyfish: { label: "1/3 Sonar scan", done: "Sonar training complete!", approachHint: "Reach the jellyfish depth and try a sonar scan", captain: "First, learn sonar. Dive near the jellyfish and scan the mystery signal." },
    turtle: { label: "2/3 Pilot closer", done: "Piloting complete!", approachHint: "Pilot the sub close to the sea turtle", captain: "Now pilot the sub yourself. The observe button appears when you are close to the sea turtle.", requiresNear: true },
    octopus: { label: "3/3 Searchlight look", done: "Searchlight training complete!", approachHint: "Pilot near the octopus in the shadow", captain: "The octopus is hiding in shadow. Move close, then turn on the searchlight.", requiresNear: true, needsLight: true },
    dolphin: { label: "1/3 Echo search", done: "Dolphin echo found!", approachHint: "Go to the Blue Zone and use sonar to find the dolphin", captain: "The Blue Zone Crew begins. Dolphins use sound, so find this one with sonar." },
    shark: { label: "2/3 Gentle approach", done: "Gentle approach complete!", approachHint: "Pilot slowly toward the shark", captain: "Sharks have sharp senses. Pilot slowly toward it instead of only scanning from far away.", requiresNear: true },
    lanternfish: { label: "3/3 Look in dim water", done: "Lanternfish glow found!", approachHint: "Move close to the lanternfish, then use the searchlight", captain: "Deeper water is getting dim. Move close and use the searchlight to observe a glowing animal.", requiresNear: true, needsLight: true },
    barreleye: { label: "1/3 Look upward", done: "Transparent head found!", approachHint: "Move near the barreleye and notice its upward-looking eyes", captain: "The Twilight Zone is quiet. Barreleye fish look upward for shadows passing above.", requiresNear: true },
    "sperm-whale": { label: "2/3 Deep-diving sound", done: "Deep echo heard!", approachHint: "Use sonar to track the sperm whale", captain: "Sperm whales dive deep to find squid. Track its sound with sonar." },
    anglerfish: { label: "3/3 Glowing lure", done: "Deep-sea light found!", approachHint: "Move near the anglerfish and use the searchlight", captain: "The anglerfish light works like a lure. Move close, then use the searchlight.", requiresNear: true, needsLight: true }
  };
  return lessons[creature.id] || null;
}

function canStartChapterAction(creature) {
  const lesson = getChapterLesson(creature);
  if (!lesson) return true;
  if (lesson.requiresNear && !isPilotNearCreature(creature)) {
    showToast(lesson.approachHint);
    return false;
  }
  if (lesson.needsLight && !state.lightOn) {
    showToast(`${creature.name} is still hard to see. Turn on the searchlight first.`);
    return false;
  }
  return true;
}

function renderNextTarget() {
  const next = getNextCreature();
  const distance = next.depth - state.depth;
  const chapterNext = getNextChapterCreature();
  const pilotNear = isPilotNearCreature(next);
  const lesson = getChapterLesson(next);
  const activeChapter = getCurrentChapter();
  elements.chapterLabel.textContent = chapterNext ? activeChapter.name : "Next discovery";
  elements.nextName.textContent = state.discovered.size === creatures.length ? "All discovered" : next.name;
  elements.v2GoalName.textContent = state.discovered.size === creatures.length ? "All discovered" : next.name;
  elements.v2ChapterLabel.textContent = lesson ? lesson.label : chapterNext ? getChapterStepLabel(activeChapter, next) : "Next discovery";
  if (state.discovered.size === creatures.length) {
    elements.nextDistance.textContent = "Discovery book complete";
    elements.v2GoalHint.textContent = "Discovery book complete";
    elements.nextButton.textContent = "Return to surface";
    elements.scanButton.disabled = true;
    elements.v2ScanButton.disabled = true;
    return;
  }

  if (lesson && !pilotNear && Math.abs(distance) <= 35) {
    elements.nextDistance.textContent = lesson.approachHint;
    elements.v2GoalHint.textContent = lesson.approachHint;
    elements.nextButton.textContent = "Locate";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.36");
  } else if (lesson && lesson.needsLight && pilotNear && !state.lightOn) {
    elements.nextDistance.textContent = `${next.name} needs the searchlight`;
    elements.v2GoalHint.textContent = "Move close, then turn on the searchlight";
    elements.nextButton.textContent = "Turn on";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.42");
  } else if (pilotNear) {
    elements.nextDistance.textContent = state.scanned.has(next.id) ? "Move close and tap to observe" : "Move close and scan it";
    elements.v2GoalHint.textContent = state.scanned.has(next.id) ? "Move close and tap to observe" : "Move close and scan it";
    elements.nextButton.textContent = state.scanned.has(next.id) ? "Observe" : "Scan";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.62");
  } else if (Math.abs(distance) <= 35) {
    elements.nextDistance.textContent = state.scanned.has(next.id) ? "Nearby. Pilot closer" : "Strong signal. Scan first";
    elements.v2GoalHint.textContent = state.scanned.has(next.id) ? "Pilot the sub closer" : "Strong signal. Scan first";
    elements.nextButton.textContent = "Locate";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.52");
  } else {
    elements.nextDistance.textContent = distance > 0 ? `Dive ${distance} m deeper` : `Rise ${Math.abs(distance)} m`;
    elements.v2GoalHint.textContent = distance > 0 ? `Dive ${distance} m deeper` : `Rise ${Math.abs(distance)} m`;
    elements.nextButton.textContent = distance > 0 ? "Dive to find" : "Rise to find";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0");
  }
  updateAbilityUi();
}

function updateExperienceMode() {
  elements.app.classList.toggle("full-mode", state.badges.has(firstChapter.id));
}

function getCaptainText(depth) {
  if (!state.guideDone) {
    if (state.guideStep === "dive") return "Let's find a glowing friend first. Tap Dive to find and move closer.";
    if (state.guideStep === "scan") return "The signal is stronger. Tap Scan to see who is hiding nearby.";
    if (state.guideStep === "observe") return "Scan complete. Now tap the glowing mystery friend.";
    if (state.guideStep === "play") return "Tap Try it to see its special skill.";
    return "Now take a photo and add it to your first discovery book.";
  }

  const chapterNext = getNextChapterCreature();
  if (chapterNext) {
    const chapter = getCurrentChapter();
    const progress = getChapterProgress(chapter);
    const lesson = getChapterLesson(chapterNext);
    return lesson ? lesson.captain : `${chapter.name} needs ${progress.total - progress.found.length} more friends. Next up: ${chapterNext.name}.`;
  }

  if (depth < 80) return "The sunlight is bright here. Meet shallow-water neighbors and tap them for your book.";
  if (depth < 300) return "The water is turning blue. Sound and scent can help animals find their way.";
  if (depth < 1000) return "This layer feels like evening. Watch for friends that glow.";
  if (depth < 3000) return "You are in deep water now. The searchlight helps you see clearly.";
  return "Near the seafloor, life can thrive by warm vents without sunlight.";
}

function updateGuide() {
  const jellyfish = creatures.find((creature) => creature.id === "jellyfish");
  if (state.guideDone) {
    elements.guideCard.hidden = true;
    setGuideHighlight(null);
    setProgressiveUi(false);
    return;
  }

  const distance = Math.abs(state.depth - jellyfish.depth);
  if (state.discovered.has("jellyfish")) {
    state.guideDone = true;
    state.guideStep = "done";
    saveProgress();
    elements.guideCard.hidden = true;
    setGuideHighlight(null);
    setProgressiveUi(false);
    return;
  }

  if (!state.scanned.has("jellyfish")) {
    state.guideStep = distance <= 260 ? "scan" : "dive";
  } else if (elements.encounterPanel.hidden) {
    state.guideStep = "observe";
  }

  const guide = getGuideCopy();
  elements.guideCard.hidden = false;
  elements.guideStep.textContent = guide.step;
  elements.guideTitle.textContent = guide.title;
  elements.guideText.textContent = guide.text;
  setGuideHighlight(guide.target);
  setProgressiveUi(true);
}

function getGuideCopy() {
  if (state.guideStep === "dive") {
    return { step: "1/5", title: "Move near your first friend", text: "Tap Dive to find and look for a glowing jellyfish.", target: elements.nextButton };
  }
  if (state.guideStep === "scan") {
    return { step: "2/5", title: "Scan the mystery signal", text: "The signal is strong. Tap Scan for a clue.", target: elements.scanButton };
  }
  if (state.guideStep === "observe") {
    const target = document.getElementById("creature-jellyfish");
    return { step: "3/5", title: "Tap the mystery friend", text: "It is nearby. Tap it to open the observation stage.", target };
  }
  if (state.guideStep === "play") {
    const target = elements.encounterPanel.querySelector("[data-play]");
    return { step: "4/5", title: "Try its special skill", text: "Tap Try it and see what the jellyfish does.", target };
  }
  const target = elements.encounterPanel.querySelector("[data-collect]");
  return { step: "5/5", title: "Photo for the book", text: "Take a photo to earn your first sticker.", target };
}

function setGuideHighlight(target) {
  document.querySelectorAll(".guided-highlight").forEach((node) => node.classList.remove("guided-highlight"));
  if (target) {
    target.classList.add("guided-highlight");
  }
}

function setProgressiveUi(isGuiding) {
  [elements.collectionButton, elements.missionButton, elements.labButton, elements.paintButton, elements.lightButton].forEach((button) => {
    button.classList.toggle("locked-during-guide", isGuiding);
  });
}

function updateCreatureVisibility(creature) {
  const node = document.getElementById(`creature-${creature.id}`);
  const distance = Math.abs(state.depth - creature.depth);
  const visible = Math.max(0, 1 - distance / 250);
  const darkPenalty = state.depth > 1000 && !state.lightOn && !creature.tags.includes("glows") ? 0.16 : 1;
  const lessonPenalty = getChapterLesson(creature)?.needsLight && !state.lightOn && !state.discovered.has(creature.id) ? 0.24 : 1;
  const pilotBoost = isPilotNearCreature(creature) ? 0.28 : 0;
  node.style.setProperty("--visible", Math.min(1, visible * darkPenalty * lessonPenalty + pilotBoost).toFixed(2));
  node.classList.toggle("visible", visible > 0.2 || pilotBoost > 0);
  node.classList.toggle("needs-light", Boolean(getChapterLesson(creature)?.needsLight && !state.lightOn && !state.discovered.has(creature.id)));
}

function discoverCreature(id) {
  const creature = creatures.find((item) => item.id === id);
  const node = document.getElementById(`creature-${id}`);
  if (!state.scanned.has(id) && !state.discovered.has(id)) {
    scanCreature(creature);
    return;
  }

  renderEncounterPanel(creature);
}

function collectCreature(creature) {
  const node = document.getElementById(`creature-${creature.id}`);
  node.classList.remove("pulse");
  node.classList.remove("party");
  void node.offsetWidth;
  node.classList.add("pulse");
  node.classList.add("party");

  const wasNew = !state.discovered.has(creature.id);
  state.scanned.add(creature.id);
  state.discovered.add(creature.id);
  saveProgress();
  node.classList.add("discovered");
  if (wasNew) {
    showFoundPop(`Discovered ${creature.name}`);
    flashCamera();
    playTone({ frequency: 980, duration: 0.1, gain: 0.045 });
    window.setTimeout(() => playTone({ frequency: 1260, duration: 0.14, gain: 0.045 }), 110);
    unlockSticker(creature);
    unlockPaintIfReady();
    showChapterLessonComplete(creature);
    checkChapterCompletion(getChapterLesson(creature) ? 1500 : 450);
  }
  elements.encounterPanel.hidden = true;
  renderFactPanel(creature, wasNew);
  updateScene();
  checkMissions();
}

function showChapterLessonComplete(creature) {
  const lesson = getChapterLesson(creature);
  if (!lesson) return;
  window.setTimeout(() => {
    showFoundPop(lesson.done);
    playTone({ frequency: 740, duration: 0.1, gain: 0.04 });
    window.setTimeout(() => playTone({ frequency: 980, duration: 0.12, gain: 0.04 }), 110);
  }, 850);
}

function checkChapterCompletion(delay = 450) {
  const chapter = getCreatureChapter(getNextCreature()) || getCurrentChapter();
  const activeChapter = chapter && getChapterProgress(chapter).complete ? chapter : chapters.find((item) => getChapterProgress(item).complete && !state.badges.has(item.id));
  if (activeChapter && !state.badges.has(activeChapter.id)) {
    state.badges.add(activeChapter.id);
    applyChapterReward(activeChapter);
    saveProgress();
    window.setTimeout(() => showChapterReward(activeChapter), delay);
  }
}

function applyChapterReward(chapter) {
  if (!chapter.paintReward) return;
  state.paint = chapter.paintReward;
  applyPaint();
  showToast(`Sub paint unlocked: ${getCurrentPaint().name}`);
}

function showChapterReward(chapter = firstChapter) {
  burstSparkles();
  playTone({ frequency: 660, duration: 0.12, gain: 0.05 });
  window.setTimeout(() => playTone({ frequency: 880, duration: 0.12, gain: 0.05 }), 120);
  window.setTimeout(() => playTone({ frequency: 1180, duration: 0.18, gain: 0.05 }), 260);
  elements.rewardPanel.hidden = false;
  elements.rewardPanel.innerHTML = `
    <h2>${chapter.completeTitle}</h2>
    <div class="reward-sticker">${getBadgeMarkup(chapter)}</div>
    <p>${chapter.completeText}</p>
    <div class="panel-actions">
      <button type="button" data-close-reward>Keep diving</button>
      <button type="button" data-open-book>Open book</button>
    </div>
  `;
  elements.rewardPanel.querySelector("[data-close-reward]").addEventListener("click", () => {
    elements.rewardPanel.hidden = true;
  });
  elements.rewardPanel.querySelector("[data-open-book]").addEventListener("click", () => {
    elements.rewardPanel.hidden = true;
    renderCollection();
  });
}

function getBadgeMarkup(chapter) {
  if (chapter.id === firstChapter.id) {
    return `<img src="./assets/sprites/final/sunlight-badge.png" alt="${chapter.badge}" />`;
  }
  return chapter.badge.slice(0, 2);
}

function scanCreature(creature) {
  if (!canStartChapterAction(creature)) return;
  if (!tryUseSonar()) return;
  state.scanned.add(creature.id);
  if (!state.guideDone && creature.id === "jellyfish") {
    state.guideStep = "observe";
  }
  saveProgress();
  playTone({ frequency: 560, duration: 0.08, type: "square", gain: 0.03 });
  window.setTimeout(() => playTone({ frequency: 740, duration: 0.08, type: "square", gain: 0.03 }), 100);
  showToast(`Sonar clue: ${creature.ability}`);
  pulseSonar();
  renderCreatures();
  updateScene();
}

function renderEncounterPanel(creature) {
  elements.encounterPanel.hidden = false;
  if (!state.guideDone && creature.id === "jellyfish") {
    state.guideStep = "play";
    saveProgress();
  }
  const stage = getStageConfig(creature);
  const found = state.discovered.has(creature.id);
  elements.encounterPanel.innerHTML = `
    <h2>${found ? creature.name : "New discovery!"}</h2>
    <div class="encounter-stage">
      <div class="encounter-creature" id="encounterStage" aria-hidden="true">
        ${getCreatureArt(creature, "stage")}
        <div class="stage-effect ${stage.effect}"></div>
      </div>
      <div class="stage-copy">
        <p>${creature.shortFact}</p>
        <p class="stage-reveal">${getPlayfulAction(creature)}</p>
        <div class="clue-list">
          <span>Lives around ${creature.depth} m</span>
          <span>Skill: ${creature.ability}</span>
          <span>Clues: ${creature.tags.slice(0, 2).join(" / ")}</span>
        </div>
      </div>
    </div>
    <div class="panel-actions">
      <button type="button" data-play>Try it</button>
      <button type="button" data-collect>${found ? "Open fact card" : "Photo for the book"}</button>
      <button type="button" data-close>Keep watching</button>
    </div>
  `;
  elements.encounterPanel.querySelector("[data-play]").addEventListener("click", () => playStage(creature));
  elements.encounterPanel.querySelector("[data-collect]").addEventListener("click", () => collectCreature(creature));
  elements.encounterPanel.querySelector("[data-close]").addEventListener("click", () => {
    elements.encounterPanel.hidden = true;
  });
  updateGuide();
}

function getPlayfulAction(creature) {
  if (creature.id === "jellyfish") return "It glows softly, like a tiny night-light in the sea.";
  if (creature.id === "octopus") return "It changes color and gets ready to puff ink.";
  if (creature.id === "dolphin") return "It sends out sound ripples, like a friendly hello.";
  if (creature.id === "anglerfish") return "The little light on its head wiggles like a fishing lure.";
  if (creature.id === "tubeworm") return "White vent smoke rises while the tube worms sway gently.";
  if (creature.id === "probe") return "The probe light turns on and records seafloor secrets.";
  if (creature.tags.includes("glows")) return "The light spots on its body begin to sparkle.";
  if (creature.tags.includes("not fish")) return "It comes closer and curiously looks at the sub.";
  return "It swims around the sub as if saying hello.";
}

function getStageConfig(creature) {
  const configs = {
    jellyfish: { actor: "jellyfish", effect: "" },
    octopus: { actor: "octopus", effect: "ink" },
    dolphin: { actor: "dolphin", effect: "sound" },
    anglerfish: { actor: "anglerfish", effect: "beam" },
    "sperm-whale": { actor: "sperm-whale", effect: "sound" },
    tubeworm: { actor: "tubeworm", effect: "bubble" },
    probe: { actor: "probe", effect: "beam" },
    "giant-squid": { actor: "giant-squid", effect: "ink" }
  };

  if (configs[creature.id]) return configs[creature.id];
  if (creature.tags.includes("glows")) return { actor: "jellyfish", effect: "" };
  if (creature.tags.includes("not fish")) return { actor: "octopus", effect: "bubble" };
  return { actor: "fish", effect: "sound" };
}

function getCreatureArt(creature, variant = "scene") {
  const rasterSprites = {
    jellyfish: "jellyfish.png",
    clownfish: "clownfish.png",
    turtle: "turtle.png",
    octopus: "octopus.png"
  };
  if (rasterSprites[creature.id]) {
    return `<img class="creature-art art-${variant} art-${creature.id} raster-art" src="./assets/sprites/final/${rasterSprites[creature.id]}" alt="${creature.name}" />`;
  }

  const className = `creature-art art-${variant} art-${creature.id}`;
  const color = creature.color;
  const smile = `<path d="M47 63 Q56 70 66 63" fill="none" stroke="#17314f" stroke-width="3" stroke-linecap="round"/>`;
  const eye = `<circle cx="45" cy="49" r="5.5" fill="#17314f"/><circle cx="47" cy="47" r="1.8" fill="#fff"/>`;
  const eyePair = `${eye}<circle cx="70" cy="49" r="5.5" fill="#17314f"/><circle cx="72" cy="47" r="1.8" fill="#fff"/>`;

  const svg = (body) => `
    <svg class="${className}" viewBox="0 0 120 120" role="img" aria-label="${creature.name}">
      <defs>
        <filter id="soft-${creature.id}" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="#00142d" flood-opacity="0.28"/>
        </filter>
      </defs>
      ${body}
    </svg>
  `;

  if (creature.id === "jellyfish") {
    return svg(`
      <ellipse cx="60" cy="43" rx="38" ry="30" fill="#eaffff" opacity="0.92" filter="url(#soft-${creature.id})"/>
      <path d="M24 48 Q60 86 96 48 Q91 80 60 84 Q29 80 24 48Z" fill="${color}" opacity="0.82"/>
      <path d="M34 42 C45 27 75 27 86 42" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.38"/>
      <circle cx="47" cy="50" r="6" fill="#17314f"/><circle cx="49" cy="48" r="2" fill="#fff"/>
      <circle cx="73" cy="50" r="6" fill="#17314f"/><circle cx="75" cy="48" r="2" fill="#fff"/>
      <circle cx="38" cy="61" r="5" fill="#ff91b5" opacity="0.72"/>
      <circle cx="82" cy="61" r="5" fill="#ff91b5" opacity="0.72"/>
      ${smile}
      <path d="M38 76 C29 92 44 97 35 112 M52 80 C46 95 59 98 51 114 M68 80 C76 95 63 99 73 114 M82 76 C94 92 80 99 91 112" fill="none" stroke="#eaffff" stroke-width="5.5" stroke-linecap="round"/>
    `);
  }

  if (creature.id === "clownfish") {
    return svg(`
      <path d="M103 62 C88 38 38 38 17 62 C36 86 84 86 103 62Z" fill="#ff8b2f" filter="url(#soft-${creature.id})"/>
      <path d="M25 62 L6 44 L9 80Z" fill="#ff8b2f"/>
      <path d="M47 39 C42 52 42 71 47 84 M72 38 C66 52 66 72 72 85" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
      <path d="M47 39 C42 52 42 71 47 84 M72 38 C66 52 66 72 72 85" fill="none" stroke="#17314f" stroke-width="2" stroke-linecap="round" opacity="0.32"/>
      <path d="M63 42 L51 25 L48 50Z" fill="#ff8b2f"/>
      <circle cx="80" cy="51" r="6" fill="#17314f"/><circle cx="82" cy="49" r="2" fill="#fff"/>
      <circle cx="87" cy="63" r="4" fill="#ffbeae" opacity="0.72"/>
      <path d="M78 68 Q67 75 56 68" fill="none" stroke="#17314f" stroke-width="3" stroke-linecap="round"/>
    `);
  }

  if (creature.id === "octopus" || creature.id === "giant-squid") {
    const isOctopus = creature.id === "octopus";
    return svg(`
      <ellipse cx="60" cy="46" rx="${isOctopus ? 36 : 30}" ry="${isOctopus ? 33 : 39}" fill="${color}" filter="url(#soft-${creature.id})"/>
      <circle cx="47" cy="50" r="6" fill="#17314f"/><circle cx="49" cy="48" r="2" fill="#fff"/>
      <circle cx="73" cy="50" r="6" fill="#17314f"/><circle cx="75" cy="48" r="2" fill="#fff"/>
      <circle cx="39" cy="61" r="5" fill="#ffb6c9" opacity="${isOctopus ? "0.7" : "0.35"}"/>
      <circle cx="81" cy="61" r="5" fill="#ffb6c9" opacity="${isOctopus ? "0.7" : "0.35"}"/>
      ${smile}
      <path d="M32 74 C21 88 29 99 16 109 M44 78 C36 94 43 103 32 113 M57 80 C53 94 61 103 55 114 M73 78 C84 94 75 103 88 113 M88 74 C101 88 91 101 106 109" fill="none" stroke="${color}" stroke-width="${isOctopus ? "11" : "9"}" stroke-linecap="round"/>
      <circle cx="80" cy="37" r="5" fill="#fff" opacity="0.24"/>
      ${isOctopus ? '<circle cx="31" cy="83" r="3" fill="#ffd1dd" opacity="0.8"/><circle cx="91" cy="84" r="3" fill="#ffd1dd" opacity="0.8"/>' : ""}
    `);
  }

  if (creature.id === "dolphin" || creature.id === "sperm-whale") {
    const whale = creature.id === "sperm-whale";
    return svg(`
      <path d="${whale ? "M102 61 C92 30 33 27 16 57 C29 77 80 84 102 61Z" : "M102 64 C86 34 34 35 16 62 C36 82 82 83 102 64Z"}" fill="${color}" filter="url(#soft-${creature.id})"/>
      <path d="M26 59 L5 45 L9 76Z" fill="${color}"/>
      <path d="M58 39 L72 16 L77 45Z" fill="${color}"/>
      <path d="M73 71 Q58 80 38 69" fill="#fff" opacity="0.36"/>
      <circle cx="80" cy="55" r="5.5" fill="#17314f"/><circle cx="82" cy="53" r="1.8" fill="#fff"/>
      <path d="M82 66 Q72 72 62 66" fill="none" stroke="#17314f" stroke-width="3" stroke-linecap="round"/>
      ${whale ? '<path d="M88 34 C93 26 85 20 90 12" fill="none" stroke="#dffbff" stroke-width="4" stroke-linecap="round"/>' : ""}
    `);
  }

  if (creature.id === "anglerfish") {
    return svg(`
      <path d="M102 64 C92 34 36 33 19 62 C38 88 84 88 102 64Z" fill="${color}" filter="url(#soft-${creature.id})"/>
      <path d="M28 62 L8 45 L10 80Z" fill="${color}"/>
      <path d="M74 38 C78 18 58 13 49 25" fill="none" stroke="#dffbff" stroke-width="4" stroke-linecap="round"/>
      <circle cx="44" cy="26" r="8" fill="#fff4a8" class="svg-lure"/>
      <circle cx="79" cy="49" r="5.5" fill="#17314f"/><circle cx="81" cy="47" r="1.8" fill="#fff"/>
      <path d="M72 69 Q58 78 42 67" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    `);
  }

  if (creature.id === "tubeworm") {
    return svg(`
      <path d="M54 35 H69 L75 104 H48Z" fill="#f7f3e7" filter="url(#soft-${creature.id})"/>
      <path d="M42 33 C48 14 75 14 82 33 C72 43 52 43 42 33Z" fill="#e7434d"/>
      <path d="M31 104 H92" stroke="#6b7480" stroke-width="10" stroke-linecap="round"/>
      <circle cx="57" cy="55" r="3" fill="#17314f"/><circle cx="68" cy="55" r="3" fill="#17314f"/>
    `);
  }

  if (creature.id === "probe") {
    return svg(`
      <rect x="35" y="34" width="50" height="50" rx="9" fill="#ffd34d" filter="url(#soft-${creature.id})"/>
      <circle cx="60" cy="58" r="15" fill="#17314f"/>
      <circle cx="60" cy="58" r="9" fill="#7fe8ff"/>
      <path d="M85 56 L112 42 L112 76Z" fill="#fff4a8" opacity="0.52" class="svg-beam"/>
      <path d="M38 84 L27 104 M82 84 L94 104" stroke="#ffd34d" stroke-width="6" stroke-linecap="round"/>
    `);
  }

  if (creature.id === "turtle") {
    return svg(`
      <ellipse cx="60" cy="62" rx="38" ry="29" fill="#48b86f" filter="url(#soft-${creature.id})"/>
      <path d="M35 62 C48 39 72 39 85 62 C72 83 48 83 35 62Z" fill="#8ee09b"/>
      <path d="M49 45 L60 62 L48 79 M71 45 L60 62 L72 79 M40 62 H80" fill="none" stroke="#2f8f62" stroke-width="3" stroke-linecap="round" opacity="0.58"/>
      <circle cx="92" cy="58" r="14" fill="#48b86f"/>
      <circle cx="96" cy="55" r="4.5" fill="#17314f"/><circle cx="98" cy="53" r="1.5" fill="#fff"/>
      <path d="M94 65 Q88 69 82 65" fill="none" stroke="#17314f" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M34 48 C18 38 16 54 31 59 M34 76 C17 86 19 69 32 66 M78 43 C91 30 97 45 83 57 M78 81 C92 94 96 77 82 67" fill="#48b86f"/>
    `);
  }

  if (creature.id === "isopod" || creature.id === "yeti-crab") {
    return svg(`
      <ellipse cx="60" cy="62" rx="36" ry="28" fill="${color}" filter="url(#soft-${creature.id})"/>
      <path d="M36 62 C48 42 72 42 84 62 C72 80 48 80 36 62Z" fill="rgba(255,255,255,0.22)"/>
      <circle cx="29" cy="57" r="12" fill="${color}"/>
      <circle cx="26" cy="55" r="3.8" fill="#17314f"/>
      <path d="M37 83 C25 95 21 88 17 102 M82 83 C94 95 99 88 103 102" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
    `);
  }

  return svg(`
    <path d="M102 62 C86 38 38 37 18 62 C37 84 84 84 102 62Z" fill="${color}" filter="url(#soft-${creature.id})"/>
    <path d="M24 62 L5 45 L8 80Z" fill="${color}"/>
    <path d="M66 42 L52 24 L48 48Z" fill="${color}"/>
    <circle cx="78" cy="49" r="5.5" fill="#17314f"/><circle cx="80" cy="47" r="1.8" fill="#fff"/>
    <path d="M77 68 Q65 76 51 68" fill="none" stroke="#17314f" stroke-width="3" stroke-linecap="round"/>
    ${creature.id === "clownfish" ? '<path d="M43 43 V78 M72 42 V79" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.9"/>' : ""}
  `);
}

function playStage(creature) {
  const stage = document.getElementById("encounterStage");
  stage.classList.remove("stage-played");
  void stage.offsetWidth;
  stage.classList.add("stage-played");
  playCreatureSound(creature);
  if (!state.guideDone && creature.id === "jellyfish") {
    state.guideStep = "collect";
    saveProgress();
    window.setTimeout(updateGuide, 80);
  }
}

function playTone({ frequency = 520, duration = 0.12, type = "sine", gain = 0.05, slideTo = null } = {}) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = playTone.context || new AudioContext();
  playTone.context = context;

  const oscillator = context.createOscillator();
  const volume = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  if (slideTo) {
    oscillator.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
  }
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(gain, now + 0.02);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(volume).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function playCreatureSound(creature) {
  if (creature.id === "dolphin") {
    playTone({ frequency: 880, duration: 0.09, gain: 0.04, slideTo: 1320 });
    window.setTimeout(() => playTone({ frequency: 1040, duration: 0.08, gain: 0.04, slideTo: 1500 }), 90);
    return;
  }
  if (creature.id === "sperm-whale") {
    playTone({ frequency: 95, duration: 0.28, type: "triangle", gain: 0.07, slideTo: 62 });
    return;
  }
  if (creature.id === "probe") {
    playTone({ frequency: 620, duration: 0.08, type: "square", gain: 0.035 });
    window.setTimeout(() => playTone({ frequency: 820, duration: 0.08, type: "square", gain: 0.035 }), 120);
    return;
  }
  if (creature.id === "octopus" || creature.id === "giant-squid") {
    playTone({ frequency: 220, duration: 0.18, type: "sawtooth", gain: 0.035, slideTo: 120 });
    return;
  }
  if (creature.tags.includes("glows")) {
    playTone({ frequency: 720, duration: 0.16, gain: 0.04, slideTo: 980 });
    return;
  }
  playTone({ frequency: 420, duration: 0.12, gain: 0.035, slideTo: 540 });
}

function flashCamera() {
  const flash = document.createElement("div");
  flash.className = "camera-flash active";
  document.body.appendChild(flash);
  window.setTimeout(() => flash.remove(), 600);
}

function unlockSticker(creature) {
  state.stickers.add(creature.id);
  saveProgress();
  showReward(creature);
}

function showReward(creature) {
  burstSparkles();
  const isFirstFriend = state.discovered.size === 1;
  elements.rewardPanel.hidden = false;
  elements.rewardPanel.innerHTML = `
    <h2>${isFirstFriend ? "First ocean friend!" : "New sticker earned!"}</h2>
    <div class="reward-sticker">${getStickerMarkup(creature)}</div>
    <p>${isFirstFriend ? "Wonderful! You made your first real ocean discovery." : `${creature.name} has joined your ocean discovery book.`}</p>
    <div class="panel-actions">
      <button type="button" data-close-reward>Keep exploring</button>
      <button type="button" data-open-paints>See paints</button>
    </div>
  `;
  elements.rewardPanel.querySelector("[data-close-reward]").addEventListener("click", () => {
    elements.rewardPanel.hidden = true;
  });
  elements.rewardPanel.querySelector("[data-open-paints]").addEventListener("click", () => {
    elements.rewardPanel.hidden = true;
    renderPaintPanel();
  });
}

function getStickerLabel(creature) {
  return creature.name.slice(0, 2);
}

function getStickerMarkup(creature) {
  const raster = {
    jellyfish: "jellyfish.png",
    turtle: "turtle.png",
    octopus: "octopus.png",
    clownfish: "clownfish.png"
  }[creature.id];
  if (!raster) return getStickerLabel(creature);
  return `<img src="./assets/sprites/final/${raster}" alt="${creature.name}" />`;
}

function burstSparkles() {
  for (let index = 0; index < 18; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.setProperty("--angle", `${index * 20}deg`);
    sparkle.style.setProperty("--distance", `${90 + (index % 5) * 18}px`);
    document.body.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 1000);
  }
}

function showFoundPop(message) {
  const pop = document.createElement("div");
  pop.className = "found-pop";
  pop.textContent = message;
  document.body.appendChild(pop);
  window.setTimeout(() => pop.remove(), 1300);
}

function renderFactPanel(creature, wasNew) {
  elements.factPanel.hidden = false;
  elements.factPanel.innerHTML = `
    <h2>${creature.name}</h2>
    <p>${creature.shortFact}</p>
    <div class="panel-actions">
      <button type="button" data-close-fact>${wasNew ? "Add to book" : "Keep diving"}</button>
      <button type="button" data-open-book>Open book</button>
    </div>
  `;
  elements.factPanel.querySelector("[data-close-fact]").addEventListener("click", () => {
    elements.factPanel.hidden = true;
  });
  elements.factPanel.querySelector("[data-open-book]").addEventListener("click", () => {
    elements.factPanel.hidden = true;
    renderCollection();
  });
}

function renderCollection() {
  closePanels(elements.collectionPanel);
  elements.collectionPanel.hidden = false;
  const cards = creatures
    .map((creature) => {
      const found = state.discovered.has(creature.id);
      return `
        <article class="book-card ${found ? "" : "locked"}">
          <strong>${found ? creature.name : "Not found yet"}</strong>
          ${
            found
              ? `<p>${creature.fullFact}</p>
                 <p>Skill: ${creature.ability}</p>
                 <p>Question: ${creature.question}</p>`
              : "<p>Keep diving to find a new ocean friend.</p>"
          }
        </article>
      `;
    })
    .join("");

  elements.collectionPanel.innerHTML = `
    <h2>Ocean Discovery Book</h2>
    <p>Discovered ${state.discovered.size} / ${creatures.length} ocean friends.</p>
    <div class="card-grid">${cards}</div>
    <div class="panel-actions"><button type="button" data-close>Close</button></div>
  `;
  elements.collectionPanel.querySelector("[data-close]").addEventListener("click", () => {
    elements.collectionPanel.hidden = true;
  });
}

function getMissionProgress(mission) {
  if (mission.type === "count") {
    return state.discovered.size;
  }

  const discoveredCreatures = creatures.filter((creature) => state.discovered.has(creature.id));
  if (mission.type === "tag") {
    return discoveredCreatures.filter((creature) => creature.tags.includes(mission.target)).length;
  }

  if (mission.type === "depth") {
    return discoveredCreatures.filter((creature) => creature.depth >= mission.target).length;
  }

  return 0;
}

function checkMissions() {
  missions.forEach((mission) => {
    const progress = getMissionProgress(mission);
    if (progress >= mission.requiredCount && !state.completed.has(mission.id)) {
  state.completed.add(mission.id);
      showToast(`Task complete! Reward: ${mission.reward}`);
    }
  });
  saveProgress();
  if (!elements.missionPanel.hidden) {
    renderMissions();
  }
  renderMiniMissions();
}

function renderMiniMissions() {
  elements.miniMissionList.innerHTML = `
    <p class="mission-note">Bonus challenges, separate from crew progress</p>
    ${missions
    .map((mission) => {
      const progress = Math.min(getMissionProgress(mission), mission.requiredCount);
      const done = state.completed.has(mission.id);
      return `
        <div class="mini-mission">
          <span>${done ? "Done" : mission.title}</span>
          <b>${progress}/${mission.requiredCount}</b>
          <meter min="0" max="${mission.requiredCount}" value="${progress}"></meter>
        </div>
      `;
    })
    .join("")}
  `;
}

function renderChapterProgress() {
  const chapter = getCurrentChapter();
  if (!chapter) {
    elements.chapterTitle.textContent = "Free Explore";
    elements.chapterProgress.innerHTML = `
      All crew badges earned
      <div class="chapter-dots">${chapters.map((item) => `<span class="${state.badges.has(item.id) ? "done" : ""}"></span>`).join("")}</div>
    `;
    return;
  }

  const progress = getChapterProgress(chapter);
  const dots = chapter.creatureIds
    .map((id) => `<span class="${state.discovered.has(id) ? "done" : ""}"></span>`)
    .join("");

  if (state.badges.has(chapter.id)) {
    elements.chapterTitle.textContent = chapter.name;
    elements.chapterProgress.innerHTML = `
      Earned: ${chapter.badge}
      <div class="chapter-dots">${dots}</div>
    `;
    return;
  }

  elements.chapterTitle.textContent = chapter.name;
  elements.chapterProgress.innerHTML = `
    Crew friends found ${progress.found.length}/${progress.total}
    <div class="chapter-dots">${dots}</div>
  `;
}

function renderStickerShelf() {
  const stickers = [...state.stickers]
    .slice(-8)
    .map((id) => creatures.find((creature) => creature.id === id))
    .filter(Boolean);

  elements.stickerShelf.innerHTML = `
    <div class="sticker-row">
      ${
        stickers.length
          ? stickers.map((creature) => `<span class="sticker" title="${creature.name}">${getStickerMarkup(creature)}</span>`).join("")
          : "<span>No stickers yet. Find your first friend.</span>"
      }
    </div>
  `;
}

function getCurrentPaint() {
  return paintJobs.find((paint) => paint.id === state.paint) || paintJobs[0];
}

function applyPaint() {
  const paint = getCurrentPaint();
  document.documentElement.style.setProperty("--sub-top", paint.top);
  document.documentElement.style.setProperty("--sub-bottom", paint.bottom);
  elements.paintName.textContent = paint.name;
}

function unlockPaintIfReady() {
  const newlyAvailable = paintJobs.find((paint) => isPaintUnlocked(paint) && paint.need === state.discovered.size && paint.id !== state.paint);
  if (newlyAvailable) {
    showToast(`Sub paint unlocked: ${newlyAvailable.name}`);
  }
}

function isPaintUnlocked(paint) {
  return state.discovered.size >= paint.need || (paint.chapter && state.badges.has(paint.chapter));
}

function renderPaintPanel() {
  closePanels(elements.paintPanel);
  elements.paintPanel.hidden = false;
  elements.paintPanel.innerHTML = `
    <h2>Sub Paint</h2>
    <p>Discover more friends to unlock new sub colors.</p>
    <div class="card-grid">
      ${paintJobs
        .map((paint) => {
          const unlocked = isPaintUnlocked(paint);
          return `
            <article class="book-card ${unlocked ? "" : "locked"}">
              <strong>${paint.name}</strong>
              <p>${unlocked ? "Unlocked" : paint.chapter ? "Complete the Blue Zone Crew" : `Discover ${paint.need} friends`}</p>
              <button type="button" data-paint="${paint.id}" ${unlocked ? "" : "disabled"}>${state.paint === paint.id ? "Active" : "Use"}</button>
            </article>
          `;
        })
        .join("")}
    </div>
    <div class="panel-actions"><button type="button" data-close>Close</button></div>
  `;
  elements.paintPanel.querySelectorAll("[data-paint]").forEach((button) => {
    button.addEventListener("click", () => {
      state.paint = button.dataset.paint;
      saveProgress();
      applyPaint();
      renderPaintPanel();
    });
  });
  elements.paintPanel.querySelector("[data-close]").addEventListener("click", () => {
    elements.paintPanel.hidden = true;
  });
}

function renderMissions() {
  closePanels(elements.missionPanel);
  elements.missionPanel.hidden = false;
  elements.missionPanel.innerHTML = `
    <h2>Bonus Challenges</h2>
    <p>These challenges add extra stickers and badges without changing the current crew path.</p>
    ${missions
      .map((mission) => {
        const progress = Math.min(getMissionProgress(mission), mission.requiredCount);
        const done = state.completed.has(mission.id);
        return `
          <article class="mission-card ${done ? "done" : ""}">
            <strong>${done ? "Done" : "In progress"}: ${mission.title}</strong>
            <p>${progress} / ${mission.requiredCount}</p>
            <p>Reward: ${mission.reward}</p>
          </article>
        `;
      })
      .join("")}
    <div class="panel-actions"><button type="button" data-close>Close</button></div>
  `;
  elements.missionPanel.querySelector("[data-close]").addEventListener("click", () => {
    elements.missionPanel.hidden = true;
  });
}

function renderLab() {
  closePanels(elements.labPanel);
  elements.labPanel.hidden = false;
  elements.labPanel.innerHTML = `
    <h2>Where Does Light Go?</h2>
    <p>Drag the depth slider to see how colors fade underwater.</p>
    <div class="lab-control">
      <input id="lightDepth" type="range" min="0" max="1000" value="0" step="10" />
      <p><strong id="lightDepthText">0 m</strong></p>
    </div>
    <div class="light-row"><span>Red</span><div class="light-bar" data-color="red" style="--light-color:#ff5555; --light-opacity:1"></div></div>
    <div class="light-row"><span>Orange</span><div class="light-bar" data-color="orange" style="--light-color:#ffa73d; --light-opacity:1"></div></div>
    <div class="light-row"><span>Yellow</span><div class="light-bar" data-color="yellow" style="--light-color:#ffe24a; --light-opacity:1"></div></div>
    <div class="light-row"><span>Green</span><div class="light-bar" data-color="green" style="--light-color:#59e68b; --light-opacity:1"></div></div>
    <div class="light-row"><span>Blue</span><div class="light-bar" data-color="blue" style="--light-color:#57b7ff; --light-opacity:1"></div></div>
    <p>Seawater gradually absorbs colors from sunlight, so deeper water becomes darker and bluer.</p>
    <div class="panel-actions"><button type="button" data-close>Close</button></div>
  `;
  const slider = document.getElementById("lightDepth");
  slider.addEventListener("input", updateLightExperiment);
  elements.labPanel.querySelector("[data-close]").addEventListener("click", () => {
    elements.labPanel.hidden = true;
  });
  updateLightExperiment();
}

function updateLightExperiment() {
  const depth = Number(document.getElementById("lightDepth").value);
  document.getElementById("lightDepthText").textContent = `${depth} m`;
  const limits = { red: 60, orange: 120, yellow: 220, green: 430, blue: 850 };
  Object.entries(limits).forEach(([color, limit]) => {
    const opacity = Math.max(0.08, 1 - depth / limit);
    document.querySelector(`[data-color="${color}"]`).style.setProperty("--light-opacity", opacity.toFixed(2));
  });
}

function closePanels(exceptPanel) {
  [elements.collectionPanel, elements.missionPanel, elements.labPanel, elements.paintPanel].forEach((panel) => {
    if (panel !== exceptPanel) {
      panel.hidden = true;
    }
  });
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function bindEvents() {
  window.addEventListener("scroll", updateScene, { passive: true });
  window.addEventListener("resize", updateScene);
  window.addEventListener("keydown", handlePilotKeyDown);
  window.addEventListener("keyup", handlePilotKeyUp);
  elements.submarine.addEventListener("pointerdown", startPilotDrag);
  elements.pilotPrompt.addEventListener("pointerdown", (event) => event.stopPropagation());
  window.addEventListener("pointermove", dragPilot);
  window.addEventListener("pointerup", stopPilotDrag);
  window.addEventListener("pointercancel", stopPilotDrag);
  elements.collectionButton.addEventListener("click", renderCollection);
  elements.missionButton.addEventListener("click", renderMissions);
  elements.labButton.addEventListener("click", renderLab);
  elements.paintButton.addEventListener("click", renderPaintPanel);
  elements.resetGuideButton.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  });
  elements.nextButton.addEventListener("click", () => {
    const next = getNextCreature();
    if (isPilotNearCreature(next)) {
      handlePilotAction();
      return;
    }
    const targetDepth = state.discovered.size === creatures.length ? 0 : next.depth;
    scrollToDepth(targetDepth);
  });
  elements.scanButton.addEventListener("click", handleScanButton);
  elements.v2ScanButton.addEventListener("click", handleScanButton);
  elements.v2DiveButton.addEventListener("click", () => {
    const next = getNextCreature();
    scrollToDepth(next.depth);
  });
  elements.pilotActionButton.addEventListener("click", handlePilotAction);
  elements.diveButton.addEventListener("click", () => scrollToDepth(Math.min(maxDepth, state.depth + 260)));
  elements.riseButton.addEventListener("click", () => scrollToDepth(Math.max(0, state.depth - 260)));
  elements.lightButton.addEventListener("click", () => {
    toggleLight();
  });
  installLocalDebugTools();
}

function handleScanButton() {
  const next = getNextCreature();
  if (getChapterLesson(next)?.needsLight && isPilotNearCreature(next) && !state.lightOn) {
    toggleLight();
    return;
  }
  if (Math.abs(next.depth - state.depth) > 260) {
    showToast("The signal is weak. Move a little closer.");
    return;
  }
  scanCreature(next);
}

function toggleLight() {
  if (!state.lightOn && pilot.energy < getLightMinEnergy()) {
    showToast("Energy is low. Let the sub recharge for a moment.");
    return false;
  }
  state.lightOn = !state.lightOn;
  updateLightButton();
  saveProgress();
  updateScene();
  return true;
}

function handlePilotKeyDown(event) {
  if (event.target && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
  const key = event.key.toLowerCase();
  if (handleDebugKey(key, event)) return;
  const allowed = ["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s"];
  if (!allowed.includes(key)) return;
  event.preventDefault();
  pilot.keys.add(key);
  pilot.active = true;
}

function handlePilotKeyUp(event) {
  pilot.keys.delete(event.key.toLowerCase());
}

function startPilotDrag(event) {
  event.preventDefault();
  pilot.dragging = true;
  pilot.active = true;
  pilot.dragStartX = event.clientX;
  pilot.dragStartY = event.clientY;
  pilot.startX = pilot.x;
  pilot.startY = pilot.y;
  elements.submarine.setPointerCapture?.(event.pointerId);
  elements.submarine.classList.add("piloting");
}

function dragPilot(event) {
  if (!pilot.dragging) return;
  event.preventDefault();
  const bounds = getPilotBounds();
  pilot.x = clamp(pilot.startX + event.clientX - pilot.dragStartX, -bounds.x, bounds.x);
  pilot.y = clamp(pilot.startY + event.clientY - pilot.dragStartY, -bounds.y, bounds.y);
  pilot.vx = event.movementX || 0;
  pilot.vy = event.movementY || 0;
  updatePilotTransform();
  updatePilotFeedback();
}

function stopPilotDrag() {
  pilot.dragging = false;
  elements.submarine.classList.remove("piloting");
}

function animatePilot(now = performance.now()) {
  const delta = pilot.lastFrameAt ? Math.min(0.05, (now - pilot.lastFrameAt) / 1000) : 0;
  pilot.lastFrameAt = now;
  const speed = Math.min(1.7, Math.max(0.9, window.innerWidth / 900));
  const left = pilot.keys.has("arrowleft") || pilot.keys.has("a");
  const right = pilot.keys.has("arrowright") || pilot.keys.has("d");
  const up = pilot.keys.has("arrowup") || pilot.keys.has("w");
  const down = pilot.keys.has("arrowdown") || pilot.keys.has("s");

  if (!pilot.dragging) {
    pilot.vx += (Number(right) - Number(left)) * speed;
    pilot.vy += (Number(down) - Number(up)) * speed;
    pilot.vx *= 0.88;
    pilot.vy *= 0.88;
    const bounds = getPilotBounds();
    pilot.x = clamp(pilot.x + pilot.vx, -bounds.x, bounds.x);
    pilot.y = clamp(pilot.y + pilot.vy, -bounds.y, bounds.y);
  }

  const driving = pilot.dragging || left || right || up || down || Math.abs(pilot.vx) + Math.abs(pilot.vy) > 0.7;
  updateEnergy(delta, driving);
  elements.submarine.classList.toggle("piloting", driving);
  updatePilotTransform();
  if (driving) {
    updatePilotFeedback();
  }
  window.requestAnimationFrame(animatePilot);
}

function updatePilotTransform() {
  pilot.tilt = clamp(pilot.vx * 1.8, -11, 11);
  elements.submarine.style.setProperty("--pilot-x", `${pilot.x.toFixed(1)}px`);
  elements.submarine.style.setProperty("--pilot-y", `${pilot.y.toFixed(1)}px`);
  elements.submarine.style.setProperty("--pilot-tilt", `${pilot.tilt.toFixed(1)}deg`);
  elements.ocean.style.setProperty("--pilot-x", `${pilot.x.toFixed(1)}px`);
  elements.ocean.style.setProperty("--pilot-y", `${pilot.y.toFixed(1)}px`);
}

function updatePilotFeedback() {
  const target = getNextCreature();
  const targetPoint = getCreatureScreenPoint(target);
  const subPoint = getSubmarineScreenPoint();
  const isNear = target && isPilotNearCreature(target);
  const hasTarget = target && state.discovered.size < creatures.length;

  creatures.forEach((creature) => {
    const node = document.getElementById(`creature-${creature.id}`);
    if (!node) return;
    node.classList.toggle("in-range", target && target.id === creature.id && isPilotNearCreature(creature));
  });

  elements.targetArrow.hidden = true;

  if (hasTarget && isNear) {
    const scanned = state.scanned.has(target.id) || state.discovered.has(target.id);
    const lesson = getChapterLesson(target);
    elements.pilotPrompt.hidden = false;
    if (lesson?.needsLight && !state.lightOn && !scanned) {
      elements.pilotPromptText.textContent = "Turn on searchlight";
      elements.pilotActionButton.textContent = "Turn on";
      elements.pilotActionButton.disabled = pilot.energy < getLightMinEnergy();
    } else {
      elements.pilotPromptText.textContent = scanned ? `Observe ${target.name}` : `Scan ${target.name}`;
      elements.pilotActionButton.textContent = scanned ? "Observe" : "Scan";
      elements.pilotActionButton.disabled = !scanned && !canUseSonar();
    }
  } else {
    elements.pilotPrompt.hidden = true;
  }

  renderNextTarget();
}

function handlePilotAction() {
  const target = getNextCreature();
  if (!target || !isPilotNearCreature(target)) return;
  if (getChapterLesson(target)?.needsLight && !state.lightOn && !state.scanned.has(target.id)) {
    toggleLight();
    return;
  }
  if (state.scanned.has(target.id) || state.discovered.has(target.id)) {
    discoverCreature(target.id);
    return;
  }
  scanCreature(target);
}

function getPilotBounds() {
  const rect = elements.submarine.getBoundingClientRect();
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.54;
  const padding = Math.max(12, Math.min(window.innerWidth, window.innerHeight) * 0.03);
  const xLimit = Math.min(centerX - halfWidth - padding, window.innerWidth - centerX - halfWidth - padding);
  const yLimit = Math.min(centerY - halfHeight - padding, window.innerHeight - centerY - halfHeight - padding);
  return {
    x: Math.max(58, xLimit),
    y: Math.max(58, yLimit)
  };
}

function isPilotNearCreature(creature) {
  if (!creature || Math.abs(state.depth - creature.depth) > getPilotDepthRange(creature)) return false;
  const sub = getSubmarineScreenPoint();
  const target = getCreatureScreenPoint(creature);
  if (!target) return false;
  return Math.hypot(sub.x - target.x, sub.y - target.y) < getPilotNearRange(creature);
}

function getPilotDepthRange(creature) {
  return getChapterLesson(creature) ? 42 : 80;
}

function getPilotNearRange(creature) {
  const lesson = getChapterLesson(creature);
  if (lesson) return Math.max(155, creature.size * 1.65);
  return Math.max(130, creature.size * 1.42);
}

function getSubmarineScreenPoint() {
  const rect = elements.submarine.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function getCreatureScreenPoint(creature) {
  if (!creature) return null;
  const node = document.getElementById(`creature-${creature.id}`);
  if (node) {
    const rect = node.getBoundingClientRect();
    if (rect.width || rect.height) {
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
  }
  return {
    x: (creature.x / 100) * window.innerWidth,
    y: (creature.y / 100) * window.innerHeight
  };
}

function pulseSonar() {
  elements.ocean.classList.remove("sonar-pulsing");
  void elements.ocean.offsetWidth;
  elements.ocean.classList.add("sonar-pulsing");
  window.setTimeout(() => elements.ocean.classList.remove("sonar-pulsing"), 900);
}

function updateEnergy(delta, driving) {
  let drain = 0;
  const training = isChapterTrainingActive();
  if (driving) drain += training ? 1.4 : 3.2;
  if (state.lightOn) drain += training ? 2.2 : 5.4;

  if (drain) {
    pilot.energy = Math.max(0, pilot.energy - drain * delta);
  } else {
    pilot.energy = Math.min(100, pilot.energy + (training ? 14 : 8.5) * delta);
  }

  if (state.lightOn && pilot.energy <= 1) {
    state.lightOn = false;
    updateLightButton();
    saveProgress();
    showToast("Energy is empty. The searchlight needs a rest.");
  }

  updateAbilityUi();
}

function canUseSonar() {
  return pilot.energy >= getSonarCost() && performance.now() >= pilot.sonarReadyAt;
}

function tryUseSonar() {
  const now = performance.now();
  const cost = getSonarCost();
  if (pilot.energy < cost) {
    showToast("Sonar needs energy. Let the sub recharge first.");
    return false;
  }
  if (now < pilot.sonarReadyAt) {
    showToast("Sonar is recharging.");
    return false;
  }
  pilot.energy = Math.max(0, pilot.energy - cost);
  pilot.sonarReadyAt = now + (isChapterTrainingActive() ? 1100 : 2000);
  updateAbilityUi();
  return true;
}

function getSonarCost() {
  return isChapterTrainingActive() ? 8 : 18;
}

function getLightMinEnergy() {
  return isChapterTrainingActive() ? 4 : 10;
}

function isChapterTrainingActive() {
  return Boolean(getChapterLesson(getNextCreature()));
}

function updateAbilityUi() {
  const energy = Math.round(pilot.energy);
  elements.energyMeter.value = energy;
  elements.energyText.textContent = `${energy}%`;

  const target = getNextCreature();
  const distance = target ? Math.abs(target.depth - state.depth) : Infinity;
  const outOfRange = distance > 260 || state.discovered.size === creatures.length;
  const cooldownLeft = Math.max(0, pilot.sonarReadyAt - performance.now());
  const sonarReady = canUseSonar();
  const lightLesson = getChapterLesson(target)?.needsLight && isPilotNearCreature(target) && !state.lightOn;
  const scanDisabled = lightLesson ? pilot.energy < getLightMinEnergy() : outOfRange || !sonarReady;
  const label = lightLesson ? "Turn on" : cooldownLeft > 0 ? "Charging" : pilot.energy < getSonarCost() ? "Low energy" : "Scan";

  elements.scanButton.disabled = scanDisabled;
  elements.v2ScanButton.disabled = scanDisabled;
  elements.scanButton.textContent = label;
  elements.v2ScanButton.textContent = label;
  elements.lightButton.classList.toggle("active", state.lightOn);
}

function installLocalDebugTools() {
  if (!isLocalDebugHost()) return;
  window.__deepSeaDebug = {
    reset() {
      localStorage.removeItem(storageKey);
      window.location.reload();
    },
    jumpTo(id) {
      jumpToCreatureForQa(id);
    },
    snapshot() {
      return {
        depth: state.depth,
        target: getNextCreature()?.id,
        discovered: [...state.discovered],
        scanned: [...state.scanned],
        badge: state.badges.has(firstChapter.id),
        energy: Math.round(pilot.energy),
        lightOn: state.lightOn,
        prompt: elements.pilotPrompt.hidden ? "" : elements.pilotPromptText.textContent,
        goal: elements.v2GoalName.textContent,
        hint: elements.v2GoalHint.textContent,
        stage: elements.v2ChapterLabel.textContent
      };
    }
  };
}

function handleDebugKey(key, event) {
  if (!isLocalDebugHost() || !event.altKey) return false;
  const targetByKey = { "1": "jellyfish", "2": "turtle", "3": "octopus" };
  if (key === "r") {
    event.preventDefault();
    localStorage.removeItem(storageKey);
    window.location.reload();
    return true;
  }
  if (targetByKey[key]) {
    event.preventDefault();
    jumpToCreatureForQa(targetByKey[key]);
    return true;
  }
  return false;
}

function jumpToCreatureForQa(id) {
  const creature = creatures.find((item) => item.id === id);
  if (!creature) return;
  scrollToDepth(creature.depth);
  const targetX = (creature.x / 100) * window.innerWidth;
  const targetY = (creature.y / 100) * window.innerHeight;
  pilot.x = clamp(targetX - window.innerWidth / 2, -getPilotBounds().x, getPilotBounds().x);
  pilot.y = clamp(targetY - window.innerHeight * 0.54, -getPilotBounds().y, getPilotBounds().y);
  pilot.vx = 0;
  pilot.vy = 0;
  updatePilotTransform();
  updatePilotFeedback();
}

function isLocalDebugHost() {
  return ["127.0.0.1", "localhost"].includes(window.location.hostname);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function scrollToDepth(depth) {
  const target = Math.max(0, Math.min(maxDepth, depth));
  window.scrollTo({
    top: (target / maxDepth) * scrollRange,
    behavior: "smooth"
  });
}

function updateLightButton() {
  elements.lightButton.querySelector("strong").textContent = state.lightOn ? "Turn off" : "Turn on";
}

function init() {
  loadProgress();
  elements.submarine.querySelectorAll("img").forEach((image) => {
    image.draggable = false;
  });
  updateLightButton();
  applyPaint();
  renderCreatures();
  bindEvents();
  updateScene();
  animatePilot();

  if (state.discovered.size === 0) {
    window.setTimeout(() => showToast("Ready? Slide down and see who lives below the sea!"), 600);
  }
}

init();
