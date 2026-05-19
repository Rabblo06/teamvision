let ctx = null;

const getCtx = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
};

const tone = (freq, type, duration, gain = 0.3) => {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.connect(g);
    g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(gain, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration);
  } catch { /* audio not available */ }
};

export const playCorrect = () => {
  tone(523, 'sine', 0.12, 0.25);
  setTimeout(() => tone(659, 'sine', 0.18, 0.25), 100);
};

export const playWrong = () => {
  tone(220, 'sawtooth', 0.3, 0.2);
};

export const playComplete = () => {
  [523, 659, 784, 1047].forEach((f, i) =>
    setTimeout(() => tone(f, 'sine', 0.2, 0.2), i * 120)
  );
};

export const playClick = () => {
  tone(880, 'sine', 0.06, 0.1);
};

export const playUnlock = () => {
  tone(440, 'sine', 0.1, 0.2);
  setTimeout(() => tone(554, 'sine', 0.1, 0.2), 120);
  setTimeout(() => tone(659, 'sine', 0.15, 0.2), 240);
};
