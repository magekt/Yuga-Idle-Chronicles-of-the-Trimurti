const realms = [
  { name: 'Mortal Body', reqAttr: 0, lifeExp: 30 },
  { name: 'Qi Condensation', reqAttr: 15, lifeExp: 60 },
  { name: 'Foundation Establishment', reqAttr: 40, lifeExp: 120 },
  { name: 'Golden Core', reqAttr: 90, lifeExp: 300 },
  { name: 'Nascent Soul', reqAttr: 180, lifeExp: 800 },
  { name: 'Deity Transformation', reqAttr: 350, lifeExp: 2000 },
  { name: 'Trimurti Immortal', reqAttr: 700, lifeExp: 99999 },
];

const gameState = {
  version: '1.6.0',
  realmIndex: 0,
  ageYears: 18,
  ageDays: 0,
  maxAge: 30,
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  mana: 100,
  maxMana: 100,
  nutrition: 100,
  maxNutrition: 100,
  taels: 300,
  spiritualStones: 5,
  reincarnations: 0,
  yuga: 'Kali Yuga',
  sect: 'None',
  sectRank: 'Outer Disciple',
  sectContribution: 0,
  gameSpeed: 1,
  currentActivity: 'resting',
  currentLocation: 'temple',
  rates: { taels: 0, stones: 0, health: 0, stamina: 0, mana: 0, nutrition: 0 },
  stats: {
    totalTimePlayed: 0,
    monstersDefeated: 0,
    bossesDefeated: 0,
    taelsEarned: 300,
    pillsConsumed: 0,
    maxAttributeLevel: 1,
  },
  attributes: {
    strength: { name: 'Strength', icon: 'fa-dumbbell', value: 1, aptitude: 1.0, xp: 0, maxXp: 100 },
    toughness: { name: 'Toughness', icon: 'fa-shield-heart', value: 1, aptitude: 1.0, xp: 0, maxXp: 100 },
    speed: { name: 'Speed', icon: 'fa-bolt', value: 1, aptitude: 1.0, xp: 0, maxXp: 100 },
    intelligence: { name: 'Intelligence', icon: 'fa-book', value: 1, aptitude: 1.0, xp: 0, maxXp: 100 },
    charisma: { name: 'Charisma', icon: 'fa-comments', value: 1, aptitude: 1.0, xp: 0, maxXp: 100 },
  },
  equipment: { weapon: null, armor: null, talisman: null, mount: null },
  pets: [
    { id: 'fox', name: 'Celestial Fox', level: 1, bonus: '+10% Intelligence Gain', unlocked: false, cost: 50 },
    { id: 'garuda', name: 'Divine Garuda', level: 1, bonus: '+10% Speed & Combat ATK', unlocked: false, cost: 150 },
    { id: 'nandi', name: 'Nandi Bull', level: 1, bonus: '+15% Toughness & Health Max', unlocked: false, cost: 300 },
  ],
  activePet: null,
  achievements: [
    { id: 'first_step', name: 'Aspirant Soul', desc: 'Reach Level 5 in any attribute.', reward: '20 Spiritual Stones', completed: false },
    { id: 'slayer', name: 'Asura Slayer', desc: 'Defeat 10 monsters in combat.', reward: '100 Taels & 10 Stones', completed: false },
    { id: 'ascend', name: 'Qi Condensation', desc: 'Successfully breakthrough to Qi Condensation realm.', reward: '50 Stones & +5 Years Life', completed: false },
  ],
  activities: {
    resting: { name: 'Resting', desc: 'Rest at home to recover Health and Stamina.', icon: 'fa-bed', staminaCost: -5, healthGain: 2, unlocked: true },
    odd_jobs: { name: 'Odd Jobs', desc: 'Perform manual labor in the village for Taels.', icon: 'fa-briefcase', staminaCost: 8, taelsGain: 5, unlocked: true },
    meditation: { name: 'Meditation', desc: 'Meditate under the banyan tree to gain Mana and Intelligence.', icon: 'fa-spa', staminaCost: 4, manaGain: 5, intGain: 1, unlocked: true },
    martial_training: { name: 'Martial Training', desc: 'Practice ancient combat forms to build Strength and Speed.', icon: 'fa-hand-fist', staminaCost: 12, strGain: 1, spdGain: 1, unlocked: true },
    herb_gathering: { name: 'Herb Gathering', desc: 'Search the mystical forest for spiritual herbs and stones.', icon: 'fa-seedling', staminaCost: 10, herbGain: true, unlocked: true },
    sutra_study: { name: 'Sutra Study', desc: 'Study ancient cosmic scrolls for profound Intelligence.', icon: 'fa-scroll', staminaCost: 6, intGain: 2, unlocked: true },
    ritual_offerings: { name: 'Ritual Offerings', desc: 'Perform sacred fire rituals to appease deities and gain Charisma.', icon: 'fa-fire', staminaCost: 10, chaGain: 2, manaGain: 2, unlocked: true },
    stargazing: { name: 'Celestial Stargazing', desc: 'Gaze into the cosmos to absorb stellar Qi and boost Intelligence.', icon: 'fa-star', staminaCost: 14, intGain: 4, manaGain: 8, unlocked: false },
    kundalini: { name: 'Kundalini Awakening', desc: 'Awaken inner serpent energy to massively boost Toughness and Mana.', icon: 'fa-dna', staminaCost: 18, toughGain: 3, manaGain: 12, unlocked: false },
    mantra_chanting: { name: 'Sacred Mantra Chanting', desc: 'Chant Vedic mantras to elevate Charisma and spiritual aura.', icon: 'fa-om', staminaCost: 15, chaGain: 4, unlocked: false },
  },
  inventory: [
    { id: 1, name: 'Rice Sack', type: 'food', desc: 'A modest sack of nourishing white rice.', count: 3, icon: 'fa-bowl-rice', rarity: 'common' },
    { id: 2, name: 'Iron Sword', type: 'weapon', desc: 'A sturdy iron blade (+5 Attack).', count: 1, icon: 'fa-sword', slot: 'weapon', atk: 5, rarity: 'rare' },
    { id: 3, name: 'Ginseng Herb', type: 'herb', desc: 'Spiritual herb used in pill alchemy.', count: 2, icon: 'fa-leaf', rarity: 'common' },
  ],
  combat: { active: false, isBoss: false, monsterName: '', hp: 50, maxHp: 50, attack: 5, defense: 2 },
  logFilter: 'all',
  log: [{ text: 'Your journey to immortality begins as a humble youth leaves home to experience the world.', type: 'cultivation', time: '18y 0d' }],
};

const storeItems = [
  { id: 'pill_longevity', name: 'Longevity Pill', cost: 400, desc: 'Increases maximum lifespan by +10 years.', icon: 'fa-pills', rarity: 'rare' },
  { id: 'sack_rice', name: 'Bag of Rice (x5)', cost: 100, desc: 'Restocks your nutrition reserves.', icon: 'fa-bowl-rice', rarity: 'common' },
  { id: 'sword_steel', name: 'Master Steel Sword', cost: 750, desc: 'Celestial steel weapon (+12 ATK).', icon: 'fa-khanda', rarity: 'epic' },
  { id: 'jade_armor', name: 'Dragon Jade Robe', cost: 900, desc: 'Protective immortal robe (+8 Defense).', icon: 'fa-shield-halved', rarity: 'divine' },
];

const alchemyRecipes = [
  { id: 'longevity_pill', name: 'Longevity Pill', reqHerb: 3, reqStones: 2, desc: 'Refined pill that extends maximum life expectancy by +15 years.' },
  { id: 'qi_pill', name: 'Qi Gathering Pill', reqHerb: 2, reqStones: 1, desc: 'Accelerates attribute cultivation and mana reserves.' },
];

const sectList = [
  { id: 'none', name: 'Independent Wanderer', bonus: 'No restrictions, free spirit.' },
  { id: 'brahma', name: 'Brahma Wisdom Sect', bonus: '+25% Intelligence & Sutra Study gains.' },
  { id: 'shiva', name: 'Shiva Ascetic Order', bonus: '+25% Strength & Martial Training gains.' },
  { id: 'vishnu', name: 'Vishnu Devotional League', bonus: '+25% Stamina regeneration & Charisma gains.' },
];

const sectMissionsList = [
  { id: 'patrol', name: 'Patrol Sect Perimeters', rewardStones: 2, rewardContr: 10, desc: 'Ensure no evil spirits breach sect grounds.' },
  { id: 'gather', name: 'Gather Medicinal Herbs', rewardStones: 3, rewardContr: 15, desc: 'Collect rare herbs for the elder alchemists.' },
  { id: 'meditate', name: 'Guard the Spirit Spring', rewardStones: 5, rewardContr: 25, desc: 'Meditate by the pure spring to absorb divine Qi.' },
];

function init() {
  renderAttributes();
  renderActivities();
  renderInventory();
  renderEquipment();
  renderStore();
  renderAlchemy();
  renderAchievements();
  renderPets();
  renderSect();
  renderLog();
  updateHeader();
  updateNotifications();
  setInterval(gameTick, 1000);
}

document.addEventListener('DOMContentLoaded', init);

function setGameSpeed(multiplier) {
  gameState.gameSpeed = multiplier;
  ['speed-1', 'speed-2', 'speed-5'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'px-2 py-0.5 text-[10px] rounded transition';
    if (Number(id.split('-')[1]) === multiplier) {
      el.classList.add('bg-amber-600', 'text-slate-950', 'font-bold');
    } else {
      el.classList.add('text-slate-300', 'hover:text-white');
    }
  });
}

function componentRateText(value, suffix = 's') {
  const v = Math.abs(value);
  if (value > 0) return `+${v.toFixed(1)}/${suffix}`;
  if (value < 0) return `-${v.toFixed(1)}/${suffix}`;
  return `+0/${suffix}`;
}

function setVitalRates() {
  const activity = gameState.activities[gameState.currentActivity];
  const speed = gameState.gameSpeed || 1;
  const rates = { taels: 0, stones: 0, health: 0, stamina: 0, mana: 0, nutrition: -1 * speed };

  if (activity) {
    if (activity.healthGain) rates.health = activity.healthGain * speed;
    if (activity.taelsGain) rates.taels = activity.taelsGain * speed;
    if (activity.manaGain) rates.mana = activity.manaGain * speed;
    if (activity.staminaCost) rates.stamina = activity.staminaCost * speed;
  }

  if (gameState.currentActivity === 'herb_gathering') rates.stones = 0.5 * speed;
  if (gameState.currentActivity === 'odd_jobs') rates.taels = (gameState.activities.odd_jobs.taelsGain || 5) * speed;
  if (gameState.currentActivity === 'meditation') rates.mana = (gameState.activities.meditation.manaGain || 5) * speed;
  if (gameState.currentActivity === 'resting') rates.health = (gameState.activities.resting.healthGain || 2) * speed;
  if (gameState.currentActivity === 'martial_training') rates.stamina = (gameState.activities.martial_training.staminaCost || 12) * speed;

  gameState.rates = rates;
}

function switchTab(tabName) {
  const navTabs = ['nav-cultivation', 'nav-combat', 'nav-commerce', 'nav-inventory', 'nav-chronicle'];
  navTabs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('active-tab', id === `nav-${tabName}`);
  });

  const sections = ['pane-cultivation', 'pane-activities', 'pane-combat', 'pane-inventory', 'pane-log'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const shouldShow =
      (tabName === 'cultivation' && (id === 'pane-cultivation' || id === 'pane-activities')) ||
      (tabName === 'combat' && (id === 'pane-combat' || id === 'pane-activities')) ||
      (tabName === 'inventory' && id === 'pane-inventory') ||
      (tabName === 'chronicle' && id === 'pane-log');

    el.classList.toggle('hidden', !shouldShow);
    el.classList.toggle('flex', shouldShow);
  });

  if (tabName === 'commerce') {
    openModal('store-modal');
  }
}

function switchMobileTab(tabName) {
  const panes = ['pane-dashboard', 'pane-activities', 'pane-combat', 'pane-inventory', 'pane-log'];
  const btnIds = ['tab-btn-dashboard', 'tab-btn-activities', 'tab-btn-combat', 'tab-btn-inventory', 'tab-btn-log'];
  panes.forEach((paneId, index) => {
    const el = document.getElementById(paneId);
    const btn = document.getElementById(btnIds[index]);
    const matches = paneId.includes(tabName) || (tabName === 'combat' && paneId === 'pane-combat');
    if (matches) {
      el.classList.remove('hidden');
      el.classList.add('flex');
      btn.className = 'flex-1 py-1 px-2 rounded text-center font-bold text-amber-400 bg-amber-950/40 border border-amber-600/40 flex items-center justify-center space-x-1.5';
    } else {
      el.classList.add('hidden');
      el.classList.remove('flex');
      btn.className = 'flex-1 py-1 px-2 rounded text-center font-medium text-slate-400 hover:text-white flex items-center justify-center space-x-1.5';
    }
  });
}

function updateNotifications() {
  const sectBadge = document.getElementById('sect-badge');
  const achievementBadge = document.getElementById('achievements-badge');
  if (sectBadge) sectBadge.classList.toggle('hidden', gameState.sect === 'None');
  if (achievementBadge) achievementBadge.classList.toggle('hidden', !gameState.achievements.some(a => !a.completed));
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function renderAttributes() {
  const container = document.getElementById('attributes-container');
  const mobile = document.getElementById('attributes-container-mobile');
  const render = (target) => {
    if (!target) return;
    target.innerHTML = Object.entries(gameState.attributes).map(([key, attr]) => `
      <div class="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
        <div class="flex justify-between items-center mb-1">
          <div class="flex items-center space-x-2 text-slate-200 text-[11px] font-medium">
            <i class="fa-solid ${attr.icon} text-amber-400"></i>
            <span>${attr.name}</span>
          </div>
          <span class="text-[10px] text-amber-300 font-bold">Lv ${attr.value}</span>
        </div>
        <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-amber-500 to-yellow-300 h-full" style="width:${Math.min((attr.xp / attr.maxXp) * 100, 100)}%"></div>
        </div>
        <div class="mt-1 text-[10px] text-slate-400 flex justify-between"><span>XP</span><span>${Math.round(attr.xp)}/${attr.maxXp}</span></div>
      </div>
    `).join('');
  };
  render(container);
  render(mobile);
}

function renderActivities() {
  const container = document.getElementById('activities-container');
  if (!container) return;
  container.innerHTML = Object.entries(gameState.activities).map(([key, activity]) => {
    const active = gameState.currentActivity === key ? 'bg-amber-950 border-amber-600/60 text-amber-300' : 'bg-slate-900/70 border-slate-700 text-slate-200';
    const disabled = activity.unlocked ? '' : 'opacity-60';
    return `
      <button data-activity="${key}" class="${active} ${disabled} rounded-xl border p-2 text-left transition ${activity.unlocked ? 'hover:border-amber-600/60' : ''}">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center space-x-2"><i class="fa-solid ${activity.icon} text-amber-400"></i><span class="font-bold text-[11px]">${activity.name}</span></div>
          <span class="text-[9px] text-slate-400">${activity.unlocked ? 'Ready' : 'Locked'}</span>
        </div>
        <div class="text-[10px] text-slate-300">${activity.desc}</div>
      </button>
    `;
  }).join('');

  container.querySelectorAll('[data-activity]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-activity');
      const activity = gameState.activities[key];
      if (!activity || !activity.unlocked) return;
      gameState.currentActivity = key;
      renderActivities();
      addLog(`You shifted your focus to ${activity.name}.`, 'cultivation');
    });
  });
}

function renderInventory() {
  const container = document.getElementById('inventory-grid');
  const countEl = document.getElementById('inv-count');
  if (!container) return;
  const items = gameState.inventory;
  container.innerHTML = Array.from({ length: 20 }, (_, index) => {
    const item = items[index];
    if (!item) return '<div class="bg-slate-950/80 border border-slate-800 rounded-md min-h-[36px]"></div>';
    const rarityClass = `rarity-${item.rarity || 'common'}`;
    return `<div class="bg-slate-950/80 border rounded-md min-h-[36px] p-1 flex flex-col items-center justify-center text-[9px] text-slate-200 hover:border-amber-500/60 ${rarityClass}" title="${item.name}\n${item.desc}"><i class="fa-solid ${item.icon}"></i></div>`;
  }).join('');
  if (countEl) countEl.textContent = String(items.length);
}

function renderEquipment() {
  const container = document.getElementById('equipment-slots');
  if (!container) return;
  const slots = ['weapon', 'armor', 'talisman', 'mount'];
  container.innerHTML = slots.map((slot) => {
    const item = gameState.equipment[slot];
    return `
      <div class="bg-slate-950/80 border border-slate-800 rounded-md min-h-[42px] flex items-center justify-center text-[10px] text-slate-400">
        ${item ? `<div class="flex flex-col items-center"><i class="fa-solid ${item.icon}"></i><span>${item.name}</span></div>` : `<span>${slot}</span>`}
      </div>
    `;
  }).join('');
}

function renderStore() {
  const target = document.getElementById('store-items-list');
  if (!target) return;
  target.innerHTML = storeItems.map((item) => `
    <div class="bg-slate-900/80 border rounded-lg p-3 ${item.rarity ? `rarity-${item.rarity}` : 'rarity-common'}">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center"><i class="fa-solid ${item.icon} text-amber-300"></i></div>
          <div>
            <div class="font-bold text-amber-300 text-xs">${item.name}</div>
            <div class="text-[10px] text-slate-400">${item.desc}</div>
          </div>
        </div>
        <button onclick="buyStoreItem('${item.id}')" class="px-2 py-1 bg-amber-600 text-slate-950 font-bold rounded text-[10px]">${item.cost} taels</button>
      </div>
    </div>
  `).join('');
}

function renderAlchemy() {
  const target = document.getElementById('alchemy-recipes-list');
  if (!target) return;
  target.innerHTML = alchemyRecipes.map((recipe) => `
    <div class="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
      <div class="flex justify-between items-center">
        <div>
          <div class="font-bold text-emerald-300 text-xs">${recipe.name}</div>
          <div class="text-[10px] text-slate-400">${recipe.desc}</div>
        </div>
        <button onclick="craftRecipe('${recipe.id}')" class="px-2 py-1 bg-emerald-600 text-white font-bold rounded text-[10px]">Craft</button>
      </div>
      <div class="text-[10px] text-slate-400 mt-2">Needs: ${recipe.reqHerb} herbs, ${recipe.reqStones} stones</div>
    </div>
  `).join('');
}

function renderAchievements() {
  const target = document.getElementById('achievements-list');
  if (!target) return;
  target.innerHTML = gameState.achievements.map((ach) => `
    <div class="bg-slate-900/80 border ${ach.completed ? 'border-emerald-600/60' : 'border-slate-800'} rounded-lg p-2">
      <div class="flex justify-between items-start gap-2">
        <div>
          <div class="font-bold text-amber-300 text-xs">${ach.name}</div>
          <div class="text-[10px] text-slate-400">${ach.desc}</div>
        </div>
        <div class="text-[9px] ${ach.completed ? 'text-emerald-300' : 'text-slate-500'}">${ach.completed ? 'Complete' : 'Pending'}</div>
      </div>
    </div>
  `).join('');
}

function renderPets() {
  const target = document.getElementById('pets-list');
  if (!target) return;
  target.innerHTML = gameState.pets.map((pet) => `
    <div class="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
      <div class="flex justify-between items-center">
        <div>
          <div class="text-amber-300 font-bold text-xs">${pet.name}</div>
          <div class="text-[10px] text-slate-400">${pet.bonus}</div>
        </div>
        <button onclick="summonPet('${pet.id}')" class="px-2 py-1 bg-purple-600 text-white font-bold rounded text-[10px]">${pet.cost} taels</button>
      </div>
    </div>
  `).join('');
}

function renderSect() {
  const target = document.getElementById('sect-content');
  if (!target) return;
  const factions = sectList.map((sect) => `
    <div class="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
      <div class="flex justify-between items-center">
        <div>
          <div class="font-bold text-cyan-300 text-xs">${sect.name}</div>
          <div class="text-[10px] text-slate-400">${sect.bonus}</div>
        </div>
        <button onclick="joinSect('${sect.id}')" class="px-2 py-1 bg-cyan-700 text-white font-bold rounded text-[10px]">Join</button>
      </div>
    </div>
  `).join('');

  const missions = sectMissionsList.map((mission) => `
    <div class="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
      <div class="font-bold text-cyan-300 text-xs">${mission.name}</div>
      <div class="text-[10px] text-slate-400 mt-1">${mission.desc}</div>
      <div class="text-[10px] text-amber-300 mt-2">Reward: ${mission.rewardStones} stones, ${mission.rewardContr} contribution</div>
      <button onclick="acceptMission('${mission.id}')" class="mt-2 px-2 py-1 bg-slate-700 text-white rounded text-[10px] font-bold">Accept</button>
    </div>
  `).join('');

  target.innerHTML = factions + missions;
}

function renderLog() {
  const el = document.getElementById('event-log');
  if (!el) return;
  const logs = gameState.log.filter((entry) => gameState.logFilter === 'all' || entry.type === gameState.logFilter);
  el.innerHTML = logs.slice(-20).map((log) => `<div class="text-[11px] ${log.type === 'combat' ? 'text-red-300' : log.type === 'cultivation' ? 'text-amber-300' : 'text-slate-300'}">${log.text}</div>`).join('');
}

function addLog(text, type = 'cultivation') {
  gameState.log.push({ text, type, time: `${gameState.ageYears}y ${gameState.ageDays}d` });
  if (gameState.log.length > 80) gameState.log.shift();
  renderLog();
}

function updateHeader() {
  setVitalRates();
  const realm = realms[gameState.realmIndex];
  const healthPct = (gameState.health / gameState.maxHealth) * 100;
  const staminaPct = (gameState.stamina / gameState.maxStamina) * 100;
  const manaPct = (gameState.mana / gameState.maxMana) * 100;
  const nutritionPct = (gameState.nutrition / gameState.maxNutrition) * 100;

  document.getElementById('header-realm').textContent = realm.name;
  document.getElementById('header-yuga').textContent = gameState.yuga;
  document.getElementById('header-age').textContent = `${gameState.ageYears}y ${gameState.ageDays}d`;
  document.getElementById('header-expectancy').textContent = `Exp: ${gameState.maxAge}y`;
  document.getElementById('header-taels').textContent = gameState.taels;
  document.getElementById('header-stones').textContent = gameState.spiritualStones;
  document.getElementById('header-reincarnations').textContent = gameState.reincarnations;
  document.getElementById('header-taels-rate').textContent = componentRateText(gameState.rates.taels);
  document.getElementById('header-stones-rate').textContent = componentRateText(gameState.rates.stones);

  const healthText = document.getElementById('stat-health-val');
  const staminaText = document.getElementById('stat-stamina-val');
  const manaText = document.getElementById('stat-mana-val');
  const nutritionText = document.getElementById('stat-nutrition-val');
  if (healthText) healthText.textContent = `${Math.round(gameState.health)} / ${gameState.maxHealth}`;
  if (staminaText) staminaText.textContent = `${Math.round(gameState.stamina)} / ${gameState.maxStamina}`;
  if (manaText) manaText.textContent = `${Math.round(gameState.mana)} / ${gameState.maxMana}`;
  if (nutritionText) nutritionText.textContent = `${Math.round(gameState.nutrition)} / ${gameState.maxNutrition}`;

  const barHealth = document.getElementById('bar-health');
  const barStamina = document.getElementById('bar-stamina');
  const barMana = document.getElementById('bar-mana');
  const barNutrition = document.getElementById('bar-nutrition');
  if (barHealth) barHealth.style.width = `${Math.max(0, Math.min(100, healthPct))}%`;
  if (barStamina) barStamina.style.width = `${Math.max(0, Math.min(100, staminaPct))}%`;
  if (barMana) barMana.style.width = `${Math.max(0, Math.min(100, manaPct))}%`;
  if (barNutrition) barNutrition.style.width = `${Math.max(0, Math.min(100, nutritionPct))}%`;

  const mobileH = document.getElementById('bar-health-mobile');
  const mobileS = document.getElementById('bar-stamina-mobile');
  const mobileM = document.getElementById('bar-mana-mobile');
  const mobileN = document.getElementById('bar-nutrition-mobile');
  if (mobileH) mobileH.style.width = `${Math.max(0, Math.min(100, healthPct))}%`;
  if (mobileS) mobileS.style.width = `${Math.max(0, Math.min(100, staminaPct))}%`;
  if (mobileM) mobileM.style.width = `${Math.max(0, Math.min(100, manaPct))}%`;
  if (mobileN) mobileN.style.width = `${Math.max(0, Math.min(100, nutritionPct))}%`;

  const rateHealth = document.getElementById('health-rate');
  const rateStamina = document.getElementById('stamina-rate');
  const rateMana = document.getElementById('mana-rate');
  const rateNutrition = document.getElementById('nutrition-rate');
  if (rateHealth) rateHealth.textContent = componentRateText(gameState.rates.health);
  if (rateStamina) rateStamina.textContent = componentRateText(gameState.rates.stamina);
  if (rateMana) rateMana.textContent = componentRateText(gameState.rates.mana);
  if (rateNutrition) rateNutrition.textContent = componentRateText(gameState.rates.nutrition);

  const mobileHealthVal = document.getElementById('stat-health-val-mobile');
  const mobileStaminaVal = document.getElementById('stat-stamina-val-mobile');
  const mobileManaVal = document.getElementById('stat-mana-val-mobile');
  const mobileNutritionVal = document.getElementById('stat-nutrition-val-mobile');
  if (mobileHealthVal) mobileHealthVal.textContent = `${Math.round(gameState.health)}/${gameState.maxHealth}`;
  if (mobileStaminaVal) mobileStaminaVal.textContent = `${Math.round(gameState.stamina)}/${gameState.maxStamina}`;
  if (mobileManaVal) mobileManaVal.textContent = `${Math.round(gameState.mana)}/${gameState.maxMana}`;
  if (mobileNutritionVal) mobileNutritionVal.textContent = `${Math.round(gameState.nutrition)}/${gameState.maxNutrition}`;
}

function gameTick() {
  gameState.stats.totalTimePlayed += gameState.gameSpeed;
  gameState.ageDays += 5 * gameState.gameSpeed;
  if (gameState.ageDays >= 365) {
    gameState.ageYears += Math.floor(gameState.ageDays / 365);
    gameState.ageDays = gameState.ageDays % 365;
    addLog(`You have grown older. You are now ${gameState.ageYears} years old.`, 'aging');
  }

  gameState.nutrition = Math.max(0, gameState.nutrition - 1 * gameState.gameSpeed);
  if (gameState.nutrition <= 20) {
    if (gameState.taels >= 1) {
      gameState.taels -= 1;
      gameState.nutrition = Math.min(100, gameState.nutrition + 25);
      addLog('Out of food provisions, you spent 1 Tael on a bowl of rice.', 'cultivation');
    } else {
      gameState.health = Math.max(0, gameState.health - 5);
      addLog('Starvation is damaging your health!', 'system');
    }
  }

  const activity = gameState.activities[gameState.currentActivity];
  if (activity && activity.unlocked) {
    const bonus = gameState.sect === 'Brahma Wisdom Sect' && (gameState.currentActivity === 'sutra_study' || gameState.currentActivity === 'stargazing') ? 1.25 : 1;
    if (gameState.currentActivity === 'resting') {
      gameState.health = Math.min(gameState.maxHealth, gameState.health + (activity.healthGain || 2));
    } else if (gameState.currentActivity === 'odd_jobs') {
      const gain = (activity.taelsGain || 5) * bonus;
      gameState.taels += gain;
      gainAttributeXP('strength', 0.5 * bonus);
    } else if (gameState.currentActivity === 'meditation') {
      gameState.mana = Math.min(gameState.maxMana, gameState.mana + (activity.manaGain || 5));
      gainAttributeXP('intelligence', (activity.intGain || 1) * bonus);
    } else if (gameState.currentActivity === 'martial_training') {
      gainAttributeXP('strength', (activity.strGain || 1) * bonus);
      gainAttributeXP('speed', (activity.spdGain || 1) * bonus);
    }
  }

  if (gameState.combat.active) {
    processCombatTick();
  }

  checkAchievements();
  updateHeader();
  renderAttributes();
  renderActivities();
  renderInventory();
  renderEquipment();
  renderAchievements();
  updateNotifications();
}

function processCombatTick() {
  const playerStr = gameState.attributes.strength.value;
  const weaponBonus = gameState.equipment.weapon ? gameState.equipment.weapon.atk || 0 : 0;
  let damageToMonster = Math.max(1, (playerStr + weaponBonus) * 2 - gameState.combat.defense);
  gameState.combat.hp -= damageToMonster;

  const damageToPlayer = Math.max(1, gameState.combat.attack - Math.floor((gameState.attributes.toughness.value + (gameState.equipment.armor ? gameState.equipment.armor.def || 0 : 0)) * 1.5));
  gameState.health = Math.max(0, gameState.health - damageToPlayer);
  appendCombatSublog(`You strike ${gameState.combat.monsterName} for ${damageToMonster}. They hit you for ${damageToPlayer}.`);

  if (gameState.combat.hp <= 0) {
    const rewardTaels = gameState.combat.isBoss ? 150 : 25;
    const rewardStones = gameState.combat.isBoss ? 5 : (Math.random() < 0.5 ? 1 : 0);
    gameState.taels += rewardTaels;
    gameState.spiritualStones += rewardStones;
    gameState.stats.monstersDefeated += 1;
    if (gameState.combat.isBoss) gameState.stats.bossesDefeated += 1;
    addLog(`Victory! You defeated ${gameState.combat.monsterName} and gained ${rewardTaels} taels and ${rewardStones} stones.`, 'combat');
    fleeCombat();
  }
}

function appendCombatSublog(message) {
  const el = document.getElementById('combat-sublog');
  if (!el) return;
  const div = document.createElement('div');
  div.textContent = message;
  el.appendChild(div);
  while (el.children.length > 6) el.removeChild(el.firstChild);
}

function setLogFilter(filter) {
  gameState.logFilter = filter;
  renderLog();
  ['filter-all', 'filter-combat', 'filter-cultivation'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-300';
  });
  const active = document.getElementById(filter === 'all' ? 'filter-all' : `filter-${filter}`);
  if (active) active.className = 'px-2 py-0.5 rounded bg-amber-600 text-slate-950 font-bold';
}

function gainAttributeXP(attrKey, amount) {
  const attr = gameState.attributes[attrKey];
  if (!attr) return;
  attr.xp += amount * attr.aptitude;
  if (attr.xp >= attr.maxXp) {
    attr.xp = 0;
    attr.value += 1;
    attr.maxXp = Math.floor(attr.maxXp * 1.3);
    addLog(`Your ${attr.name} has increased to Level ${attr.value}!`, 'cultivation');
    showToast(`${attr.name} Lvl ${attr.value}!`, 'success');
  }
  renderAttributes();
}

function showToast(message, type = 'system') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
}

function attemptBreakthrough() {
  const nextRealm = realms[gameState.realmIndex + 1];
  if (!nextRealm) {
    showToast('You have attained the highest possible realm!', 'system');
    return;
  }
  if (gameState.spiritualStones < 10) {
    showToast('Need at least 10 Spiritual Stones to attempt breakthrough!', 'error');
    return;
  }
  const avgAttr = (gameState.attributes.strength.value + gameState.attributes.intelligence.value + gameState.attributes.toughness.value) / 3;
  const chance = Math.min(0.95, (avgAttr / nextRealm.reqAttr) * 0.8);
  gameState.spiritualStones -= 10;
  if (Math.random() <= chance) {
    gameState.realmIndex += 1;
    gameState.maxAge = nextRealm.lifeExp;
    addLog(`Successful Breakthrough! You have ascended to ${nextRealm.name}!`, 'cultivation');
    showToast(`Ascended to ${nextRealm.name}!`, 'success');
    closeModal('breakthrough-modal');
  } else {
    gameState.health = Math.max(10, gameState.health - 30);
    addLog('Breakthrough failed! Qi backlash damaged your physical health.', 'system');
    showToast('Breakthrough Failed!', 'error');
    closeModal('breakthrough-modal');
  }
  updateHeader();
}

function checkAchievements() {
  gameState.achievements.forEach((ach) => {
    if (ach.completed) return;
    if (ach.id === 'first_step' && Object.values(gameState.attributes).some(attr => attr.value >= 5)) {
      ach.completed = true;
      gameState.spiritualStones += 20;
      addLog(`🏆 Achievement Unlocked: ${ach.name}! Reward claimed.`, 'cultivation');
      showToast(`Achievement: ${ach.name}!`, 'success');
    } else if (ach.id === 'slayer' && gameState.stats.monstersDefeated >= 10) {
      ach.completed = true;
      gameState.spiritualStones += 10;
      gameState.taels += 100;
      addLog(`🏆 Achievement Unlocked: ${ach.name}! Reward claimed.`, 'cultivation');
      showToast(`Achievement: ${ach.name}!`, 'success');
    } else if (ach.id === 'ascend' && gameState.realmIndex >= 1) {
      ach.completed = true;
      gameState.spiritualStones += 50;
      addLog(`🏆 Achievement Unlocked: ${ach.name}! Reward claimed.`, 'cultivation');
      showToast(`Achievement: ${ach.name}!`, 'success');
    }
  });
  renderAchievements();
}

function buyStoreItem(itemId) {
  const item = storeItems.find((entry) => entry.id === itemId);
  if (!item) return;
  if (gameState.taels < item.cost) {
    showToast('Not enough taels.', 'error');
    return;
  }
  gameState.taels -= item.cost;
  if (item.id === 'sack_rice') addInventoryItem('Rice Sack', 5, 'food', 'Freshly purchased rice.');
  if (item.id === 'sword_steel') addInventoryItem('Master Steel Sword', 1, 'weapon', 'Celestial steel weapon.', 'weapon', 12);
  if (item.id === 'jade_armor') addInventoryItem('Dragon Jade Robe', 1, 'armor', 'Protective immortal robe.', 'armor', 8);
  if (item.id === 'pill_longevity') gameState.maxAge += 10;
  addLog(`You bought ${item.name}.`, 'cultivation');
  updateHeader();
  renderInventory();
}

function craftRecipe(recipeId) {
  const recipe = alchemyRecipes.find((entry) => entry.id === recipeId);
  if (!recipe) return;
  const herbCount = gameState.inventory.filter((item) => item.type === 'herb').reduce((sum, item) => sum + item.count, 0);
  if (herbCount < recipe.reqHerb || gameState.spiritualStones < recipe.reqStones) {
    showToast('You do not have the required ingredients.', 'error');
    return;
  }
  for (let i = 0; i < recipe.reqHerb; i++) {
    const herb = gameState.inventory.find((item) => item.type === 'herb' && item.count > 0);
    if (herb) herb.count -= 1;
  }
  gameState.spiritualStones -= recipe.reqStones;
  gameState.maxAge += recipe.id === 'longevity_pill' ? 15 : 0;
  if (recipe.id === 'qi_pill') {
    gainAttributeXP('intelligence', 30);
    gainAttributeXP('charisma', 10);
  }
  addLog(`You crafted ${recipe.name}.`, 'cultivation');
  renderInventory();
  updateHeader();
}

function addInventoryItem(name, count, type, desc, slot = null, atk = 0, def = 0) {
  const existing = gameState.inventory.find((item) => item.name === name && item.type === type);
  if (existing) {
    existing.count += count;
  } else {
    gameState.inventory.push({ id: Date.now(), name, type, desc, count, icon: type === 'weapon' ? 'fa-sword' : type === 'armor' ? 'fa-shield-halved' : 'fa-leaf', slot, atk, def, rarity: type === 'weapon' ? 'rare' : type === 'armor' ? 'epic' : 'common' });
  }
  renderInventory();
}

function joinSect(sectId) {
  const sect = sectList.find((entry) => entry.id === sectId);
  if (!sect) return;
  gameState.sect = sect.name;
  if (sectId === 'none') gameState.sectRank = 'Independent';
  else gameState.sectRank = 'Outer Disciple';
  addLog(`You aligned with the ${sect.name}.`, 'cultivation');
  updateNotifications();
}

function acceptMission(missionId) {
  const mission = sectMissionsList.find((entry) => entry.id === missionId);
  if (!mission) return;
  if (gameState.sect === 'None') {
    showToast('You need to join a sect before taking missions.', 'error');
    return;
  }
  gameState.spiritualStones += mission.rewardStones;
  gameState.sectContribution += mission.rewardContr;
  addLog(`Mission complete: ${mission.name}.`, 'combat');
  updateHeader();
}

function summonPet(petId) {
  const pet = gameState.pets.find((entry) => entry.id === petId);
  if (!pet) return;
  if (gameState.taels < pet.cost) {
    showToast('Not enough taels.', 'error');
    return;
  }
  gameState.taels -= pet.cost;
  gameState.activePet = petId;
  pet.unlocked = true;
  addLog(`You summoned the ${pet.name}.`, 'cultivation');
  updateHeader();
}

function toggleCombat() {
  if (gameState.combat.active) fleeCombat();
  else startCombat(false);
}

function triggerBossRaid() {
  if (gameState.combat.active) return;
  startCombat(true);
}

function startCombat(isBoss) {
  const names = ['Vicious Yaksha', 'Raging Asura', 'Shadow Demon', 'Rakshasa Warrior', 'Naga Serpent'];
  const bossNames = ['Demon King Mahishasura', 'Asura General Vritra', 'Shadow Sovereign Ravana'];
  const name = isBoss ? bossNames[Math.floor(Math.random() * bossNames.length)] : names[Math.floor(Math.random() * names.length)];
  const hp = isBoss ? 150 : 50;
  const attack = isBoss ? 18 : 6;
  const defense = isBoss ? 8 : 2;

  gameState.combat = { active: true, isBoss, monsterName: name, hp, maxHp: hp, attack, defense };
  document.getElementById('monster-tier-badge').textContent = isBoss ? 'BOSS RAID' : 'Standard Encounter';
  document.getElementById('monster-name').textContent = name;
  document.getElementById('monster-hp-val').textContent = `${hp} / ${hp}`;
  document.getElementById('monster-bar-hp').style.width = '100%';
  document.getElementById('combat-panel').classList.remove('hidden');
  document.getElementById('combat-idle-msg').classList.add('hidden');
  document.getElementById('combat-toggle-btn').textContent = 'Flee Combat';
  addLog(`Encountered ${isBoss ? 'BOSS' : 'wild'} ${name}! Combat has begun.`, 'combat');
}

function triggerSpecialAttack() {
  if (!gameState.combat.active) return;
  if (gameState.mana < 20) {
    showToast('Not enough mana for Spiritual Strike.', 'error');
    return;
  }
  gameState.mana = Math.max(0, gameState.mana - 20);
  const damage = 20 + gameState.attributes.intelligence.value * 2;
  gameState.combat.hp = Math.max(0, gameState.combat.hp - damage);
  appendCombatSublog(`Spiritual Strike deals ${damage} damage.`);
  if (gameState.combat.hp <= 0) {
    const reward = gameState.combat.isBoss ? 150 : 25;
    addLog(`Victory! You defeated ${gameState.combat.monsterName} with a Spiritual Strike.`, 'combat');
    gameState.taels += reward;
    fleeCombat();
  }
}

function fleeCombat() {
  gameState.combat.active = false;
  document.getElementById('combat-panel').classList.add('hidden');
  document.getElementById('combat-idle-msg').classList.remove('hidden');
  document.getElementById('combat-toggle-btn').textContent = 'Look for Trouble';
  document.getElementById('combat-toggle-btn').className = 'px-2.5 py-1 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded transition shadow action-ready';
  document.getElementById('combat-sublog').innerHTML = '<div>Engaging in battle...</div>';
}

function sortInventory() {
  gameState.inventory.sort((a, b) => a.name.localeCompare(b.name));
  renderInventory();
}

function exportSave() {
  const saveData = JSON.stringify(gameState);
  localStorage.setItem('yuga-trimurti-save', saveData);
  showToast('Save exported to local storage.', 'success');
}

function importSave() {
  const raw = localStorage.getItem('yuga-trimurti-save');
  if (!raw) {
    showToast('No saved game found.', 'error');
    return;
  }
  const loaded = JSON.parse(raw);
  Object.assign(gameState, loaded);
  renderAll();
  showToast('Save imported!', 'success');
}

function hardReset() {
  localStorage.removeItem('yuga-trimurti-save');
  window.location.reload();
}

function executeReincarnation() {
  gameState.reincarnations += 1;
  Object.values(gameState.attributes).forEach((attr) => {
    attr.aptitude += 0.5;
  });
  addLog('You begin a new life with elevated aptitude and renewed purpose.', 'cultivation');
  closeModal('reincarnation-modal');
  updateHeader();
}

function renderAll() {
  renderAttributes();
  renderActivities();
  renderInventory();
  renderEquipment();
  renderStore();
  renderAlchemy();
  renderAchievements();
  renderPets();
  renderSect();
  renderLog();
  updateHeader();
  updateNotifications();
}

window.onload = () => {
  init();
};

setGameSpeed(1);
setLogFilter('all');

window.openModal = openModal;
window.closeModal = closeModal;
window.setGameSpeed = setGameSpeed;
window.switchMobileTab = switchMobileTab;
window.switchTab = switchTab;
window.triggerBossRaid = triggerBossRaid;
window.toggleCombat = toggleCombat;
window.triggerSpecialAttack = triggerSpecialAttack;
window.fleeCombat = fleeCombat;
window.buyStoreItem = buyStoreItem;
window.craftRecipe = craftRecipe;
window.joinSect = joinSect;
window.acceptMission = acceptMission;
window.summonPet = summonPet;
window.attemptBreakthrough = attemptBreakthrough;
window.sortInventory = sortInventory;
window.exportSave = exportSave;
window.importSave = importSave;
window.hardReset = hardReset;
window.executeReincarnation = executeReincarnation;
window.switchSectTab = (tab) => {
  const factions = document.getElementById('sect-tab-factions');
  const missions = document.getElementById('sect-tab-missions');
  if (!factions || !missions) return;
  if (tab === 'missions') {
    factions.className = 'px-3 py-1 bg-slate-800 text-slate-300 font-bold rounded';
    missions.className = 'px-3 py-1 bg-cyan-700 text-white font-bold rounded';
  } else {
    factions.className = 'px-3 py-1 bg-cyan-700 text-white font-bold rounded';
    missions.className = 'px-3 py-1 bg-slate-800 text-slate-300 font-bold rounded';
  }
};

document.addEventListener('keydown', (event) => {
  const targetTag = event.target && event.target.tagName;
  if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') return;

  if (event.code === 'Space') {
    event.preventDefault();
    if (gameState.combat.active) fleeCombat();
    else startCombat(false);
    return;
  }

  if (event.key === '1') switchTab('cultivation');
  if (event.key === '2') switchTab('combat');
  if (event.key === '3') openModal('store-modal');
  if (event.key === '4') switchTab('inventory');
  if (event.key === '5') openModal('settings-modal');
  if (event.key === 's' || event.key === 'S') openModal('settings-modal');
});

renderAll();
updateHeader();
updateNotifications();
window.gameState = gameState;
window.realms = realms;
showToast('Adventure initialized.', 'system');
console.log('Yuga Idle: Chronicles of the Trimurti initialized.');
