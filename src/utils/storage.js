import { BADGES } from '../data/levels';

const KEY = 'cybersafe_quest_v2';

const defaultState = () => ({
  unlockedLevels: [1],
  completedLevels: [],
  levelStars: {},
  levelBestScores: {},
  badges: [],
  totalScore: 0,
  settings: { soundEnabled: true },
});

export const getState = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
};

const persist = (state) => {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full */ }
};

export const saveLevelResult = (levelId, stars, score, correct, total) => {
  const state = getState();

  if (!state.completedLevels.includes(levelId)) {
    state.completedLevels.push(levelId);
  }

  const prevStars = state.levelStars[levelId] || 0;
  if (stars > prevStars) state.levelStars[levelId] = stars;

  const prevScore = state.levelBestScores[levelId] || 0;
  if (score > prevScore) {
    state.totalScore += (score - prevScore);
    state.levelBestScores[levelId] = score;
  } else if (prevScore === 0) {
    state.totalScore += score;
  }

  const nextId = levelId + 1;
  if (nextId <= 12 && !state.unlockedLevels.includes(nextId)) {
    state.unlockedLevels.push(nextId);
  }

  state.badges = computeBadges(state.completedLevels);

  persist(state);
  return state;
};

export const computeBadges = (completedLevels) =>
  BADGES
    .filter(b => completedLevels.includes(b.levelId))
    .map(b => b.id);

export const getSettings = () => getState().settings || { soundEnabled: true };

export const saveSettings = (settings) => {
  const state = getState();
  state.settings = { ...state.settings, ...settings };
  persist(state);
};

export const resetAll = () => {
  localStorage.removeItem(KEY);
};
