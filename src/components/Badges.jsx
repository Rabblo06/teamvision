import React from 'react';
import { BADGES, getLevelById } from '../data/levels';
import { getState } from '../utils/storage';

const Badges = ({ onBack }) => {
  const state   = getState();
  const earned  = state.badges;
  const earnedCount = earned.length;

  return (
    <div className="badges-screen">
      <div className="badges-header">
        <h1 className="badges-title">🏅 Badge Collection</h1>
        <p className="badges-subtitle">
          {earnedCount === 0
            ? 'Complete levels to earn badges. You can do this!'
            : `${earnedCount} of ${BADGES.length} badges earned`}
        </p>
        {earnedCount > 0 && (
          <div className="badges-progress-track">
            <div
              className="badges-progress-fill"
              style={{ width: `${(earnedCount / BADGES.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="badges-grid" role="list">
        {BADGES.map(badge => {
          const isEarned = earned.includes(badge.id);
          const level    = getLevelById(badge.levelId);
          return (
            <div
              key={badge.id}
              className={`badge-card ${isEarned ? 'badge-card--earned' : 'badge-card--locked'}`}
              role="listitem"
              aria-label={`${badge.name}: ${isEarned ? 'Earned' : 'Not yet earned'}`}
            >
              <div className="badge-icon-wrap">
                <span className="badge-icon" style={{ filter: isEarned ? 'none' : 'grayscale(1) opacity(0.35)' }} aria-hidden="true">
                  {badge.icon}
                </span>
                {isEarned && <span className="badge-earned-tick" aria-hidden="true">✓</span>}
              </div>
              <h2 className="badge-name">{badge.name}</h2>
              <p className="badge-desc">{badge.description}</p>
              <div className="badge-level-tag" style={{ color: level?.color || '#94a3b8' }}>
                {isEarned ? '✅ Earned' : `🔒 Complete Level ${badge.levelId}`}
              </div>
            </div>
          );
        })}
      </div>

      {earnedCount === BADGES.length && (
        <div className="badges-complete-banner">
          🏆 Congratulations! You have earned every badge — a true Cyber Champion!
        </div>
      )}
    </div>
  );
};

export default Badges;
