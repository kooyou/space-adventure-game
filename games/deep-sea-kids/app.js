const maxDepth = 5000;
const scrollRange = 5600;
const storageKey = "deep-sea-kids-progress";

const zones = [
  {
    id: "sunlight",
    name: "阳光海",
    minDepth: 0,
    maxDepth: 100,
    top: "#6ed6ff",
    bottom: "#1fa9d6",
    description: "这里有很多阳光，海草和珊瑚喜欢这里。"
  },
  {
    id: "blue",
    name: "蓝色海",
    minDepth: 100,
    maxDepth: 300,
    top: "#1fa9d6",
    bottom: "#1671aa",
    description: "光越来越少，海水变得安静了。"
  },
  {
    id: "twilight",
    name: "暮光区",
    minDepth: 300,
    maxDepth: 1000,
    top: "#1671aa",
    bottom: "#123a70",
    description: "这里像傍晚一样暗，有些动物会自己发光。"
  },
  {
    id: "midnight",
    name: "午夜区",
    minDepth: 1000,
    maxDepth: 3000,
    top: "#123a70",
    bottom: "#06162f",
    description: "这里几乎没有阳光，潜艇灯很重要。"
  },
  {
    id: "abyss",
    name: "海底奇境",
    minDepth: 3000,
    maxDepth: 5000,
    top: "#06162f",
    bottom: "#020714",
    description: "海底也有生命，有些动物住在热热的喷口旁。"
  }
];

const creatures = [
  {
    id: "clownfish",
    name: "小丑鱼",
    depth: 8,
    x: 30,
    y: 48,
    size: 74,
    color: "#ff8b2f",
    className: "fish",
    shortFact: "我喜欢住在海葵旁边，那里像我的小房子。",
    fullFact: "小丑鱼常和海葵生活在一起。海葵能保护它，小丑鱼也会帮海葵赶走小麻烦。",
    ability: "和海葵共生",
    food: "小型浮游生物",
    question: "你觉得住在会保护自己的房子里是什么感觉？",
    tags: ["浅海", "不是发光"]
  },
  {
    id: "turtle",
    name: "海龟",
    depth: 25,
    x: 70,
    y: 58,
    size: 96,
    color: "#48b86f",
    className: "turtle",
    shortFact: "我游得很远，但会记得回家的路。",
    fullFact: "许多海龟会长距离旅行，成年后还会回到出生地附近的海滩产卵。",
    ability: "长途旅行",
    food: "海草、水母和小动物",
    question: "如果你是一只海龟，会怎样记住回家的路？",
    tags: ["浅海", "不是鱼"]
  },
  {
    id: "jellyfish",
    name: "水母",
    depth: 60,
    x: 47,
    y: 42,
    size: 82,
    color: "#b9f2ff",
    className: "jelly glow",
    shortFact: "我的身体像透明的小伞，有些伙伴还会发光。",
    fullFact: "水母的身体大多由水组成。很多水母会漂在海里，有些种类能发出柔柔的光。",
    ability: "透明身体",
    food: "浮游生物和小鱼",
    question: "透明的身体在海里有什么好处？",
    tags: ["发光", "不是鱼", "浅海"]
  },
  {
    id: "octopus",
    name: "章鱼",
    depth: 90,
    x: 18,
    y: 62,
    size: 86,
    color: "#d85d8f",
    className: "octopus",
    shortFact: "我会变颜色，还会喷墨保护自己。",
    fullFact: "章鱼很聪明，它能改变身体颜色，也会喷出墨汁迷惑敌人。",
    ability: "变色和喷墨",
    food: "螃蟹、小鱼和贝类",
    question: "如果你会变色，想变成什么颜色？",
    tags: ["不是鱼", "会变色", "浅海"]
  },
  {
    id: "dolphin",
    name: "海豚",
    depth: 120,
    x: 62,
    y: 46,
    size: 108,
    color: "#86d6f7",
    className: "fish",
    shortFact: "我会用声音和伙伴打招呼。",
    fullFact: "海豚会发出声音来交流，也能用回声了解周围有什么东西。",
    ability: "声音交流",
    food: "小鱼和乌贼",
    question: "如果声音能帮你看路，你会听见什么？",
    tags: ["不是鱼", "声音", "蓝色海"]
  },
  {
    id: "shark",
    name: "鲨鱼",
    depth: 220,
    x: 78,
    y: 58,
    size: 118,
    color: "#7892a8",
    className: "fish",
    shortFact: "我的鼻子很灵，可以闻到很远的味道。",
    fullFact: "鲨鱼拥有灵敏的嗅觉和感知能力，是海洋里重要的捕食者。",
    ability: "灵敏嗅觉",
    food: "鱼类和其他海洋动物",
    question: "为什么捕食者也对海洋生态很重要？",
    tags: ["鱼", "捕食者", "蓝色海"]
  },
  {
    id: "lanternfish",
    name: "灯笼鱼",
    depth: 450,
    x: 34,
    y: 42,
    size: 72,
    color: "#63f0ca",
    className: "fish glow",
    shortFact: "我的身体有小光点，像海里的星星。",
    fullFact: "灯笼鱼身体上有发光器。很多灯笼鱼会在夜晚向上游，白天再回到较深的水里。",
    ability: "身体发光",
    food: "小虾和浮游动物",
    question: "在黑暗里，发光可能有什么用？",
    tags: ["发光", "鱼", "暮光区"]
  },
  {
    id: "barreleye",
    name: "桶眼鱼",
    depth: 700,
    x: 68,
    y: 52,
    size: 78,
    color: "#8cf3e7",
    className: "fish glow",
    shortFact: "我的头有点透明，眼睛能看向上方。",
    fullFact: "桶眼鱼有透明的头部，眼睛可以帮助它寻找上方透下来的影子和猎物。",
    ability: "透明头部",
    food: "小型动物",
    question: "为什么在深海里向上看也很重要？",
    tags: ["发光", "鱼", "暮光区"]
  },
  {
    id: "anglerfish",
    name: "鮟鱇鱼",
    depth: 1200,
    x: 25,
    y: 48,
    size: 104,
    color: "#5b4d83",
    className: "fish glow",
    shortFact: "我头上有一盏小灯，能在黑暗里吸引猎物。",
    fullFact: "鮟鱇鱼生活在很深、很暗的海里。它头上的发光器像一盏小灯，可以吸引小鱼靠近。",
    ability: "生物发光",
    food: "小鱼和小虾",
    question: "如果你住在黑黑的地方，会用什么办法找食物？",
    tags: ["发光", "鱼", "深海", "捕食者"]
  },
  {
    id: "sperm-whale",
    name: "抹香鲸",
    depth: 900,
    x: 76,
    y: 42,
    size: 138,
    color: "#6f8da6",
    className: "fish",
    shortFact: "我是深潜冠军之一，会到很深的地方寻找乌贼。",
    fullFact: "抹香鲸能潜到很深的海里寻找食物。它会发出很强的声音，也需要回到海面呼吸。",
    ability: "深潜和回声定位",
    food: "乌贼和鱼",
    question: "为什么会呼吸空气的鲸也能潜那么深？",
    tags: ["不是鱼", "声音", "深潜"]
  },
  {
    id: "giant-squid",
    name: "巨型乌贼",
    depth: 1800,
    x: 72,
    y: 56,
    size: 126,
    color: "#b45b61",
    className: "octopus",
    shortFact: "我有很长很长的触手，住在很深的海里。",
    fullFact: "巨型乌贼生活在深海，眼睛很大，触手很长。科学家曾经很难在自然环境中拍到它。",
    ability: "长触手",
    food: "鱼和其他乌贼",
    question: "在黑暗的海里，大眼睛有什么帮助？",
    tags: ["不是鱼", "深海", "午夜区"]
  },
  {
    id: "isopod",
    name: "巨型等足虫",
    depth: 2600,
    x: 44,
    y: 64,
    size: 88,
    color: "#d7d2c5",
    className: "turtle",
    shortFact: "我像穿着盔甲的深海清洁员。",
    fullFact: "巨型等足虫生活在寒冷的深海，外壳像盔甲，会吃落到海底的食物。",
    ability: "耐饿",
    food: "海底残留食物",
    question: "为什么深海动物需要很会节省能量？",
    tags: ["不是鱼", "深海", "清洁员"]
  },
  {
    id: "deep-shrimp",
    name: "深海虾",
    depth: 3300,
    x: 24,
    y: 58,
    size: 72,
    color: "#ff9f86",
    className: "fish glow",
    shortFact: "我很小，但能在黑暗的深海里找到食物。",
    fullFact: "一些深海虾生活在海底附近，也会出现在热液喷口周围。它们是深海食物网的一部分。",
    ability: "适应黑暗",
    food: "小颗粒和微小生物",
    question: "小动物在深海里为什么也很重要？",
    tags: ["不是鱼", "深海", "热液喷口"]
  },
  {
    id: "yeti-crab",
    name: "雪人蟹",
    depth: 3700,
    x: 72,
    y: 64,
    size: 86,
    color: "#f2eee0",
    className: "turtle",
    shortFact: "我的钳子上像长着毛，能帮助我在喷口旁生活。",
    fullFact: "雪人蟹生活在深海热液环境附近。它毛茸茸的附肢上可能养着细菌，帮助它获得食物。",
    ability: "和细菌合作",
    food: "细菌和小颗粒",
    question: "为什么有些动物会和细菌做朋友？",
    tags: ["不是鱼", "深海", "热液喷口"]
  },
  {
    id: "tubeworm",
    name: "管虫",
    depth: 4200,
    x: 58,
    y: 68,
    size: 92,
    color: "#f5f3e7",
    className: "tubeworm glow",
    shortFact: "我住在热液喷口旁，不需要阳光也能生活。",
    fullFact: "管虫生活在热液喷口附近。那里没有阳光，但有特别的细菌能帮助它们获得能量。",
    ability: "依靠化学能生活",
    food: "和细菌合作获得能量",
    question: "如果没有阳光，生命还能靠什么生活？",
    tags: ["不是鱼", "深海", "热液喷口"]
  },
  {
    id: "probe",
    name: "探测器",
    depth: 4800,
    x: 38,
    y: 52,
    size: 90,
    color: "#ffd34d",
    className: "ventlife glow",
    shortFact: "我是科学家的眼睛，帮大家看看人类很难到达的海底。",
    fullFact: "深海探测器可以带着摄像机、灯光和机械手下潜，帮助科学家观察海底生命和地形。",
    ability: "观察和记录",
    food: "我不用吃东西，需要电力",
    question: "如果你设计探测器，会给它装什么工具？",
    tags: ["科学", "深海", "探测"]
  }
];

const missions = [
  {
    id: "glow-2",
    title: "找到 2 个会发光的动物",
    type: "tag",
    target: "发光",
    requiredCount: 2,
    reward: "发光水母贴纸"
  },
  {
    id: "deep-1",
    title: "发现 1 个住在 1000 米以下的动物",
    type: "depth",
    target: 1000,
    requiredCount: 1,
    reward: "深潜徽章"
  },
  {
    id: "count-5",
    title: "发现 5 个新朋友",
    type: "count",
    target: 5,
    requiredCount: 5,
    reward: "探险家贴纸"
  }
];

const paintJobs = [
  { id: "sun", name: "阳光黄", top: "#ffd34d", bottom: "#f59b1a", need: 0 },
  { id: "coral", name: "珊瑚粉", top: "#ff91b5", bottom: "#e64b86", need: 3 },
  { id: "mint", name: "海草绿", top: "#7ff0b6", bottom: "#21a779", need: 6 },
  { id: "glow", name: "夜光蓝", top: "#7fe8ff", bottom: "#1a68d8", need: 10 },
  { id: "abyss", name: "深海紫", top: "#b792ff", bottom: "#5930a8", need: 14 }
];

const chapters = [
  {
    id: "sunlight-friends",
    name: "阳光海小队",
    badge: "阳光海徽章",
    creatureIds: ["jellyfish", "turtle", "octopus"],
    completeTitle: "潜艇训练完成！",
    completeText: "你已经学会声呐扫描、驾驶靠近和使用探照灯，获得阳光海徽章。现在可以进入更深的海域自由探索啦！"
  },
  {
    id: "blue-team",
    name: "蓝色海小队",
    badge: "蓝色海徽章",
    creatureIds: ["dolphin", "shark", "lanternfish"],
    completeTitle: "蓝色海探索完成！",
    completeText: "你认识了会用声音交流的海豚、敏锐的鲨鱼和发光的灯笼鱼，获得蓝色海徽章。更暗的暮光区正在等你。"
  }
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
          aria-label="${state.scanned.has(creature.id) || state.discovered.has(creature.id) ? `发现${creature.name}` : "神秘信号"}"
        >
          ${getCreatureArt(creature, "scene")}
          <span class="name">${state.scanned.has(creature.id) || state.discovered.has(creature.id) ? creature.name : "神秘信号"}</span>
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

  elements.depthValue.textContent = `${state.depth} 米`;
  elements.v2DepthValue.textContent = `${state.depth} 米`;
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
  if (!chapter || !creature) return "下一个发现";
  const step = chapter.creatureIds.indexOf(creature.id) + 1;
  return `${step}/${chapter.creatureIds.length} ${chapter.name}`;
}

function getChapterLesson(creature) {
  if (!creature) return null;
  const chapter = getCreatureChapter(creature);
  if (!chapter || state.badges.has(chapter.id)) return null;
  const lessons = {
    jellyfish: {
      label: "1/3 声呐扫描",
      done: "声呐训练完成！",
      approachHint: "先到水母深度，试试声呐扫描",
      captain: "第一步学会声呐。下潜到水母附近，扫描神秘信号。"
    },
    turtle: {
      label: "2/3 驾驶靠近",
      done: "驾驶训练完成！",
      approachHint: "驾驶潜艇贴近海龟",
      captain: "这次要亲自驾驶潜艇。靠近海龟后，观察按钮才会出现。",
      requiresNear: true
    },
    octopus: {
      label: "3/3 探照灯观察",
      done: "探照灯训练完成！",
      approachHint: "驾驶潜艇靠近阴影里的章鱼",
      captain: "章鱼躲在阴影里。靠近它，然后打开探照灯看清楚。",
      requiresNear: true,
      needsLight: true
    },
    dolphin: {
      label: "1/3 回声探索",
      done: "回声探索完成！",
      approachHint: "到蓝色海，先用声呐找到海豚",
      captain: "蓝色海小队开始啦。海豚会用声音交流，先用声呐找到它。"
    },
    shark: {
      label: "2/3 稳定靠近",
      done: "靠近训练完成！",
      approachHint: "慢慢驾驶潜艇贴近鲨鱼",
      captain: "鲨鱼很敏锐。慢慢驾驶潜艇靠近它，别只停在远处扫描。",
      requiresNear: true
    },
    lanternfish: {
      label: "3/3 暗处观察",
      done: "暗处观察完成！",
      approachHint: "靠近灯笼鱼，再打开探照灯观察",
      captain: "更深处开始变暗了。靠近灯笼鱼，试试用探照灯观察发光生物。",
      requiresNear: true,
      needsLight: true
    }
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
    showToast(`${creature.name}还不够清楚，先打开探照灯。`);
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
  elements.chapterLabel.textContent = chapterNext ? activeChapter.name : "下一个发现";
  elements.nextName.textContent = state.discovered.size === creatures.length ? "全部发现" : next.name;
  elements.v2GoalName.textContent = state.discovered.size === creatures.length ? "全部发现" : next.name;
  elements.v2ChapterLabel.textContent = lesson ? lesson.label : chapterNext ? getChapterStepLabel(activeChapter, next) : "下一个发现";
  if (state.discovered.size === creatures.length) {
    elements.nextDistance.textContent = "图鉴已经收集完成";
    elements.v2GoalHint.textContent = "图鉴已经收集完成";
    elements.nextButton.textContent = "回到海面";
    elements.scanButton.disabled = true;
    elements.v2ScanButton.disabled = true;
    return;
  }

  if (lesson && !pilotNear && Math.abs(distance) <= 35) {
    elements.nextDistance.textContent = lesson.approachHint;
    elements.v2GoalHint.textContent = lesson.approachHint;
    elements.nextButton.textContent = "定位";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.36");
  } else if (lesson && lesson.needsLight && pilotNear && !state.lightOn) {
    elements.nextDistance.textContent = `${next.name}需要探照灯`;
    elements.v2GoalHint.textContent = "贴近后打开探照灯";
    elements.nextButton.textContent = "开灯";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.42");
  } else if (pilotNear) {
    elements.nextDistance.textContent = state.scanned.has(next.id) ? "贴近目标，点击观察" : "贴近目标，扫描它";
    elements.v2GoalHint.textContent = state.scanned.has(next.id) ? "贴近目标，点击观察" : "贴近目标，扫描它";
    elements.nextButton.textContent = state.scanned.has(next.id) ? "观察" : "扫描";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.62");
  } else if (Math.abs(distance) <= 35) {
    elements.nextDistance.textContent = state.scanned.has(next.id) ? "就在附近，驾驶潜艇靠近" : "信号很强，先扫描";
    elements.v2GoalHint.textContent = state.scanned.has(next.id) ? "驾驶潜艇靠近它" : "信号很强，先扫描";
    elements.nextButton.textContent = "定位";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0.52");
  } else {
    elements.nextDistance.textContent = distance > 0 ? `再下潜 ${distance} 米` : `上浮 ${Math.abs(distance)} 米`;
    elements.v2GoalHint.textContent = distance > 0 ? `再下潜 ${distance} 米` : `上浮 ${Math.abs(distance)} 米`;
    elements.nextButton.textContent = distance > 0 ? "下潜去找" : "上浮去找";
    elements.sonarRing.style.setProperty("--sonar-opacity", "0");
  }
  updateAbilityUi();
}

function updateExperienceMode() {
  elements.app.classList.toggle("full-mode", state.badges.has(firstChapter.id));
}

function getCaptainText(depth) {
  if (!state.guideDone) {
    if (state.guideStep === "dive") return "我们先找一个会发光的朋友。点“下潜去找”就能靠近它。";
    if (state.guideStep === "scan") return "信号变强了！点“扫描”，看看是谁藏在海里。";
    if (state.guideStep === "observe") return "扫描成功！现在点击那个发亮的神秘朋友。";
    if (state.guideStep === "play") return "点“试试看”，让它表演自己的本领。";
    return "最后拍张照片，把它收进你的第一本图鉴。";
  }

  const chapterNext = getNextChapterCreature();
  if (chapterNext) {
    const chapter = getCurrentChapter();
    const progress = getChapterProgress(chapter);
    const lesson = getChapterLesson(chapterNext);
    return lesson ? lesson.captain : `${chapter.name}还差 ${progress.total - progress.found.length} 位朋友。下一位是 ${chapterNext.name}。`;
  }

  if (depth < 80) return "阳光还很亮，先认识浅海的邻居，点击它们会收入图鉴。";
  if (depth < 300) return "海水正在变蓝，声音和气味也能帮动物找到方向。";
  if (depth < 1000) return "这里像傍晚一样暗，留意会发光的小伙伴。";
  if (depth < 3000) return "已经进入深海，打开探照灯会看得更清楚。";
  return "快到海底了，热液喷口旁也有不用阳光生活的生命。";
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
    return { step: "1/5", title: "先靠近第一个朋友", text: "点“下潜去找”，我们去找一只会发光的水母。", target: elements.nextButton };
  }
  if (state.guideStep === "scan") {
    return { step: "2/5", title: "扫描神秘信号", text: "信号已经很强了，点“扫描”看看它的线索。", target: elements.scanButton };
  }
  if (state.guideStep === "observe") {
    const target = document.getElementById("creature-jellyfish");
    return { step: "3/5", title: "点击神秘朋友", text: "它就在附近，点它进入观察小舞台。", target };
  }
  if (state.guideStep === "play") {
    const target = elements.encounterPanel.querySelector("[data-play]");
    return { step: "4/5", title: "让它表演本领", text: "点“试试看”，看看水母会发生什么。", target };
  }
  const target = elements.encounterPanel.querySelector("[data-collect]");
  return { step: "5/5", title: "拍照收进图鉴", text: "拍张照片，你会得到第一张贴纸。", target };
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
  const darkPenalty = state.depth > 1000 && !state.lightOn && !creature.tags.includes("发光") ? 0.16 : 1;
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
    showFoundPop(`发现 ${creature.name}`);
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
    saveProgress();
    window.setTimeout(() => showChapterReward(activeChapter), delay);
  }
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
      <button type="button" data-close-reward>继续下潜</button>
      <button type="button" data-open-book>看看图鉴</button>
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
  showToast(`声呐发现线索：${creature.ability}`);
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
    <h2>${found ? creature.name : "新发现！"}</h2>
    <div class="encounter-stage">
      <div class="encounter-creature" id="encounterStage" aria-hidden="true">
        ${getCreatureArt(creature, "stage")}
        <div class="stage-effect ${stage.effect}"></div>
      </div>
      <div class="stage-copy">
        <p>${creature.shortFact}</p>
        <p class="stage-reveal">${getPlayfulAction(creature)}</p>
        <div class="clue-list">
          <span>住在：约 ${creature.depth} 米</span>
          <span>本领：${creature.ability}</span>
          <span>线索：${creature.tags.slice(0, 2).join(" / ")}</span>
        </div>
      </div>
    </div>
    <div class="panel-actions">
      <button type="button" data-play>试试看</button>
      <button type="button" data-collect>${found ? "查看知识卡" : "拍照收进图鉴"}</button>
      <button type="button" data-close>继续观察</button>
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
  if (creature.id === "jellyfish") return "它轻轻亮了一下，像海里的小夜灯。";
  if (creature.id === "octopus") return "它变了个颜色，还偷偷准备喷墨。";
  if (creature.id === "dolphin") return "它发出一圈声音波纹，在和你打招呼。";
  if (creature.id === "anglerfish") return "它头上的小灯晃了晃，好像在钓鱼。";
  if (creature.id === "tubeworm") return "热液喷口冒出白烟，它们轻轻摇晃。";
  if (creature.id === "probe") return "探测灯打开了，正在记录海底秘密。";
  if (creature.tags.includes("发光")) return "它身上的光点闪了起来。";
  if (creature.tags.includes("不是鱼")) return "它靠近潜艇，好奇地看了看你。";
  return "它绕着潜艇游了一圈，像是在说你好。";
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
  if (creature.tags.includes("发光")) return { actor: "jellyfish", effect: "" };
  if (creature.tags.includes("不是鱼")) return { actor: "octopus", effect: "bubble" };
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
  if (creature.tags.includes("发光")) {
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
    <h2>${isFirstFriend ? "第一位深海朋友！" : "获得新贴纸！"}</h2>
    <div class="reward-sticker">${getStickerMarkup(creature)}</div>
    <p>${isFirstFriend ? "太棒了，你完成了第一次真正的深海发现。" : `${creature.name} 已经飞进你的深海图鉴。`}</p>
    <div class="panel-actions">
      <button type="button" data-close-reward>继续探险</button>
      <button type="button" data-open-paints>看看涂装</button>
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
      <button type="button" data-close-fact>${wasNew ? "收进图鉴" : "继续下潜"}</button>
      <button type="button" data-open-book>查看图鉴</button>
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
          <strong>${found ? creature.name : "未发现"}</strong>
          ${
            found
              ? `<p>${creature.fullFact}</p>
                 <p>本领：${creature.ability}</p>
                 <p>小问题：${creature.question}</p>`
              : "<p>继续下潜，找到新的海洋朋友。</p>"
          }
        </article>
      `;
    })
    .join("");

  elements.collectionPanel.innerHTML = `
    <h2>深海图鉴</h2>
    <p>已发现 ${state.discovered.size} / ${creatures.length} 个新朋友。</p>
    <div class="card-grid">${cards}</div>
    <div class="panel-actions"><button type="button" data-close>关闭</button></div>
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
      showToast(`任务完成！获得：${mission.reward}`);
    }
  });
  saveProgress();
  if (!elements.missionPanel.hidden) {
    renderMissions();
  }
  renderMiniMissions();
}

function renderMiniMissions() {
  elements.miniMissionList.innerHTML = missions
    .map((mission) => {
      const progress = Math.min(getMissionProgress(mission), mission.requiredCount);
      const done = state.completed.has(mission.id);
      return `
        <div class="mini-mission">
          <span>${done ? "完成" : mission.title}</span>
          <b>${progress}/${mission.requiredCount}</b>
          <meter min="0" max="${mission.requiredCount}" value="${progress}"></meter>
        </div>
      `;
    })
    .join("");
}

function renderChapterProgress() {
  const chapter = getCurrentChapter();
  if (!chapter) {
    elements.chapterTitle.textContent = "自由探险";
    elements.chapterProgress.innerHTML = `
      已获得全部章节徽章
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
      已获得：${chapter.badge}
      <div class="chapter-dots">${dots}</div>
    `;
    return;
  }

  elements.chapterTitle.textContent = chapter.name;
  elements.chapterProgress.innerHTML = `
    找到小队朋友 ${progress.found.length}/${progress.total}
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
          : "<span>还没有贴纸，去发现第一个朋友吧。</span>"
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
  const newlyAvailable = paintJobs.find((paint) => paint.need === state.discovered.size && paint.id !== state.paint);
  if (newlyAvailable) {
    showToast(`解锁潜艇涂装：${newlyAvailable.name}`);
  }
}

function renderPaintPanel() {
  closePanels(elements.paintPanel);
  elements.paintPanel.hidden = false;
  elements.paintPanel.innerHTML = `
    <h2>潜艇涂装</h2>
    <p>发现更多朋友，就能解锁新的潜艇颜色。</p>
    <div class="card-grid">
      ${paintJobs
        .map((paint) => {
          const unlocked = state.discovered.size >= paint.need;
          return `
            <article class="book-card ${unlocked ? "" : "locked"}">
              <strong>${paint.name}</strong>
              <p>${unlocked ? "已解锁" : `发现 ${paint.need} 个朋友解锁`}</p>
              <button type="button" data-paint="${paint.id}" ${unlocked ? "" : "disabled"}>${state.paint === paint.id ? "使用中" : "使用"}</button>
            </article>
          `;
        })
        .join("")}
    </div>
    <div class="panel-actions"><button type="button" data-close>关闭</button></div>
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
    <h2>今日任务</h2>
    ${missions
      .map((mission) => {
        const progress = Math.min(getMissionProgress(mission), mission.requiredCount);
        const done = state.completed.has(mission.id);
        return `
          <article class="mission-card ${done ? "done" : ""}">
            <strong>${done ? "完成" : "进行中"}：${mission.title}</strong>
            <p>${progress} / ${mission.requiredCount}</p>
            <p>奖励：${mission.reward}</p>
          </article>
        `;
      })
      .join("")}
    <div class="panel-actions"><button type="button" data-close>关闭</button></div>
  `;
  elements.missionPanel.querySelector("[data-close]").addEventListener("click", () => {
    elements.missionPanel.hidden = true;
  });
}

function renderLab() {
  closePanels(elements.labPanel);
  elements.labPanel.hidden = false;
  elements.labPanel.innerHTML = `
    <h2>光线去哪了</h2>
    <p>拖动深度，看看不同颜色的光怎样慢慢变暗。</p>
    <div class="lab-control">
      <input id="lightDepth" type="range" min="0" max="1000" value="0" step="10" />
      <p><strong id="lightDepthText">0 米</strong></p>
    </div>
    <div class="light-row"><span>红</span><div class="light-bar" data-color="red" style="--light-color:#ff5555; --light-opacity:1"></div></div>
    <div class="light-row"><span>橙</span><div class="light-bar" data-color="orange" style="--light-color:#ffa73d; --light-opacity:1"></div></div>
    <div class="light-row"><span>黄</span><div class="light-bar" data-color="yellow" style="--light-color:#ffe24a; --light-opacity:1"></div></div>
    <div class="light-row"><span>绿</span><div class="light-bar" data-color="green" style="--light-color:#59e68b; --light-opacity:1"></div></div>
    <div class="light-row"><span>蓝</span><div class="light-bar" data-color="blue" style="--light-color:#57b7ff; --light-opacity:1"></div></div>
    <p>海水会一点点吸收阳光里的颜色，所以越深的海里越暗，也更偏蓝。</p>
    <div class="panel-actions"><button type="button" data-close>关闭</button></div>
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
  document.getElementById("lightDepthText").textContent = `${depth} 米`;
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
    showToast("信号还太弱，再靠近一点。");
    return;
  }
  scanCreature(next);
}

function toggleLight() {
  if (!state.lightOn && pilot.energy < getLightMinEnergy()) {
    showToast("能量有点低，先等潜艇恢复一下。");
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
      elements.pilotPromptText.textContent = "打开探照灯";
      elements.pilotActionButton.textContent = "开灯";
      elements.pilotActionButton.disabled = pilot.energy < getLightMinEnergy();
    } else {
      elements.pilotPromptText.textContent = scanned ? `观察 ${target.name}` : `扫描 ${target.name}`;
      elements.pilotActionButton.textContent = scanned ? "观察" : "扫描";
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
    showToast("能量见底，探照灯先休息一下。");
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
    showToast("声呐需要能量，先等潜艇恢复一下。");
    return false;
  }
  if (now < pilot.sonarReadyAt) {
    showToast("声呐正在充能。");
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
  const label = lightLesson ? "开灯" : cooldownLeft > 0 ? "充能中" : pilot.energy < getSonarCost() ? "能量低" : "扫描";

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
  elements.lightButton.querySelector("strong").textContent = state.lightOn ? "关灯" : "开灯";
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
    window.setTimeout(() => showToast("准备好了吗？向下滑，看看海下面住着谁！"), 600);
  }
}

init();
