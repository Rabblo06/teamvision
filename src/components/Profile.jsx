import React from 'react';
import { getState } from '../utils/storage';
import { LEVELS, BADGES } from '../data/levels';

const Profile = ({ onBack }) => {
  const state   = getState();
  const earned  = BADGES.filter(b => state.badges.includes(b.id));
  const totalPossible = LEVELS.length * 30; // 3 stars × 10pts × levels
  const completedLevels = state.completedLevels.length;
  const accuracy = completedLevels === 0 ? 0 :
    Math.round(
      LEVELS.reduce((acc, l) => {
        const best = state.levelBestScores[l.id] || 0;
        return acc + (best / 10);
      }, 0) / (completedLevels * LEVELS[0]?.questions?.length || completedLevels) * 100
    ) || 0;

  return (
    <div className="profile-screen">
      <div className="profile-hero">
        <span className="profile-avatar" aria-hidden="true">🛡️</span>
        <h1 className="profile-name">My Progress</h1>
        <p className="profile-tagline">
          {completedLevels === 0
            ? 'Start your first level to track your progress.'
            : `${completedLevels} of ${LEVELS.length} levels complete`}
        </p>
      </div>

      {/* Stats grid */}
      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <span className="profile-stat-num">{state.totalScore}</span>
          <span className="profile-stat-lbl">Total Points</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-num">{completedLevels}</span>
          <span className="profile-stat-lbl">Levels Completed</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-num">{earned.length}</span>
          <span className="profile-stat-lbl">Badges Earned</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-num">
            {Object.values(state.levelStars).reduce((a, b) => a + b, 0)}
          </span>
          <span className="profile-stat-lbl">Stars Collected</span>
        </div>
      </div>

      {/* Level-by-level breakdown */}
      <section className="profile-levels-section" aria-labelledby="progress-title">
        <h2 id="progress-title" className="section-title">Level Progress</h2>
        <div className="profile-levels-list">
          {LEVELS.map(level => {
            const isCompleted = state.completedLevels.includes(level.id);
            const isUnlocked  = state.unlockedLevels.includes(level.id);
            const stars       = state.levelStars[level.id] || 0;
            const bestScore   = state.levelBestScores[level.id] || 0;

            return (
              <div
                key={level.id}
                className={`profile-level-row ${isCompleted ? 'plr--done' : isUnlocked ? 'plr--unlocked' : 'plr--locked'}`}
              >
                <span className="plr-icon" aria-hidden="true">{level.icon}</span>
                <div className="plr-info">
                  <span className="plr-title">{level.title}</span>
                  <span className="plr-tier" style={{ color: level.color }}>{level.tier}</span>
                </div>
                <div className="plr-result">
                  {isCompleted ? (
                    <>
                      <span className="plr-stars" aria-label={`${stars} stars`}>
                        {[1,2,3].map(i => (
                          <span key={i} style={{ color: i <= stars ? '#f59e0b' : '#1e3a5f' }}>★</span>
                        ))}
                      </span>
                      <span className="plr-score">{bestScore}pts</span>
                    </>
                  ) : isUnlocked ? (
                    <span className="plr-status plr-status--available">▶ Available</span>
                  ) : (
                    <span className="plr-status plr-status--locked">🔒 Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges earned */}
      {earned.length > 0 && (
        <section className="profile-badges-section" aria-labelledby="badges-title">
          <h2 id="badges-title" className="section-title">Badges Earned</h2>
          <div className="profile-badges-row">
            {earned.map(b => (
              <div key={b.id} className="profile-badge-chip">
                <span className="profile-badge-icon">{b.icon}</span>
                <span className="profile-badge-name">{b.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
