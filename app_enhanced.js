// Enhanced Yuga Idle with Skills & Locations
// This file contains the new skill tree and location system

const locations = [
  {
    id: 'temple',
    name: '🏯 Sacred Temple',
    desc: 'A place of spiritual tranquility and meditation.',
    activities: ['resting', 'meditation', 'sutra_study', 'ritual_offerings', 'stargazing'],
  },
  {
    id: 'wilderness',
    name: '🌲 Mystical Wilderness',
    desc: 'Untamed lands filled with spiritual beasts and herbs.',
    activities: ['martial_training', 'herb_gathering', 'combat'],
  },
  {
    id: 'pavilion',
    name: '🏪 Spiritual Pavilion',
    desc: 'Marketplace of divine artifacts and ancient texts.',
    activities: ['odd_jobs', 'trading', 'alchemy'],
  },
  {
    id: 'sect_hall',
    name: '⛩️ Sect Assembly Hall',
    desc: 'Headquarters of your chosen immortal sect.',
    activities: ['sect_missions', 'training', 'breakthrough'],
  },
];

const skillTreesData = {
  cultivation: {
    name: 'Cultivation Mastery',
    icon: 'fa-meditation',
    desc: 'Master the art of spiritual cultivation',
    bonuses: { intelligenceGain: 0.1, manaGain: 0.1 },
    skills: [
      { level: 1, name: 'Inner Breathing', bonus: '+5% Mana Regeneration' },
      { level: 5, name: 'Spirit Absorption', bonus: '+10% All Attribute XP' },
      { level: 10, name: 'Celestial Harmony', bonus: '+15% Mana & Intelligence Gain' },
    ],
  },
  combat: {
    name: 'Combat Mastery',
    icon: 'fa-sword',
    desc: 'Perfect your martial technique',
    bonuses: { strengthGain: 0.1, speedGain: 0.1 },
    skills: [
      { level: 1, name: 'Basic Strikes', bonus: '+5% Weapon Damage' },
      { level: 5, name: 'Whirlwind Attack', bonus: '+2 Monster Encounters/Tick' },
      { level: 10, name: 'Divine Sword Art', bonus: '+25% Combat Damage' },
    ],
  },
  alchemy: {
    name: 'Alchemical Arts',
    icon: 'fa-flask',
    desc: 'Refine powerful pills and elixirs',
    bonuses: { herbGain: 0.2, stoneCost: -0.1 },
    skills: [
      { level: 1, name: 'Herbalist Knowledge', bonus: '+5% Herb Gathering' },
      { level: 5, name: 'Pill Refinement', bonus: '-1 Stone Cost (Recipes)' },
      { level: 10, name: 'Immortal Elixirs', bonus: '+50% Pill Effects' },
    ],
  },
  fortitude: {
    name: 'Fortitude Training',
    icon: 'fa-shield',
    desc: 'Strengthen body and resolve',
    bonuses: { healthMax: 0.1, toughnessGain: 0.1 },
    skills: [
      { level: 1, name: 'Iron Skin', bonus: '+5% Max Health' },
      { level: 5, name: 'Unbreakable Will', bonus: '+10% Defense' },
      { level: 10, name: 'Eternal Durability', bonus: '+20% Max HP & Defense' },
    ],
  },
};

// Enhanced gameState with skills and location
const enhancedGameState = {
  currentLocation: 'temple',
  skills: Object.keys(skillTreesData).reduce((acc, key) => {
    acc[key] = { level: 1, xp: 0, maxXp: 100 };
    return acc;
  }, {}),
  skillPoints: 0,
};

// Render location selector in UI
function renderLocations() {
  const navContainer = document.getElementById('location-nav');
  if (!navContainer) return;

  navContainer.innerHTML = locations
    .map(
      (loc) => `
    <button onclick="switchLocation('${loc.id}')" class="location-btn ${gameState.currentLocation === loc.id ? 'active' : ''}">
      ${loc.name}
    </button>
  `
    )
    .join('');
}

// Switch to a location
function switchLocation(locationId) {
  const location = locations.find((l) => l.id === locationId);
  if (!location) return;

  gameState.currentLocation = locationId;
  addLog(`You traveled to the ${location.name}.`, 'cultivation');
  
  // Filter available activities for this location
  const activityContainer = document.getElementById('activities-container');
  if (activityContainer) {
    renderActivities();
  }
  renderLocations();
}

// Render skill trees
function renderSkillTrees() {
  const skillPanel = document.getElementById('skill-trees-panel');
  if (!skillPanel) return;

  skillPanel.innerHTML = Object.entries(skillTreesData)
    .map(([key, tree]) => {
      const skillLevel = gameState.skills[key].level;
      const skillXp = gameState.skills[key].xp;
      const maxXp = gameState.skills[key].maxXp;
      const progress = (skillXp / maxXp) * 100;

      return `
        <div class="skill-tree-card">
          <div class="skill-tree-header">
            <i class="fa-solid ${tree.icon}"></i>
            <div>
              <h3>${tree.name}</h3>
              <p class="text-xs text-slate-400">${tree.desc}</p>
            </div>
            <span class="skill-level">Lv ${skillLevel}</span>
          </div>
          <div class="skill-xp-bar">
            <div class="skill-xp-fill" style="width: ${progress}%"></div>
          </div>
          <div class="skill-xp-text">
            ${Math.round(skillXp)} / ${maxXp} XP
          </div>
          <div class="skill-unlocks">
            ${tree.skills
              .filter((s) => s.level <= skillLevel)
              .map((s) => `<div class="skill-unlock">✓ ${s.name}</div>`)
              .join('')}
          </div>
        </div>
      `;
    })
    .join('');
}

// Gain skill XP
function gainSkillXP(skillKey, amount) {
  const skill = gameState.skills[skillKey];
  if (!skill) return;

  skill.xp += amount;
  if (skill.xp >= skill.maxXp) {
    skill.xp = 0;
    skill.level += 1;
    skill.maxXp = Math.floor(skill.maxXp * 1.3);
    addLog(`Your ${Object.keys(skillTreesData)[Object.keys(gameState.skills).indexOf(skillKey)]} skill has reached Level ${skill.level}!`, 'cultivation');
    showToast(`Skill Level Up! ${skillKey}`, 'success');
  }
  renderSkillTrees();
}

// Apply skill bonuses to activities
function applySkillBonuses(activityKey) {
  let bonusMultiplier = 1.0;

  // Match skills to activities
  const skillMapping = {
    cultivation: ['meditation', 'sutra_study', 'stargazing'],
    combat: ['martial_training'],
    alchemy: ['herb_gathering'],
    fortitude: ['resting'],
  };

  for (const [skill, activities] of Object.entries(skillMapping)) {
    if (activities.includes(activityKey)) {
      const skillBonus = gameState.skills[skill].level * 0.05; // 5% per level
      bonusMultiplier += skillBonus;
    }
  }

  return bonusMultiplier;
}

// Enhanced gameTick with skill XP gains
function enhancedGameTick() {
  const activity = gameState.activities[gameState.currentActivity];
  const skillBonus = applySkillBonuses(gameState.currentActivity);

  if (activity && activity.unlocked) {
    if (gameState.currentActivity === 'meditation') {
      gainSkillXP('cultivation', 1 * skillBonus);
    } else if (gameState.currentActivity === 'martial_training') {
      gainSkillXP('combat', 1 * skillBonus);
    } else if (gameState.currentActivity === 'herb_gathering') {
      gainSkillXP('alchemy', 1 * skillBonus);
    } else if (gameState.currentActivity === 'resting') {
      gainSkillXP('fortitude', 0.5 * skillBonus);
    }
  }
}

// Export functions for use
window.switchLocation = switchLocation;
window.renderLocations = renderLocations;
window.renderSkillTrees = renderSkillTrees;
window.gainSkillXP = gainSkillXP;
window.applySkillBonuses = applySkillBonuses;
