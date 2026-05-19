export const calcStars = (correct, total) => {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 0.8) return 3;
  if (pct >= 0.6) return 2;
  if (pct >= 0.4) return 1;
  return 0;
};

export const calcAccuracy = (correct, total) =>
  total === 0 ? 0 : Math.round((correct / total) * 100);

export const getStarMessage = (stars) => {
  switch (stars) {
    case 3: return 'Excellent work! 🌟';
    case 2: return 'Good job — keep it up!';
    case 1: return 'A solid start — try again to improve!';
    default: return 'Keep practising — you\'ll get there!';
  }
};

export const getGrade = (pct) => {
  if (pct >= 90) return { label: 'Expert', color: '#10b981' };
  if (pct >= 70) return { label: 'Proficient', color: '#3b82f6' };
  if (pct >= 50) return { label: 'Developing', color: '#f59e0b' };
  return { label: 'Needs Practice', color: '#ef4444' };
};
