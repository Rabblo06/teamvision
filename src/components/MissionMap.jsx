import React from 'react';
import { LEVELS, TIERS } from '../data/levels';
import { getState } from '../utils/storage';

const StarRow = ({ stars, max = 3 }) => (
  <span className="star-row" aria-label={`${stars} out of ${max} stars`}>
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < stars ? 'star star--on' : 'star star--off'}>★</span>
    ))}
  </span>
);

const LevelNode = ({ level, state, onSelect }) => {
  const isCompleted = state.completedLevels.includes(level.id);
  const isUnlocked  = state.unlockedLevels.includes(level.id);
  const stars       = state.levelStars[level.id] || 0;
  const bestScore   = state.levelBestScores[level.id] || 0;

  let status = 'locked';
  if (isCompleted) status = 'completed';
  else if (isUnlocked) status = 'unlocked';

  return (
    <button
      className={`level-node level-node--${status}`}
      onClick={() => isUnlocked && onSelect(level.id)}
      disabled={!isUnlocked}
      aria-label={`Level ${level.id}: ${level.title}. ${status}${isCompleted ? `. Best score: ${bestScore}` : ''}`}
      style={{ '--level-color': level.color }}
    >
      <div className="level-node-header">
        <span className="level-num">Level {level.id}</span>
        {isCompleted && <StarRow stars={stars} />}
        {!isCompleted && isUnlocked && <span className="level-badge-new">▶ Play</span>}
        {status === 'locked' && <span className="level-locked-icon">🔒</span>}
      </div>

      <div className="level-node-body">
        <span className="level-icon" aria-hidden="true">{level.icon}</span>
        <div className="level-info">
          <span className="level-title">{level.title}</span>
          <span className="level-subtitle">{level.subtitle}</span>
        </div>
      </div>

      <div className="level-node-footer">
        <span className="level-difficulty" style={{ color: level.color }}>{level.difficulty}</span>
        {level.hasTimer && <span className="level-timer-badge">⏱ Timed</span>}
        {isCompleted && bestScore > 0 && <span className="level-score">Best: {bestScore}pts</span>}
      </div>
    </button>
  );
};

const MissionMap = ({ onSelectLevel }) => {
  const state = getState();
  const totalCompleted = state.completedLevels.length;

  return (
    <div className="map-screen">
      <div className="map-header">
        <h1 className="map-title">Mission Map</h1>
        <p className="map-subtitle">Complete each level to unlock the next. Earn 3 stars by answering at least 80% correctly.</p>
        <div className="map-overall-progress">
          <span className="map-progress-label">{totalCompleted} of {LEVELS.length} levels complete</span>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(totalCompleted / LEVELS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="tiers-container">
        {TIERS.map(tier => (
          <section key={tier.name} className="tier-section" aria-labelledby={`tier-${tier.name}`}>
            <div className="tier-header" style={{ '--tier-color': tier.color }}>
              <span className="tier-icon" aria-hidden="true">{tier.icon}</span>
              <div>
                <h2 id={`tier-${tier.name}`} className="tier-name" style={{ color: tier.color }}>
                  {tier.name}
                </h2>
                <span className="tier-subtitle">{tier.subtitle}</span>
              </div>
            </div>

            <div className="tier-levels">
              {tier.levels.map(id => {
                const level = LEVELS.find(l => l.id === id);
                return (
                  <LevelNode
                    key={id}
                    level={level}
                    state={state}
                    onSelect={onSelectLevel}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MissionMap;
